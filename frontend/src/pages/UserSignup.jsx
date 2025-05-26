import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRegisterUserMutation } from "../features/api/authApi.js";
import uberImg from "../assets/uber-logo.png";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const UserSignup = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const [registerUser, { isLoading, error }] = useRegisterUserMutation();

  const submitHandler = async (e) => {
    e.preventDefault();
    const newData = {
      fullname: {
        firstname,
        lastname,
      },
      email,
      password,
    };

    try {
      const res = await registerUser(newData).unwrap();
      toast.success("User Registered Successfully!");
      navigate("/home");
    } catch (err) {
      toast.error(err?.data?.message || "Signup failed!");
    }

    setFirstname("");
    setLastname("");
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
          <h1 className="text-2xl text-center my-3 font-semibold">
            User SignUp
          </h1>

          <h3 className="text-xl font-semibold mb-2">What's your name?</h3>
          <div className="flex gap-x-5">
            <input
              className="bg-gray-100 mb-4 border border-gray-300 rounded px-4 py-2 w-full text-base placeholder:text-gray-500"
              type="text"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              required
              placeholder="First Name"
            />

            <input
              className="bg-gray-100 mb-4 border border-gray-300 rounded px-4 py-2 w-full text-base placeholder:text-gray-500"
              type="text"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              required
              placeholder="Last Name"
            />
          </div>

          <h3 className="text-xl font-semibold mb-2">What's your email?</h3>
          <input
            className="bg-gray-100 mb-4 border border-gray-300 rounded px-4 py-2 w-full text-base placeholder:text-gray-500"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="user@example.com"
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
            Signup
          </button>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link to="/user-login" className="text-blue-600 hover:underline">
                Login as a user
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserSignup;
