import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFetchData } from "../../hooks/useCustomHook";
import { AdminDashboardStatsCard } from "../../components/admin/AdminDashboardCard";

// React Icons
import { FiMenu } from "react-icons/fi";
import AdminDashboardSideBar from "../../components/admin/AdminDashboardSideBar";

const AdminDashboardPage = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { data: users, loading: usersLoading } = useFetchData(
    `${import.meta.env.VITE_API_BASE_URL}/api/users/all`
  );

  const { data: products, loading: productsLoading } = useFetchData(
    `${import.meta.env.VITE_API_BASE_URL}/api/products/all`
  );

  const { data: orders, loading: ordersLoading } = useFetchData(
    `${import.meta.env.VITE_API_BASE_URL}/api/orders/all`
  );

  return (
    <section className="flex min-h-screen bg-gray-100">
      {/* AdminSideBar */}
      <AdminDashboardSideBar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        {/* Topbar */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-blue-700">Admin Dashboard</h1>
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden text-blue-700"
          >
            <FiMenu size={26} />
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          <AdminDashboardStatsCard
            title="Total Users"
            count={users?.length}
            loading={usersLoading}
          />

          <AdminDashboardStatsCard
            title="Total Products"
            count={products?.length}
            loading={productsLoading}
          />

          <AdminDashboardStatsCard
            title="Total Orders"
            count={orders?.length}
            loading={ordersLoading}
          />
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
                    <span className="text-blue-600 font-semibold">$19.99</span>
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
  );
};

export default AdminDashboardPage;
