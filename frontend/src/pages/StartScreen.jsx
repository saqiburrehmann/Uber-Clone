import React from "react";
import trafficLights from "../assets/traffic-lights.jpg";
import { Link } from "react-router-dom";

const StartScreen = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${trafficLights})`,
        backgroundSize: "cover",
        backgroundPosition: "bottom",
      }}
      className="w-screen h-screen flex flex-col justify-between items-center"
    >
      <div className="w-full px-6 pt-10">
        <img
          className="w-20 mix-blend-screen"
          src="data:image/png;base64,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"
          alt="Uber logo"
        />
      </div>

      <div className="bg-white w-full p-6 rounded-t-3xl shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-4">
          Get Started with Uber
        </h2>
        <Link
          to="/user-login"
          className="block w-full text-center bg-black text-white py-3 rounded font-semibold hover:opacity-90"
        >
          Continue
        </Link>
      </div>
    </div>
  );
};

export default StartScreen;
