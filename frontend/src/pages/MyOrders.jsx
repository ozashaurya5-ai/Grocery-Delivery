import { useEffect, useState } from "react";
import API from "../services/api";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/orders/my")
      .then((res) => setOrders(res.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh] text-slate-500">
        Loading your orders...
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h2 className="text-3xl font-bold text-slate-900 mb-8">
        My Orders
      </h2>

      {orders.length === 0 && (
        <p className="text-slate-500">You have not placed any orders yet.</p>
      )}

      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-white border rounded-xl p-6"
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <p className="font-semibold text-slate-800">
                Order ID: <span className="text-slate-500">{order._id}</span>
              </p>

              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  order.status === "Completed"
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {order.status}
              </span>
            </div>

            {/* Items */}
            <div className="space-y-2 mb-4">
              {order.orderItems.map((item) => (
                <div
                  key={item._id}
                  className="flex justify-between text-slate-700"
                >
                  <span>
                    {item.product?.name} × {item.qty}
                  </span>
                  <span>₹ {item.price * item.qty}</span>
                </div>
              ))}
            </div>

            {/* Address */}
            {order.shippingAddress && (
              <div className="bg-slate-50 border rounded-lg p-4 mb-4 text-sm">
                <p className="font-semibold mb-1">Delivery Address</p>
                <p>{order.shippingAddress.fullName}</p>
                <p>{order.shippingAddress.street}</p>
                <p>
                  {order.shippingAddress.city},{" "}
                  {order.shippingAddress.state} –{" "}
                  {order.shippingAddress.pincode}
                </p>
                <p className="mt-1 text-slate-600">
                  📞 {order.shippingAddress.phone}
                </p>
              </div>
            )}

            {/* Footer */}
            <div className="flex justify-between items-center">
              <p className="font-bold text-lg">
                Total: ₹ {order.totalPrice}
              </p>
              <p className="text-sm text-slate-500">
                {new Date(order.createdAt).toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrders;
