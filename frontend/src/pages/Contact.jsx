import { useState } from "react";
import API from "../services/api";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      await API.post("/contact", form);
      setSuccess("Your message has been sent successfully");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setError("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 py-16">
        
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            Contact <span className="text-indigo-600">GroceryPro</span>
          </h1>
          <p className="text-slate-600 max-w-2xl">
            Have questions, feedback, or need support? Reach out to us and our
            team will get back to you as soon as possible.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          
          {/* Contact Info */}
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-lg">Email</h3>
              <p className="text-slate-600">support@grocerypro.com</p>
            </div>

            <div>
              <h3 className="font-semibold text-lg">Phone</h3>
              <p className="text-slate-600">+91 99999 99999</p>
            </div>

            <div>
              <h3 className="font-semibold text-lg">Office</h3>
              <p className="text-slate-600">
                Mehsana, Gujarat, India
              </p>
            </div>

            <div className="bg-white border rounded-xl p-6 text-sm text-slate-600">
              Our support team is available Monday to Saturday, 9 AM – 7 PM.
            </div>
          </div>

          {/* Contact Form */}
          <form
            onSubmit={submitHandler}
            className="bg-white border rounded-xl p-6 space-y-4"
          >
            {error && (
              <p className="text-red-600 text-sm">{error}</p>
            )}

            {success && (
              <p className="text-green-600 text-sm">{success}</p>
            )}

            <input
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
              placeholder="Your Name"
              required
              className="w-full border rounded-md px-4 py-2"
            />

            <input
              type="email"
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
              placeholder="Your Email"
              required
              className="w-full border rounded-md px-4 py-2"
            />

            <textarea
              rows="4"
              value={form.message}
              onChange={(e) =>
                setForm({ ...form, message: e.target.value })
              }
              placeholder="Write your message..."
              required
              className="w-full border rounded-md px-4 py-2"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-700 transition disabled:opacity-60"
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
