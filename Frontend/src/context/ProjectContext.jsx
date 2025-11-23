import React, { useContext, createContext, useState, useEffect } from "react";
import { useUserContext } from "./UserContext";
import api from "../api/axios";
import { toast } from "react-toastify";

const ProjectContext = createContext();

export function ProjectContextProvider({ children }) {
  const { user } = useUserContext();
  const [projectList, setProjectList] = useState([]);
  const [projectData, setProjectData] = useState(null);
  const [loading, setLoading] = useState(false);

  // console.log(user);
  const boardId = user?.userPageHistory?.boardId;
  const projectId = user?.userPageHistory?.projectId;
  const fetchAllProjects = async () => {
    if (!boardId) {
      return;
    }
    try {
      setLoading(true);
      const { data } = await api.get(`/project/all/${boardId}`);
      setProjectList(data.data);
      if (data.data.length > 0 && !projectData) {
        setProjectData(data.data[0]);
      } else {
        setProjectData(null);
      }
    } catch (error) {
      const msg = error.response?.data?.message || "something went wrong";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const fetchSelectedProject = async () => {
    if (!projectId) {
      return;
    }
    try {
      const { data } = await api.get(`/project/${projectId}`);
      // console.log(data)
      if (data.statusCode === 200) {
        setProjectData(data.data);
      } else {
        setProjectData(null);
      }
    } catch (error) {
      const msg = error.response?.data?.message || "something went wrong";
      toast.error(msg);
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

  if (loading) return <div>Loading...</div>;

  return (
    <ProjectContext.Provider value={{ projectData, projectList }}>
      {children}
    </ProjectContext.Provider>
  );
}

export const useProjectContext = () => {
  return useContext(ProjectContext);
};
