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

// Layout
const MainLayout = () => {
  return <Outlet />;
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
          <Route path="/home" element={<HomePage />} />

          {/*  */}
          <Route element={<MainLayout />}>
            {/* Role-based nested route example */}
            <Route
              path="/admin-dashboard"
              element={<RoleProtectedRouteWrapper allowedRoles={["admin"]} />}
            >
              <Route index element={<AdminDashboard />} />
            </Route>
          </Route>
        </Route>
        <Route path="/notfound" element={<NotFound />} />
      </Routes>
    </Router>
  );
};
