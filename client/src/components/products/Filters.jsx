import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../features/products/productSlice";
import { FaFilter, FaTimes } from "react-icons/fa";

const Filters = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.products);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [ratingsFilter, setRatingsFilter] = useState(null);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Extract unique categories from products
  useEffect(() => {
    // This assumes you have a way to get all unique categories
    // Either from your Redux store or API
  }, []);

  const applyFilters = () => {
    const filters = {
      priceMin: priceRange[0],
      priceMax: priceRange[1],
      categories: selectedCategories,
      ratings: ratingsFilter,
    };
    dispatch(fetchProducts(filters));
    setMobileFiltersOpen(false);
  };

  const resetFilters = () => {
    setPriceRange([0, 1000]);
    setSelectedCategories([]);
    setRatingsFilter(null);
    dispatch(fetchProducts());
    setMobileFiltersOpen(false);
  };

  const toggleCategory = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      {/* Mobile filter toggle */}
      <button
        className="md:hidden flex items-center justify-between w-full mb-4 p-2 bg-gray-100 rounded-lg"
        onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
      >
        <span className="font-medium">Filters</span>
        {mobileFiltersOpen ? <FaTimes /> : <FaFilter />}
      </button>

      {/* Filter content - shown on mobile when toggled */}
      <div className={`${mobileFiltersOpen ? "block" : "hidden"} md:block`}>
        {/* Price Range Filter */}
        <div className="mb-6">
          <h3 className="font-medium text-gray-900 mb-2">Price Range</h3>
          <div className="flex items-center justify-between mb-2">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
          <input
            type="range"
            min="0"
            max="1000"
            value={priceRange[1]}
            onChange={(e) =>
              setPriceRange([priceRange[0], parseInt(e.target.value)])
            }
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between mt-2">
            <input
              type="number"
              min="0"
              max={priceRange[1]}
              value={priceRange[0]}
              onChange={(e) =>
                setPriceRange([parseInt(e.target.value), priceRange[1]])
              }
              className="w-24 p-1 border rounded"
            />
            <input
              type="number"
              min={priceRange[0]}
              max="1000"
              value={priceRange[1]}
              onChange={(e) =>
                setPriceRange([priceRange[0], parseInt(e.target.value)])
              }
              className="w-24 p-1 border rounded"
            />
          </div>
        </div>

        {/* Categories Filter */}
        <div className="mb-6">
          <h3 className="font-medium text-gray-900 mb-2">Categories</h3>
          <div className="space-y-2">
            {categories?.map((category) => (
              <div key={category} className="flex items-center">
                <input
                  type="checkbox"
                  id={`category-${category}`}
                  checked={selectedCategories.includes(category)}
                  onChange={() => toggleCategory(category)}
                  className="h-4 w-4 text-primary rounded"
                />
                <label
                  htmlFor={`category-${category}`}
                  className="ml-2 text-gray-700"
                >
                  {category}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Ratings Filter */}
        <div className="mb-6">
          <h3 className="font-medium text-gray-900 mb-2">Customer Ratings</h3>
          <div className="space-y-2">
            {[4, 3, 2, 1].map((rating) => (
              <div key={rating} className="flex items-center">
                <input
                  type="radio"
                  id={`rating-${rating}`}
                  name="ratings"
                  checked={ratingsFilter === rating}
                  onChange={() =>
                    setRatingsFilter(rating === ratingsFilter ? null : rating)
                  }
                  className="h-4 w-4 text-primary"
                />
                <label
                  htmlFor={`rating-${rating}`}
                  className="ml-2 text-gray-700 flex items-center"
                >
                  {[...Array(5)].map((_, i) =>
                    i < rating ? (
                      <FaStar key={i} className="text-yellow-400" />
                    ) : (
                      <FaRegStar key={i} className="text-yellow-400" />
                    )
                  )}
                  <span className="ml-1">& Up</span>
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <button
            onClick={applyFilters}
            className="flex-1 bg-primary text-white py-2 px-4 rounded hover:bg-primary-dark transition"
          >
            Apply Filters
          </button>
          <button
            onClick={resetFilters}
            className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded hover:bg-gray-300 transition"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default Filters;
