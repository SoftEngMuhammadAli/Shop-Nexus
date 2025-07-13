import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "Summer Collection",
      subtitle: "New Arrivals 2024",
      description: "Discover our latest summer fashion trends",
      buttonText: "Shop Now",
      image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b",
      bgColor: "bg-gradient-to-r from-pink-100 to-purple-100",
    },
    {
      title: "Winter Specials",
      subtitle: "Up to 50% Off",
      description: "Warm and cozy styles for the season",
      buttonText: "View Deals",
      image: "https://images.unsplash.com/photo-1516762689617-e1cffcef479d",
      bgColor: "bg-gradient-to-r from-blue-100 to-indigo-100",
    },
    {
      title: "Tech Gadgets",
      subtitle: "Innovation Awaits",
      description: "The newest tech at unbeatable prices",
      buttonText: "Explore",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
      bgColor: "bg-gradient-to-r from-gray-100 to-blue-50",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="relative h-[500px] overflow-hidden">
      {/* Slides */}
      <div
        className="flex h-full transition-transform duration-1000 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`flex-shrink-0 w-full h-full ${slide.bgColor} flex items-center`}
          >
            <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
              {/* Text Content */}
              <div className="md:w-1/2 text-center md:text-left mb-8 md:mb-0">
                <p className="text-lg md:text-xl text-gray-600 mb-2">
                  {slide.subtitle}
                </p>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                  {slide.title}
                </h1>
                <p className="text-lg text-gray-600 mb-6">
                  {slide.description}
                </p>
                <Link
                  to="/products"
                  className="inline-block bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition duration-300"
                >
                  {slide.buttonText}
                </Link>
              </div>

              {/* Image */}
              <div className="md:w-1/2 flex justify-center">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="max-h-80 md:max-h-96 object-contain rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Indicators */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full ${
              currentSlide === index ? "bg-primary" : "bg-gray-300"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={() =>
          setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
        }
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md hover:bg-white"
        aria-label="Previous slide"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>
      <button
        onClick={() =>
          setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
        }
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md hover:bg-white"
        aria-label="Next slide"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </div>
  );
};

export default Hero;
