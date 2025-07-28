import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../features/authSlice";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading, error } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const resultAction = await dispatch(
      loginUser({ email: formData.email, password: formData.password })
    );
    if (loginUser.fulfilled.match(resultAction)) {
      if (user?.userRole === "admin") navigate("/admin-dashboard");
      else if (user?.userRole === "user") navigate("/home");
      else if (user?.userRole === "super-admin")
        alert("Super Admin Dashboard is not ready yet!");
      else alert("Some Error while login");
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-white">
      {/* Left Panel */}
      <div className="bg-gradient-to-br from-indigo-600 to-blue-500 text-white p-10 flex flex-col justify-center items-center">
        <h1 className="text-4xl font-bold mb-4">Welcome Back 👋</h1>
        <p className="text-lg">
          Login to manage your account and explore more.
        </p>
        <img
          src="https://illustrations.popsy.co/white/login.svg"
          alt="login"
          className="w-80 mt-8 hidden md:block"
        />
      </div>

      {/* Right Panel - Login Form */}
      <div className="p-10 flex items-center justify-center">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Login to your account
          </h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-gray-600 font-medium mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block text-gray-600 font-medium mb-1">
                Password
              </label>
              <input
                type="password"
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400"
                placeholder="••••••••"
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-gray-600">
                <input
                  type="checkbox"
                  name="remember"
                  checked={formData.remember}
                  onChange={handleChange}
                />
                Remember me
              </label>
              <Link
                to="/forgot-password"
                className="text-indigo-600 hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 text-white font-semibold py-2 rounded-lg hover:bg-indigo-700 transition"
            >
              {loading ? "Logging in..." : "Log In"}
            </button>
          </form>

          {error && (
            <p className="text-red-600 text-sm mt-4 text-center">{error}</p>
          )}

          <p className="mt-6 text-center text-sm text-gray-600">
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="text-indigo-600 hover:underline font-medium"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
