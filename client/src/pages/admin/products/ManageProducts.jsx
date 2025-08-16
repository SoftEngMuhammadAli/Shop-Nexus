import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../../features/productSlice";
import { Loader } from "../../../components/common/Loader";
import { ShowError } from "../../../components/common/Error";
import { useNavigate } from "react-router-dom";
import { FaProductHunt } from "react-icons/fa";

const ManageProductsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, loading, error } = useSelector((state) => state.products);
  const [openMenu, setOpenMenu] = useState(null);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  if (loading) return <Loader />;
  if (error) return <ShowError error={error} />;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Manage Products</h1>

      {products?.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {products.map((value) => (
            <div
              key={value._id}
              className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition relative"
            >
              {/* Leading Icon */}
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-100">
                  <FaProductHunt className="w-6 h-6 text-gray-600" />
                </div>

                {/* Product Info */}
                <div>
                  <p className="font-semibold text-gray-800">
                    {value.productName}
                  </p>
                  <p className="text-sm text-gray-500">
                    {value.productDescription}
                  </p>
                  <div className="flex flex-col md:flex-row gap-3">
                    <p className="text-sm text-gray-700 font-medium">
                      💰 Price: ${value.productPrice?.toFixed(2)}
                    </p>
                    <p className="text-sm text-gray-700">
                      📦 Quantity: {value.productQuantity}
                    </p>
                  </div>
                </div>
              </div>

              {/* Trailing Dropdown */}
              <div className="relative">
                <button
                  onClick={() =>
                    setOpenMenu(openMenu === value._id ? null : value._id)
                  }
                  className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-1 rounded-lg text-sm font-medium"
                >
                  ⋮
                </button>

                {openMenu === value._id && (
                  <div className="absolute right-0 mt-2 w-32 bg-white border rounded-lg shadow-lg z-10">
                    <button
                      onClick={() =>
                        navigate(`/admin/products/edit/${value._id}`)
                      }
                      className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                    >
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => alert("Delete product " + value._id)}
                      className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-red-600"
                    >
                      🗑️ Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-sm text-gray-500">No products found</p>
      )}
    </div>
  );
};

export default ManageProductsPage;
