import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/userSlice";
import { clearCart } from "../redux/cartSlice";
import { useState } from "react";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");

  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.user);

  const logoutHandler = () => {
    dispatch(logout());
    dispatch(clearCart());
    setMenuOpen(false);
    navigate("/login");
  };

  const searchHandler = (e) => {
    e.preventDefault();
    navigate(`/?search=${search}`);
    setMenuOpen(false);
  };

  return (
    <header className="bg-white border-b sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
        
        {/* Logo */}
        <Link
          to="/"
          onClick={() => setMenuOpen(false)}
          className="text-2xl font-bold text-slate-900 whitespace-nowrap"
        >
          Grocery<span className="text-indigo-600">Pro</span>
        </Link>

        {/* 🔍 DESKTOP SEARCH */}
        <form
          onSubmit={searchHandler}
          className="hidden md:flex flex-1 max-w-md mx-6"
        >
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border rounded-l-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            type="submit"
            className="bg-indigo-600 text-white px-4 rounded-r-md hover:bg-indigo-700"
          >
            Search
          </button>
        </form>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
          <Link to="/" className="hover:text-slate-900">Home</Link>
          <Link to="/about" className="hover:text-slate-900">About</Link>
          <Link to="/contact" className="hover:text-slate-900">Contact</Link>

          <Link to="/cart" className="relative hover:text-slate-900">
            Cart
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-3 bg-indigo-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {cartItems.length}
              </span>
            )}
          </Link>

          {userInfo && !userInfo.isAdmin && (
            <Link to="/my-orders">My Orders</Link>
          )}

          {!userInfo && (
            <Link
              to="/login"
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Login
            </Link>
          )}

          {userInfo && (
            <>
              {userInfo.isAdmin && (
                <Link
                  to="/admin/dashboard"
                  className="px-4 py-2 border border-indigo-600 text-indigo-600 rounded-md hover:bg-indigo-50"
                >
                  Admin
                </Link>
              )}
              <button
                onClick={logoutHandler}
                className="px-4 py-2 bg-slate-100 text-slate-700 rounded-md hover:bg-slate-200"
              >
                Logout
              </button>
            </>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-slate-700"
        >
          <svg
            className="w-7 h-7"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>

      {/* 📱 MOBILE MENU */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t shadow-sm">
          <div className="flex flex-col px-6 py-4 gap-4 text-sm font-medium text-slate-700">
            
            {/* 🔍 MOBILE SEARCH */}
            <form onSubmit={searchHandler} className="flex gap-2">
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1 border rounded-md px-3 py-2 text-sm"
              />
              <button className="bg-indigo-600 text-white px-4 rounded-md">
                Go
              </button>
            </form>

            <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
            <Link to="/about" onClick={() => setMenuOpen(false)}>About</Link>
            <Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>
            <Link to="/cart" onClick={() => setMenuOpen(false)}>
              Cart ({cartItems.length})
            </Link>

            {userInfo && !userInfo.isAdmin && (
              <Link to="/my-orders" onClick={() => setMenuOpen(false)}>
                My Orders
              </Link>
            )}

            {!userInfo && (
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="bg-indigo-600 text-white px-4 py-2 rounded-md text-center"
              >
                Login
              </Link>
            )}

            {userInfo && (
              <>
                {userInfo.isAdmin && (
                  <Link
                    to="/admin/dashboard"
                    onClick={() => setMenuOpen(false)}
                    className="border border-indigo-600 text-indigo-600 px-4 py-2 rounded-md text-center"
                  >
                    Admin Dashboard
                  </Link>
                )}

                <button
                  onClick={logoutHandler}
                  className="bg-slate-100 text-slate-700 px-4 py-2 rounded-md text-left"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
