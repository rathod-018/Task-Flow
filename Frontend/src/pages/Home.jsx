import React, { useState } from "react";
import Navbar from "../components/navbar/Navbar";
import Sidebar from "../components/sidebar/Sidebar";
import Main from "../components/Main";
import CreateTaskCard from "../components/task/CreateTaskCard";
import CreateBoard from "../components/board/CreateBoard";
import CreateProject from "../components/projects/CreateProject";
import AddMember from "../components/membership/AddMember";
import { useUIContext } from "../context/UIContext";

const Home = () => {
  const {
    isCreateTaskCardOpen,
    setIsCreateTaskCardOpen,
    isCreateBoardCardOpen,
    setIsCreateBoardCardOpen,
    isCreateProjectCardOpen,
    setIsCreateProjectCardOpen,
    isAddMemberCardOpen,
    setIsAddMemberCardOpen,
  } = useUIContext();
  return (
    <div className="h-screen w-screen relative overflow-hidden">
      <div className="fixed top-0 left-0 w-full h-14 z-20">
        <Navbar />
      </div>
      <div className="pt-14 flex h-full">
        <div className="fixed top-14 left-0 w-56 h-[calc(100vh-3.5rem)] z-40 border-r">
          <Sidebar />
        </div>

        <div className="ml-56 w-[calc(100%-14rem)] h-[calc(100vh-3.5rem)] overflow-auto">
          <Main />
        </div>
      </div>
      {isCreateTaskCardOpen && (
        <div
          className="absolute top-14 inset-x-0 bottom-0 z-50 flex justify-center items-center bg-black/70"
          onClick={() => setIsCreateTaskCardOpen(false)}
        >
          <CreateTaskCard />
        </div>
      )}
      {isCreateBoardCardOpen && (
        <div
          className="absolute top-14 inset-x-0 bottom-0 z-50 flex justify-center items-center bg-black/70"
          onClick={() => setIsCreateBoardCardOpen(false)}
        >
          <CreateBoard />
        </div>
      )}
      {isCreateProjectCardOpen && (
        <div
          className="absolute top-14 inset-x-0 bottom-0 z-50 flex justify-center items-center bg-black/70"
          onClick={() => setIsCreateProjectCardOpen(false)}
        >
          <CreateProject />
        </div>
      )}
      {isAddMemberCardOpen && (
        <div
          className="absolute top-14 inset-0 z-50 flex justify-center items-center bg-black/70"
          onClick={() => setIsAddMemberCardOpen(false)}
        >
          <AddMember />
        </div>
      )}
    </div>
  );
};

export default Home;
