import { useDispatch, useSelector } from "react-redux";
import API from "../services/api";
import { clearCart } from "../redux/cartSlice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);

  const [address, setAddress] = useState({
    fullName: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [error, setError] = useState("");

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  const placeOrderHandler = async () => {
    // 🔴 Address validation
    for (let key in address) {
      if (!address[key]) {
        setError("Please fill all address fields");
        return;
      }
    }

    try {
      const orderItems = cartItems.map((item) => ({
        product: item._id,
        qty: item.qty,
        price: item.price,
      }));

      await API.post("/orders", {
        orderItems,
        totalPrice,
        shippingAddress: address, // ✅ ADDRESS SENT
      });

      dispatch(clearCart());
      alert("Order placed successfully 🎉");
      navigate("/");
    } catch (error) {
      setError("Login required to place order");
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h2 className="text-3xl font-bold text-slate-900 mb-8">
        Checkout
      </h2>

      {error && (
        <div className="mb-6 text-red-600 bg-red-50 border border-red-200 p-3 rounded">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* LEFT: Address + Order */}
        <div className="lg:col-span-2 space-y-8">

          {/* Address */}
          <div className="bg-white border rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-4">
              Delivery Address
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                placeholder="Full Name"
                className="border rounded-md px-3 py-2"
                onChange={(e) =>
                  setAddress({ ...address, fullName: e.target.value })
                }
              />

              <input
                placeholder="Phone Number"
                className="border rounded-md px-3 py-2"
                onChange={(e) =>
                  setAddress({ ...address, phone: e.target.value })
                }
              />

              <input
                placeholder="Street / House No."
                className="border rounded-md px-3 py-2 md:col-span-2"
                onChange={(e) =>
                  setAddress({ ...address, street: e.target.value })
                }
              />

              <input
                placeholder="City"
                className="border rounded-md px-3 py-2"
                onChange={(e) =>
                  setAddress({ ...address, city: e.target.value })
                }
              />

              <input
                placeholder="State"
                className="border rounded-md px-3 py-2"
                onChange={(e) =>
                  setAddress({ ...address, state: e.target.value })
                }
              />

              <input
                placeholder="Pincode"
                className="border rounded-md px-3 py-2"
                onChange={(e) =>
                  setAddress({ ...address, pincode: e.target.value })
                }
              />
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-white border rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-4">
              Order Summary
            </h3>

            {cartItems.map((item) => (
              <div
                key={item._id}
                className="flex justify-between text-slate-700 mb-2"
              >
                <span>
                  {item.name} × {item.qty}
                </span>
                <span>
                  ₹ {item.price * item.qty}
                </span>
              </div>
            ))}

            <div className="flex justify-between font-bold text-lg border-t pt-4 mt-4">
              <span>Total</span>
              <span>₹ {totalPrice}</span>
            </div>
          </div>
        </div>

        {/* RIGHT: Payment */}
        <div className="bg-white border rounded-xl p-6 h-fit">
          <h3 className="text-xl font-semibold mb-4">
            Payment Method
          </h3>

          <p className="text-slate-500 text-sm mb-6">
            Cash on Delivery
          </p>

          <button
            onClick={placeOrderHandler}
            className="w-full bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-700 transition"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
