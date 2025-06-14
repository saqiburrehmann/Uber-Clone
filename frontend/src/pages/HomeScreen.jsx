// All imports
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../features/auth/authSliceToken";
import { useNavigate } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import gsap from "gsap";
import yellowcar from "../assets/yellow-car.avif";
import { FaUser } from "react-icons/fa";
import ubermap from "../assets/uber-map.jpg";
import LocationSearchPanel from "../components/LocationSearchPannel";
import { MdElectricRickshaw } from "react-icons/md";
import { RiMotorbikeFill } from "react-icons/ri";
import ConfirmRide from "../components/ConfirmRide";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formRef = useRef(null);
  const vehiclePanelRef = useRef(null);
  const confirmRidePannelRef = useRef(null);

  const [formOpen, setFormOpen] = useState(false);
  const [vehiclePanel, setVehiclePanel] = useState(false);
  const [confirmRidePanel, setConfirmRidePanel] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");

  const handleLogout = () => {
    dispatch(logout());
    navigate("/user-login");
  };

  const openForm = () => {
    if (!formOpen) setFormOpen(true);
  };

  const closeForm = () => {
    setFormOpen(false);
  };

  useEffect(() => {
    if (formOpen && formRef.current) {
      gsap.to(formRef.current, { y: 0, duration: 0.5 });
    } else if (formRef.current) {
      gsap.to(formRef.current, { y: "50%", duration: 0.5 });
    }
  }, [formOpen]);

  useEffect(() => {
    gsap.set(formRef.current, { y: "50%" });
  }, []);

  useEffect(() => {
    if (vehiclePanel && vehiclePanelRef.current) {
      gsap.to(vehiclePanelRef.current, { y: 0, duration: 0.4 });
    } else if (vehiclePanelRef.current) {
      gsap.to(vehiclePanelRef.current, { y: "100%", duration: 0.4 });
    }
  }, [vehiclePanel]);

  useEffect(() => {
    if (confirmRidePanel && confirmRidePannelRef.current) {
      gsap.to(confirmRidePannelRef.current, { y: 0, duration: 0.4 });
    } else if (confirmRidePannelRef.current) {
      gsap.to(confirmRidePannelRef.current, { y: "100%", duration: 0.4 });
    }
  }, [confirmRidePanel]);

  const handleVehicleSelect = (vehicle) => {
    setSelectedVehicle(vehicle);
    setVehiclePanel(false);
    setFormOpen(false); 
    setConfirmRidePanel(true);
  };

  return (
    <div className="h-screen relative overflow-hidden">
      {/* Logo */}
      <img
        className="w-16 absolute left-5 top-5 z-10"
        src="https://www.logo.wine/a/logo/Uber/Uber-White-Dark-Background-Logo.wine.svg"
        alt="Uber Logo"
      />

      {/* Background Map */}
      <img className="w-full h-full object-cover" src={ubermap} alt="Map" />

      {/* Sliding Form */}
      <div
        ref={formRef}
        className="absolute left-0 bottom-0 w-full bg-white rounded-t-3xl p-5 z-20"
        style={{ transform: "translateY(50%)" }}
      >
        {formOpen ? (
          <div className="flex justify-end">
            <button onClick={closeForm} className="text-2xl">
              <IoMdClose />
            </button>
          </div>
        ) : (
          <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-gray-300 rounded-full" />
        )}

        <h3 className="text-2xl font-semibold">Find a trip</h3>

        <form>
          <input
            className="bg-[#eee] px-8 py-2 text-lg rounded-lg w-full mt-3"
            type="text"
            placeholder="Add a pick-up location"
            onFocus={openForm}
            onChange={(e) => setPickup(e.target.value)}
          />
          <input
            className="bg-[#eee] px-8 py-2 text-lg rounded-lg w-full mt-3"
            type="text"
            placeholder="Enter your destination"
            onFocus={openForm}
            onChange={(e) => setDestination(e.target.value)}
          />
        </form>

        {!formOpen && (
          <button
            className="w-full bg-black text-white py-3 rounded-lg font-bold mt-4"
            onClick={openForm}
          >
            Search
          </button>
        )}

        {formOpen && (
          <div className="h-[70vh] mt-5 rounded-xl transition-all duration-500">
            <LocationSearchPanel
              vehiclePanel={vehiclePanel}
              setVehiclePanel={setVehiclePanel}
              setFormOpen={setFormOpen}
            />
          </div>
        )}
      </div>

      {/* Vehicle Panel */}
      <div
        ref={vehiclePanelRef}
        className="fixed bottom-0 w-full bg-white z-30 p-4 rounded-t-2xl shadow-lg translate-y-full"
      >
        <div className="flex justify-end mb-2">
          <button
            onClick={() => {
              setVehiclePanel(false);
              setFormOpen(true);
            }}
            className="text-2xl"
          >
            <IoMdClose />
          </button>
        </div>

        <h3 className="text-lg font-semibold mb-3">Choose a vehicle</h3>

        <div className="flex flex-col gap-3 max-h-60 overflow-y-auto">
          <div
            className="flex bg-red-400 items-center justify-between p-4 rounded-lg cursor-pointer"
            onClick={() =>
              handleVehicleSelect({ name: "UberGo", price: "10.21" })
            }
          >
            <img className="h-10" src={yellowcar} alt="UberGo" />
            <div className="w-1/2">
              <h4 className="font-medium text-sm flex items-center gap-1">
                UberGo <FaUser /> 4
              </h4>
              <h5 className="font-medium text-sm">2 mins away</h5>
              <p className="text-xs text-gray-700">Affordable compact rides</p>
            </div>
            <h2 className="text-2xl font-semibold">$10.21</h2>
          </div>

          <div
            className="flex bg-yellow-300 items-center justify-between p-4 rounded-lg cursor-pointer"
            onClick={() => handleVehicleSelect({ name: "Auto", price: "5.99" })}
          >
            <MdElectricRickshaw className="text-3xl text-black" />
            <div className="w-1/2">
              <h4 className="font-medium text-sm flex items-center gap-1">
                Auto <FaUser /> 3
              </h4>
              <h5 className="font-medium text-sm">3 mins away</h5>
              <p className="text-xs text-gray-700">
                Affordable auto rickshaw rides
              </p>
            </div>
            <h2 className="text-2xl font-semibold">$5.99</h2>
          </div>

          <div
            className="flex bg-green-300 items-center justify-between p-4 rounded-lg cursor-pointer"
            onClick={() => handleVehicleSelect({ name: "Bike", price: "3.49" })}
          >
            <RiMotorbikeFill className="text-3xl text-black" />
            <div className="w-1/2">
              <h4 className="font-medium text-sm flex items-center gap-1">
                Bike <FaUser /> 1
              </h4>
              <h5 className="font-medium text-sm">1 min away</h5>
              <p className="text-xs text-gray-700">Fast and cheapest ride</p>
            </div>
            <h2 className="text-2xl font-semibold">$3.49</h2>
          </div>
        </div>
      </div>

      {/* Confirm Ride Panel */}
      <div
        ref={confirmRidePannelRef}
        className="fixed w-full z-40 bottom-0 translate-y-full bg-white px-3 py-10 pt-14 rounded-t-2xl shadow-xl"
      >
        <div className="flex justify-end mb-2">
          <button
            onClick={() => {
              setConfirmRidePanel(false);
              setFormOpen(true); // Go back to form
            }}
            className="text-2xl"
          >
            <IoMdClose />
          </button>
        </div>
        <ConfirmRide
          vehicle={selectedVehicle}
          pickup={pickup}
          destination={destination}
        />
      </div>
    </div>
  );
};

export default HomeScreen;
