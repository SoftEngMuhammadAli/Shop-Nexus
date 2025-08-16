import React from "react";

// Sample order data
const sampleOrders = [
  {
    id: "ORD-1001",
    date: "2025-08-17",
    items: [
      { name: "Laptop", quantity: 1, price: 1200 },
      { name: "Headphones", quantity: 2, price: 150 },
    ],
    total: 1500,
    status: "Delivered",
  },
  {
    id: "ORD-1002",
    date: "2025-08-15",
    items: [
      { name: "Smartwatch", quantity: 1, price: 200 },
      { name: "Camera", quantity: 1, price: 500 },
    ],
    total: 700,
    status: "Processing",
  },
];

const OrderPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Your Orders</h1>

      {sampleOrders.length === 0 ? (
        <p className="text-center text-gray-500 mt-10">
          You have no orders yet.
        </p>
      ) : (
        <div className="max-w-5xl mx-auto space-y-6">
          {sampleOrders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-2xl shadow p-6 hover:shadow-lg transition"
            >
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h2 className="text-lg font-semibold">{order.id}</h2>
                  <p className="text-gray-500 text-sm">{order.date}</p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    order.status === "Delivered"
                      ? "bg-green-100 text-green-800"
                      : order.status === "Processing"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {order.status}
                </span>
              </div>

              <div className="border-t pt-4 space-y-2">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between text-gray-700">
                    <p>
                      {item.name} x{item.quantity}
                    </p>
                    <p>${item.price * item.quantity}</p>
                  </div>
                ))}
              </div>

              <div className="mt-4 border-t pt-4 flex justify-between text-lg font-semibold">
                <span>Total:</span>
                <span className="text-indigo-600">${order.total}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderPage;
