import React, { useState } from "react";
import { FiTrash2, FiBox } from "react-icons/fi";

const DeleteProductPage = () => {
  // Dummy products (replace with API data later)
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "iPhone 14 Pro",
      category: "Mobile",
      price: "$999",
      stock: 20,
    },
    {
      id: 2,
      name: "Samsung Galaxy S23",
      category: "Mobile",
      price: "$899",
      stock: 15,
    },
    {
      id: 3,
      name: "MacBook Pro M2",
      category: "Laptop",
      price: "$1999",
      stock: 8,
    },
  ]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      setProducts(products.filter((product) => product.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-6">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-2xl p-6">
        <h1 className="text-2xl font-bold text-blue-600 mb-6 flex items-center gap-2">
          <FiBox /> Delete Products
        </h1>

        {products.length > 0 ? (
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-blue-100 text-left">
                <th className="p-3 font-semibold">Product</th>
                <th className="p-3 font-semibold">Category</th>
                <th className="p-3 font-semibold">Price</th>
                <th className="p-3 font-semibold">Stock</th>
                <th className="p-3 font-semibold text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr
                  key={product.id}
                  className="border-b hover:bg-blue-50 transition"
                >
                  <td className="p-3">{product.name}</td>
                  <td className="p-3">{product.category}</td>
                  <td className="p-3">{product.price}</td>
                  <td className="p-3">{product.stock}</td>
                  <td className="p-3 text-center">
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition flex items-center gap-2 mx-auto"
                    >
                      <FiTrash2 /> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-600 text-center">No products found.</p>
        )}
      </div>
    </div>
  );
};

export default DeleteProductPage;
