import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    price: "",
    unitType: "piece", // 🔥 NEW
    description: "",
    category: "",
  });

  useEffect(() => {
    API.get("/categories")
      .then((res) => setCategories(res.data))
      .catch(() => setError("Failed to load categories"));
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("price", form.price);
      formData.append("unitType", form.unitType); // 🔥 NEW
      formData.append("description", form.description);
      formData.append("category", form.category);
      formData.append("image", image);

      await API.post("/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      navigate("/admin/products");
    } catch (err) {
      setError("Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <div className="bg-white border rounded-xl shadow-sm p-6">
        
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-slate-900">
            Add New Product
          </h2>
          <p className="text-slate-500 text-sm mt-1">
            Add grocery product with unit type (kg / liter / piece)
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded p-2">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={submitHandler} className="space-y-5">
          
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Product Name
            </label>
            <input
              type="text"
              placeholder="Potato"
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
              required
              className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Price (per unit)
            </label>
            <input
              type="number"
              placeholder="30"
              value={form.price}
              onChange={(e) =>
                setForm({ ...form, price: e.target.value })
              }
              required
              className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500"
            />
            <p className="text-xs text-slate-500 mt-1">
              Example: ₹30 per kg / ₹60 per liter
            </p>
          </div>

          {/* Unit Type */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Unit Type
            </label>
            <select
              value={form.unitType}
              onChange={(e) =>
                setForm({ ...form, unitType: e.target.value })
              }
              className="w-full border rounded-md px-3 py-2 bg-white focus:ring-2 focus:ring-indigo-500"
            >
              <option value="kg">Per Kg (Vegetables / Fruits)</option>
              <option value="liter">Per Liter (Milk / Oil)</option>
              <option value="piece">Per Piece (Packet items)</option>
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Description
            </label>
            <textarea
              rows="3"
              placeholder="Fresh and organic potatoes"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              required
              className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Category
            </label>
            <select
              value={form.category}
              onChange={(e) =>
                setForm({ ...form, category: e.target.value })
              }
              required
              className="w-full border rounded-md px-3 py-2 bg-white focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Select Category</option>
              {categories.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Product Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              required
              className="w-full text-sm"
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => navigate("/admin/products")}
              className="px-4 py-2 rounded-md border text-slate-700 hover:bg-slate-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 rounded-md bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition disabled:opacity-60"
            >
              {loading ? "Adding..." : "Add Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
