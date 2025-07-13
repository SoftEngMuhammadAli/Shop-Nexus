import { Link } from "react-router-dom";
import { FaStar, FaCartPlus } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addToCart } from "../../features/cart/cartSlice";
import toast from "react-hot-toast";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        product: product._id,
        name: product.name,
        price: product.price,
        image: product.images[0].url,
        quantity: 1,
      })
    );
    toast.success("Added to cart");
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <Link to={`/product/${product._id}`}>
        <img
          src={product.images[0].url}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
      </Link>
      <div className="p-4">
        <Link to={`/product/${product._id}`} className="block">
          <h3 className="text-lg font-semibold mb-1 hover:text-primary">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center mb-2">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <FaStar
                key={i}
                className={
                  i < product.ratings ? "text-yellow-400" : "text-gray-300"
                }
              />
            ))}
          </div>
          <span className="text-sm text-gray-600 ml-2">
            ({product.numOfReviews})
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold">${product.price}</span>
          <button
            onClick={handleAddToCart}
            className="bg-primary text-white p-2 rounded-full hover:bg-primary-dark"
          >
            <FaCartPlus />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
