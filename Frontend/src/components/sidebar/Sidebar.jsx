import React, { useEffect, useState } from "react";
import { useUserContext } from "../../context/UserContext";
import CreateProject from "../projects/CreateProject";
import api from "../../api/axios";
import create from "../../assets/create.svg";
import boardIcon from "../../assets/board.svg";
import angleDown from "../../assets/angle-down.svg";
import angleRight from "../../assets/angle-right.svg";
import { useProjectContext } from "../../context/ProjectContext";
import { usePageHistory } from "../../hooks/usePageHisrory";

function Sidebar({ openProject }) {
  const { user } = useUserContext();
  const [board, setBoard] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [projectOpen, setProjectOpen] = useState(true);
  const [isCreatePageOpen, setCreatePageOpen] = useState(false);
  const { updateLastOpened } = usePageHistory();

  const { projectList } = useProjectContext();
  const boardId = user?.userPageHistory?.boardId;

  useEffect(() => {
    const fetchCurrentBoard = async () => {
      try {
        const { data } = await api.get(`board/${boardId}`);
        setBoard(data.data);
      } catch (error) {
        console.log(error.response?.data?.message || "something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentBoard();
  }, [user]);

  useEffect(() => {
    setProjects(projectList);
  }, [projectList]);

  const updateProjectId = (projectId) => {
    updateLastOpened(boardId, projectId);
  };

  return (
    <div className="w-full h-full">
      <aside className="w-56 h-full fixed left-0 top-0 mt-14 bg-[#0d1117] text-gray-200 p-4 border-r border-[#30363d]">
        {loading && (
          <div className="text-gray-400 text-sm animate-pulse">Loading...</div>
        )}

        {board && (
          <div className="flex justify-between items-center px-2 py-2 rounded-md hover:bg-[#161b22] transition">
            <div className="flex gap-2 items-center">
              <img
                src={boardIcon}
                alt="board"
                className="w-5 invert brightness-0 opacity-80"
              />
              <h2 className="text-sm font-medium">{board.title}</h2>
            </div>

            <div className="flex gap-3 items-center">
              <button
                onClick={() => {
                  setCreatePageOpen(true);
                  if (typeof openProject === "function") openProject();
                }}
                aria-label="create project"
                className="p-1 rounded hover:bg-[#16171a]"
              >
                <img
                  src={create}
                  alt="create"
                  className="w-4 invert brightness-0 opacity-70"
                />
              </button>

              <button
                onClick={() => setProjectOpen((p) => !p)}
                className="p-1 rounded hover:bg-[#16171a]"
              >
                <img
                  src={projectOpen ? angleDown : angleRight}
                  alt="toggle"
                  className="w-4 invert brightness-0 opacity-60"
                />
              </button>
            </div>
          </div>
        )}
        {projectOpen && (
          <div className="mt-4 pl-3">
            <p className="text-xs text-gray-500 mb-2 uppercase tracking-wide">
              Projects
            </p>
            {projects?.length > 0 ? (
              <ul className="space-y-1 text-sm">
                {projects.map((item) => (
                  <li
                    key={item._id}
                    onClick={() => {
                      updateProjectId(item._id);
                    }}
                    className="py-1 px-2 rounded-md hover:bg-[#161b22] cursor-pointer"
                  >
                    {item.title}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No projects !</p>
            )}
          </div>
        )}
      </aside>
      {isCreatePageOpen && (
        <CreateProject close={() => setCreatePageOpen(false)} />
      )}
    </div>
  );
}

export default Sidebar;
