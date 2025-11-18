import React, { useState, useEffect, useContext } from "react";
import api from "../api/axios";
import { createContext } from "react";

const UserContext = createContext();

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState("");

  const getUser = async () => {
    try {
      const { data } = await api.get("/user/get-user");
      if (data.success) {
        // console.log(data);
        setUser(data.data);
      } else {
        setUser(null);
      }
      console.log("context:", data);
    } catch (error) {
      // console.log(error);
    } finally {
      console.log("running....");
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
