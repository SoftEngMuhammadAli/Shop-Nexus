import React from "react";
import { FiUser, FiLock, FiSliders } from "react-icons/fi";

const AdminSettingsPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">
        ⚙️ Admin Settings
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Profile Settings */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center gap-2 mb-4">
            <FiUser className="text-blue-600 text-xl" />
            <h2 className="text-xl font-semibold text-gray-700">
              Profile Settings
            </h2>
          </div>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Name
              </label>
              <input
                type="text"
                className="w-full border rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Admin Name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Email
              </label>
              <input
                type="email"
                className="w-full border rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="admin@example.com"
              />
            </div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
              Save Profile
            </button>
          </form>
        </div>

        {/* Security Settings */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center gap-2 mb-4">
            <FiLock className="text-red-600 text-xl" />
            <h2 className="text-xl font-semibold text-gray-700">
              Security Settings
            </h2>
          </div>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Current Password
              </label>
              <input
                type="password"
                className="w-full border rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="••••••••"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">
                New Password
              </label>
              <input
                type="password"
                className="w-full border rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="••••••••"
              />
            </div>
            <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition">
              Update Password
            </button>
          </form>
        </div>

        {/* Preferences */}
        <div className="bg-white rounded-xl shadow-md p-6 lg:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <FiSliders className="text-green-600 text-xl" />
            <h2 className="text-xl font-semibold text-gray-700">Preferences</h2>
          </div>
          <form className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Enable Dark Mode</span>
              <input type="checkbox" className="w-5 h-5" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Email Notifications</span>
              <input type="checkbox" className="w-5 h-5" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Auto-Update</span>
              <input type="checkbox" className="w-5 h-5" />
            </div>
            <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition">
              Save Preferences
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminSettingsPage;
