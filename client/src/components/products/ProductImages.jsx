import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const ProductImages = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const selectImage = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="flex flex-col md:flex-row gap-4">
      {/* Thumbnail Gallery (vertical on desktop) */}
      <div className="hidden md:flex flex-col gap-2 order-2 md:order-1">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => selectImage(index)}
            className={`w-16 h-16 overflow-hidden rounded-md border-2 ${
              currentIndex === index ? "border-primary" : "border-transparent"
            }`}
          >
            <img
              src={image.url}
              alt={`Thumbnail ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>

      {/* Main Image */}
      <div className="relative order-1 md:order-2 flex-grow">
        <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
          <img
            src={images[currentIndex]?.url}
            alt={`Product view ${currentIndex + 1}`}
            className="w-full h-full object-contain"
          />
        </div>

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md hover:bg-white transition"
              aria-label="Previous image"
            >
              <FaChevronLeft className="text-gray-700" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md hover:bg-white transition"
              aria-label="Next image"
            >
              <FaChevronRight className="text-gray-700" />
            </button>
          </>
        )}

        {/* Mobile Thumbnails (horizontal) */}
        <div className="flex md:hidden gap-2 mt-4 overflow-x-auto py-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => selectImage(index)}
              className={`flex-shrink-0 w-12 h-12 overflow-hidden rounded-md border-2 ${
                currentIndex === index ? "border-primary" : "border-transparent"
              }`}
            >
              <img
                src={image.url}
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductImages;
