import React, { useState } from "react";
import { useFetchData } from "../../../hooks/useCustomHook";
import { Loader } from "../../../components/common/Loader";
import { ShowError } from "../../../components/common/Error";
import { CustomCard } from "../../../components/ui/CustomCard";

const ProductsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Fetch products dynamically from API
  const {
    data: productsData,
    loading: productsLoading,
    error: productsError,
  } = useFetchData(`${import.meta.env.VITE_API_BASE_URL}/api/products/all`);

  // Dynamically generate categories from fetched data
  const categories = [
    "All",
    ...(productsData?.map((p) => p.category) || []).filter(
      (v, i, a) => a.indexOf(v) === i
    ),
  ];

  // Filter products based on search term and selected category
  const filteredProducts = productsData?.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Products</h1>

      {/* Search & Category Filter */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-8">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-md p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full max-w-xs p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Products Grid */}
      {productsLoading && (
        <div className="text-center py-6">
          <Loader />
        </div>
      )}

      {productsError && (
        <div className="text-center py-6 text-red-500">
          <ShowError error={productsError} />
        </div>
      )}

      {!productsLoading && !productsError && (
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredProducts?.length > 0 ? (
            filteredProducts.map((product) => (
              <CustomCard
                key={product._id}
                image={product.image || product.imageUrl}
                title={product.name}
                description={product.description || "No description"}
                meta={`$${product.price}`}
                buttonText="View Details"
                onButtonClick={() =>
                  window.open(`/products/${product._id}`, "_blank")
                }
              />
            ))
          ) : (
            <p className="text-center col-span-full text-gray-500">
              No products found.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
