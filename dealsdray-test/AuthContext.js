// src/components/ProtectedRoute.js
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Import the auth context

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth(); // Get authentication status

  if (!isAuthenticated) {
    // If not authenticated, redirect to the login page
    return <Navigate to="/" />;
  }

  // If authenticated, render the children components (e.g., dashboard)
  return children;
};

export default ProtectedRoute;
