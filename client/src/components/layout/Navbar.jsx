import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaShoppingCart, FaUser, FaBars, FaTimes } from "react-icons/fa";
import { MdAdminPanelSettings } from "react-icons/md";

const Navbar = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  // Add scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Calculate total cart items
  const cartItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-lg" : "bg-white shadow-sm"
      }`}
    >
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold text-primary hover:text-primary-dark transition-colors"
          aria-label="ShopNexus Home"
        >
          ShopNexus
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6 items-center">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `transition-colors ${
                isActive
                  ? "text-primary font-medium"
                  : "text-gray-600 hover:text-primary"
              }`
            }
            aria-current="page"
          >
            Home
          </NavLink>
          <NavLink
            to="/products"
            className={({ isActive }) =>
              `transition-colors ${
                isActive
                  ? "text-primary font-medium"
                  : "text-gray-600 hover:text-primary"
              }`
            }
          >
            Products
          </NavLink>
          {user?.role === "admin" && (
            <NavLink
              to="/admin/dashboard"
              className={({ isActive }) =>
                `flex items-center gap-1 transition-colors ${
                  isActive
                    ? "text-primary font-medium"
                    : "text-gray-600 hover:text-primary"
                }`
              }
            >
              <MdAdminPanelSettings />
              Dashboard
            </NavLink>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-gray-700 hover:text-primary focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <FaTimes className="text-xl" />
          ) : (
            <FaBars className="text-xl" />
          )}
        </button>

        {/* User Actions */}
        <div className="flex items-center space-x-4">
          <Link
            to="/cart"
            className="relative hover:text-primary transition-colors"
            aria-label="Shopping Cart"
          >
            <FaShoppingCart className="text-xl" />
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </Link>

          <Link
            to={user ? "/profile" : "/login"}
            className="ml-2 hover:text-primary transition-colors"
            aria-label={user ? "User Profile" : "Login"}
          >
            <div className="flex items-center space-x-1">
              <FaUser className="text-xl" />
              {user && (
                <span className="hidden md:inline max-w-[100px] truncate">
                  {user.name}
                </span>
              )}
            </div>
          </Link>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-md">
          <nav className="container mx-auto px-4 py-3 flex flex-col space-y-3">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `py-2 transition-colors ${
                  isActive
                    ? "text-primary font-medium"
                    : "text-gray-600 hover:text-primary"
                }`
              }
              aria-current="page"
            >
              Home
            </NavLink>
            <NavLink
              to="/products"
              className={({ isActive }) =>
                `py-2 transition-colors ${
                  isActive
                    ? "text-primary font-medium"
                    : "text-gray-600 hover:text-primary"
                }`
              }
            >
              Products
            </NavLink>
            {user?.role === "admin" && (
              <NavLink
                to="/admin/dashboard"
                className={({ isActive }) =>
                  `py-2 flex items-center gap-1 transition-colors ${
                    isActive
                      ? "text-primary font-medium"
                      : "text-gray-600 hover:text-primary"
                  }`
                }
              >
                <MdAdminPanelSettings />
                Dashboard
              </NavLink>
            )}
            {user && (
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  `py-2 transition-colors ${
                    isActive
                      ? "text-primary font-medium"
                      : "text-gray-600 hover:text-primary"
                  }`
                }
              >
                My Profile
              </NavLink>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
