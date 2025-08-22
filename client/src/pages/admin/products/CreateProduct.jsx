// src/pages/admin/CreateProductPage.jsx
import React from "react";
import { FiPlusCircle, FiUploadCloud } from "react-icons/fi";

const CreateProductPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-2xl bg-white shadow-xl rounded-2xl p-8 border border-gray-100">
        {/* Header */}
        <div className="flex items-center gap-2 mb-8">
          <FiPlusCircle className="text-blue-600 text-3xl" />
          <h1 className="text-3xl font-bold text-gray-800">Create Product</h1>
        </div>

        {/* Form */}
        <form className="space-y-6">
          {/* Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700">
              Product Name
            </label>
            <input
              type="text"
              placeholder="Enter product name"
              className="w-full mt-1 px-4 py-2.5 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              defaultValue="Sample Product"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-700">
              Description
            </label>
            <textarea
              rows="4"
              placeholder="Enter product description"
              className="w-full mt-1 px-4 py-2.5 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              defaultValue="This is a sample description for the product."
            ></textarea>
          </div>

          {/* Price & Quantity */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700">
                Price ($)
              </label>
              <input
                type="number"
                placeholder="0.00"
                className="w-full mt-1 px-4 py-2.5 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                defaultValue="99.99"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700">
                Quantity
              </label>
              <input
                type="number"
                placeholder="0"
                className="w-full mt-1 px-4 py-2.5 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                defaultValue="10"
              />
            </div>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-semibold text-gray-700">
              Product Image
            </label>
            <div className="mt-2 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 cursor-pointer hover:border-blue-500 transition">
              <FiUploadCloud className="text-4xl text-gray-400 mb-2" />
              <p className="text-gray-500 text-sm">
                Drag & drop or click to upload
              </p>
            </div>
          </div>

          {/* Static message preview */}
          <div className="p-3 rounded-lg text-sm font-medium bg-green-100 text-green-700">
            ✅ Product created successfully!
          </div>

          {/* Submit Button (no action) */}
          <button
            type="button"
            className="w-full py-3 mt-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition transform hover:scale-[1.01]"
          >
            🚀 Create Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateProductPage;
