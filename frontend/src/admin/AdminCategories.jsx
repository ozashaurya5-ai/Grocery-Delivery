import { useEffect, useState } from "react";
import API from "../services/api";

const AdminCategories = () => {
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);

  const loadCategories = async () => {
    const { data } = await API.get("/categories");
    setCategories(data);
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    await API.post("/categories", { name });
    setName("");
    loadCategories();
  };

  const deleteHandler = async (id) => {
    if (window.confirm("Delete category?")) {
      await API.delete(`/categories/${id}`);
      loadCategories();
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <h2 className="text-3xl font-bold mb-6">Manage Categories</h2>

      {/* Add Category */}
      <form onSubmit={submitHandler} className="flex gap-4 mb-8">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Category name"
          className="flex-1 border p-2 rounded"
          required
        />
        <button className="bg-indigo-600 text-white px-6 py-2 rounded">
          Add
        </button>
      </form>

      {/* Category List */}
      <div className="space-y-3">
        {categories.map((cat) => (
          <div
            key={cat._id}
            className="flex justify-between items-center border p-3 rounded"
          >
            <span className="font-medium">{cat.name}</span>
            <button
              onClick={() => deleteHandler(cat._id)}
              className="text-red-600 hover:underline"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminCategories;
