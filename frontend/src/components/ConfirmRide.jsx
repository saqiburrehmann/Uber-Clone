import React from "react";

const ConfirmRide = ({ vehicle, pickup, destination }) => {
  return (
    <div className="bg-white p-5 rounded-t-2xl shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Confirm Your Ride</h2>

      <div className="mb-3">
        <h4 className="font-semibold">Vehicle:</h4>
        <p>{vehicle?.name || "UberGo"} - ${vehicle?.price || "10.21"}</p>
      </div>

      <div className="mb-3">
        <h4 className="font-semibold">Pickup Location:</h4>
        <p>{pickup || "Demo Pickup Location"}</p>
      </div>

      <div className="mb-3">
        <h4 className="font-semibold">Destination:</h4>
        <p>{destination || "Demo Destination"}</p>
      </div>

      <button className="bg-black text-white w-full py-3 rounded-lg font-bold mt-4">
        Confirm Ride
      </button>
    </div>
  );
};

export default ConfirmRide;
