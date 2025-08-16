import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";

// Pages
import AdminDashboardPage from "../pages/admin/AdminDashboard";
import ManageUsersPage from "../pages/admin/users/ManageUsers";
import ManageProductsPage from "../pages/admin/products/ManageProducts";
import ManageBlogsPage from "../pages/admin/blogs/ManageBlogs";
import HomePage from "../pages/HomePage";
import ProductsPage from "../pages/user/products/ProductsPage";
import LoginPage from "../pages/auth/Login";
import RegisterPage from "../pages/auth/Register";
import NotFound from "../pages/NotFound";

// Components & Wrappers
import HeaderNav from "../components/common/HeaderNav";
import ProtectedRouteWrapper from "../routes/ProtectedRouteWrapper";
import RoleProtectedRouteWrapper from "../routes/RoleBaseRouteWrapper";
import CartPage from "../pages/user/cart/CartPage";
import CheckoutPage from "../pages/user/cart/CheckOutPage";
import OrderPage from "../pages/user/orders/OrderPage";

// Layout that wraps protected routes
const MainLayout = () => (
  <div>
    <HeaderNav />
    <Outlet />
  </div>
);

export const AppRoutes = () => (
  <Router>
    <Routes>
      {/* Root redirect */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* Public routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Protected routes */}
      <Route element={<ProtectedRouteWrapper />}>
        <Route element={<MainLayout />}>
          {/* Common routes accessible by all logged-in users */}
          <Route path="/home" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/orders" element={<OrderPage />} />

          {/* Admin-only routes */}
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

      {/* Fallback route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  </Router>
);
