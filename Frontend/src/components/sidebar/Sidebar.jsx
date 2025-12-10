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
import { useBoardContext } from "../../context/BoardContext";
import Loader from "../Loader";

function Sidebar() {
  const {
    openSideBar,
    setOpenSideBar,
    openProjectForm,
    openBoardForm,
    setMemberInfo,
  } = useUIContext();
  const { updateLastOpened } = usePageHistory();
  const { projectList, fetchAllProjects, loading } = useProjectContext();
  const { activeBoardId, board, members } = useBoardContext();
  const { selectedProject } = useProjectContext();

  const [projectOpen, setProjectOpen] = useState(true);
  const [membersOpen, setMembersOpen] = useState(true);
  const [menuOpen, setMenuOpen] = useState(null);

  useEffect(() => {
    const closeMenu = () => setMenuOpen(null);
    window.addEventListener("click", closeMenu);
    return () => window.removeEventListener("click", closeMenu);
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
        if (selectedProject?._id === projectId) {
          updateLastOpened(activeBoardId, null);
        }
      }
    } catch (err) {
      const msg = err?.response?.data?.message || "Failed to delete project";
      toast.error(msg);
    }
  };

  return (
    <aside
      className={`
        fixed left-0 top-0  h-[calc(100vh-3.5rem)]
        bg-[#0d1117] text-gray-200 border-r border-[#30363d]
        shadow-inner transition-all duration-300 z-50
        ${openSideBar ? "md:w-64 w-64" : "hidden w-16 md:block"}
      `}
    >
      <div className="relative h-full flex flex-col">
        {loading && (
          <div className="absolute inset-0 bg-black/50 backdrop-blur-[1px] flex justify-center items-start pt-20 z-50 rounded-lg">
            <Loader />
          </div>
        )}
        {!openSideBar ? (
          <div className="flex flex-col items-center gap-6 pt-6">
            <button onClick={openBoardForm} title="Create Board">
              <img
                src={create}
                alt="create"
                className="w-6 invert opacity-80 hover:opacity-100 transition"
              />
            </button>
            <div title={board?.name || "Board"}>
              <img
                src={boardIcon}
                alt="board"
                className="w-6 invert opacity-70"
              />
            </div>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto custom-scroll p-4">
            <div className="mb-5">
              <button
                onClick={() => {
                  openBoardForm();
                  if (window.innerWidth <= 768) {
                    setOpenSideBar(false);
                  }
                }}
                className="w-full flex items-center justify-center gap-2 bg-[#1f2937] hover:bg-[#374151] text-gray-200 py-2 rounded-md text-sm font-medium border border-[#2e2e32] transition"
              >
                <img src={create} alt="create" className="w-4 invert" />
                Create Board
              </button>
            </div>
            {board && (
              <div className="flex justify-between items-center px-2 py-2 rounded-md hover:bg-[#161b22] transition group">
                <div className="flex items-center gap-2 overflow-hidden">
                  <img
                    src={boardIcon}
                    alt="board-icon"
                    className="w-5 invert opacity-80"
                  />
                  <h2 className="text-sm font-medium truncate">{board.name}</h2>
                </div>

                <div className="flex gap-2 items-center opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => {
                      openProjectForm();
                      if (window.innerWidth <= 768) {
                        setOpenSideBar(false);
                      }
                    }}
                    className="p-1 hover:bg-[#282e38] rounded"
                    title="Add Project"
                  >
                    <img
                      src={create}
                      alt="add"
                      className="w-4 invert opacity-70"
                    />
                  </button>
                  <button
                    onClick={() => setProjectOpen((p) => !p)}
                    className="p-1 hover:bg-[#282e38] rounded"
                  >
                    <img
                      src={projectOpen ? angleDown : angleRight}
                      className="w-4 invert opacity-60"
                      alt="toggle"
                    />
                  </button>
                </div>
              </div>
            )}
            {projectOpen && (
              <div className="mt-4 pl-1">
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-2 font-semibold">
                  Projects
                </p>

                {projectList.length > 0 ? (
                  <ul className="space-y-1 text-sm">
                    {projectList.map((item) => {
                      const isActive = selectedProject?._id === item._id;
                      const isMenuOpen = menuOpen === item._id;

                      return (
                        <li key={item._id} className="relative">
                          <div
                            onClick={() => updateProjectId(item._id)}
                            className={`py-1.5 px-3 rounded-md cursor-pointer flex justify-between items-center transition group
                              ${
                                isActive
                                  ? "bg-blue-500/20 text-blue-400"
                                  : "hover:bg-[#161b22] text-gray-300"
                              }
                            `}
                          >
                            <span className="truncate pr-4">{item.name}</span>
                            {(isActive || isMenuOpen) && (
                              <button
                                className="p-1 hover:bg-white/10 rounded"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setMenuOpen(isMenuOpen ? null : item._id);
                                }}
                              >
                                <img
                                  src={dots}
                                  alt="options"
                                  className="w-4 invert opacity-70 hover:opacity-100"
                                />
                              </button>
                            )}
                          </div>
                          {isMenuOpen && (
                            <div
                              className="absolute right-0 top-8 bg-[#1c2128] border border-[#30363d] rounded-lg w-32 py-1 shadow-xl z-50 overflow-hidden"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <button
                                className="flex items-center gap-2 px-3 py-2 hover:bg-[#30363d] w-full text-xs text-gray-300 text-left"
                                onClick={() => {
                                  setMenuOpen(null);
                                  openProjectForm("read", item);
                                  if (window.innerWidth <= 768) {
                                    setOpenSideBar(false);
                                  }
                                }}
                              >
                                <img
                                  src={eye}
                                  alt="view"
                                  className="w-3 invert opacity-70"
                                />{" "}
                                View
                              </button>

                              <button
                                className="flex items-center gap-2 px-3 py-2 hover:bg-[#30363d] w-full text-xs text-gray-300 text-left"
                                onClick={() => {
                                  setMenuOpen(null);
                                  openProjectForm("edit", item);
                                  if (window.innerWidth <= 768) {
                                    setOpenSideBar(false);
                                  }
                                }}
                              >
                                <img
                                  src={edit}
                                  alt="edit"
                                  className="w-3 invert opacity-70"
                                />{" "}
                                Edit
                              </button>

                              <div className="h-px bg-[#30363d] my-1 mx-2" />

                              <button
                                className="flex items-center gap-2 px-3 py-2 hover:bg-red-500/20 w-full text-xs text-red-400 text-left"
                                onClick={() => {
                                  setMenuOpen(null);
                                  handleDelete(item._id);
                                  if (window.innerWidth <= 768) {
                                    setOpenSideBar(false);
                                  }
                                }}
                              >
                                <img
                                  src={trash}
                                  alt="del"
                                  className="w-3 invert opacity-70"
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
                  <p className="text-sm text-gray-500 italic px-2">
                    No projects yet
                  </p>
                )}
              </div>
            )}
            {/* {member-section} */}
            <div className="mt-6 pl-1">
              <div
                className="flex justify-between items-center pr-2 cursor-pointer hover:bg-[#161b22] p-1 rounded transition"
                onClick={() => setMembersOpen((prev) => !prev)}
              >
                <div className="flex items-center gap-2">
                  <img
                    src={userIcon}
                    alt="members"
                    className="w-4 invert opacity-60"
                  />
                  <h2 className="text-xs text-gray-500 uppercase tracking-wide font-semibold">
                    Members
                  </h2>
                </div>
                <img
                  src={membersOpen ? angleDown : angleRight}
                  alt="toggle"
                  className="w-3 invert opacity-60"
                />
              </div>

              {membersOpen && (
                <div className="mt-2">
                  {members.length > 0 ? (
                    <ul className="space-y-1">
                      {members.map((member) => (
                        <li
                          key={member._id}
                          className="py-1.5 px-2 rounded-md flex items-center gap-2 hover:bg-[#161b22] transition cursor-pointer"
                          onClick={() => setMemberInfo(member)}
                        >
                          <img
                            src={member?.userId?.avatar?.url || userIcon}
                            alt="avatar"
                            className="w-6 h-6 rounded-full border border-[#30363d] object-cover bg-[#0d1117]"
                          />
                          <span className="text-sm text-gray-300 capitalize truncate">
                            {member?.userId?.name}
                          </span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-gray-500 italic px-2">
                      No members
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}

export default Sidebar;
