import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export const AdminRoute = () => {
  const { user } = useSelector((state) => state.auth);

  return user?.role === "admin" ? <Outlet /> : <Navigate to="/" replace />;
};
