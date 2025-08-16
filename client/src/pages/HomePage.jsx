import React, { useState } from "react";
import AppFooter from "../components/common/Footer";
import HeroSection from "../components/user/HeroSection";

// Sample categories
const categories = [
  {
    id: 1,
    name: "Electronics",
    image: "https://via.placeholder.com/150x100?text=Electronics",
  },
  {
    id: 2,
    name: "Accessories",
    image: "https://via.placeholder.com/150x100?text=Accessories",
  },
  {
    id: 3,
    name: "Smart Devices",
    image: "https://via.placeholder.com/150x100?text=Smart+Devices",
  },
  {
    id: 4,
    name: "Fashion",
    image: "https://via.placeholder.com/150x100?text=Fashion",
  },
  {
    id: 5,
    name: "Home Appliances",
    image: "https://via.placeholder.com/150x100?text=Home+Appliances",
  },
];

// Sample products
const products = [
  {
    id: 1,
    name: "Laptop",
    price: 1200,
    category: "Electronics",
    image: "https://via.placeholder.com/300x250?text=Laptop",
  },
  {
    id: 2,
    name: "Headphones",
    price: 150,
    category: "Accessories",
    image: "https://via.placeholder.com/300x250?text=Headphones",
  },
  {
    id: 3,
    name: "Smartwatch",
    price: 200,
    category: "Smart Devices",
    image: "https://via.placeholder.com/300x250?text=Smartwatch",
  },
  {
    id: 4,
    name: "Camera",
    price: 500,
    category: "Electronics",
    image: "https://via.placeholder.com/300x250?text=Camera",
  },
  {
    id: 5,
    name: "Shoes",
    price: 80,
    category: "Fashion",
    image: "https://via.placeholder.com/300x250?text=Shoes",
  },
  {
    id: 6,
    name: "Blender",
    price: 60,
    category: "Home Appliances",
    image: "https://via.placeholder.com/300x250?text=Blender",
  },
];

// Sample blogs
const blogs = [
  {
    id: 1,
    title: "How to Choose the Best Laptop in 2025",
    excerpt: "Tips and tricks for picking the perfect laptop for your needs.",
    image: "https://via.placeholder.com/400x200?text=Blog+1",
  },
  {
    id: 2,
    title: "Top 10 Gadgets You Must Have",
    excerpt: "A curated list of must-have gadgets for tech enthusiasts.",
    image: "https://via.placeholder.com/400x200?text=Blog+2",
  },
  {
    id: 3,
    title: "Smartwatch Buying Guide",
    excerpt: "Everything you need to know before buying a smartwatch.",
    image: "https://via.placeholder.com/400x200?text=Blog+3",
  },
];

const HomePage = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  return (
    <>
      {/* Hero Section / Carousel */}
      <HeroSection />

      {/* Categories Section */}
      <section className="py-8 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Shop by Category
          </h2>
          <div className="flex space-x-4 overflow-x-auto scrollbar-hide py-2">
            <div
              onClick={() => setSelectedCategory("All")}
              className={`flex-shrink-0 cursor-pointer px-4 py-2 rounded-lg border border-gray-300 ${
                selectedCategory === "All"
                  ? "bg-indigo-600 text-white"
                  : "bg-white text-gray-800"
              }`}
            >
              All
            </div>
            {categories.map((cat) => (
              <div
                key={cat.id}
                onClick={() => setSelectedCategory(cat.name)}
                className={`flex-shrink-0 cursor-pointer relative w-36 h-24 rounded-lg overflow-hidden hover:shadow-lg transition ${
                  selectedCategory === cat.name ? "ring-2 ring-indigo-600" : ""
                }`}
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-25 flex items-center justify-center">
                  <span className="text-white font-semibold">{cat.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Featured Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white shadow rounded-lg overflow-hidden hover:shadow-xl hover:scale-105 transform transition"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-48 w-full object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-bold text-gray-800">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {product.category}
                  </p>
                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-blue-600 font-semibold">
                      ${product.price}
                    </span>
                    <button className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trending / Recommended Products */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Trending Products
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 overflow-x-auto scrollbar-hide">
            {products.map((p) => (
              <div
                key={p.id}
                className="bg-white shadow rounded-lg p-2 hover:shadow-lg transition flex-shrink-0 w-44"
              >
                <img
                  src={p.image}
                  alt={p.name}
                  className="h-32 w-full object-cover rounded"
                />
                <h3 className="text-sm font-semibold mt-2">{p.name}</h3>
                <p className="text-blue-600 font-bold">${p.price}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Blogs */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Latest Blogs
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {blogs.map((blog) => (
              <div
                key={blog.id}
                className="bg-white shadow rounded-lg overflow-hidden hover:shadow-lg transition"
              >
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="h-40 w-full object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-bold text-gray-800">
                    {blog.title}
                  </h3>
                  <p className="text-sm text-gray-600 mt-2">{blog.excerpt}</p>
                  <button className="mt-4 text-blue-600 font-semibold hover:underline">
                    Read More
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Subscription */}
      <section className="py-12 px-4 bg-indigo-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-semibold mb-4">
            Subscribe to Our Newsletter
          </h2>
          <p className="mb-6">
            Get the latest updates on products, deals, and blogs delivered to
            your inbox.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="p-3 rounded-lg w-full sm:w-1/2 text-gray-800"
            />
            <button className="bg-white text-indigo-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <AppFooter />
    </>
  );
};

export default HomePage;
