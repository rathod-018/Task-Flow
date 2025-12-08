import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios";
import { useUserContext } from "./UserContext";
import { usePageHistory } from "../hooks/usePageHisrory";

const BoardContext = createContext();

export function BoardContextProvider({ children }) {
  const { user } = useUserContext();
  const activeBoardId = user?.userPageHistory?.boardId;
  const [createdBoards, setCreatedBoards] = useState([]);
  const [joinedBoards, setJoinedBoards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { updateLastOpened } = usePageHistory();

  // fetch created and joined boards
  const fetchBoards = async () => {
    try {
      setLoading(true);
      const created = await api.get("/board/created");
      if (created?.data?.statusCode === 200) {
        setCreatedBoards(created?.data?.data);
      }
      const joined = await api.get("/board/joined");
      if (joined?.data?.statusCode === 200) {
        setJoinedBoards(joined?.data?.data);
      }
    } catch (err) {
      console.log(err);
      setError("Error while fetching boards");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBoards();
  }, []);

  // update boardId if it's null
  useEffect(() => {
    if (loading) return;
    if (activeBoardId) return;
    const fallback = createdBoards[0]?._id || joinedBoards[0]?._id || null;
    updateLastOpened(fallback);
  }, [activeBoardId, loading, createdBoards, joinedBoards]);

  return (
    <BoardContext.Provider
      value={{
        createdBoards,
        joinedBoards,
        loading,
        error,
        fetchBoards,
        activeBoardId,
      }}
    >
      {children}
    </BoardContext.Provider>
  );
}

export const useBoardContext = () => useContext(BoardContext);
