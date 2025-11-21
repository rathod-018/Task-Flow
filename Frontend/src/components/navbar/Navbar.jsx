import React, { useState } from "react";
import menuBurger from "../../assets/menuBurger.svg";
import bell from "../../assets/bell.svg";
import createIcon from "../../assets/create.svg";
import { useUserContext } from "../../context/UserContext";;
import CreateBoard from "../projects/board/CreateBoard";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useUserContext();
  const avatarUrl = user?.avatar.url;

  return (
    <header className="h-14 w-full bg-[#0d1117] text-gray-200 shadow-xl flex items-center justify-between px-6 border-b border-[#30363d]">
      <div className="flex items-center gap-3">
        <img
          src={menuBurger}
          alt=""
          className="w-6 invert opacity-80 hover:opacity-100 transition cursor-pointer"
        />
        <h2 className="text-xl font-semibold tracking-wide">TaskFlow</h2>
      </div>
      <div className="flex items-center gap-5 w-[40%]">
        <input
          type="search"
          placeholder="Search..."
          className="bg-[#161b22] border border-[#30363d] text-gray-200 px-3 py-2 rounded-lg w-full outline-none focus:ring-2 focus:ring-blue-600"
        />
        <div className="relative">
          <button
            onClick={() => setIsOpen((prev) => !prev)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-white transition cursor-pointer"
          >
            Create
            <img src={createIcon} alt="" className="mr-3 w-5 invert" />
          </button>
          {isOpen && (
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 z-[999] w-80">
              <div className="bg-[#1f1f23] border border-[#30363d] rounded-xl shadow-xl p-4">
                <CreateBoard close={() => setIsOpen(false)} />
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="flex items-center gap-5">
        <img
          src={bell}
          alt="bell"
          className="w-6 invert opacity-80 hover:opacity-100 transition cursor-pointer"
        />

        <img
          src={avatarUrl}
          alt="avatar"
          className="w-10 h-10 rounded-full border border-[#30363d] cursor-pointer object-cover"
        />
      </div>
    </header>
  );
}

export default Navbar;
