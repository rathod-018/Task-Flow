import React, { useState, useEffect, useContext, createContext } from "react";
import { useUserContext } from "./UserContext";
import api from "../api/axios";

const BoardContext = createContext();

export function BoardContextProvider({ children }) {
  const { user } = useUserContext();

  const [board, setBoard] = useState(null);

  const fetchBoards = async () => {
      try {
        const res=await api.get()
    } catch (error) {}
  };

  useEffect(() => {
    console.log("board context: ", user);
  }, [user]);

  return (
    <BoardContext.Provider value={board}>{children}</BoardContext.Provider>
  );
}

export function useBoardContext() {
  return useContext(BoardContext);
}
