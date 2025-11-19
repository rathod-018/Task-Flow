import React from "react";
import Navbar from "../components/navbar/Navbar";
import Sidebar from "../components/sidebar/Sidebar";
import Main from "../components/Main";

const Home = () => {
  return (
    <div className="h-full w-full">
      <div className="fixed z-10 top-0 h-14 w-full">
        <Navbar />
      </div>
      <div className="pt-14 flex h-full">
        <div className="fixed top-14 left-0 w-56 h-[calc(100vh-3.5rem)]">
          <Sidebar />
        </div>
        <div className="flex pl-56 h-[calc(100vh-3.5rem)] w-full overflow-auto ">
          <Main />
        </div>
      </div>
    </div>
  );
};

export default Home;
