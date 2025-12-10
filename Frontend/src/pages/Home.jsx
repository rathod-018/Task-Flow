import React from "react";
import Navbar from "../components/navbar/Navbar";
import Sidebar from "../components/sidebar/Sidebar";
import Main from "../components/Main";
import TaskForm from "../components/task/TaskForm";
import BoardForm from "../components/board/BoardForm";
import ProjectForm from "../components/projects/ProjectForm";
import AddMember from "../components/membership/AddMember";
import { useUIContext } from "../context/UIContext";

const Home = () => {
  const {
    taskForm,
    boardForm,
    projectForm,
    addMemberOpen,
    setAddMemberOpen,
    openSideBar,
  } = useUIContext();

  return (
    <div className="h-screen w-screen relative overflow-hidden bg-gray-900">
      <div className="fixed top-0 left-0 w-full h-14 z-30">
        <Navbar />
      </div>

      <div className="pt-14 flex h-full">
        <div
          className={`fixed top-14 left-0 h-[calc(100vh-3.5rem)] transition-all duration-300 z-30 border-r border-[#20232a] bg-[#0f1720]
            ${
              openSideBar
                ? "w-64 translate-x-0"
                : "w-0 -translate-x-full md:w-16 md:translate-x-0"
            }`}
        >
          <Sidebar />
        </div>
        <div
          className={`h-[calc(100vh-3.5rem)] overflow-auto transition-all duration-300 w-full
            ${
              openSideBar
                ? "md:ml-64 md:w-[calc(100%-16rem)]"
                : "md:ml-16 md:w-[calc(100%-4rem)]"
            }`}
        >
          <Main />
        </div>
      </div>
      {taskForm.open && (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/70 backdrop-blur-sm">
          <TaskForm />
        </div>
      )}

      {boardForm.open && (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/70 backdrop-blur-sm">
          <BoardForm />
        </div>
      )}

      {projectForm.open && (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/70 backdrop-blur-sm">
          <ProjectForm />
        </div>
      )}

      {addMemberOpen && (
        <div
          className="fixed inset-0 z-50 flex justify-center items-center bg-black/70 backdrop-blur-sm"
          onClick={() => setAddMemberOpen(false)}
        >
          <div onClick={(e) => e.stopPropagation()}>
            <AddMember />
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
