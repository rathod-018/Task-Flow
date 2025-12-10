import React, { useEffect, useState } from "react";
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
import userIcon from "../../assets/user.svg";

import { useProjectContext } from "../../context/ProjectContext";
import { usePageHistory } from "../../hooks/usePageHisrory";
import { useUIContext } from "../../context/UIContext";
import Loader from "../Loader";
import { useBoardContext } from "../../context/BoardContext";

function Sidebar() {
  const { openSideBar, openProjectForm, openBoardForm } = useUIContext();
  const [board, setBoard] = useState(null);
  const [projects, setProjects] = useState([]);
  const [members, setMembers] = useState([]);
  const [projectOpen, setProjectOpen] = useState(true);
  const [membersOpen, setMembersOpen] = useState(true);
  const [menuOpen, setMenuOpen] = useState(null);
  const { updateLastOpened } = usePageHistory();
  const { projectList, fetchAllProjects, loading } = useProjectContext();
  const { activeBoardId } = useBoardContext();
  const { selectedProject } = useProjectContext();

  // Fetch board info
  useEffect(() => {
    const fetchBoard = async () => {
      if (!activeBoardId) return setBoard(null);
      try {
        const { data } = await api.get(`board/${activeBoardId}`);
        setBoard(data.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchBoard();
  }, [activeBoardId]);

  // get joined members
  useEffect(() => {
    if (!activeBoardId) return setMembers([]);
    const fetchMembers = async () => {
      try {
        if (activeBoardId) {
          const { data } = await api.get(
            `board-member/all?boardId=${activeBoardId}&status=accepted`
          );
          setMembers(data.data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchMembers();
  }, [activeBoardId]);

  // sync project list
  useEffect(() => {
    setProjects(projectList);
  }, [projectList]);

  // close on outside click
  useEffect(() => {
    const close = () => setMenuOpen(null);
    window.addEventListener("click", close);
    return () => window.removeEventListener("click", close);
  }, []);

  const updateProjectId = (projectId) => {
    updateLastOpened(activeBoardId, projectId);
  };

  const handleDelete = async (projectId) => {
    try {
      const { data } = await api.delete(`/project/delete/${projectId}`);
      if (data.statusCode) {
        toast.success("Project deleted");
        fetchAllProjects();
        updateLastOpened(activeBoardId, null);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <aside
      className={`
        fixed left-0 top-0 mt-14 h-[calc(100vh-3.5rem)]
        bg-[#0d1117] text-gray-200 border-r border-[#30363d]
        shadow-inner transition-all duration-300
        overflow-visible
        ${openSideBar ? "md:w-56 w-72" : "hidden w-14 md:block"}
      `}
    >
      <div className="relative h-full">
        {loading && (
          <div
            className="absolute inset-0 bg-black/30 backdrop-blur-[2px]
              flex justify-center items-start pt-20 z-50"
          >
            <Loader />
          </div>
        )}
        {!openSideBar ? (
          <div className="flex flex-col items-center gap-6 pt-6">
            <img src={create} alt="create" className="w-6 invert opacity-80" />
            <img
              src={boardIcon}
              alt="board-icon"
              className="w-6 invert opacity-70"
            />
          </div>
        ) : (
          <div className="p-4 overflow-visible">
            <div className="mb-5">
              <button
                onClick={() => openBoardForm()}
                className="w-full flex items-center justify-center gap-2 bg-[#1f2937]
                hover:bg-[#374151] text-gray-200 py-2 rounded-md text-sm font-medium 
                border border-[#2e2e32] transition"
              >
                <img src={create} alt="create" className="w-4 invert" />
                Create Board
              </button>
            </div>
            {board && (
              <div className="flex justify-between items-center px-2 py-2 rounded-md hover:bg-[#161b22] transition">
                <div className="flex items-center gap-2">
                  <img
                    src={boardIcon}
                    alt="board-icon"
                    className="w-5 invert opacity-80"
                  />
                  <h2 className="text-sm font-medium">{board?.name}</h2>
                </div>

                <div className="flex gap-3 items-center">
                  <button
                    onClick={() => openProjectForm()}
                    className="p-1 hover:bg-[#16171a] rounded"
                  >
                    <img
                      src={create}
                      alt="create"
                      className="w-4 invert opacity-70"
                    />
                  </button>

                  <button
                    onClick={() => setProjectOpen((p) => !p)}
                    className="p-1 hover:bg-[#16171a] rounded"
                  >
                    <img
                      src={projectOpen ? angleDown : angleRight}
                      className="w-4 invert opacity-60"
                      alt="angle-icon"
                    />
                  </button>
                </div>
              </div>
            )}
            {projectOpen && (
              <div className="mt-4 pl-1">
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">
                  Projects
                </p>

                {projects.length > 0 ? (
                  <ul className="space-y-1 text-sm">
                    {projects.map((item) => {
                      const isActive = selectedProject?._id === item._id;
                      const isMenuOpen = menuOpen === item._id;

                      return (
                        <li key={item._id} className="relative">
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
                                alt="dots"
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
                                absolute right-[-8rem] top-2
                                bg-[#161b22] border border-white/10 rounded-md 
                                w-32 py-2 shadow-xl z-50
                              "
                              onClick={(e) => e.stopPropagation()}
                            >
                              <button
                                className="flex items-center gap-2 px-3 py-1.5 hover:bg-white/10 w-full text-sm"
                                onClick={() => openProjectForm("read", item)}
                              >
                                <img
                                  src={eye}
                                  alt="eye"
                                  className="w-4 invert"
                                />{" "}
                                View
                              </button>

                              <button
                                className="flex items-center gap-2 px-3 py-1.5 hover:bg-white/10 w-full text-sm"
                                onClick={() => openProjectForm("edit", item)}
                              >
                                <img
                                  src={edit}
                                  alt="edit"
                                  className="w-4 invert"
                                />{" "}
                                Edit
                              </button>

                              <button
                                className="flex items-center gap-2 px-3 py-1.5 hover:bg-red-600/20 w-full text-sm text-red-400"
                                onClick={() => handleDelete(item._id)}
                              >
                                <img
                                  src={trash}
                                  alt="trash"
                                  className="w-4 invert"
                                />{" "}
                                Delete
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
            {/* member section */}
            <div className="mt-6 pl-1">
              <div className="flex justify-between items-center pr-2">
                <div className="flex items-center gap-2">
                  <img
                    src={userIcon}
                    alt="user-icon"
                    className="w-5 invert opacity-80"
                  />
                  <h2 className="text-sm font-medium">Members</h2>
                </div>

                <img
                  src={membersOpen ? angleDown : angleRight}
                  alt="angle-icon"
                  className="w-4 invert opacity-60 cursor-pointer"
                  onClick={() => setMembersOpen((prev) => !prev)}
                />
              </div>
              {members.length > 0 ? (
                membersOpen && (
                  <ul className="space-y-1 text-sm mt-2">
                    {members.map((member) => (
                      <li
                        key={member._id}
                        className="py-1.5 px-3 rounded-md flex items-center gap-2 hover:bg-[#161b22] transition cursor-pointer"
                      >
                        <img
                          src={member?.userId?.avatar?.url}
                          alt="avatar"
                          className="w-7 h-7 rounded-full border border-[#30363d] cursor-pointer object-cover"
                        />

                        <span className="text-sm">{member?.userId.name}</span>
                      </li>
                    ))}
                  </ul>
                )
              ) : (
                <p className="text-sm text-gray-500">No Members!</p>
              )}
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}

export default Sidebar;
