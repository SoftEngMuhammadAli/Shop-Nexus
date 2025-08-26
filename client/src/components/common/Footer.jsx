import React, { useState, useEffect } from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaArrowUp,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const AppFooter = () => {
  const [showTopButton, setShowTopButton] = useState(false);

  // Show button when scrolling down
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowTopButton(true);
      } else {
        setShowTopButton(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-gradient-to-r from-black to-gray-900 text-white pt-12 relative overflow-hidden">
      {/* Decorative shapes */}
      <div className="absolute -top-10 -left-10 w-48 h-48 bg-yellow-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-4">
        {/* Top Footer */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10 text-left">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-bold mb-4">Shop Nexus</h3>
            <p className="text-gray-200 text-sm">
              Your one-stop shop for gadgets, groceries, and much more. Quality
              products delivered to your door.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-200 text-sm">
              {["Home", "Products", "Blogs", "About Us", "Contact"].map(
                (link) => (
                  <li key={link}>
                    <Link
                      to={`/${link === "Home" ? "" : link.toLowerCase()}`}
                      className="hover:text-yellow-400 transition duration-300"
                    >
                      {link}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-xl font-bold mb-4">Customer Service</h3>
            <ul className="space-y-2 text-gray-200 text-sm">
              {["FAQ", "Shipping", "Returns", "Support"].map((link) => (
                <li key={link}>
                  <Link
                    to={`/${link.toLowerCase()}`}
                    className="hover:text-yellow-400 transition duration-300"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-xl font-bold mb-4">Newsletter</h3>
            <p className="text-gray-200 text-sm mb-4">
              Subscribe to get latest deals & blogs.
            </p>
            <form className="flex flex-col gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full p-2 rounded-full text-gray-800 placeholder-gray-400 
             border border-white focus:border-yellow-400 
             focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
              />
              <button className="bg-yellow-400 px-4 py-2 rounded-full font-semibold hover:bg-yellow-500 hover:scale-105 transform transition duration-300">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/20 mb-6"></div>

        {/* Bottom Footer */}
        <div className="flex flex-col mb-5 sm:flex-row justify-between items-center text-gray-200 text-sm">
          <p>© {new Date().getFullYear()} Shop Nexus. All rights reserved.</p>
          <div className="flex space-x-4 mt-2 sm:mt-0">
            {[FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn].map(
              (Icon, idx) => (
                <a
                  key={idx}
                  href="#"
                  className="hover:text-yellow-400 transition transform hover:scale-125 duration-300"
                >
                  <Icon />
                </a>
              )
            )}
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      {showTopButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-yellow-400 text-black p-3 rounded-full shadow-lg hover:bg-yellow-500 hover:scale-110 transform transition duration-300"
        >
          <FaArrowUp />
        </button>
      )}
    </footer>
  );
};

export default AppFooter;
