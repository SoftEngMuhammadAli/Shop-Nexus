import React, { useState } from "react";

const CreateUserPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    userRole: "user",
    profilePicture: "",
    bio: "",
    isActive: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("User Data Submitted:", formData);
    // TODO: send formData to backend API
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-6">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-blue-700 mb-6">
          ➕ Create New User
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter full name"
              value={formData.name}
              onChange={handleChange}
              className="mt-2 w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              placeholder="user@example.com"
              value={formData.email}
              onChange={handleChange}
              className="mt-2 w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="At least 8 characters"
              value={formData.password}
              onChange={handleChange}
              className="mt-2 w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              required
            />
          </div>

          {/* User Role */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              User Role
            </label>
            <select
              name="userRole"
              value={formData.userRole}
              onChange={handleChange}
              className="mt-2 w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            >
              <option value="user">👤 User</option>
              <option value="admin">🛠️ Admin</option>
            </select>
          </div>

          {/* Profile Picture */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Profile Picture URL
            </label>
            <input
              type="url"
              name="profilePicture"
              placeholder="https://example.com/photo.jpg"
              value={formData.profilePicture}
              onChange={handleChange}
              className="mt-2 w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
            {formData.profilePicture && (
              <img
                src={formData.profilePicture}
                alt="Preview"
                className="mt-4 w-24 h-24 object-cover rounded-full border"
              />
            )}
          </div>

          {/* Bio */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Bio
            </label>
            <textarea
              name="bio"
              placeholder="Write a short bio..."
              value={formData.bio}
              onChange={handleChange}
              rows="4"
              className="mt-2 w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            ></textarea>
          </div>

          {/* Active Status */}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="isActive"
              checked={formData.isActive}
              onChange={handleChange}
              className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
            />
            <label className="text-sm text-gray-700">Active User</label>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold shadow-md hover:bg-blue-700 transition"
          >
            🚀 Create User
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateUserPage;
