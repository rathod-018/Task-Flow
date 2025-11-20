import React, { useEffect, useState } from "react";
import { useUserContext } from "../../context/UserContext";
import api from "../../api/axios";

function Sidebar() {
  const { user } = useUserContext();
  const [board, setBoard] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // console.log(user.userPageHistory?.boardId);
    const boardId = user.userPageHistory?.boardId;

    const fetchCurrentBoard = async () => {
      try {
        const { data } = await api.get(`board/${boardId}`);
        setBoard(data.data);
      } catch (error) {
        console.log(error.response?.data?.message || "something went wrong");
      } finally {
        setLoading(false);
      }
    };
    fetchCurrentBoard();
  }, [user]);

  return (
    <aside className="w-56 h-full fixed left-0 bg-slate-800 text-white p-4 ">
      {loading ? <div>Loading...</div> : null}
      {board ? <h2>{board.title}</h2> : null}
    </aside>
  );
}

export default Sidebar;
