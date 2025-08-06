import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";
import { logout as logoutAction } from "../../features/authSlice";

const HeaderNav = () => {
  const { isAuthenticated, logout } = useAuth();
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    dispatch(logoutAction());
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    alert("Logout Successful!");
    navigate("/login");
  };

  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
      {/* Logo or Home Link */}
      {user && isAuthenticated && user.userRole === "user" && (
        <Link to="/home" className="text-xl font-bold">
          🛒 E-Commerce
        </Link>
      )}

      {user && isAuthenticated && user.userRole === "admin" && (
        <Link to="/admin-dashboard" className="text-xl font-bold">
          🛒 ShopNexus
        </Link>
      )}

      {user && isAuthenticated && user.userRole === "super-admin" && (
        <Link to="/super-admin-dashboard" className="text-xl font-bold">
          🛒 ShopNexus
        </Link>
      )}

      <div className="flex gap-4 items-center">
        {/* Public Links */}
        {!isAuthenticated && (
          <>
            <Link to="/login" className="hover:underline">
              Login
            </Link>
            <Link to="/register" className="hover:underline">
              Register
            </Link>
          </>
        )}

        {/* User Links */}
        {isAuthenticated && user.userRole === "user" && (
          <>
            <Link to="/home" className="hover:underline">
              Home
            </Link>
            <Link to="/products" className="hover:underline">
              Products
            </Link>
            <Link to="/cart" className="hover:underline">
              Cart
            </Link>
            <Link to="/orders" className="hover:underline">
              Orders
            </Link>
          </>
        )}

        {/* Admin Links */}
        {isAuthenticated && user.userRole === "admin" && (
          <>
            <Link to="/admin-dashboard" className="hover:underline">
              Dashboard
            </Link>
            <Link to="/manage-users" className="hover:underline">
              Manage Users
            </Link>
            <Link to="/manage-products" className="hover:underline">
              Manage Products
            </Link>
            <Link to="/manage-orders" className="hover:underline">
              Manage Orders
            </Link>
            <Link to="/manage-blogs" className="hover:underline">
              Manage Blogs
            </Link>
            <Link to="/settings" className="hover:underline">
              Settings
            </Link>
          </>
        )}

        {/* Super Admin Links */}
        {isAuthenticated && user.userRole === "superadmin" && (
          <>
            <Link to="/admin-dashboard" className="hover:underline">
              Admin Dashboard
            </Link>
            <Link to="/super-admin-dashboard" className="hover:underline">
              Super Admin
            </Link>
          </>
        )}

        {/* Logout Button */}
        {isAuthenticated && (
          <button
            onClick={handleLogout}
            className="ml-2 bg-white text-blue-600 px-3 py-1 rounded"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default HeaderNav;
