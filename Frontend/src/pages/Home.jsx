import React, { useState } from "react";
import Navbar from "../components/navbar/Navbar";
import Sidebar from "../components/sidebar/Sidebar";
import Main from "../components/Main";
import Container from "../components/Container";

const Home = () => {
  const [isContainerOpen, setIsContainerOpen] = useState(true);
  return (
    <div className="h-screen w-screen relative">
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
      {isContainerOpen && (
        <div
          className="absolute top-14 inset-x-0 bottom-0 z-50 flex justify-center items-center bg-black/40"
          onClick={() => setIsContainerOpen(false)}
        >
          <Container />
        </div>
      )}
    </div>
  );
};

export default Home;
