import React, { useState, useEffect } from "react";
import { FiEdit3 } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { updateProduct, getAllProducts } from "../../../features/productSlice";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const UpdateProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Redux state
  const { products, loading, error } = useSelector((state) => state.products);

  // Local form state
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
  });

  // Load product data if not already
  useEffect(() => {
    if (products.length === 0) {
      dispatch(getAllProducts());
    } else {
      const product = products.find((p) => p._id === id);
      if (product) {
        setFormData({
          name: product.name,
          price: product.price,
          description: product.description,
        });
      }
    }
  }, [products, id, dispatch]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProduct({ id, ...formData }))
      .unwrap()
      .then(() => {
        toast.success("Product updated successfully!");
        navigate("/admin/manage-products");
      })
      .catch((err) => {
        console.error("Update failed:", err);
      });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-2xl bg-white shadow-xl rounded-2xl p-8 border border-gray-100">
        {/* Header */}
        <div className="flex items-center gap-2 mb-8">
          <FiEdit3 className="text-purple-600 text-3xl" />
          <h1 className="text-3xl font-bold text-gray-800">Update Product</h1>
        </div>

        {/* Error */}
        {error && <div className="mb-4 text-red-600 font-medium">{error}</div>}

        {/* Form */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Product Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-semibold text-gray-700"
            >
              Product Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter product name"
              value={formData.name}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2.5 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Product Price */}
          <div>
            <label
              htmlFor="price"
              className="block text-sm font-semibold text-gray-700"
            >
              Product Price ($)
            </label>
            <input
              type="number"
              id="price"
              name="price"
              placeholder="0.00"
              value={formData.price}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2.5 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Product Description */}
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-semibold text-gray-700"
            >
              Product Description
            </label>
            <textarea
              id="description"
              name="description"
              rows="4"
              placeholder="Enter product description"
              value={formData.description}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2.5 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 mt-2 bg-purple-600 text-white font-semibold rounded-lg shadow-md hover:bg-purple-700 transition transform hover:scale-[1.01] disabled:opacity-50"
          >
            {loading ? "Updating..." : "✏️ Update Product"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProductPage;
