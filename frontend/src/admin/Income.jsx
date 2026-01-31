import { useEffect, useState } from "react";
import API from "../services/api";

const Income = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    API.get("/orders/dashboard/stats").then((res) => setStats(res.data));
  }, []);

  if (!stats) {
    return (
      <div className="flex justify-center items-center h-[60vh] text-slate-500">
        Loading income data...
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-900">
          Income Overview
        </h2>
        <p className="text-slate-500 mt-1">
          Track orders and revenue performance
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Total Orders */}
        <div className="bg-white border rounded-xl p-6">
          <p className="text-sm text-slate-500">Total Orders</p>
          <h3 className="text-2xl font-bold text-slate-900 mt-2">
            {stats.totalOrders}
          </h3>
        </div>

        {/* Pending Orders */}
        <div className="bg-white border rounded-xl p-6">
          <p className="text-sm text-slate-500">Pending Orders</p>
          <h3 className="text-2xl font-bold text-orange-500 mt-2">
            {stats.pendingOrders}
          </h3>
        </div>

        {/* Completed Orders */}
        <div className="bg-white border rounded-xl p-6">
          <p className="text-sm text-slate-500">Completed Orders</p>
          <h3 className="text-2xl font-bold text-green-600 mt-2">
            {stats.completedOrders}
          </h3>
        </div>

        {/* Total Income */}
        <div className="bg-indigo-600 text-white rounded-xl p-6">
          <p className="text-sm opacity-80">Total Income</p>
          <h3 className="text-3xl font-bold mt-2">
            ₹ {stats.totalIncome}
          </h3>
        </div>
      </div>

      {/* Extra Info */}
      <div className="mt-10 bg-white border rounded-xl p-6">
        <h4 className="text-lg font-semibold text-slate-900 mb-2">
          Summary
        </h4>
        <p className="text-slate-600 text-sm">
          This overview shows total revenue generated from completed orders,
          along with current pending and completed order counts.
        </p>
      </div>
    </div>
  );
};

export default Income;
