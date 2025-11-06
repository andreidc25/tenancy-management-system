import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

const NotificationsPage = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await API.get("notifications/"); // ✅ same as tenants
        setNotifications(res.data);
      } catch (err) {
        console.error("Failed to fetch notifications:", err);
      }
    };
    fetchNotifications();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen text-gray-800 font-sans">
      <Navbar />
      <header className="px-8 py-6 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Notifications</h2>
        <button
          onClick={() => navigate("/admin/notifications/add")}
          className="bg-gradient-to-r from-sky-500 to-blue-500 text-white px-5 py-2 rounded-xl shadow hover:opacity-90 transition"
        >
          + Add Notification
        </button>
      </header>

      <main className="p-8">
        <div className="bg-white shadow-lg rounded-2xl p-6 overflow-x-auto">
          <table className="min-w-full border-collapse w-full">
            <thead>
              <tr className="text-left bg-gray-100">
                <th className="py-3 px-4 rounded-tl-lg">Title</th>
                <th className="py-3 px-4">Tenant</th>
                <th className="py-3 px-4">Type</th>
                <th className="py-3 px-4">Created At</th>
                <th className="py-3 px-4 rounded-tr-lg">Status</th>
              </tr>
            </thead>
            <tbody>
              {notifications.length > 0 ? (
                notifications.map((n) => (
                  <tr key={n.id} className="border-t hover:bg-gray-50 transition">
                    <td className="py-3 px-4 text-blue-600 font-medium">
                      {n.title}
                    </td>
                    <td className="py-3 px-4">{n.tenant_username}</td>
                    <td className="py-3 px-4">{n.notification_type}</td>
                    <td className="py-3 px-4">
                      {new Date(n.created_at).toLocaleString()}
                    </td>
                    <td
                      className={`py-3 px-4 font-semibold ${
                        n.is_read ? "text-green-600" : "text-red-500"
                      }`}
                    >
                      {n.is_read ? "✅ Read" : "❌ Unread"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="py-6 text-center text-gray-500">
                    No notifications found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default NotificationsPage;
