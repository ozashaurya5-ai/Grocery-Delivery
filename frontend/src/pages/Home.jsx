import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/productSlice";
import ProductCard from "../components/ProductCard";
import { useLocation, Link } from "react-router-dom";
import API from "../services/api";

const Home = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const { items, loading } = useSelector((state) => state.products);

  // 🔍 Search
  const params = new URLSearchParams(location.search);
  const keyword = params.get("search")?.toLowerCase() || "";

  // 📂 Categories
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  // 💰 Price
  const [maxPrice, setMaxPrice] = useState(1000);

  useEffect(() => {
    dispatch(fetchProducts());
    API.get("/categories").then((res) => setCategories(res.data));
  }, [dispatch]);

  // 🔥 FILTER LOGIC
  const filteredProducts = items.filter((product) => {
    const matchSearch = product.name
      .toLowerCase()
      .includes(keyword);

    const matchCategory =
      selectedCategory === "" ||
      product.category === selectedCategory ||
      product.category?._id === selectedCategory;

    const matchPrice = product.price <= maxPrice;

    return matchSearch && matchCategory && matchPrice;
  });

  return (
    <div className="w-full">

      {/* ================= HERO SECTION ================= */}
      <div className="bg-gradient-to-r from-indigo-600 to-indigo-500 text-white">
        <div className="max-w-7xl mx-auto px-6 py-10 md:py-14">
          <h1 className="text-3xl md:text-5xl font-bold mb-3 leading-tight">
            Fresh Groceries Delivered
          </h1>

          <p className="text-indigo-100 max-w-xl text-sm md:text-base">
            Order vegetables, fruits & daily essentials at the best price —
            delivered to your doorstep.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to="/"
              className="bg-white text-indigo-600 px-5 py-2 rounded-md font-medium hover:bg-indigo-50 transition"
            >
              Shop Now
            </Link>

            <Link
              to="/contact"
              className="border border-white px-5 py-2 rounded-md font-medium hover:bg-white hover:text-indigo-600 transition"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>

      {/* ================= MAIN CONTENT ================= */}
      <div className="max-w-7xl mx-auto px-6 py-8">

        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
            Our Products
          </h2>

          {keyword && (
            <p className="text-slate-500 mt-1 text-sm">
              Showing results for "<b>{keyword}</b>"
            </p>
          )}
        </div>

        {/* ================= FILTER BAR ================= */}
        <div className="bg-white border rounded-xl p-4 mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">

          {/* Category */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="border rounded-md px-3 py-2"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>

          {/* Price */}
          <div>
            <label className="text-xs text-slate-500">
              Max Price: ₹ {maxPrice}
            </label>
            <input
              type="range"
              min="0"
              max="1000"
              step="100"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full"
            />
          </div>

          {/* Clear */}
          <button
            onClick={() => {
              setSelectedCategory("");
              setMaxPrice(10000);
            }}
            className="border rounded-md hover:bg-slate-100 transition"
          >
            Clear Filters
          </button>
        </div>

        {/* ================= PRODUCTS ================= */}
        {loading && (
          <div className="text-center text-slate-500 py-20">
            Loading products...
          </div>
        )}

        {!loading && filteredProducts.length === 0 && (
          <p className="text-center text-slate-500 py-20">
            No products found
          </p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
