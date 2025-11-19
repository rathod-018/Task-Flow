import { Outlet, Navigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";

function Protected() {
  const { user } = useUserContext();

  if (!user) return <Navigate to="/login" replace />;

  return <Outlet />;
}

export default Protected;
