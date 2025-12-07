import React, { useContext, createContext, useState, useEffect } from "react";
import { useUserContext } from "./UserContext";
import { usePageHistory } from "../hooks/usePageHisrory";
import api from "../api/axios";

const ProjectContext = createContext();

export function ProjectContextProvider({ children }) {
  const { user } = useUserContext();
  const [projectList, setProjectList] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const { updateLastOpened } = usePageHistory();
  const boardId = user?.userPageHistory?.boardId;
  const projectId = user?.userPageHistory?.projectId;

  async function fetchAllProjects() {
    if (!boardId) return;

    try {
      setLoading(true);
      const { data } = await api.get(`/project/all/${boardId}`);

      const projects = data.data || [];
      setProjectList(projects);

      if (projects.length > 0 && !projectId) {
        setSelectedProject(projects[0]);
        updateLastOpened(boardId, projects[0]._id);
        fetchSelectedProject();
      }
      if (projects.length === 0) {
        setSelectedProject(null);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function fetchSelectedProject() {
    if (!projectId) return;

    try {
      setLoading(true);
      const { data } = await api.get(`/project/${projectId}`);

      if (data.statusCode === 200) {
        setSelectedProject(data.data);
      }
    } catch (err) {
      console.error(err);
      setSelectedProject(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchAllProjects();
  }, [boardId, user]);

  useEffect(() => {
    fetchSelectedProject();
  }, [projectId, user]);

  return (
    <ProjectContext.Provider
      value={{
        selectedProject,
        projectList,
        loading,
        fetchAllProjects,
        setSelectedProject,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
}

export const useProjectContext = () => useContext(ProjectContext);
