import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts, deleteProduct } from "../../../features/productSlice";
import { Loader } from "../../../components/common/Loader";
import { ShowError } from "../../../components/common/Error";
import { useNavigate } from "react-router-dom";
import { FaProductHunt } from "react-icons/fa";
import { toast } from "react-toastify";
import { FiMoreVertical } from "react-icons/fi";

const ManageProductsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, loading, error } = useSelector((state) => state.products);
  const [openMenu, setOpenMenu] = useState(null);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  const handleDlete = (value) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      dispatch(deleteProduct(value._id))
        .unwrap()
        .then(() => toast.success("Product deleted successfully"))
        .catch((err) => toast.error(err || "Failed to delete product"))
        .then(() => dispatch(getAllProducts()));
    }
  };

  if (loading) return <Loader />;
  if (error) return <ShowError error={error} />;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        🛍️ Manage Products
      </h1>

      {products?.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((value, index) => (
            <div
              key={value._id}
              className="relative bg-white rounded-2xl shadow-md hover:shadow-2xl hover:scale-[1.02] transition-all overflow-hidden flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center gap-3 p-4 border-b relative">
                <div className="w-14 h-14 rounded-lg overflow-hidden flex items-center justify-center bg-gray-100">
                  {value.imageUrl ? (
                    <img
                      src={value.imageUrl}
                      alt={value.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <FaProductHunt size={28} className="text-gray-500" />
                  )}
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-gray-500">#{index + 1}</span>
                  <span className="font-semibold text-gray-800">
                    {value.name}
                  </span>
                </div>

                {/* Action Menu */}
                <div className="absolute top-3 right-3">
                  <button
                    onClick={() =>
                      setOpenMenu(openMenu === value._id ? null : value._id)
                    }
                    className="p-1 rounded-md hover:bg-gray-200"
                  >
                    <FiMoreVertical className="text-gray-600" size={20} />
                  </button>

                  {openMenu === value._id && (
                    <div className="absolute right-0 mt-2 w-36 bg-white border rounded-lg shadow-lg z-10">
                      <button
                        onClick={() =>
                          navigate(`/admin/products/edit/${value._id}`)
                        }
                        className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                      >
                        ✏️ Edit
                      </button>
                      <button
                        onClick={() => handleDlete(value)}
                        className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-red-600"
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Body */}
              <div className="p-4 flex-grow space-y-2">
                <p className="text-sm text-gray-600 line-clamp-2">
                  {value.description}
                </p>

                <span className="inline-block bg-green-100 text-green-700 text-xs px-2 py-1 rounded-md font-medium">
                  💰 ${value.price?.toFixed(2)}
                </span>

                <p className="text-sm text-gray-700">
                  📦 Quantity: {value.quantity}
                </p>
              </div>

              {/* Footer */}
              <div className="px-4 py-2 border-t bg-gray-50 text-xs text-gray-500">
                🕒 Created:{" "}
                {value.createdAt
                  ? new Date(value.createdAt).toLocaleString()
                  : "N/A"}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-gray-500">
          <FaProductHunt size={60} className="mb-4" />
          <p className="text-lg font-medium">No products found</p>
          <p className="text-sm">Start by adding your first product!</p>
        </div>
      )}
    </div>
  );
};

export default ManageProductsPage;
