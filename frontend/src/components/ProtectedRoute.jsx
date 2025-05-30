import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, redirectPath = "/user-login" }) => {
  const { token, role } = useSelector((state) => state.auth);
  if (!token || role !== "user") {
    return <Navigate to={redirectPath} replace />;
  }
  return children;
};

export default ProtectedRoute;
