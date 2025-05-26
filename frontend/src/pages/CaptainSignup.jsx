import { useState } from "react";
import uberImg from "../assets/uber-logo.png";
import { Link } from "react-router-dom";
import { useRegisterCaptainMutation } from "../features/api/authApi.js";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CaptainSignup = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [plate, setPlate] = useState("");
  const [capacity, setCapacity] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [color, setColor] = useState("");

  const navigate = useNavigate();
  const [registerCaptain, { isLoading, error }] = useRegisterCaptainMutation();

  const submitHandler = async (e) => {
    e.preventDefault();
    const newData = {
      fullname: {
        firstname: firstname,
        lastname: lastname,
      },
      email: email,
      password: password,
      plate: plate,
      capacity: capacity,
      vehicleType: vehicleType,
      color: color,
    };

    try {
      const res = await registerCaptain(newData).unwrap();
      toast.success("Captain Registerd");
      navigate("/captain-login");
    } catch (err) {
      toast.error(err?.data?.message || "Captain Signup failed!");
      console.log(err)
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
            Captain SignUp
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
            placeholder="captain@example.com"
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

          <h3 className="text-lg font-semibold mb-2">Enter plate</h3>
          <input
            className="bg-gray-100 mb-6 border border-gray-300 rounded px-4 py-2 w-full text-base placeholder:text-gray-500"
            type="text"
            value={plate}
            onChange={(e) => setPlate(e.target.value)}
            required
            placeholder="plate no"
          />

          <h3 className="text-lg font-semibold mb-2">Enter capacity</h3>
          <input
            className="bg-gray-100 mb-6 border border-gray-300 rounded px-4 py-2 w-full text-base placeholder:text-gray-500"
            type="number"
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
            required
            placeholder="capacity in number"
          />

          <h3 className="text-lg font-semibold mb-2">Enter vehicle Type</h3>
          <input
            className="bg-gray-100 mb-6 border border-gray-300 rounded px-4 py-2 w-full text-base placeholder:text-gray-500"
            type="text"
            value={vehicleType}
            onChange={(e) => setVehicleType(e.target.value)}
            required
            placeholder="capacity in number"
          />

          <h3 className="text-lg font-semibold mb-2">Enter color</h3>
          <input
            className="bg-gray-100 mb-6 border border-gray-300 rounded px-4 py-2 w-full text-base placeholder:text-gray-500"
            type="text"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            required
            placeholder="Enter color"
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
              <Link
                to="/captain-login"
                className="text-blue-600 hover:underline"
              >
                Login as a captain
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CaptainSignup;
