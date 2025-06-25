import axios from "axios";
import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { remote } from "../config/config";

const Login = () => {
  const navigate = useNavigate();

  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const roll = e.target[0].value;
    const registration = e.target[1].value;

    if (!roll || !registration) {
      alert("Please fill all the fields");
      return;
    }

    const data = {
      roll: roll,
      registration: registration,
    };

    axios
      .post(`${remote}/login`, data)
      .then((res) => {
        if (res.status === 200) {
          navigate(`/update-info/${registration}`);
        }
      })
      .catch((err) => {
        alert("Invalid credentials! Please use correct roll and registration");
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Login
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-700">Roll</label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter class roll"
            />
          </div>
          <div className="relative ">
            <label className="block text-gray-700">Registration</label>
            <input
              type={passwordVisible ? "text" : "password"}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your registration"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute top-9 right-3 text-gray-400 focus:outline-none"
            >
              {passwordVisible ? (
                <FiEyeOff className="text-lg sm:text-xl" />
              ) : (
                <FiEye className="text-lg sm:text-xl" />
              )}
            </button>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
