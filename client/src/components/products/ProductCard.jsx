import { Link } from "react-router-dom";
import { FaStar, FaCartPlus } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addToCart } from "../../features/cart/cartSlice";
import toast from "react-hot-toast";
import React from "react";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  if (!product) {
    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse h-80">
        {/* Loading skeleton */}
      </div>
    );
  }

  const handleAddToCart = () => {
    try {
      if (
        !product._id ||
        !product.name ||
        !product.price ||
        !product.images?.[0]?.url
      ) {
        throw new Error("Product information is incomplete");
      }

      dispatch(
        addToCart({
          product: product._id,
          name: product.name,
          price: product.price,
          image: product.images[0].url,
          quantity: 1,
          stock: product.stock, // Added stock for cart validation
        })
      );
      toast.success("Added to cart");
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Fallback image if none available
  const productImage =
    product.images?.[0]?.url || "/images/product-placeholder.jpg";
  const rating = product.ratings || 0;
  const numOfReviews = product.numOfReviews || 0;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col">
      <Link to={`/product/${product._id}`} className="block flex-grow">
        <img
          src={productImage}
          alt={product.name}
          className="w-full h-48 object-cover"
          loading="lazy"
          onError={(e) => {
            e.target.src = "/images/product-placeholder.jpg";
          }}
        />

        <div className="p-4 flex-grow">
          <h3 className="text-lg font-semibold mb-1 hover:text-primary line-clamp-2">
            {product.name}
          </h3>

          <div className="flex items-center mb-2">
            <div
              className="flex text-yellow-400"
              aria-label={`Rating: ${rating} out of 5`}
            >
              {[...Array(5)].map((_, i) => (
                <FaStar
                  key={i}
                  className={i < rating ? "text-yellow-400" : "text-gray-300"}
                />
              ))}
            </div>
            <span className="text-sm text-gray-600 ml-2">({numOfReviews})</span>
          </div>
        </div>
      </Link>

      <div className="p-4 border-t">
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold">${product.price.toFixed(2)}</span>
          <button
            onClick={handleAddToCart}
            className="bg-primary text-white p-2 rounded-full hover:bg-primary-dark transition-colors"
            aria-label="Add to cart"
            disabled={product.stock <= 0}
          >
            <FaCartPlus />
          </button>
        </div>
        {product.stock <= 0 && (
          <p className="text-red-500 text-sm mt-2">Out of stock</p>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
