import React, { useEffect, useState } from "react";
import { Outlet, NavLink } from "react-router-dom";
import BoardCard from "./board/BoardCard";
import { useProjectContext } from "../context/ProjectContext";
import { useUserContext } from "../context/UserContext";
import angleDown from "../assets/angle-down.svg";
import angleRight from "../assets/angle-right.svg";
import notebook from "../assets/notebook.svg";
import { useUIContext } from "../context/UIContext";

function Main() {
  const { selectedProject } = useProjectContext();
  const [isOpen, setIsOpen] = useState(false);
  const [project, setProject] = useState(null);
  const { user } = useUserContext();
  const selectedBoard = user?.userPageHistory?.boardId;
  const { setIsCreateBoardCardOpen } = useUIContext();

  // console.log(project)

  useEffect(() => {
    setProject(selectedProject);
  }, [selectedProject]);
  return (
    <div className="w-full h-full flex justify-center items-center overflow-hidden bg-gradient-to-br from-[#0a0a0b] to-[#121214]">
      {selectedBoard ? (
        <div className="flex flex-col w-full h-full max-w-[110rem] mx-auto text-gray-200">
          <div className="px-6 py-8 flex flex-col gap-8">
            <div className="flex items-center gap-4">
              <h2 className="px-6 py-3 bg-gradient-to-br from-[#1f1f23] to-[#18181b] border border-[#2e2e32] rounded-2xl text-2xl font-bold text-white shadow-lg">
                {project?.title || "No project"}
              </h2>
              <div className="flex-1 h-px bg-gradient-to-r from-[#2e2e32] to-transparent" />
            </div>

            <div className="flex justify-center">
              <div className="relative">
                <ul className="flex gap-10 items-center bg-[#1f1f23] border border-[#2e2e32] rounded-2xl px-4 py-1 shadow-xl">
                  <li>
                    <NavLink
                      to="work-flow"
                      className={({ isActive }) =>
                        `px-6 py-2 text-sm font-semibold rounded-xl transition-all duration-200 block ${
                          isActive
                            ? "text-white bg-gradient-to-r from-blue-600 to-blue-500 shadow-lg shadow-blue-500/25"
                            : "text-gray-400 hover:text-white hover:bg-[#2a2a2f]"
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
                        `px-3 py-2 text-sm font-semibold rounded-xl transition-all duration-200 block ${
                          isActive
                            ? "text-white bg-gradient-to-r from-blue-600 to-blue-500 shadow-lg shadow-blue-500/25"
                            : "text-gray-400 hover:text-white hover:bg-[#2a2a2f]"
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
                        `px-6 py-2 text-sm font-semibold rounded-xl transition-all duration-200 block ${
                          isActive
                            ? "text-white bg-gradient-to-r from-blue-600 to-blue-500 shadow-lg shadow-blue-500/25"
                            : "text-gray-400 hover:text-white hover:bg-[#2a2a2f]"
                        }`
                      }
                    >
                      Summary
                    </NavLink>
                  </li>

                  <li>
                    <button
                      onClick={() => setIsOpen((p) => !p)}
                      className={`px-6 py-2 text-sm font-semibold rounded-xl transition-all duration-200 flex items-center gap-2 ${
                        isOpen
                          ? "text-white bg-gradient-to-r from-blue-600 to-blue-500 shadow-lg shadow-blue-500/25"
                          : "text-gray-400 hover:text-white hover:bg-[#2a2a2f]"
                      }`}
                    >
                      All Boards
                      <img
                        src={isOpen ? angleDown : angleRight}
                        className="w-[14px] invert opacity-60 brightness-0"
                      />
                    </button>
                  </li>
                </ul>
                {isOpen && (
                  <div className="absolute top-full mt-10 left-1/2 -translate-x-1/2 w-[800px] z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="bg-[#1f1f23] border border-[#2e2e32] rounded-2xl">
                      <BoardCard />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="px-6">
            <div className="h-px bg-gradient-to-r from-transparent via-[#2e2e32] to-transparent" />
          </div>

          <div className="flex-1 overflow-auto p-6">
            <div className="max-w-[110rem] mx-auto">
              {/* <Outlet context={{ project }} /> 
               example we can send props by using outlet*/}
              <Outlet />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-6 text-center animate-in fade-in zoom-in duration-500">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br  border border-blue-500/30 flex items-center justify-center">
            <img src={notebook} className="invert w-14 opacity-70" />
          </div>
          <h2 className="text-4xl font-bold text-gray-300 tracking-tight">
            No Board Selected
          </h2>
          <p className="text-gray-500 text-lg max-w-md">
            Create a board to start managing your tasks and workflow
          </p>
          <button
            className="mt-4 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/25 transition-all duration-200 hover:scale-105"
            onClick={() => setIsCreateBoardCardOpen(true)}
          >
            Create Board
          </button>
        </div>
      )}
    </div>
  );
}

export default Main;
