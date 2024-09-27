import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import logo from "../logo/logo.jpg";
import PageTitleNavbar from "./PageTitleNavbar";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          username,
          password,
        }
      );

      console.log("Login Response:", response.data);

      if (response.data.message === "Login successful") {
        const user = response.data.username;
        console.log("Logging in user:", user); // Log the username being passed
        login(user); // Pass the username to login
        navigate("/dashboard"); // Redirect to dashboard
      }
    } catch (err) {
      setError("Invalid username or password");
    }
  };

  return (
    <>
      <PageTitleNavbar pageTitle="Admin Login" />
      <div className="my-60 flex items-center justify-center ">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
          <div className="flex items-center justify-center  p-4">
            <img src={logo} alt="Logo" className="w-16 h-auto" /> {/* Logo */}
          </div>
          <h1 className="text-2xl font-bold mb-6 text-center">Admin Login</h1>
          {error && <p className="text-red-500">{error}</p>}
          <form onSubmit={handleLogin}>
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded mb-4"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
            />
            <input
              type="password"
              className="w-full p-3 border border-gray-300 rounded mb-4"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AdminLogin;
