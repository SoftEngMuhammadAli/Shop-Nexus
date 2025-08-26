import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../../features/userSlice";
import { useNavigate } from "react-router-dom";
import { ShowError } from "../../../components/common/Error";
import { Loader } from "../../../components/common/Loader";
import SearchBar from "../../../components/common/SearchBar";
import { toast } from "react-toastify";
import { FiMail, FiShield, FiUser } from "react-icons/fi";

const ManageUsers = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { users, loading, error } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  if (loading) return <Loader />;
  if (error) return <ShowError error={error} />;

  return (
    <div className="container mx-auto px-4 py-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">
        <h1 className="text-4xl font-semibold">👥 Manage Users</h1>

        {/* Search + Filters */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <SearchBar />
          <select
            name="userRole"
            id="userRole"
            className="bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-700 px-3 py-2 rounded-xl text-sm font-medium shadow-sm transition"
          >
            <option value="">All Roles</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
        </div>
      </div>

      {/* Grid Layout for Users */}
      {users?.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {users.map((user, index) => (
            <div
              key={user._id}
              className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 hover:shadow-xl transition transform hover:-translate-y-1"
            >
              {/* Index Badge */}
              <div className="text-xs font-semibold text-gray-400 mb-2">
                #{index + 1}
              </div>

              {/* User Header */}
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 flex items-center justify-center bg-gradient-to-r from-blue-400 to-indigo-500 text-white font-bold rounded-full shadow-md">
                  {user.name?.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {user.name}
                  </h3>
                  <p className="text-sm text-gray-500 flex items-center gap-1">
                    <FiMail className="w-4 h-4" /> {user.email}
                  </p>
                </div>
              </div>

              {/* Role */}
              <div className="flex items-center gap-2 mb-5">
                <FiShield className="w-4 h-4 text-gray-500" />
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    user.userRole === "admin"
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {user.userRole}
                </span>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={() => navigate(`/admin/users/${user._id}`)}
                  className="flex items-center gap-1 bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg text-xs shadow-sm transition"
                >
                  <FiUser /> View
                </button>
                <button
                  onClick={() => navigate(`/admin/users/edit/${user._id}`)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-2 rounded-lg text-xs shadow-sm transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => toast.info("Delete feature coming soon!")}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg text-xs shadow-sm transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-lg text-gray-500 mt-10">
          No users found 🙁
        </p>
      )}
    </div>
  );
};

export default ManageUsers;
