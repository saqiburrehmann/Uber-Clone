import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../features/auth/authSliceToken";
import { useNavigate } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import gsap from "gsap";

import ubermap from "../assets/uber-map.jpg";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formRef = useRef(null);
  const [formOpen, setFormOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/user-login");
  };

  const openForm = () => {
    if (!formOpen) {
      setFormOpen(true);
    }
  };

  const closeForm = () => {
    setFormOpen(false);
  };

  // Animation handling
  useEffect(() => {
    if (!formRef.current) return;
    
    if (formOpen) {
      // Open animation - bring to full view
      gsap.to(formRef.current, {
        y: 0,
        duration: 0.5,
        ease: "power3.out",
      });
    } else {
      // Close animation - return to partially visible state
      gsap.to(formRef.current, {
        y: "50%",
        duration: 0.5,
        ease: "power3.inOut",
      });
    }
  }, [formOpen]);

  // Initial setup - set to partially visible
  useEffect(() => {
    if (!formRef.current) return;
    gsap.set(formRef.current, { y: "50%" });
  }, []);

  return (
    <div className="h-screen relative overflow-hidden">
      {/* Uber Logo */}
      <img
        className="w-16 absolute left-5 top-5 z-10"
        src="https://www.logo.wine/a/logo/Uber/Uber-White-Dark-Background-Logo.wine.svg"
        alt="Uber Logo"
      />

      {/* Background Map Image */}
      <img
        className="w-full h-full object-cover"
        src={ubermap}
        alt="Uber Map"
      />

      {/* Form Panel */}
      <div
        ref={formRef}
        className="absolute left-0 bottom-0 w-full bg-white rounded-t-3xl p-5 z-20"
        style={{ transform: "translateY(50%)" }} // Initial position
      >
        {formOpen ? (
          <div className="flex justify-end">
            <button onClick={closeForm} className="text-2xl">
              <IoMdClose />
            </button>
          </div>
        ) : (
          <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-gray-300 rounded-full"></div>
        )}

        <h3 className="text-2xl font-semibold">Find a trip</h3>
        <form>
          <input
            className="bg-[#eee] px-8 py-2 text-lg rounded-lg w-full mt-3"
            type="text"
            placeholder="Add a pick-up location"
            onFocus={openForm}
          />
          <input
            className="bg-[#eee] px-8 py-2 text-lg rounded-lg w-full mt-3"
            type="text"
            placeholder="Enter your destination"
            onFocus={openForm}
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
          <div className="h-[70vh] bg-red-500 mt-5 rounded-xl transition-all duration-500"></div>
        )}
      </div>
    </div>
  );
};

export default HomeScreen;