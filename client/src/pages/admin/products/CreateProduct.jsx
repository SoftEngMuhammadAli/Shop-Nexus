// src/pages/admin/CreateProductPage.jsx
import React, { useState } from "react";
import { FiPlusCircle, FiUploadCloud } from "react-icons/fi";

const CreateProductPage = () => {
  const [formData, setFormData] = useState({
    productName: "",
    productDescription: "",
    productPrice: "",
    productQuantity: "",
    productImage: null,
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    setFormData({
      ...formData,
      productImage: e.target.files[0],
    });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const formDataObj = new FormData();
      for (let key in formData) {
        formDataObj.append(key, formData[key]);
      }

      const res = await fetch("http://localhost:5000/api/products", {
        method: "POST",
        body: formDataObj,
      });

      const data = await res.json();

      if (data.success) {
        setMessage({
          type: "success",
          text: "✅ Product created successfully!",
        });
        setFormData({
          productName: "",
          productDescription: "",
          productPrice: "",
          productQuantity: "",
          productImage: null,
        });
      } else {
        setMessage({ type: "error", text: data.message || "Failed to create" });
      }
    } catch (err) {
      setMessage({ type: "error", text: "Server error, try again!" });
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-2xl bg-white shadow-xl rounded-2xl p-8 border border-gray-100">
        {/* Header */}
        <div className="flex items-center gap-2 mb-8">
          <FiPlusCircle className="text-blue-600 text-3xl" />
          <h1 className="text-3xl font-bold text-gray-800">Create Product</h1>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700">
              Product Name
            </label>
            <input
              type="text"
              name="productName"
              value={formData.productName}
              onChange={handleChange}
              required
              className="w-full mt-1 px-4 py-2.5 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter product name"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-700">
              Description
            </label>
            <textarea
              name="productDescription"
              value={formData.productDescription}
              onChange={handleChange}
              required
              rows="4"
              className="w-full mt-1 px-4 py-2.5 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter product description"
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
                name="productPrice"
                value={formData.productPrice}
                onChange={handleChange}
                required
                className="w-full mt-1 px-4 py-2.5 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="0.00"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700">
                Quantity
              </label>
              <input
                type="number"
                name="productQuantity"
                value={formData.productQuantity}
                onChange={handleChange}
                required
                className="w-full mt-1 px-4 py-2.5 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="0"
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
                {formData.productImage
                  ? formData.productImage.name
                  : "Drag & drop or click to upload"}
              </p>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>
          </div>

          {/* Message */}
          {message && (
            <div
              className={`p-3 rounded-lg text-sm font-medium ${
                message.type === "success"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {message.text}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 mt-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition transform hover:scale-[1.01]"
          >
            {loading ? "Creating..." : "🚀 Create Product"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateProductPage;
