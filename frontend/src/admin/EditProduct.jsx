import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    price: "",
    unitType: "piece",
    description: "",
    category: "",
  });

  useEffect(() => {
    API.get("/products").then((res) => {
      const product = res.data.find((p) => p._id === id);

      if (product) {
        setForm({
          name: product.name,
          price: product.price,
          unitType: product.unitType,
          description: product.description,
          category: product.category?._id || product.category,
        });
      }
    });
  }, [id]);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("price", form.price);
      formData.append("unitType", form.unitType);
      formData.append("description", form.description);
      formData.append("category", form.category);

      if (image) {
        formData.append("image", image);
      }

      await API.put(`/products/${id}`, formData);
      navigate("/admin/products");
    } catch (error) {
      alert("Product update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <h2 className="text-2xl font-bold mb-6">Edit Product</h2>

      <form onSubmit={submitHandler} className="space-y-4">
        <input
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="Product Name"
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="number"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          placeholder="Price"
          className="w-full border p-2 rounded"
          required
        />

        <select
          value={form.unitType}
          onChange={(e) => setForm({ ...form, unitType: e.target.value })}
          className="w-full border p-2 rounded"
        >
          <option value="kg">Kg</option>
          <option value="liter">Liter</option>
          <option value="piece">Piece</option>
        </select>

        <textarea
          value={form.description}
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
          placeholder="Description"
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />

        <button
          disabled={loading}
          className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 disabled:opacity-60"
        >
          {loading ? "Updating..." : "Update Product"}
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
