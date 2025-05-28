import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const CaptainProtectedRoute = ({
  children,
  redirectPath = "/captain-login",
}) => {
  const { token, role } = useSelector((state) => state.auth);

  if (!token || role !== "captain") {
    return <Navigate to={redirectPath} replace />;
  }
  return children;
};

export default CaptainProtectedRoute;
