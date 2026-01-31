import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">
        
        {/* Brand */}
        <div>
          <h2 className="text-xl font-bold text-white mb-3">
            Grocery<span className="text-indigo-500">Pro</span>
          </h2>
          <p className="text-sm text-slate-400">
            Fresh groceries delivered to your doorstep with speed and trust.
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="text-white font-semibold mb-3">Company</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/about" className="hover:text-white">About Us</Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-white">Contact</Link>
            </li>
            <li>
              <Link to="/privacy" className="hover:text-white">Privacy Policy</Link>
            </li>
            <li>
              <Link to="/terms" className="hover:text-white">Terms & Conditions</Link>
            </li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-white font-semibold mb-3">Support</h3>
          <ul className="space-y-2 text-sm">
            <li>Help Center</li>
            <li>Order Tracking</li>
            <li>Returns</li>
            <li>FAQs</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-white font-semibold mb-3">Contact</h3>
          <p className="text-sm">📍 Mehsana, Gujarat, India</p>
          <p className="text-sm mt-1">📞 +91 99999 99999</p>
          <p className="text-sm mt-1">✉ support@grocerypro.com</p>
        </div>
      </div>

      <div className="border-t border-slate-700 text-center py-4 text-sm text-slate-400">
        © {new Date().getFullYear()} GroceryPro. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
