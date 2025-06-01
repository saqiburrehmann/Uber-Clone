import React from "react";
import { FaMapMarkerAlt } from "react-icons/fa";

const LocationSearchPannel = ({ setVehiclePanel, setFormOpen }) => {
  const locations = [
    "Shahrah-e-Faisal, Karachi",
    "Johar Town, Lahore",
    "I-8 Markaz, Islamabad",
    "F-10, Islamabad",
    "Gulshan-e-Iqbal, Karachi",
    "Model Town, Lahore",
    "Saddar, Rawalpindi",
    "Bahria Town, Karachi",
    "DHA Phase 6, Lahore",
    "University Road, Peshawar",
  ];

  return (
    <div className="max-h-96 overflow-y-auto px-2">
      {locations.map((location, index) => (
        <div
          key={index}
          onClick={() => {
            setVehiclePanel(true);
            setFormOpen(false);
          }}
          className="flex items-center border-2 p-3 rounded-xl my-2 border-white hover:border-black justify-start gap-x-3 shadow-sm"
        >
          <span className="text-xl text-black">
            <FaMapMarkerAlt />
          </span>
          <h4 className="text-lg font-medium text-gray-800">{location}</h4>
        </div>
      ))}
    </div>
  );
};

export default LocationSearchPannel;
