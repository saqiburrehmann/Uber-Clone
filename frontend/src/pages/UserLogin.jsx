import React, { useState } from "react";
import uberImg from "../assets/uber-logo.png";
import { Link } from "react-router-dom";

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    const newData = {
      email: email,
      password: password,
    };
    setUserData(newData);
    console.log("Submitted Data:", newData);
    setEmail("");
    setPassword("");
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <form onSubmit={submitHandler}>
          <div className="flex justify-center mb-6">
            <img className="w-16" src={uberImg} alt="Uber logo" />
          </div>

          <h3 className="text-xl font-semibold mb-2">What's your email?</h3>
          <input
            className="bg-gray-100 mb-4 border border-gray-300 rounded px-4 py-2 w-full text-base placeholder:text-gray-500"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="email@example.com"
          />

          <h3 className="text-lg font-semibold mb-2">Enter Password</h3>
          <input
            className="bg-gray-100 mb-6 border border-gray-300 rounded px-4 py-2 w-full text-base placeholder:text-gray-500"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="password"
          />

          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded hover:opacity-90 mb-4"
          >
            Login
          </button>

          <Link
            to="/captain-login"
            className="block w-full border bg-yellow-300 border-gray-400 text-gray-700 py-2 rounded hover:bg-gray-100 text-center"
          >
            Login with Captain
          </Link>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link to="/user-signup" className="text-blue-600 hover:underline">
                Create account
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserLogin;
