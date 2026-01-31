import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../redux/cartSlice";
import { Link } from "react-router-dom";

const Cart = () => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  // 🔥 TOTAL FROM totalPrice
  const total = cartItems.reduce(
    (acc, item) => acc + item.totalPrice,
    0
  );

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-slate-500">
        <h2 className="text-2xl font-semibold mb-2">
          Your cart is empty
        </h2>
        <Link
          to="/"
          className="mt-4 text-indigo-600 hover:underline"
        >
          Continue shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h2 className="text-3xl font-bold text-slate-900 mb-8">
        Shopping Cart
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item, index) => (
            <div
              key={index}
              className="bg-white border rounded-lg p-4 flex items-center justify-between"
            >
              {/* Product Info */}
              <div>
                <h4 className="font-semibold text-slate-900">
                  {item.name}
                </h4>

                <p className="text-sm text-slate-500">
                  ₹ {item.price} / {item.unitType}
                </p>

                <p className="text-sm text-slate-700 mt-1">
                  Qty: <b>{item.qty}</b> {item.unitType}
                </p>
              </div>

              {/* Price + Remove */}
              <div className="text-right">
                <p className="font-bold text-slate-900 text-lg">
                  ₹ {item.totalPrice}
                </p>

                <button
                  onClick={() => dispatch(removeFromCart(item._id))}
                  className="text-sm text-red-500 hover:underline mt-2"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="bg-white border rounded-lg p-6 h-fit">
          <h3 className="text-xl font-semibold text-slate-900 mb-4">
            Order Summary
          </h3>

          <div className="flex justify-between text-slate-600 mb-2">
            <span>Items</span>
            <span>{cartItems.length}</span>
          </div>

          <div className="flex justify-between text-slate-900 font-semibold text-lg border-t pt-3">
            <span>Total</span>
            <span>₹ {total}</span>
          </div>

          <Link to="/checkout">
            <button className="w-full mt-6 bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-700 transition">
              Proceed to Checkout
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
