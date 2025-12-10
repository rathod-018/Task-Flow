import React, {
  useContext,
  createContext,
  useState,
  useEffect,
  useMemo,
} from "react";
import { useUserContext } from "./UserContext";
import { usePageHistory } from "../hooks/usePageHisrory";
import api from "../api/axios";
import { useBoardContext } from "./BoardContext";

const ProjectContext = createContext();

export function ProjectContextProvider({ children }) {
  const { user } = useUserContext();
  const [projectList, setProjectList] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [loading, setLoading] = useState(false);
  const { updateLastOpened } = usePageHistory();
  const { activeBoardId } = useBoardContext();

  const projectId = user?.userPageHistory?.projectId;

  async function fetchAllProjects() {
    if (!activeBoardId) return;

    try {
      setLoading(true);
      const { data } = await api.get(`/project/all/${activeBoardId}`);
      const projects = data.data || [];

      setProjectList(projects);

      if (projects.length > 0 && !projectId) {
        const first = projects[0];
        setSelectedProject(first);
        updateLastOpened(activeBoardId, first._id);
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
  }, [activeBoardId, projectId]);

  useEffect(() => {
    fetchSelectedProject();
  }, [projectId, activeBoardId]);

  const value = useMemo(
    () => ({
      selectedProject,
      projectList,
      fetchAllProjects,
      setSelectedProject,
      loading,
    }),
    [selectedProject, projectList, loading]
  );

  return (
    <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>
  );
}

export const useProjectContext = () => useContext(ProjectContext);
