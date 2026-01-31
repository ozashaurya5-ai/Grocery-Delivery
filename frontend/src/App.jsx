import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import ProductDetails from "./pages/ProductDetails";
import Dashboard from "./admin/Dashboard";
import Products from "./admin/Products";
import AddProduct from "./admin/AddProduct";
import Orders from "./admin/Orders";
import Income from "./admin/Income";
import Reviews from "./admin/Reviews";
import Messages from "./admin/Messages";
import AdminProducts from "./admin/AdminProducts";
import EditProduct from "./admin/EditProduct";
import AdminCategories from "./admin/AdminCategories";
import MyOrders from "./pages/MyOrders";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Footer from "./components/Footer";


function App() {
  const { userInfo } = useSelector((state) => state.user);

  const AdminRoute = ({ children }) => {
    if (!userInfo || !userInfo.isAdmin) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/my-orders" element={<MyOrders />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />

        {/* ADMIN ROUTES */}
        <Route path="/admin/messages" element={<Messages />} />
        <Route path="/admin/products" element={<AdminProducts />} />
        <Route path="/admin/product/:id/edit" element={<EditProduct />} />
        <Route
          path="/admin/categories"
          element={<AdminCategories />}
        />
        <Route
          path="/admin/dashboard"
          element={
            <AdminRoute>
              <Dashboard />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/products"
          element={
            <AdminRoute>
              <Products />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/add-product"
          element={
            <AdminRoute>
              <AddProduct />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/orders"
          element={
            <AdminRoute>
              <Orders />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/reviews"
          element={
            <AdminRoute>
              <Reviews />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/income"
          element={
            <AdminRoute>
              <Income />
            </AdminRoute>
          }
        />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
