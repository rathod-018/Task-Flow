import React, { useState, useEffect, useContext, useMemo } from "react";
import api from "../api/axios";
import Loader from "../components/Loader";

const UserContext = React.createContext();

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState("");

  const getUser = async () => {
    try {
      const { data } = await api.get("/user/get-user");

      if (data.success) {
        setUser(data.data);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error(error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const value = useMemo(
    () => ({
      user,
      setUser,
      loading,
      userEmail,
      setUserEmail,
      getUser,
    }),
    [user, loading, userEmail]
  );

  if (loading)
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <Loader />
      </div>
    );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export const useUserContext = () => useContext(UserContext);
