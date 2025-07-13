import { useState } from "react";
import { FaStar, FaRegStar, FaShoppingCart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../features/cart/cartSlice";
import toast from "react-hot-toast";

const ProductInfo = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        product: product._id,
        name: product.name,
        price: product.price,
        image: product.images[0]?.url,
        quantity,
        stock: product.stock,
      })
    );
    toast.success("Added to cart");
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">{product.name}</h1>

      <div className="flex items-center mb-4">
        <div className="flex text-yellow-400 mr-2">
          {[...Array(5)].map((_, i) =>
            i < Math.floor(product.ratings) ? (
              <FaStar key={i} />
            ) : (
              <FaRegStar key={i} />
            )
          )}
        </div>
        <span className="text-gray-600">({product.numOfReviews} reviews)</span>
      </div>

      <p className="text-2xl font-bold text-primary mb-4">${product.price}</p>

      <p className="text-gray-700 mb-6">{product.description}</p>

      <div className="mb-6">
        <span className="text-gray-600 block">Status: </span>
        <span
          className={`font-medium ${
            product.stock > 0 ? "text-green-600" : "text-red-600"
          }`}
        >
          {product.stock > 0 ? "In Stock" : "Out of Stock"}
        </span>
      </div>

      {product.stock > 0 && (
        <div className="mb-6">
          <label htmlFor="quantity" className="block text-gray-600 mb-2">
            Quantity:
          </label>
          <div className="flex items-center">
            <button
              onClick={() => setQuantity((prev) => (prev > 1 ? prev - 1 : 1))}
              className="bg-gray-200 px-3 py-1 rounded-l"
            >
              -
            </button>
            <span className="border-t border-b border-gray-300 px-4 py-1">
              {quantity}
            </span>
            <button
              onClick={() =>
                setQuantity((prev) => (prev < product.stock ? prev + 1 : prev))
              }
              className="bg-gray-200 px-3 py-1 rounded-r"
            >
              +
            </button>
            <span className="ml-2 text-gray-600">
              {product.stock} available
            </span>
          </div>
        </div>
      )}

      <div className="flex flex-wrap gap-4">
        <button
          onClick={handleAddToCart}
          disabled={product.stock <= 0}
          className={`flex items-center justify-center px-6 py-3 rounded-lg ${
            product.stock > 0
              ? "bg-primary hover:bg-primary-dark text-white"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          } transition-colors`}
        >
          <FaShoppingCart className="mr-2" />
          Add to Cart
        </button>

        {user?.role === "admin" && (
          <button className="bg-gray-800 hover:bg-gray-900 text-white px-6 py-3 rounded-lg transition-colors">
            Edit Product
          </button>
        )}
      </div>

      <div className="mt-6 pt-6 border-t border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          Product Details
        </h3>
        <ul className="text-gray-600">
          <li className="mb-1">
            <strong>Category:</strong> {product.category}
          </li>
          <li className="mb-1">
            <strong>Brand/Seller:</strong> {product.seller}
          </li>
          <li>
            <strong>SKU:</strong> {product._id}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProductInfo;
