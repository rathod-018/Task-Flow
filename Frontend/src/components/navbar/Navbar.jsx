import React from "react";
import menuBurger from "../../assets/menuBurger.svg";
import bell from "../../assets/bell.svg";
import create from "../../assets/create.svg";
import { useUserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import CreateBoard from "../projects/board/CreateBoard";
import { useState } from "react";

function Navbar() {
  const [isActive, setIsActive] = useState(false);
  const { user } = useUserContext();
  const avatarUrl = user?.avatar.url;
  const navigate = useNavigate();

  return (
    <header className="h-14 w-full bg-slate-700 fixed z-10 text-white flex items-center px-4 justify-between shadow">
      <div className="flex items-center gap-4">
        <img src={menuBurger} alt="" className="w-5" />
        <h2>Task Flow</h2>
      </div>

      <div className="flex flex-row items-center gap-16">
        <div className="relative">
          <div
            className="flex gap-4  p-3  bg-red-500 rounded-lg cursor-pointer"
            onClick={() => {
              setIsActive((prev) => !prev);
            }}
          >
            <span>Create</span>
            <img src={create} alt="" className="w-5" />
          </div>

          {isActive ? (
            <div className="absolute w-72 h-[35rem] top-full left-1/2 -translate-x-1/2 mt-2 z-20">
              <CreateBoard
                close={() => {
                  setIsActive(false);
                }}
              />
            </div>
          ) : null}
        </div>
        <div className="flex items-center gap-4">
          <img src={bell} alt="" className="w-5" />
          <div>
            <img src={avatarUrl} alt="" className="w-8" />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
