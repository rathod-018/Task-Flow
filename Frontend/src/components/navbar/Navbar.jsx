import React from "react";
import menuBurger from "../../assets/menuBurger.svg";
import bell from "../../assets/bell.svg";
import { useUserContext } from "../../context/UserContext";

function Navbar() {
  const { user } = useUserContext();
  const avatarUrl = user?.avatar.url;

  return (
    <header className="h-14 w-full bg-slate-700 fixed z-10 text-white flex items-center px-4 justify-between shadow">
      <div className="flex items-center gap-4">
        <img src={menuBurger} alt="" className="w-5" />
        <h2>Task Flow</h2>
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
