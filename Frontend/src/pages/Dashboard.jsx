import React from "react";
import Navbar from "../components/navbar/Navbar";
import Sidebar from "../components/sidebar/Sidebar";

const Home = () => {
  return (
    <div className="h-screen w-screen">
      <Navbar />

      {/* Push everything down so it doesn't hide behind navbar */}
      <div className="pt-14 flex h-full">
        <Sidebar />

        <div className="flex-1">content</div>
      </div>
    </div>
  );
};

export default Home;
