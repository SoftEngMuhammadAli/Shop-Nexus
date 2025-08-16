import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Sample cart data
const sampleCart = [
  {
    id: 1,
    name: "Laptop",
    price: 1200,
    image: "https://via.placeholder.com/100x80?text=Laptop",
    quantity: 1,
  },
  {
    id: 2,
    name: "Headphones",
    price: 150,
    image: "https://via.placeholder.com/100x80?text=Headphones",
    quantity: 2,
  },
];

const CartPage = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState(sampleCart);

  const handleQuantityChange = (id, newQuantity) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, newQuantity) } : item
      )
    );
  };

  const handleRemoveItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Your Cart</h1>

      {cartItems.length === 0 ? (
        <p className="text-center text-gray-500 mt-10">Your cart is empty.</p>
      ) : (
        <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow p-6">
          {/* Cart items */}
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:shadow-md transition"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-20 object-cover rounded-lg"
                  />
                  <div>
                    <h2 className="font-semibold text-lg">{item.name}</h2>
                    <p className="text-gray-500">${item.price}</p>
                  </div>
                </div>

                {/* Quantity selector */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      handleQuantityChange(item.id, item.quantity - 1)
                    }
                    className="bg-gray-200 px-2 rounded-lg hover:bg-gray-300 transition"
                  >
                    -
                  </button>
                  <span className="px-2">{item.quantity}</span>
                  <button
                    onClick={() =>
                      handleQuantityChange(item.id, item.quantity + 1)
                    }
                    className="bg-gray-200 px-2 rounded-lg hover:bg-gray-300 transition"
                  >
                    +
                  </button>
                </div>

                {/* Remove button */}
                <button
                  onClick={() => handleRemoveItem(item.id)}
                  className="text-red-600 hover:underline"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* Subtotal & checkout */}
          <div className="mt-6 flex flex-col sm:flex-row justify-between items-center border-t pt-4">
            <div className="text-lg font-semibold">
              Subtotal: <span className="text-indigo-600">${subtotal}</span>
            </div>
            <button
              onClick={navigate("/checkout")}
              className="mt-4 sm:mt-0 bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
