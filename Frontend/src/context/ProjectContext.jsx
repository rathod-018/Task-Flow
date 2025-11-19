import React, { useContext, createContext } from "react";

const ProjectContext = createContext();

export function ProjectContextProvider({ children }) {
  return (
    <ProjectContext.Provider value={{}}>{children}</ProjectContext.Provider>
  );
}

export const useProjectContext = () => {
  return useContext(ProjectContext);
};
