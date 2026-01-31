import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import { useState } from "react";
import Toast from "./Toast";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const [showToast, setShowToast] = useState(false);

  const addToCartHandler = () => {
    dispatch(
      addToCart({
        ...product,
        qty: 1,
        totalPrice: product.price,
      })
    );

    // 🔥 SHOW SUCCESS MESSAGE
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  return (
    <>
      <div className="bg-white border rounded-xl shadow-sm hover:shadow-md transition flex flex-col">
        
        {/* Image */}
        <Link to={`/product/${product._id}`}>
          <img
            src={`http://localhost:5000${product.image}`}
            alt={product.name}
            className="h-44 w-full object-cover rounded-t-xl"
          />
        </Link>

        {/* Content */}
        <div className="p-4 flex flex-col flex-1">
          <h3 className="font-semibold text-slate-900 text-base line-clamp-1">
            {product.name}
          </h3>

          <p className="text-indigo-600 font-bold text-lg mt-1">
            ₹ {product.price}{" "}
            <span className="text-sm text-slate-500">
              / {product.unitType}
            </span>
          </p>

          {/* Actions */}
          <div className="mt-auto flex items-center justify-between pt-4">
            <Link
              to={`/product/${product._id}`}
              className="text-sm text-indigo-600 hover:underline"
            >
              View Details
            </Link>

            <button
              onClick={addToCartHandler}
              className="px-4 py-2 text-sm rounded-md bg-indigo-600 text-white hover:bg-indigo-700 transition"
            >
              Add to Cart
            </button>
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

export default ProductCard;
