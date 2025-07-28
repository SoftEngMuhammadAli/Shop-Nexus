import React from "react";
import HeaderNav from "../../components/common/HeaderNav";

const AdminDashboard = () => {
  return (
    <>
      <HeaderNav />

      <section className="flex min-h-screen bg-gray-100">
        {/* Sidebar */}
        <aside className="w-64 bg-blue-600 text-white p-6 space-y-4">
          <h2 className="text-xl font-bold">Admin Menu</h2>
          <ul className="space-y-3 text-white text-sm">
            <li>
              <a href="/admin-dashboard" className="hover:underline block">
                🏠 Dashboard
              </a>
            </li>
            <li>
              <a href="/manage-users" className="hover:underline block">
                👥 Manage Users
              </a>
            </li>
            <li>
              <a href="/manage-products" className="hover:underline block">
                📦 Manage Products
              </a>
            </li>
            <li>
              <a href="/manage-orders" className="hover:underline block">
                🧾 Manage Orders
              </a>
            </li>
            <li>
              <a href="/manage-blogs" className="hover:underline block">
                ✍️ Manage Blogs
              </a>
            </li>
            <li>
              <a href="/settings" className="hover:underline block">
                ⚙️ Settings
              </a>
            </li>
          </ul>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          <h1 className="text-3xl font-bold text-blue-700 mb-6">
            Admin Dashboard
          </h1>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {["Total Users", "Products", "Orders"].map((title, idx) => (
              <div key={idx} className="bg-white shadow-md p-6 rounded-xl">
                <h2 className="text-lg font-semibold text-gray-600">{title}</h2>
                <p className="text-2xl font-bold text-blue-600 mt-2">
                  {idx === 0 ? 150 : idx === 1 ? 320 : 89}
                </p>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="bg-white p-6 rounded-xl shadow-md mb-10">
            <h3 className="text-xl font-bold text-gray-700 mb-4">
              Quick Actions
            </h3>
            <div className="flex flex-wrap gap-4">
              <button className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition">
                Manage Users
              </button>
              <button className="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700 transition">
                Add Product
              </button>
              <button className="bg-yellow-500 text-white px-5 py-2 rounded hover:bg-yellow-600 transition">
                View Orders
              </button>
            </div>
          </div>

          {/* Recently Added Products */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-blue-700 mb-6">
              Recently Added Products
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((product) => (
                <div
                  key={product}
                  className="bg-white shadow rounded-lg overflow-hidden hover:shadow-md transition"
                >
                  <div className="bg-gray-200 h-40 flex items-center justify-center text-gray-400">
                    Image {product}
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-gray-800">
                      Product {product}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Short description of product {product}.
                    </p>
                    <div className="mt-4 flex justify-between items-center">
                      <span className="text-blue-600 font-semibold">
                        $19.99
                      </span>
                      <button className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recently Added Blogs */}
          <div>
            <h2 className="text-2xl font-bold text-blue-700 mb-6">
              Recently Added Blogs
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((blog) => (
                <div
                  key={blog}
                  className="bg-white shadow rounded-lg overflow-hidden hover:shadow-md transition"
                >
                  <div className="bg-gray-200 h-40 flex items-center justify-center text-gray-400">
                    Blog Image {blog}
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-gray-800">
                      Blog Title {blog}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Short description of blog {blog}.
                    </p>
                    <div className="mt-4 flex justify-between items-center">
                      <span className="text-blue-600 font-semibold">
                        Read More
                      </span>
                      <button className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">
                        View Blog
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </section>
    </>
  );
};

export default AdminDashboard;
