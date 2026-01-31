import { useEffect, useState } from "react";
import API from "../services/api";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [replies, setReplies] = useState({});
  const [loading, setLoading] = useState(true);

  // ✅ ADMIN: GET ALL REVIEWS (ONE API CALL)
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await API.get("/reviews"); // 🔥 IMPORTANT
        setReviews(res.data);
      } catch (error) {
        alert("Failed to load reviews");
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  // ✅ ADMIN REPLY
  const replyHandler = async (reviewId) => {
    try {
      await API.put(`/reviews/${reviewId}/reply`, {
        reply: replies[reviewId],
      });

      setReviews(
        reviews.map((r) =>
          r._id === reviewId
            ? { ...r, adminReply: replies[reviewId] }
            : r
        )
      );

      setReplies({ ...replies, [reviewId]: "" });
    } catch {
      alert("Failed to reply");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh] text-slate-500">
        Loading reviews...
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-900">
          Customer Reviews
        </h2>
        <p className="text-slate-500 mt-1">
          Read and reply to customer feedback
        </p>
      </div>

      {reviews.length === 0 && (
        <div className="text-center text-slate-500 mt-20">
          No reviews found
        </div>
      )}

      {/* Reviews List */}
      <div className="space-y-6">
        {reviews.map((r) => (
          <div
            key={r._id}
            className="bg-white border rounded-xl p-6"
          >
            {/* Review Info */}
            <div className="mb-2">
              <p className="font-semibold text-slate-900">
                {r.user?.name || "User"} ⭐ {r.rating}
              </p>

              <p className="text-sm text-slate-500">
                Product: {r.product?.name}
              </p>

              <p className="text-slate-700 mt-2">
                {r.comment}
              </p>
            </div>

            {/* Admin Reply */}
            {r.adminReply && (
              <div className="mt-4 bg-slate-50 border-l-4 border-indigo-600 p-3 text-sm">
                <span className="font-semibold text-indigo-600">
                  Admin reply:
                </span>{" "}
                {r.adminReply}
              </div>
            )}

            {/* Reply Box */}
            {!r.adminReply && (
              <div className="mt-4 flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  placeholder="Write admin reply..."
                  value={replies[r._id] || ""}
                  onChange={(e) =>
                    setReplies({
                      ...replies,
                      [r._id]: e.target.value,
                    })
                  }
                  className="flex-1 border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />

                <button
                  onClick={() => replyHandler(r._id)}
                  className="px-4 py-2 rounded-md bg-indigo-600 text-white text-sm hover:bg-indigo-700 transition"
                >
                  Reply
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;
