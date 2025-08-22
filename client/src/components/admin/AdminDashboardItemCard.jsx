import React from "react";

export const AdminDashboardItemCard = ({
  image,
  title,
  description,
  meta,
  buttonText,
  onButtonClick,
}) => {
  return (
    <div className="bg-white shadow rounded-lg overflow-hidden hover:shadow-md transition">
      {/* Image Section */}
      <div className="bg-gray-200 h-40 flex items-center justify-center text-gray-400">
        {image ? (
          <img src={image} alt={title} className="h-full w-full object-cover" />
        ) : (
          <span>No Image</span>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-800">{title}</h3>
        <p className="text-sm text-gray-600 mt-1 line-clamp-2">{description}</p>

        <div className="mt-4 flex justify-between items-center">
          <span className="text-blue-600 font-semibold">{meta}</span>
          <button
            onClick={onButtonClick}
            className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};
