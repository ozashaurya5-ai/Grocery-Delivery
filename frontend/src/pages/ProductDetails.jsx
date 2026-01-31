import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import API from "../services/api";
import Toast from "../components/Toast";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productRes = await API.get("/products");
        const p = productRes.data.find((x) => x._id === id);
        setProduct(p);

        const reviewRes = await API.get(`/reviews/${id}`);
        setReviews(reviewRes.data);
      } catch {
        setError("Failed to load product");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const submitReview = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await API.post("/reviews", {
        productId: id,
        rating,
        comment,
      });
      window.location.reload();
    } catch {
      setError("Login required or already reviewed");
    }
  };

  // 🔥 TOTAL PRICE
  const totalPrice = product ? product.price * qty : 0;

  const addToCartHandler = () => {
    dispatch(
      addToCart({
        ...product,
        qty,
        totalPrice,
      })
    );

    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  const buyNowHandler = () => {
    dispatch(
      addToCart({
        ...product,
        qty,
        totalPrice,
      })
    );
    navigate("/checkout");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh] text-slate-500">
        Loading product...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center text-slate-500 mt-20">
        Product not found
      </div>
    );
  }

  // 🔥 IMAGE FIX (LOCAL + URL)
  const imageSrc = product.image?.startsWith("http")
    ? product.image
    : `http://localhost:5000${product.image}`;

  return (
    <>
      <div className="max-w-6xl mx-auto px-6 py-10">
        
        {/* Product Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-14">
          
          {/* Image */}
          <img
            src={imageSrc}
            alt={product.name}
            className="w-full h-96 object-cover rounded-xl border"
          />

          {/* Details */}
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-3">
              {product.name}
            </h2>

            <p className="text-2xl font-bold text-indigo-600 mb-1">
              ₹ {product.price}{" "}
              <span className="text-base font-medium text-slate-500">
                / {product.unitType}
              </span>
            </p>

            <p className="text-slate-600 mb-6">
              {product.description}
            </p>

            {/* Quantity */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Quantity ({product.unitType})
              </label>

              <input
                type="number"
                min={product.unitType === "piece" ? 1 : 0.5}
                step={product.unitType === "piece" ? 1 : 0.5}
                value={qty}
                onChange={(e) => setQty(Number(e.target.value))}
                className="w-32 border rounded-md px-3 py-2"
              />
            </div>

            <p className="text-xl font-bold text-slate-900 mb-6">
              Total: ₹ {totalPrice}
            </p>

            <div className="flex gap-4">
              <button
                onClick={addToCartHandler}
                className="px-6 py-3 rounded-md bg-slate-900 text-white hover:bg-slate-800 transition"
              >
                Add to Cart
              </button>

              <button
                onClick={buyNowHandler}
                className="px-6 py-3 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 transition"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>

        {/* Reviews */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-semibold text-slate-900 mb-6">
              Customer Reviews
            </h3>

            {reviews.length === 0 && (
              <p className="text-slate-500">
                No reviews yet. Be the first to review!
              </p>
            )}

            <div className="space-y-4">
              {reviews.map((r) => (
                <div key={r._id} className="bg-white border rounded-xl p-4">
                  <p className="font-semibold text-slate-900">
                    {r.user?.name || "User"} ⭐ {r.rating}
                  </p>
                  <p className="text-slate-600 mt-1">
                    {r.comment}
                  </p>

                  {r.adminReply && (
                    <div className="mt-3 bg-slate-50 border-l-4 border-indigo-600 p-3 text-sm">
                      <span className="font-semibold text-indigo-600">
                        Admin reply:
                      </span>{" "}
                      {r.adminReply}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Add Review */}
          <div className="bg-white border rounded-xl p-6 h-fit">
            <h3 className="text-xl font-semibold text-slate-900 mb-4">
              Write a Review
            </h3>

            {error && (
              <p className="text-sm text-red-600 mb-3">
                {error}
              </p>
            )}

            <form onSubmit={submitReview} className="space-y-4">
              <select
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                className="w-full border rounded-md px-3 py-2"
              >
                {[1, 2, 3, 4, 5].map((n) => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>

              <textarea
                rows="3"
                placeholder="Share your experience..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                required
                className="w-full border rounded-md px-3 py-2"
              />

              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition"
              >
                Submit Review
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Toast */}
      <Toast
        show={showToast}
        message="Product added to cart successfully"
      />
    </>
  );
};

export default ProductDetails;
