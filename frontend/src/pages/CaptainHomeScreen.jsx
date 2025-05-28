import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../features/auth/authSliceToken";
import { useNavigate } from "react-router-dom";

const CaptainHomeScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/user-login");
  };

  return (
    <div>
      <h1>Welcome to captain Home Screen</h1>
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 rounded"
      >
        Logout
      </button>
    </div>
  );
};

export default CaptainHomeScreen;
