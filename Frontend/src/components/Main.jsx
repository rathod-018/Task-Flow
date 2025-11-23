import React, { useEffect, useState } from "react";
import { Outlet, NavLink } from "react-router-dom";
import BoardCard from "./projects/board/BoardCard";
import { useProjectContext } from "../context/ProjectContext";
import { useUserContext } from "../context/UserContext";

function Main() {
  const { projectData } = useProjectContext();
  const [isOpen, setIsOpen] = useState(false);
  const [project, setProject] = useState(null);
  const { user } = useUserContext();
  const selectedBoard = user?.userPageHistory?.boardId;

  // console.log(project)

  useEffect(() => {
    setProject(projectData);
  }, [projectData]);
  return (
    <div className="w-full h-full flex justify-center items-center">
      {selectedBoard ? (
        <div className="flex flex-col w-full h-full max-w-[110rem] mx-auto text-gray-200 z-10">
          <div className="px-4 py-6 flex flex-col gap-6">
            <h2 className="px-6 py-3 w-fit bg-[#1f1f23] border border-[#2e2e32] rounded-xl text-2xl font-semibold">
              {project?.title || "No project"}
            </h2>

            <div className="flex justify-center">
              <ul className="flex gap-10 items-center bg-[#1f1f23] border border-[#2e2e32] rounded-xl px-6 py-2 w-fit relative shadow-sm">
                <li>
                  <NavLink
                    to="work-flow"
                    className={({ isActive }) =>
                      `px-2 text-lg font-medium transition ${
                        isActive
                          ? "text-blue-400 border-b border-gray-500 p-1 rounded-xl bg-slate-900 bg-opacity-50"
                          : "text-gray-300 hover:text-white"
                      }`
                    }
                  >
                    Work-flow
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="list"
                    className={({ isActive }) =>
                      `px-2 text-lg font-medium transition ${
                        isActive
                          ? "text-blue-400 border-b border-gray-500 p-1 rounded-xl bg-slate-900 bg-opacity-50"
                          : "text-gray-300 hover:text-white"
                      }`
                    }
                  >
                    List
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="summary"
                    className={({ isActive }) =>
                      `px-2 text-lg font-medium transition ${
                        isActive
                          ? "text-blue-400 border-b border-gray-500 p-1 rounded-xl bg-slate-900 bg-opacity-50"
                          : "text-gray-300 hover:text-white"
                      }`
                    }
                  >
                    Summary
                  </NavLink>
                </li>

                <li
                  onClick={() => setIsOpen((p) => !p)}
                  className={`px-2 text-lg font-medium cursor-pointer transition ${
                    isOpen
                      ? "text-blue-400 border-b border-gray-500 p-1 rounded-xl bg-slate-900 bg-opacity-50"
                      : "text-gray-300 hover:text-white"
                  }`}
                >
                  All-Boards
                </li>

                {isOpen && (
                  <div className="absolute top-14 left-0 w-full z-40">
                    <div className="bg-[#1f1f23] border border-[#2e2e32] rounded-xl shadow-xl p-3 max-w-[1100px] mx-auto">
                      <BoardCard />
                    </div>
                  </div>
                )}
              </ul>
            </div>
          </div>
          <div className="border-t border-[#2e2e32]" />
          <div className="h-full overflow-auto p-4">
            <Outlet context={{project}} />
          </div>
        </div>
      ) : (
        <h2 className="text-5xl text-slate-300 font-mono">
          Please create Board to continue👀
        </h2>
      )}
    </div>
  );
}

export default Main;
