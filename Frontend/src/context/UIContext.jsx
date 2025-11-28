import React, { createContext, useContext, useState } from "react";

const UIContext = createContext();
export function UIContextProvider({ children }) {
  const [isCreateTaskCardOpen, setIsCreateTaskCardOpen] = useState(false);
  const [isCreateBoardCardOpen, setIsCreateBoardCardOpen] = useState(false);
  const [isCreateProjectCardOpen, setIsCreateProjectCardOpen] = useState(false);
  const [isAddMemberCardOpen, setIsAddMemberCardOpen] = useState(false);

  return (
    <UIContext.Provider
      value={{
        isCreateTaskCardOpen,
        setIsCreateTaskCardOpen,
        isCreateBoardCardOpen,
        setIsCreateBoardCardOpen,
        isCreateProjectCardOpen,
        setIsCreateProjectCardOpen,
        isAddMemberCardOpen,
        setIsAddMemberCardOpen,
      }}
    >
      {children}
    </UIContext.Provider>
  );
}

export const useUIContext = () => {
  return useContext(UIContext);
};
