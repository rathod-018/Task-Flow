import React, { useContext, createContext, useState } from "react";
import { useUserContext } from "./UserContext";

const ProjectContext = createContext();

export function ProjectContextProvider({ children }) {
  const { user } = useUserContext();
  const [projectData, setProjectData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProject = async () => {
    try {
      // api call
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProjectContext.Provider value={{}}>{children}</ProjectContext.Provider>
  );
}

export const useProjectContext = () => {
  return useContext(ProjectContext);
};
