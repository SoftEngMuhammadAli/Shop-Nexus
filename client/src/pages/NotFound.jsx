import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const NotFound = () => {
  const { user } = useSelector((state) => state.auth);

  const getHomePath = () => {
    if (!user) return "/login";
    if (user.userRole === "admin") return "/home/admin-dashboard";
    if (user.userRole === "user") return "/home";
    return "/";
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-gray-800">
      <h1 className="text-5xl font-bold mb-4">404</h1>
      <p className="text-lg mb-6">Page Not Found</p>
      <Link
        to={getHomePath()}
        className="text-blue-600 hover:underline font-medium"
      >
        Go to Home
      </Link>
    </div>
  );
};

export default NotFound;
