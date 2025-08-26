import React from "react";

export const CustomCard = ({
  image,
  title,
  description,
  meta,
  buttonText,
  onButtonClick,
}) => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer flex flex-col">
      {/* Image Section */}
      <div className="w-full overflow-hidden">
        {image ? (
          <img
            src={image}
            alt={title}
            className="w-full h-48 object-cover transform hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="flex items-center justify-center h-48 bg-gray-100 text-gray-400">
            No Image
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-4 flex flex-col flex-grow justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
            {title}
          </h3>
          <p className="text-sm text-gray-600 line-clamp-3">{description}</p>
        </div>

        <div className="mt-4 flex justify-between items-center">
          <span className="text-indigo-600 font-semibold text-sm">{meta}</span>
          <button
            onClick={onButtonClick}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};
