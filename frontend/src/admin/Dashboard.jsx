import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-12">
        
        {/* Header */}
        <div className="mb-10">
          <h2 className="text-4xl font-bold text-slate-900">
            Admin Dashboard
          </h2>
          <p className="text-slate-600 mt-2">
            Manage products, orders, users and store activity
          </p>
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Products */}
          <Link
            to="/admin/products"
            className="group bg-white border rounded-2xl p-6 hover:shadow-lg transition"
          >
            <h3 className="text-lg font-semibold text-slate-900 group-hover:text-indigo-600">
              Manage Products
            </h3>
            <p className="text-slate-500 text-sm mt-2">
              View, update or delete products
            </p>
          </Link>

          {/* Add Product */}
          <Link
            to="/admin/add-product"
            className="group bg-white border rounded-2xl p-6 hover:shadow-lg transition"
          >
            <h3 className="text-lg font-semibold text-slate-900 group-hover:text-indigo-600">
              Add New Product
            </h3>
            <p className="text-slate-500 text-sm mt-2">
              Add fresh items to your store
            </p>
          </Link>

          <Link
  to="/admin/categories"
  className="bg-white border rounded-xl p-6 hover:shadow-md transition"
>
  <h3 className="text-lg font-semibold">Categories</h3>
  <p className="text-slate-500 text-sm mt-2">
    Add or manage product categories
  </p>
</Link>

          {/* Orders */}
          <Link
            to="/admin/orders"
            className="group bg-white border rounded-2xl p-6 hover:shadow-lg transition"
          >
            <h3 className="text-lg font-semibold text-slate-900 group-hover:text-indigo-600">
              Orders
            </h3>
            <p className="text-slate-500 text-sm mt-2">
              View, process and complete orders
            </p>
          </Link>

          {/* Reviews */}
          <Link
            to="/admin/reviews"
            className="group bg-white border rounded-2xl p-6 hover:shadow-lg transition"
          >
            <h3 className="text-lg font-semibold text-slate-900 group-hover:text-indigo-600">
              Reviews
            </h3>
            <p className="text-slate-500 text-sm mt-2">
              Read and reply to customer feedback
            </p>
          </Link>

          {/* Messages */}
          <Link
            to="/admin/messages"
            className="group bg-white border rounded-2xl p-6 hover:shadow-lg transition"
          >
            <h3 className="text-lg font-semibold text-slate-900 group-hover:text-indigo-600">
              Contact Messages
            </h3>
            <p className="text-slate-500 text-sm mt-2">
              View messages sent from contact page
            </p>
          </Link>

          {/* Income */}
          <Link
            to="/admin/income"
            className="group bg-white border rounded-2xl p-6 hover:shadow-lg transition"
          >
            <h3 className="text-lg font-semibold text-slate-900 group-hover:text-indigo-600">
              Income & Stats
            </h3>
            <p className="text-slate-500 text-sm mt-2">
              Track revenue and order statistics
            </p>
          </Link>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;
