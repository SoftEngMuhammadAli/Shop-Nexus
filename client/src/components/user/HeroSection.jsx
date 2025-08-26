import React from "react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-r from-blue-600 to-indigo-700 text-white overflow-hidden">
      {/* Decorative Background Shapes */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-yellow-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute -bottom-16 right-0 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-32 text-center">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight drop-shadow-lg">
          Welcome to <span className="text-yellow-300">Shop Nexus</span>
        </h1>
        <p className="mt-6 text-lg md:text-xl lg:text-2xl text-white/90">
          Your one-stop shop for everything from gadgets to groceries. Find the
          best deals and latest trends, all in one place.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/products"
            className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-semibold px-8 py-4 rounded-full shadow-lg transform hover:scale-105 transition duration-300"
          >
            🛍️ Start Shopping
          </Link>
          <Link
            to="/about"
            className="bg-white/20 hover:bg-white/30 text-white font-semibold px-8 py-4 rounded-full shadow-lg transform hover:scale-105 transition duration-300"
          >
            Learn More
          </Link>
        </div>
      </div>

      {/* Optional Texture Overlay */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
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
