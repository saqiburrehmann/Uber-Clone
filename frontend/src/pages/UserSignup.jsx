import React from "react";
import uberImg from "../assets/uber-logo.png";
import { Link } from "react-router-dom";

const UserSignup = () => {
  const submitHandler = () => {};
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
              required
              placeholder="First Name"
            />

            <input
              className="bg-gray-100 mb-4 border border-gray-300 rounded px-4 py-2 w-full text-base placeholder:text-gray-500"
              type="text"
              required
              placeholder="Last Name"
            />
          </div>

          <h3 className="text-xl font-semibold mb-2">What's your email?</h3>
          <input
            className="bg-gray-100 mb-4 border border-gray-300 rounded px-4 py-2 w-full text-base placeholder:text-gray-500"
            type="email"
            required
            placeholder="captain@example.com"
          />

          <h3 className="text-lg font-semibold mb-2">Enter Password</h3>
          <input
            className="bg-gray-100 mb-6 border border-gray-300 rounded px-4 py-2 w-full text-base placeholder:text-gray-500"
            type="password"
            required
            placeholder="password"
          />

          <h3 className="text-lg font-semibold mb-2">Confirm Password</h3>
          <input
            className="bg-gray-100 mb-6 border border-gray-300 rounded px-4 py-2 w-full text-base placeholder:text-gray-500"
            type="password"
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
