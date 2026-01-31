import { useEffect, useState } from "react";
import API from "../services/api";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/products")
      .then((res) => setProducts(res.data))
      .finally(() => setLoading(false));
  }, []);

  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      await API.delete(`/products/${id}`);
      setProducts(products.filter((p) => p._id !== id));
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh] text-slate-500">
        Loading products...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-900">
          Products
        </h2>
        <p className="text-slate-500 mt-1">
          Manage your store products
        </p>
      </div>

      {/* Empty State */}
      {products.length === 0 && (
        <div className="text-center text-slate-500 mt-20">
          No products found
        </div>
      )}

      {/* Products Table */}
      {products.length > 0 && (
        <div className="bg-white border rounded-xl shadow-sm overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-50 border-b">
              <tr>
                <th className="text-left px-6 py-3 font-semibold text-slate-700">
                  Product Name
                </th>
                <th className="text-left px-6 py-3 font-semibold text-slate-700">
                  Price
                </th>
                <th className="text-right px-6 py-3 font-semibold text-slate-700">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {products.map((p) => (
                <tr key={p._id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 text-slate-900 font-medium">
                    {p.name}
                  </td>

                  <td className="px-6 py-4 text-slate-900">
                    ₹ {p.price}
                  </td>

                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => deleteHandler(p._id)}
                      className="px-3 py-1.5 text-sm rounded-md bg-red-600 text-white hover:bg-red-700 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Products;
