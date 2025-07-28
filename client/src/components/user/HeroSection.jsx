import React from "react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-24 px-6 text-center overflow-hidden">
      <div className="max-w-3xl mx-auto z-10 relative">
        <h1 className="text-5xl md:text-6xl font-extrabold leading-tight drop-shadow-lg">
          Welcome to <span className="text-yellow-300">Shop Nexus</span>
        </h1>
        <p className="mt-6 text-lg md:text-xl text-white/90">
          Your one-stop shop for everything from gadgets to groceries.
        </p>
        <Link
          to="/products"
          className="mt-8 inline-block bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-semibold px-8 py-3 rounded-full shadow-md transition duration-300"
        >
          🛍️ Start Shopping
        </Link>
      </div>

      {/* Background graphics (optional enhancement) */}
      <div className="absolute inset-0 opacity-10">
        <img
          src="https://www.transparenttextures.com/patterns/arches.png"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
    </section>
  );
};

export default HeroSection;
