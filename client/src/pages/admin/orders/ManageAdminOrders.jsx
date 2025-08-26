import React from "react";
import { useFetchData } from "../../../hooks/useCustomHook";

const ManageAdminOrdersPage = () => {
  const { data: orders, loading: ordersLoading } = useFetchData(
    `${import.meta.env.VITE_API_BASE_URL}/api/orders/all`
  );

  if (ordersLoading) {
    return (
      <div className="flex justify-center items-center py-20 text-gray-500">
        <p>Loading orders...</p>
      </div>
    );
  }

  return (
    <div className="px-8 py-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">
        🛒 Manage Orders
      </h1>

      {orders && orders.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 shadow-md rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border">Order ID</th>
                <th className="px-4 py-2 border">Customer</th>
                <th className="px-4 py-2 border">Total</th>
                <th className="px-4 py-2 border">Status</th>
                <th className="px-4 py-2 border">Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id} className="text-center">
                  <td className="px-4 py-2 border">{order._id}</td>
                  <td className="px-4 py-2 border">{order.customerName}</td>
                  <td className="px-4 py-2 border">
                    ${order.total.toFixed(2)}
                  </td>
                  <td className="px-4 py-2 border">{order.status}</td>
                  <td className="px-4 py-2 border">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-gray-500">
          <p className="text-lg font-medium">No orders found</p>
          <p className="text-sm">Start by adding your first order!</p>
        </div>
      )}
    </div>
  );
};

export default ManageAdminOrdersPage;
