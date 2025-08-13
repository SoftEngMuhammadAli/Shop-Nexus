import React from "react";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  Navigate,
  Outlet,
} from "react-router-dom";

// Pages
import AdminDashboard from "../pages/admin/AdminDashboard";
import LoginPage from "../pages/auth/Login";
import RegisterPage from "../pages/auth/Register";

// Wrappers
import ProtectedRouteWrapper from "../routes/ProtectedRouteWrapper";
import NotFound from "../pages/NotFound";
import RoleProtectedRouteWrapper from "../routes/RoleBaseRouteWrapper";
import HomePage from "../pages/HomePage";
import ManageUsers from "../pages/admin/users/ManageUsers";

// Layout
const MainLayout = () => {
  return (
    <div>
      {/* You can add common layout components here like header, sidebar, etc. */}
      <Outlet />
    </div>
  );
};

export const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* Redirect root to login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Public routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Protected routes */}
        <Route element={<ProtectedRouteWrapper />}>
          <Route element={<MainLayout />}>
            {/* Common protected routes */}
            <Route path="/home" element={<HomePage />} />

            {/* Admin specific routes */}
            <Route
              element={<RoleProtectedRouteWrapper allowedRoles={["admin"]} />}
            >
              <Route path="/admin-dashboard" element={<AdminDashboard />} />
              <Route path="/manage-users" element={<ManageUsers />} />
            </Route>
          </Route>
        </Route>

        {/* Fallback route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};
