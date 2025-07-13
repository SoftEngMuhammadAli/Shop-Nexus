import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import React from "react";

const EmptyCart = () => {
  return (
    <div className="flex flex-col place-items-center items-center justify-center py-12">
      <div className="bg-gray-100 p-8 rounded-full mb-6">
        <FaShoppingCart className="text-5xl text-gray-400" />
      </div>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">
        Your Cart is Empty
      </h2>
      <p className="text-gray-600 mb-8 text-center max-w-md">
        Looks like you haven't added any items to your cart yet. Start shopping
        to fill it up!
      </p>
      <Link
        to="/products"
        className="bg-primary hover:bg-primary-dark text-white font-medium py-3 px-6 rounded-lg transition duration-300 flex items-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 mr-2"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm.707-10.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L9.414 11H13a1 1 0 100-2H9.414l1.293-1.293z"
            clipRule="evenodd"
          />
        </svg>
        Continue Shopping
      </Link>
    </div>
  );
};

export default EmptyCart;
