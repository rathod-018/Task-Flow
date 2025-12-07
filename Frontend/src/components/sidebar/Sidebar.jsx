import React, { useEffect, useState } from "react";
import { useUserContext } from "../../context/UserContext";
import api from "../../api/axios";
import { toast } from "react-toastify";
import create from "../../assets/create.svg";
import boardIcon from "../../assets/board.svg";
import angleDown from "../../assets/angle-down.svg";
import angleRight from "../../assets/angle-right.svg";
import eye from "../../assets/eye.svg";
import dots from "../../assets/dots.svg";
import trash from "../../assets/trash.svg";
import edit from "../../assets/edit.svg";
import { useProjectContext } from "../../context/ProjectContext";
import { usePageHistory } from "../../hooks/usePageHisrory";
import { useUIContext } from "../../context/UIContext";

function Sidebar() {
  const { openSideBar, openProjectForm, openBoardForm } = useUIContext();
  const { user } = useUserContext();

  const [board, setBoard] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [projectOpen, setProjectOpen] = useState(true);

  const [menuOpen, setMenuOpen] = useState(null);

  const { updateLastOpened } = usePageHistory();
  const { projectList, fetchAllProjects } = useProjectContext();

  const boardId = user?.userPageHistory?.boardId;

  // Fetch board
  useEffect(() => {
    const fetchBoard = async () => {
      try {
        const { data } = await api.get(`board/${boardId}`);
        setBoard(data.data);
      } catch (error) {
        console.log(error.response?.data?.message || "something went wrong");
      } finally {
        setLoading(false);
      }
    };

    if (boardId) fetchBoard();
  }, [boardId]);

  useEffect(() => {
    setProjects(projectList);
  }, [projectList]);

  useEffect(() => {
    const close = () => setMenuOpen(null);
    window.addEventListener("click", close);
    return () => window.removeEventListener("click", close);
  }, []);

  const updateProjectId = (projectId) => {
    updateLastOpened(boardId, projectId);
  };

  const handleDelete = async (projectId) => {
    try {
      const { data } = await api.delete(`/project/delete/${projectId}`);
      if (data.statusCode) {
        toast.success("Project deleted");
        fetchAllProjects();
        updateLastOpened(boardId, null);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <aside
      className={`
        fixed left-0 top-0 mt-14 h-[calc(100vh-3.5rem)]
        bg-[#0d1117] text-gray-200 border-r border-[#30363d]
        shadow-inner transition-all duration-300
        overflow-visible
        ${openSideBar ? "md:w-56 w-80" : "hidden w-14 md:block"}
      `}
    >
      {!openSideBar ? (
        <div className="flex flex-col items-center gap-6 pt-6">
          <img
            src={create}
            className="w-6 invert opacity-80 hover:opacity-100"
          />
          <img
            src={boardIcon}
            className="w-6 invert opacity-70 hover:opacity-100"
          />
        </div>
      ) : (
        <div className="p-4 relative overflow-visible">
          {loading && (
            <div className="text-gray-400 text-sm animate-pulse">
              Loading...
            </div>
          )}
          <div className="mb-5">
            <button
              onClick={openBoardForm}
              className="w-full flex items-center justify-center gap-2 bg-[#1f2937] 
              hover:bg-[#374151] text-gray-200 py-2 rounded-md text-sm font-medium 
              border border-[#2e2e32] transition"
            >
              <img src={create} className="w-4 invert" />
              Create Board
            </button>
          </div>
          {board && (
            <div className="flex justify-between items-center px-2 py-2 rounded-md hover:bg-[#161b22] transition">
              <div className="flex items-center gap-2">
                <img src={boardIcon} className="w-5 invert opacity-80" />
                <h2 className="text-sm font-medium">{board.name}</h2>
              </div>

              <div className="flex gap-3 items-center">
                <button
                  onClick={() => openProjectForm()}
                  className="p-1 hover:bg-[#16171a] rounded"
                >
                  <img src={create} className="w-4 invert opacity-70" />
                </button>

                <button
                  onClick={() => setProjectOpen((prev) => !prev)}
                  className="p-1 hover:bg-[#16171a] rounded"
                >
                  <img
                    src={projectOpen ? angleDown : angleRight}
                    className="w-4 invert opacity-60"
                  />
                </button>
              </div>
            </div>
          )}
          {projectOpen && (
            <div className="mt-4 pl-1 overflow-visible">
              <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">
                Projects
              </p>

              {projects.length > 0 ? (
                <ul className="space-y-1 text-sm overflow-visible">
                  {projects.map((item) => {
                    const isActive =
                      user?.userPageHistory?.projectId === item._id;
                    const isMenuOpen = menuOpen === item._id;

                    return (
                      <li key={item._id} className="relative overflow-visible">
                        <div
                          onClick={() => updateProjectId(item._id)}
                          className={`py-1.5 px-3 rounded-md cursor-pointer flex justify-between items-center transition
                          ${
                            isActive
                              ? "bg-blue-500/20 text-blue-400"
                              : "hover:bg-[#161b22] text-gray-300"
                          }
                        `}
                        >
                          {item.name}

                          {isActive && (
                            <img
                              src={dots}
                              className="w-4 invert"
                              onClick={(e) => {
                                e.stopPropagation();
                                setMenuOpen(isMenuOpen ? null : item._id);
                              }}
                            />
                          )}
                        </div>
                        {isMenuOpen && (
                          <div
                            className="
                              absolute right-[-8.2rem] top-2
                              bg-[#161b22] border border-white/10 rounded-md 
                              w-32 py-2 shadow-xl z-50
                            "
                            onClick={(e) => e.stopPropagation()}
                          >
                            <button
                              className="flex items-center gap-2 px-3 py-1.5 w-full hover:bg-white/10 text-gray-300 text-sm"
                              onClick={() => {
                                const data = item;
                                openProjectForm("read", data);
                              }}
                            >
                              <img src={eye} className="w-4 invert" /> View
                            </button>

                            <button
                              className="flex items-center gap-2 px-3 py-1.5 w-full hover:bg-white/10 text-gray-300 text-sm"
                              onClick={() => {
                                const data = item;
                                openProjectForm("edit", data);
                              }}
                            >
                              <img src={edit} className="w-4 invert" /> Edit
                            </button>

                            <button
                              className="flex items-center gap-2 px-3 py-1.5 w-full hover:bg-red-600/20 text-red-400 text-sm"
                              onClick={() => {
                                const projectId = item._id;
                                handleDelete(projectId);
                              }}
                            >
                              <img src={trash} className="w-4 invert" /> Delete
                            </button>
                          </div>
                        )}
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <p className="text-sm text-gray-500">No projects!</p>
              )}
            </div>
          )}
        </div>
      )}
    </aside>
  );
}

export default Sidebar;
