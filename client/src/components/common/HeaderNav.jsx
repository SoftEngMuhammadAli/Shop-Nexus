import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";
import { logout as logoutAction } from "../../features/authSlice";
import { CiMenuFries } from "react-icons/ci";
import { FaRegWindowClose } from "react-icons/fa";

const HeaderNav = () => {
  const { isAuthenticated, logout } = useAuth();
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    dispatch(logoutAction());
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    alert("Logout Successful!");
    navigate("/login");
  };

  // Build links based on role
  const getLinks = () => {
    if (!isAuthenticated) {
      return [
        { to: "/login", label: "Login" },
        { to: "/register", label: "Register" },
      ];
    }

    if (user?.userRole === "user") {
      return [
        { to: "/home", label: "Home" },
        { to: "/products", label: "Products" },
        { to: "/cart", label: "Cart" },
        { to: "/orders", label: "Orders" },
      ];
    }

    if (user?.userRole === "admin") {
      return [
        { to: "/home/admin-dashboard", label: "Dashboard" },
        { to: "/admin/manage-users", label: "Manage Users" },
        { to: "/admin/manage-products", label: "Manage Products" },
        { to: "/manage-orders", label: "Manage Orders" },
        { to: "/admin/blogs/get-all", label: "Manage Blogs" },
        { to: "/settings", label: "Settings" },
      ];
    }

    if (user?.userRole === "super-admin") {
      return [
        { to: "/super-admin-dashboard", label: "Super Admin Dashboard" },
        { to: "/admin-dashboard", label: "Admin Panel" },
      ];
    }

    return [];
  };

  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center relative">
      {/* Logo */}
      {user && isAuthenticated && (
        <Link
          to={
            user.userRole === "user"
              ? "/home"
              : user.userRole === "admin"
              ? "/home/admin-dashboard"
              : "/super-admin-dashboard"
          }
          className="text-xl font-bold"
        >
          🛒 ShopNexus
        </Link>
      )}

      {/* Desktop Links */}
      <div className="hidden md:flex gap-4 items-center">
        {getLinks().map((link) => (
          <Link key={link.to} to={link.to} className="hover:underline">
            {link.label}
          </Link>
        ))}
        {isAuthenticated && (
          <button
            onClick={handleLogout}
            className="ml-2 bg-white text-blue-600 px-3 py-1 rounded hover:bg-gray-100"
          >
            Logout
          </button>
        )}
      </div>

      {/* Mobile Hamburger */}
      <div className="md:hidden">
        <button onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? (
            <FaRegWindowClose size={28} />
          ) : (
            <CiMenuFries size={28} />
          )}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="absolute top-16 right-0 bg-blue-600 w-56 p-4 rounded-lg shadow-lg md:hidden">
          <div className="flex flex-col gap-3">
            {getLinks().map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="hover:underline"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            {isAuthenticated && (
              <button
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
                className="bg-white text-blue-600 px-3 py-1 rounded hover:bg-gray-100"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default HeaderNav;
