import React, { useContext, createContext, useState, useEffect } from "react";
import { useUserContext } from "./UserContext";
import api from "../api/axios";
import { toast } from "react-toastify";

const ProjectContext = createContext();

export function ProjectContextProvider({ children }) {
  const { user } = useUserContext();
  const [projectList, setProjectList] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [loading, setLoading] = useState(true);

  const boardId = user?.userPageHistory?.boardId;
  const projectId = user?.userPageHistory?.projectId;

  const fetchAllProjects = async () => {
    if (!boardId) return;

    try {
      setLoading(true);
      const { data } = await api.get(`/project/all/${boardId}`);

      const projects = data.data || [];
      setProjectList(projects);

      if (projects.length > 0 && !projectId) {
        setSelectedProject(projects[0]);
      }
      if (projects.length === 0) {
        setSelectedProject(null);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const fetchSelectedProject = async () => {
    if (!projectId) return;

    try {
      setLoading(true);
      const { data } = await api.get(`/project/${projectId}`);

      if (data.statusCode === 200) {
        setSelectedProject(data.data);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
      setSelectedProject(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllProjects();
  }, [boardId]);

  useEffect(() => {
    fetchSelectedProject();
  }, [projectId]);

  // if (loading)
  //   return (
  //     <div className="w-screen h-screen flex justify-center items-center">
  //       Loading...
  //     </div>
  //   );

  return (
    <ProjectContext.Provider value={{ selectedProject, projectList, loading }}>
      {children}
    </ProjectContext.Provider>
  );
}

export const useProjectContext = () => useContext(ProjectContext);
