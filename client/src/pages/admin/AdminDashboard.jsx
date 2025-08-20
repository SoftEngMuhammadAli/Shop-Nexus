import React, { useState } from "react";
import { useFetchData } from "../../hooks/useCustomHook";
import { AdminDashboardStatsCard } from "../../components/admin/AdminDashboardCard";
import AdminDashboardSideBar from "../../components/admin/AdminDashboardSideBar";
import DashboardTitleTile from "../../components/common/DashboardTitleTile";
import { FiMenu } from "react-icons/fi";
import { toast } from "react-toastify";
import { Loader } from "../../components/common/Loader";
import { ShowError } from "../../components/common/Error";

const AdminDashboardPage = () => {
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

  const {
    data: blogs,
    loading: blogsLoading,
    error: blogsError,
  } = useFetchData(`${import.meta.env.VITE_API_BASE_URL}/api/blogs`);

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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-10">
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

          <AdminDashboardStatsCard
            title="Total Blogs Published"
            count={blogs?.length}
            loading={blogsLoading}
          />
        </div>

        {/* Recently Added Products */}
        <div className="mb-10">
          <DashboardTitleTile
            title="Recently Added Products"
            buttonTitle="View All"
            onClick={() => {
              toast.info("Feature coming soon!");
            }}
          />
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
          <DashboardTitleTile
            title="Recently Added Blogs"
            buttonTitle="View All"
            onClick={() => {
              toast.info("Feature coming soon!");
            }}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {blogsLoading ? (
              <div className="col-span-1 sm:col-span-2 md:col-span-3 text-center py-6">
                <Loader />
              </div>
            ) : blogsError ? (
              <ShowError error={blogsError} />
            ) : blogs && blogs.length > 0 ? (
              blogs.slice(0, 6).map((blog) => (
                <div
                  key={blog._id}
                  className="bg-white shadow rounded-lg overflow-hidden hover:shadow-md transition"
                >
                  <div className="bg-gray-200 h-40 flex items-center justify-center text-gray-400">
                    <img
                      src={blog.coverImageUrl}
                      alt={blog.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-gray-800">
                      {blog.title}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                      {blog.content}
                    </p>
                    <div className="mt-4 flex justify-between items-center">
                      <span className="text-blue-600 font-semibold">
                        {blog.readingTime || "1m"} read
                      </span>
                      <button className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">
                        View Blog
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-1 sm:col-span-2 md:col-span-3 text-center py-6">
                <p className="text-gray-600">No blogs found.</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </section>
  );
};

export default AdminDashboardPage;
