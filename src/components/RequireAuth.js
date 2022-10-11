import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../hookes/useAuth";
import Navbar from "./Navbar/Navbar";

const RequireAuth = () => {
  const { auth } = useAuth();
  const location = useLocation();
  
  return auth?.email ? (
    <>
      <Outlet /> 
      <Navbar />
    </>
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
