import { useDispatch, useSelector } from "react-redux";
import {
  removeFromCart,
  updateCartQuantity,
} from "../features/products/productSlice";
import { Link } from "react-router-dom";
import EmptyCart from "../components/cart/EmptyCart";

const Cart = () => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  const handleQuantityChange = (id, quantity) => {
    if (quantity < 1) return;
    dispatch(updateCartQuantity({ id, quantity }));
  };

  const handleRemoveItem = (id) => {
    dispatch(removeFromCart(id));
  };

  if (cartItems.length === 0) return <EmptyCart />;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Shopping Cart</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {cartItems.map((item) => (
              <div key={item.product} className="border-b last:border-b-0">
                <div className="flex p-4">
                  <div className="w-24 h-24 flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover rounded"
                    />
                  </div>
                  <div className="ml-4 flex-grow">
                    <Link
                      to={`/product/${item.product}`}
                      className="text-lg font-medium hover:text-primary"
                    >
                      {item.name}
                    </Link>
                    <div className="mt-2 flex items-center">
                      <button
                        onClick={() =>
                          handleQuantityChange(item.product, item.quantity - 1)
                        }
                        className="w-8 h-8 border rounded-l flex items-center justify-center"
                      >
                        -
                      </button>
                      <span className="w-12 h-8 border-t border-b flex items-center justify-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          handleQuantityChange(item.product, item.quantity + 1)
                        }
                        className="w-8 h-8 border rounded-r flex items-center justify-center"
                      >
                        +
                      </button>
                      <button
                        onClick={() => handleRemoveItem(item.product)}
                        className="ml-4 text-red-500 hover:text-red-700"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                    <p className="text-sm text-gray-500">${item.price} each</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>
                  $
                  {cartItems
                    .reduce((acc, item) => acc + item.price * item.quantity, 0)
                    .toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="border-t pt-4 flex justify-between font-bold">
                <span>Total</span>
                <span>
                  $
                  {cartItems
                    .reduce((acc, item) => acc + item.price * item.quantity, 0)
                    .toFixed(2)}
                </span>
              </div>
            </div>
            <button className="w-full mt-6 bg-primary text-white py-2 rounded-lg hover:bg-primary-dark">
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
