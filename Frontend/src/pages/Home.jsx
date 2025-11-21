import React from "react";
import Navbar from "../components/navbar/Navbar";
import Sidebar from "../components/sidebar/Sidebar";
import Main from "../components/Main";

const Home = () => {
  return (
    <div className="h-screen w-screen">
      <div className="fixed top-0 left-0 w-full h-14 z-20 overflow-visible">
        <Navbar />
      </div>

      <div className="pt-14 flex h-full">
        <div className="fixed pl-56 h-[calc(100vh-3.5rem)] w-full overflow-auto ">
          <Main />
        </div>
        <div className="fixed top-14 left-0 w-56 h-full">
          <Sidebar />
        </div>
      </div>
    </div>
  );
};

export default Home;
