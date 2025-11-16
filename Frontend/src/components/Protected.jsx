import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";

function Protected({ children }) {
  const navigate = useNavigate();
  const { user, loading } = useUserContext();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
  }, [loading, user]);

  if (loading) return <div>Loading...</div>;

  return <>{children}</>;
}

export default Protected;
