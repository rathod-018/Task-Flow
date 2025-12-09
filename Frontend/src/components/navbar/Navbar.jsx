import React, { useEffect, useRef, useState } from "react";
import menuBurger from "../../assets/menuBurger.svg";
import bellIcon from "../../assets/bell.svg";
import addUserIcon from "../../assets/user-add.svg";
import { useUserContext } from "../../context/UserContext";
import { useUIContext } from "../../context/UIContext";
import api from "../../api/axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import AcceptMembership from "../membership/AcceptMembership";
import { useFetchReqBoards } from "../../hooks/useFetchReqBoards";

function Navbar() {
  const { setAddMemberOpen, setOpenSideBar } = useUIContext();
  const { user, setUser } = useUserContext();
  const avatarUrl = user?.avatar.url;
  const { boardData, fetchReqBoards } = useFetchReqBoards();
  const [logout, setLogout] = useState(false);
  const [notification, setNotification] = useState(false);
  const [notificationCount, setNotificationCount] = useState(null);

  const navigate = useNavigate();

  const logoutRef = useRef();
  const notificationRef = useRef();

  const hadleLogOut = async () => {
    try {
      const { data } = await api.patch("/user/logout");
      if (data?.statusCode === 200) {
        toast.success(data.message);
        setUser(null);
        navigate("/");
      }
    } catch (err) {
      console.error(err);
    }
  };

  // update notification count
  useEffect(() => {
    setNotificationCount(boardData.length);
  }, [boardData]);

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
          alt="menu-burger"
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
        <div className="relative">
          <img
            src={bellIcon}
            alt="bell"
            onClick={(e) => {
              e.stopPropagation();
              setNotification((p) => !p);
            }}
            className="w-6 invert opacity-80 hover:opacity-100 transition cursor-pointer"
          />
          {notificationCount > 0 && (
            <div className="absolute -top-1.5 -right-1 text-[9px] bg-red-600 py-0.5 px-1.5 rounded-full">
              {notificationCount}
            </div>
          )}
        </div>
        {notification && (
          <div
            ref={notificationRef}
            className="absolute right-3 top-16 bg-[#161b22] border border-[#30363d] rounded-xl w-80 shadow-2xl p-1.5 z-50"
          >
            <AcceptMembership data={boardData} refresh={fetchReqBoards} />
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
