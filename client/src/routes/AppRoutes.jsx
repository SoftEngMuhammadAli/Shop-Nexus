import React from "react";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  Navigate,
  Outlet,
} from "react-router-dom";

// Pages
import AdminDashboardPage from "../pages/admin/AdminDashboard";
import LoginPage from "../pages/auth/Login";
import RegisterPage from "../pages/auth/Register";
import NotFound from "../pages/NotFound";
import HomePage from "../pages/HomePage";
import ManageUsersPage from "../pages/admin/users/ManageUsers";
import ManageProductsPage from "../pages/admin/products/ManageProducts";

// Wrappers
import ProtectedRouteWrapper from "../routes/ProtectedRouteWrapper";
import RoleProtectedRouteWrapper from "../routes/RoleBaseRouteWrapper";
import HeaderNav from "../components/common/HeaderNav";
import ManageBlogsPage from "../pages/admin/blogs/ManageBlogs";

const MainLayout = () => {
  return (
    <div>
      <HeaderNav />
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
              <Route path="/admin-dashboard" element={<AdminDashboardPage />} />
              <Route path="/manage-users" element={<ManageUsersPage />} />
              <Route path="/manage-products" element={<ManageProductsPage />} />
              <Route path="/manage-blogs" element={<ManageBlogsPage />} />
            </Route>
          </Route>
        </Route>

        {/* Fallback */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};
