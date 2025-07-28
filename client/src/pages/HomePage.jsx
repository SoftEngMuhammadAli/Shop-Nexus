import React from "react";
import HeaderNav from "../components/common/HeaderNav";
import AppFooter from "../components/common/Footer";
import HeroSection from "../components/user/HeroSection";

const HomePage = () => {
  return (
    <>
      {/* Header Navigation */}
      <HeaderNav />

      {/* Hero Section */}
      <HeroSection />

      {/* Featured Products */}
      <section className="py-12 px-4 max-w-6xl mx-auto">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Featured Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((product) => (
            <div
              key={product}
              className="bg-white shadow rounded-lg overflow-hidden hover:shadow-md transition"
            >
              <div className="bg-gray-200 h-40 flex items-center justify-center text-gray-400">
                Image
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
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <AppFooter />
    </>
  );
};

export default HomePage;
