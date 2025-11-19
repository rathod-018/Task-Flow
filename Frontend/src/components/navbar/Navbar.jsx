import React from "react";
import menuBurger from "../../assets/menuBurger.svg";
import bell from "../../assets/bell.svg";
import create from "../../assets/create.svg";
import { useUserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import CreateBoard from "../projects/board/CreateBoard";
import { useState } from "react";
import { NavLink } from "react-router-dom";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useUserContext();
  const avatarUrl = user?.avatar.url;
  const navigate = useNavigate();

  return (
    <header className="h-14 w-full bg-slate-700 fixed z-10 text-white flex items-center px-4 justify-between shadow">
      <div className="flex items-center gap-4">
        <img src={menuBurger} alt="" className="w-5" />
        <h2>Task Flow</h2>
      </div>

      <div className=" flex gap-5 w-[40%]">
        <input
          type="search"
          placeholder="Search"
          className="p-2 rounded-xl w-3/4 text-black"
        />
        <div className="relative">
          <div
            className="flex gap-4  p-2  bg-red-500 rounded-lg cursor-pointer"
            onClick={() => {
              setIsOpen((prev) => !prev);
            }}
          >
            <span>Create</span>
            <img src={create} alt="" className="w-5" />
          </div>

          {isOpen ? (
            <div className="absolute w-72 h-[35rem] top-full left-1/2 -translate-x-1/2 mt-2 z-20">
              <CreateBoard
                close={() => {
                  setIsOpen(false);
                }}
              />
            </div>
          ) : null}
        </div>
      </div>
      <div className="flex items-center gap-4">
        <img src={bell} alt="" className="w-5" />
        <div>
          <img src={avatarUrl} alt="" className="w-8" />
        </div>
      </div>
    </header>
  );
}

export default Navbar;

// <ul className="flex justify-center gap-10 items-center font-medium ">
//   <li>
//     <NavLink
//       to=""
//       className={({ isActive }) => `hover:text-orange-700
//       ${isActive ? "text-orange-700" : "text-white"}`}
//     >
//       Work-Flow
//     </NavLink>
//   </li>
//   <li>
//     <NavLink
//       to="list"
//       className={({ isActive }) => `hover:text-orange-700
//       ${isActive ? "text-orange-700" : "text-white"}`}
//     >
//       List
//     </NavLink>
//   </li>
//   <li>
//     <NavLink
//       to="summary"
//       className={({ isActive }) => `hover:text-orange-700
//       ${isActive ? "text-orange-700" : "text-white"}`}
//     >
//       Summary
//     </NavLink>
//   </li>
//   <li>
//     <NavLink
//       to="boards"
//       className={({ isActive }) => `hover:text-orange-700
//       ${isActive ? "text-orange-700" : "text-white"}`}
//     >
//       Boards
//     </NavLink>
//   </li>
// </ul>;
