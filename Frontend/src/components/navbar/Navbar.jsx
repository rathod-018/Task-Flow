import React from "react";
import menuBurger from "../../assets/menuBurger.svg";
import bellIcon from "../../assets/bell.svg";
import addUserIcon from "../../assets/user-add.svg";
import { useUserContext } from "../../context/UserContext";
import { useUIContext } from "../../context/UIContext";

function Navbar() {
  const { setAddMemberOpen, setOpenSideBar } = useUIContext();
  const { user } = useUserContext();
  const avatarUrl = user?.avatar.url;

  return (
    <header className="h-14 w-full bg-[#0d1117] text-gray-200 shadow-xl flex items-center justify-between px-3 md:p-6 border-b border-[#30363d] relative">
      <div className="flex items-center gap-2">
        <img
          src={menuBurger}
          onClick={() => setOpenSideBar((prev) => !prev)}
          className="w-6 invert opacity-80 hover:opacity-100 transition cursor-pointer"
        />
        <h2 className="text-xl font-semibold tracking-wide">TaskFlow</h2>
      </div>
      <div className="flex items-center gap-4 md:gap-8">
        <img
          src={addUserIcon}
          alt="add-user"
          className="w-6 invert opacity-80 hover:opacity-100 transition cursor-pointer"
          onClick={() => setAddMemberOpen(true)}
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
    </header>
  );
}

export default Navbar;
