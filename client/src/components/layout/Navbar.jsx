import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaShoppingCart, FaUser } from "react-icons/fa";

const Navbar = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-primary">
          ShopNexus
        </Link>

        <nav className="hidden md:flex space-x-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-primary font-medium"
                : "text-gray-600 hover:text-primary"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/products"
            className={({ isActive }) =>
              isActive
                ? "text-primary font-medium"
                : "text-gray-600 hover:text-primary"
            }
          >
            Products
          </NavLink>
          {user?.role === "admin" && (
            <NavLink
              to="/admin/dashboard"
              className={({ isActive }) =>
                isActive
                  ? "text-primary font-medium"
                  : "text-gray-600 hover:text-primary"
              }
            >
              Dashboard
            </NavLink>
          )}
        </nav>

        <div className="flex items-center space-x-4">
          <Link to="/cart" className="relative">
            <FaShoppingCart className="text-xl text-gray-700 hover:text-primary" />
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
              </span>
            )}
          </Link>

          <Link to={user ? "/profile" : "/login"} className="ml-2">
            <div className="flex items-center space-x-1">
              <FaUser className="text-xl text-gray-700 hover:text-primary" />
              {user && <span className="hidden md:inline">{user.name}</span>}
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
