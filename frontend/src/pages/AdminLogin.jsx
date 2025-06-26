import axios from "axios";
import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { remote } from "../config/config";
import { useAuth } from "../hooks/useAuth";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const { setUser } = useAuth();

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setError("Please enter both email and password.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const user = {
        username: username,
        password: password,
      };

      // First authenticate
      const loginRes = await axios.post(`${remote}/admin-login`, user);
      if (loginRes.status === 200) {
        // Set JWT cookie
        const jwtRes = await axios.post(`${remote}/jwt`, user, {
          withCredentials: true,
        });

        if (jwtRes.status === 200) {
          await new Promise((resolve) => setTimeout(resolve, 300));
        }
        // Set user in context
        setUser(loginRes.data.role);
        setLoading(false);
        navigate("/home");
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
      setError(
        "Invalid credentials! Please use correct username and password."
      );
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-center text-2xl font-semibold text-gray-700">
          Admin Login
        </h2>
        {error && <p className="mb-4 text-sm text-red-500">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Username
            </label>
            <input
              type="text"
              className="mt-1 w-full rounded-md border p-2 focus:border-blue-400 focus:outline-none"
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="relative">
            <label className="block text-sm font-medium text-gray-600">
              Password
            </label>
            <input
              type={passwordVisible ? "text" : "password"}
              className="mt-1 w-full rounded-md border p-2 focus:border-blue-400 focus:outline-none"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
            className="w-full rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 cursor-pointer"
          >
            {loading ? "Loading..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
