import React, { useState } from "react";
import { FiTrash2 } from "react-icons/fi";

const DeleteUsersPage = () => {
  // Dummy users (replace with API later)
  const [users, setUsers] = useState([
    { id: 1, name: "Ali Raza", email: "ali@example.com", role: "admin" },
    { id: 2, name: "Sara Khan", email: "sara@example.com", role: "user" },
    { id: 3, name: "John Doe", email: "john@example.com", role: "user" },
  ]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setUsers(users.filter((user) => user.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-6">
        <h1 className="text-2xl font-bold text-red-600 mb-6">
          🗑️ Delete Users
        </h1>

        {users.length > 0 ? (
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-red-100 text-left">
                <th className="p-3 font-semibold">Name</th>
                <th className="p-3 font-semibold">Email</th>
                <th className="p-3 font-semibold">Role</th>
                <th className="p-3 font-semibold text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr
                  key={user.id}
                  className="border-b hover:bg-red-50 transition"
                >
                  <td className="p-3">{user.name}</td>
                  <td className="p-3">{user.email}</td>
                  <td className="p-3 capitalize">{user.role}</td>
                  <td className="p-3 text-center">
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600 transition flex items-center gap-2 mx-auto"
                    >
                      <FiTrash2 /> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-600 text-center">No users found.</p>
        )}
      </div>
    </div>
  );
};

export default DeleteUsersPage;
