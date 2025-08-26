import React from "react";

const ViewUserPage = () => {
  // dummy user data (replace later with real API data)
  const user = {
    name: "Ali Ijaz",
    email: "ali@example.com",
    role: "admin",
    isActive: true,
    createdAt: "2024-01-12T10:30:00Z",
  };

  return (
    <div className="max-w-2xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">👤 View User</h1>

      <div className="bg-white p-8 rounded-2xl shadow-lg space-y-4">
        <div>
          <p className="text-sm text-gray-500">Full Name</p>
          <p className="text-lg font-medium">{user.name}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Email</p>
          <p className="text-lg font-medium">{user.email}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Role</p>
          <span
            className={`px-3 py-1 rounded-lg text-sm font-medium ${
              user.role === "admin"
                ? "bg-red-100 text-red-600"
                : "bg-blue-100 text-blue-600"
            }`}
          >
            {user.role}
          </span>
        </div>

        <div>
          <p className="text-sm text-gray-500">Status</p>
          <span
            className={`px-3 py-1 rounded-lg text-sm font-medium ${
              user.isActive
                ? "bg-green-100 text-green-600"
                : "bg-gray-200 text-gray-600"
            }`}
          >
            {user.isActive ? "Active" : "Inactive"}
          </span>
        </div>

        <div>
          <p className="text-sm text-gray-500">Member Since</p>
          <p className="text-lg font-medium">
            {new Date(user.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ViewUserPage;
