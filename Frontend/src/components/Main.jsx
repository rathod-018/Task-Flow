import React, { useEffect, useState } from "react";
import { Outlet, NavLink } from "react-router-dom";
import BoardCard from "./board/BoardCard";
import { useProjectContext } from "../context/ProjectContext";
import angleDown from "../assets/angle-down.svg";
import angleRight from "../assets/angle-right.svg";
import notebook from "../assets/notebook.svg";
import { useUIContext } from "../context/UIContext";
import { useBoardContext } from "../context/BoardContext";

function Main() {
  const { activeBoardId } = useBoardContext();
  const { selectedProject } = useProjectContext();
  const [isOpen, setIsOpen] = useState(false);
  const [project, setProject] = useState(null);
  const { openBoardForm } = useUIContext();

  useEffect(() => {
    setProject(selectedProject);
  }, [selectedProject]);
  return (
    <div className="w-full h-full flex justify-center items-center overflow-hidden bg-gradient-to-br from-[#0a0a0b] to-[#121214]">
      {activeBoardId ? (
        <div className="flex flex-col w-full h-full max-w-[110rem] mx-auto text-gray-200">
          <div className="px-10 py-4 flex flex-col md:gap-6 ">
            <div className="flex flex-col md:flex-row  items-center gap-4">
              <h2 className="px-10 py-1 first-letter:uppercase tracking-wider text-2xl first-letter:font-bold bg-[#1a1919b1] border border-[#49494e] rounded-2xl font-bold text-white shadow-md shadow-[#5c575761]">
                {project?.name || "No project"}
              </h2>
              <div className="flex-1 h-px bg-gradient-to-r from-[#3e3e41] to-transparent m-4" />
            </div>
            <div className="flex justify-center">
              <div className="relative">
                <ul className="flex gap-3.5 md:gap-10 items-center bg-[#1f1f23] border border-[#2e2e32] rounded-2xl px-4 py-1 shadow-xl">
                  <li>
                    <NavLink
                      to="work-flow"
                      className={({ isActive }) =>
                        ` text-md font-bold transition-all duration-200 block ${
                          isActive
                            ? "text-blue-500"
                            : "text-gray-400 hover:text-white "
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
                        ` text-md font-bold transition-all duration-200 block ${
                          isActive
                            ? "text-blue-500"
                            : "text-gray-400 hover:text-white "
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
                        `font-bold transition-all duration-200 block ${
                          isActive
                            ? "text-blue-500"
                            : "text-gray-400 hover:text-white "
                        }`
                      }
                    >
                      Summary
                    </NavLink>
                  </li>

                  <li>
                    <button
                      onClick={() => setIsOpen((p) => !p)}
                      className={`font-semibold rounded-xl transition-all duration-200 flex items-center gap-1 ${
                        isOpen
                          ? "text-blue-500"
                          : "text-gray-400 hover:text-white "
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
                  <div className="absolute top-full mt-10 left-1/2 -translate-x-1/2 w-[20rem] md:w-[35rem] z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="border border-[#2e2e32] rounded-2xl">
                      <BoardCard />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="px-6">
            <div className="h-px bg-gradient-to-r from-transparent via-[#3e3e41] to-transparent" />
          </div>

          <div className="flex-1 overflow-auto p-6 custom-scroll">
            <div className="w-full  mx-auto ">
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
            onClick={() => openBoardForm()}
          >
            Create Board
          </button>
        </div>
      )}
    </div>
  );
}

export default Main;
