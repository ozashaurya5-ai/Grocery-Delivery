import { useEffect, useState } from "react";
import API from "../services/api";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data } = await API.get("/contact");
        setMessages(data);
      } catch (err) {
        setError("Failed to load messages (Admin only)");
      }
    };

    fetchMessages();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h2 className="text-3xl font-bold mb-6">User Messages</h2>

      {error && (
        <p className="text-red-600 mb-4">{error}</p>
      )}

      {messages.length === 0 && !error && (
        <p className="text-slate-500">No messages found</p>
      )}

      <div className="space-y-4">
        {messages.map((msg) => (
          <div
            key={msg._id}
            className="bg-white border rounded-xl p-4"
          >
            <p className="font-semibold text-slate-900">
              {msg.name}
            </p>

            <p className="text-sm text-slate-500">
              {msg.email}
            </p>

            <p className="mt-2 text-slate-700">
              {msg.message}
            </p>

            <p className="text-xs text-slate-400 mt-2">
              {new Date(msg.createdAt).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Messages;
