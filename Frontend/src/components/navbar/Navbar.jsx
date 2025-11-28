import React, { useState } from "react";
import menuBurger from "../../assets/menuBurger.svg";
import bellIcon from "../../assets/bell.svg";
import createIcon from "../../assets/create.svg";
import addUserIcon from "../../assets/user-add.svg";
import { useUserContext } from "../../context/UserContext";
import { useUIContext } from "../../context/UIContext";

function Navbar() {
  const {
    setIsCreateBoardCardOpen,
    setIsAddMemberCardOpen,
    setIsCreateTaskCardOpen,
    setIsCreateProjectCardOpen,
  } = useUIContext();
  const { user } = useUserContext();
  const avatarUrl = user?.avatar.url;

  return (
    <header
      className="h-14 w-full bg-[#0d1117] text-gray-200 shadow-xl flex items-center justify-between px-6 border-b border-[#30363d] relative"
      onClick={() => {
        setIsCreateTaskCardOpen(false);
        setIsCreateProjectCardOpen(false);
      }}
    >
      <div className="flex items-center gap-3">
        <img
          src={menuBurger}
          alt=""
          className="w-6 invert opacity-80 hover:opacity-100 transition cursor-pointer"
        />
        <h2 className="text-xl font-semibold tracking-wide">TaskFlow</h2>
      </div>
      <div className="flex items-center gap-40">
        <button
          onClick={() => {
            setIsCreateBoardCardOpen((prev) => !prev);
            setIsAddMemberCardOpen(false);
          }}
          className="flex items-center gap-4 bg-blue-600 hover:bg-blue-700 pl-4 py-2 rounded-lg text-white transition cursor-pointer"
        >
          Create
          <img src={createIcon} alt="" className="mr-3 w-5 invert" />
        </button>

        <div className="flex items-center gap-5">
          <img
            src={addUserIcon}
            alt="add-user"
            className="w-6 invert opacity-80 hover:opacity-100 transition cursor-pointer"
            onClick={() => {
              setIsAddMemberCardOpen((prev) => !prev);
              setIsCreateBoardCardOpen(false);
            }}
          />
          <img
            src={bellIcon}
            alt="bell"
            className="w-6 invert opacity-80 hover:opacity-100 transition cursor-pointer"
          />

          <img
            src={avatarUrl}
            alt="avatar"
            className="w-10 h-10 rounded-full border border-[#30363d] cursor-pointer object-cover"
          />
        </div>
      </div>
    </header>
  );
}

export default Navbar;
