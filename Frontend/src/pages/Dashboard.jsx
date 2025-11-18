import React from "react";
import Navbar from "../components/navbar/Navbar";
import Sidebar from "../components/sidebar/Sidebar";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="h-screen w-screen">
      <Navbar />
      <div className="pt-14 flex h-full">
        <Sidebar />
        <div className="flex-1 border-2 border-red-400">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
