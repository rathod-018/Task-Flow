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
    <div className="h-screen w-screen relative overflow-hidden">
      <div className="fixed top-0 left-0 w-full h-14 z-20">
        <Navbar />
      </div>
      <div className="pt-14 flex h-full">
        <div
          className={`fixed top-14 left-0 h-[calc(100vh-3.5rem)] transition-all duration-300 z-50
               ${openSideBar ? "md:w-56" : "hidden md:block md:w-14"}`}
        >
          <Sidebar />
        </div>
        <div
          className={`h-[calc(100vh-3.5rem)] overflow-auto transition-all duration-300 w-full
      ${
        openSideBar
          ? "md:ml-56 md:w-[calc(100%-14rem)]"
          : "md:ml-14 md:w-[calc(100%-3.5rem)] "
      }`}
        >
          <Main />
        </div>
      </div>
      {taskForm.open && (
        <div className="absolute top-0 inset-x-0 bottom-0 z-50 flex justify-center items-center bg-black/70">
          <TaskForm />
        </div>
      )}
      {boardForm.open && (
        <div className="absolute top-0 inset-x-0 bottom-0 z-50 flex justify-center items-center bg-black/70">
          <BoardForm />
        </div>
      )}
      {projectForm.open && (
        <div className="absolute top-0 inset-x-0 bottom-0 z-50 flex justify-center items-center bg-black/70">
          <ProjectForm />
        </div>
      )}
      {addMemberOpen && (
        <div
          className="absolute top-0 inset-0 z-50 flex justify-center items-center bg-black/70"
          onClick={() => setAddMemberOpen(false)}
        >
          <AddMember />
        </div>
      )}
    </div>
  );
};

export default Home;
