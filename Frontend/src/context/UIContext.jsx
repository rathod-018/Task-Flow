import React, { createContext, useContext, useState } from "react";

const UIContext = createContext();
export function UIContextProvider({ children }) {
  const [taskForm, setTaskForm] = useState({
    open: false,
    mode: "create",
    data: null,
  });
  const [projectForm, setProjectForm] = useState({
    open: false,
    mode: "create",
    data: null,
  });
  const [boardForm, setBoardForm] = useState({
    open: false,
    mode: "create",
    data: null,
  });
  const [addMemberOpen, setAddMemberOpen] = useState(false);

  const openForm = (setter, mode = "create", data = null) =>
    setter({ open: true, mode, data });
  const closeForm = (setter) =>
    setter({ open: false, mode: "create", date: null });

  // task form
  const openTaskForm = (mode, data) => openForm(setTaskForm, mode, data);
  const closeTaskForm = () => closeForm(setTaskForm);

  // project form
  const openProjectForm = (mode, data) => openForm(setProjectForm, mode, data);
  const closeProjectForm = () => closeForm(setProjectForm);

  // board form
  const openBoardForm = (mode, data) => openForm(setBoardForm, mode, data);
  const closeBoardForm = () => closeForm(setBoardForm);

  return (
    <UIContext.Provider
      value={{
        taskForm,
        openTaskForm,
        closeTaskForm,
        boardForm,
        openBoardForm,
        closeBoardForm,
        projectForm,
        openProjectForm,
        closeProjectForm,
        addMemberOpen,
        setAddMemberOpen,
      }}
    >
      {children}
    </UIContext.Provider>
  );
}

export const useUIContext = () => {
  return useContext(UIContext);
};
