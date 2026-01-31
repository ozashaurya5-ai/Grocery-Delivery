import { useEffect, useState } from "react";
import API from "../services/api";
import { Link } from "react-router-dom";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const { data } = await API.get("/products");
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const deleteHandler = async (id) => {
    if (!window.confirm("Delete this product?")) return;

    await API.delete(`/products/${id}`);
    fetchProducts();
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h2 className="text-3xl font-bold mb-6">Products</h2>

      <div className="overflow-x-auto">
        <table className="w-full border">
          <thead className="bg-slate-100">
            <tr>
              <th className="p-3 border">Name</th>
              <th className="p-3 border">Price</th>
              <th className="p-3 border">Unit</th>
              <th className="p-3 border">Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map((p) => (
              <tr key={p._id}>
                <td className="p-3 border">{p.name}</td>
                <td className="p-3 border">₹ {p.price}</td>
                <td className="p-3 border">{p.unitType}</td>
                <td className="p-3 border flex gap-3">
                  <Link
                    to={`/admin/product/${p._id}/edit`}
                    className="text-indigo-600"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() => deleteHandler(p._id)}
                    className="text-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminProducts;
