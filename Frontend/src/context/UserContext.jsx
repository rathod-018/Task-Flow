import React, { useState, useEffect } from "react";
import api from "../api/axios";
import { createContext } from "react";
import { useContext } from "react";

const UserContext = createContext();

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState("");

  const getUser = async () => {
    try {
      const { data } = await api.get("/user/get-user");
      if (data.success) {
        // console.log(!user);
        setUser(data);
      }
      // console.log("context:", data);
    } catch (error) {
      setLoading(false);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <UserContext.Provider
      value={{ user, setUser, loading, userEmail, setUserEmail }}
    >
      {children}
    </UserContext.Provider>
  );
}

export const useUserContext = () => {
  return useContext(UserContext);
};
