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
import { ManageBlogsPage } from "../pages/admin/blogs/ManageBlogs";
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
import AdminSettingsPage from "../pages/admin/settings/AdminSettingsPage";
import CreateProductPage from "../pages/admin/products/CreateProduct";
import { CreateBlogPage } from "../pages/admin/blogs/CreateBlog";
import UpdateProductPage from "../pages/admin/products/UpdateProduct";
import UpdateBlogPage from "../pages/admin/blogs/UpdateBlog";
import ViewUserPage from "../pages/admin/users/ViewUser";
import UpdateUserPage from "../pages/admin/users/UpdateUser";
import ManageAdminOrdersPage from "../pages/admin/orders/ManageAdminOrders";
import UserOrderPage from "../pages/user/orders/OrderPage";
import DeleteUsersPage from "../pages/admin/users/DeleteUsers";
import CreateUserPage from "../pages/admin/users/CreateUsers";
import DeleteBlogPage from "../pages/admin/blogs/DeleteBlog";
import DeleteProductPage from "../pages/admin/products/DeleteProduct";
import HomePage from "../pages/user/HomePage";
import AppFooter from "../components/common/Footer";
import ViewAllBlogsPage from "../pages/user/blogs/ViewAllBlogs";

// Layout that wraps protected routes
const MainLayout = () => (
  <div>
    <HeaderNav />
    <Outlet />
    <AppFooter />
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
          <Route path="/manage-orders" element={<UserOrderPage />} />
          <Route path="/settings" element={<AdminSettingsPage />} />
          <Route path="/blogs" element={<ViewAllBlogsPage />} />

          {/* Admin-only routes */}
          <Route
            element={<RoleProtectedRouteWrapper allowedRoles={["admin"]} />}
          >
            {/* Admin Routers */}
            <Route
              path="/home/admin-dashboard"
              element={<AdminDashboardPage />}
            />

            {/* User Routers for Admin */}
            <Route
              path="/admin/users/manage-users"
              element={<ManageUsersPage />}
            />
            <Route
              path="/admin/users/create-user"
              element={<CreateUserPage />}
            />
            <Route
              path="/admin/users/view-all-users/:id"
              element={<ViewUserPage />}
            />
            <Route path="/admin/users/edit/:id" element={<UpdateUserPage />} />
            <Route
              path="/admin/users/delete/:id"
              element={<DeleteUsersPage />}
            />

            {/* Product Routers for Admin */}
            <Route
              path="/admin/products/manage-products"
              element={<ManageProductsPage />}
            />
            <Route
              path="/admin/products/create-product"
              element={<CreateProductPage />}
            />
            <Route
              path="/admin/products/edit/:id"
              element={<UpdateProductPage />}
            />
            <Route
              path="/admin/products/delete/:id"
              element={<DeleteProductPage />}
            />

            {/* Order Routes for Admin */}
            <Route
              path="/admin/orders/manage-orders"
              element={<ManageAdminOrdersPage />}
            />

            {/* Blogs Router for Admin */}
            <Route path="/admin/blogs/get-all" element={<ManageBlogsPage />} />
            <Route path="/admin/blogs/create" element={<CreateBlogPage />} />
            <Route path="/admin/blogs/edit/:id" element={<UpdateBlogPage />} />
            <Route
              path="/admin/blogs/delete/:id"
              element={<DeleteBlogPage />}
            />
          </Route>
        </Route>
      </Route>

      {/* Fallback route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  </Router>
);
