import React, { useEffect, useRef, useState } from "react";
import menuBurger from "../../assets/menuBurger.svg";
import bellIcon from "../../assets/bell.svg";
import addUserIcon from "../../assets/user-add.svg";
import { useUserContext } from "../../context/UserContext";
import { useUIContext } from "../../context/UIContext";
import api from "../../api/axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const { setAddMemberOpen, setOpenSideBar } = useUIContext();
  const { user } = useUserContext();
  const avatarUrl = user?.avatar.url;
  const [logout, setLogout] = useState(false);
  const [notification, setNotification] = useState(false);
  const navigate = useNavigate();
  const logoutRef = useRef();
  const notificationRef = useRef();

  const hadleLogOut = async () => {
    try {
      const { data } = await api.patch("/user/logout");
      if (data?.statusCode === 200) {
        toast.success(data.message);
        navigate("/");
      }
    } catch (err) {
      console.log(err);
    }
  };

  // close dropdown
  useEffect(() => {
    function close(e) {
      if (logoutRef.current && !logoutRef.current.contains(e.target)) {
        setLogout(false);
      }
      if (
        notificationRef.current &&
        !notificationRef.current.contains(e.target)
      ) {
        setNotification(false);
      }
    }

    window.addEventListener("click", close);
    return () => window.removeEventListener("click", close);
  }, []);

  return (
    <header className="h-14 w-full bg-[#0d1117] text-gray-200 shadow-xl flex items-center justify-between px-3 md:p-6 border-b border-[#30363d] relative">
      <div className="flex items-center gap-2 relative">
        <img
          src={menuBurger}
          onClick={() => setOpenSideBar((prev) => !prev)}
          className="w-6 invert opacity-80 hover:opacity-100 transition cursor-pointer"
        />
        <h2 className="text-xl font-semibold tracking-wide">TaskFlow</h2>
      </div>

      <div className="flex items-center gap-4 md:gap-8 relative">
        <img
          src={addUserIcon}
          alt="add-user"
          className="w-6 invert opacity-80 hover:opacity-100 transition cursor-pointer"
          onClick={() => setAddMemberOpen(true)}
        />
        <img
          src={bellIcon}
          alt="bell"
          onClick={(e) => {
            e.stopPropagation();
            setNotification((p) => !p);
          }}
          className="w-6 invert opacity-80 hover:opacity-100 transition cursor-pointer"
        />
        {notification && (
          <div
            ref={notificationRef}
            className="absolute right-20 top-16 bg-[#161b22] border border-[#30363d] rounded-xl w-64 shadow-2xl p-3 z-50"
          >
            <p className="text-sm text-gray-300">Notification content...</p>
          </div>
        )}
        <img
          src={avatarUrl}
          alt="avatar"
          onClick={(e) => {
            e.stopPropagation();
            setLogout((p) => !p);
          }}
          className="w-10 h-10 rounded-full border border-[#30363d] cursor-pointer object-cover"
        />
        {logout && (
          <div
            ref={logoutRef}
            onClick={hadleLogOut}
            className="absolute right-3 top-16 bg-[#161b22] border border-[#30363d] hover:bg-[#21262d] rounded-xl  shadow-2xl px-4 z-50"
          >
            <button className="w-full text-left px-3 py-2  rounded-md">
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Navbar;
