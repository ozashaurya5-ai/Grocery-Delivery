import { useEffect, useState } from "react";
import API from "../services/api";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/orders")
      .then((res) => setOrders(res.data))
      .finally(() => setLoading(false));
  }, []);

  const markCompleted = async (id) => {
    await API.put(`/orders/${id}`, { status: "Completed" });
    setOrders(
      orders.map((o) =>
        o._id === id ? { ...o, status: "Completed" } : o
      )
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh] text-slate-500">
        Loading orders...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h2 className="text-3xl font-bold text-slate-900 mb-8">
        Orders (Delivery Details)
      </h2>

      {orders.length === 0 && (
        <p className="text-slate-500">No orders found</p>
      )}

      <div className="space-y-6">
        {orders.map((o) => (
          <div
            key={o._id}
            className="bg-white border rounded-xl p-6"
          >
            {/* Header */}
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="font-semibold text-slate-900">
                  {o.user?.name || "User"}
                </p>
                <p className="text-sm text-slate-500">
                  {o.user?.email}
                </p>
              </div>

              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  o.status === "Completed"
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {o.status}
              </span>
            </div>

            {/* Address */}
            {o.shippingAddress ? (
              <div className="bg-slate-50 border rounded-lg p-4 mb-4">
                <p className="font-semibold text-slate-800 mb-1">
                  📍 Delivery Address
                </p>
                <p>{o.shippingAddress.fullName}</p>
                <p>{o.shippingAddress.street}</p>
                <p>
                  {o.shippingAddress.city}, {o.shippingAddress.state} –{" "}
                  {o.shippingAddress.pincode}
                </p>
                <p className="text-sm text-slate-600 mt-1">
                  📞 {o.shippingAddress.phone}
                </p>
              </div>
            ) : (
              <p className="text-red-500">
                Address not available (old order)
              </p>
            )}

            {/* Total + Action */}
            <div className="flex justify-between items-center">
              <p className="font-bold text-lg">
                Total: ₹ {o.totalPrice}
              </p>

              {o.status === "Pending" && (
                <button
                  onClick={() => markCompleted(o._id)}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                >
                  Mark Completed
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
