import React, { useState, useEffect, useContext, createContext } from "react";
import { useUserContext } from "./UserContext";
import api from "../api/axios";

const BoardContext = createContext();

export function BoardContextProvider({ children }) {
  const { user } = useUserContext();

  const [createdBoard, setCreatedBoard] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchBoards = async () => {
    try {
      const res = await api.get("board/created-boards");
      setCreatedBoard(res?.data.data);
      console.log(res?.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBoards();
  }, [user]);

  if (loading) return <div>Loading...</div>;

  return (
    <BoardContext.Provider value={{ createdBoard }}>
      {children}
    </BoardContext.Provider>
  );
}

export function useBoardContext() {
  return useContext(BoardContext);
}
