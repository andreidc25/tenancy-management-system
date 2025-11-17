import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../api/config";

export default function AddNotificationPage() {
  const [formData, setFormData] = useState({
    title: "",
    message: "",
    notification_type: "ANNOUNCE",
    tenant: "",
  });
  const [tenants, setTenants] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${API_URL}/tenants/`)
      .then((res) => setTenants(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      tenant: formData.tenant === "" ? null : formData.tenant,
    };

    axios
      .post(`${API_URL}/notifications/`, payload, {
        withCredentials: true,
      })
      .then(() => navigate("/admin/notifications"))
      .catch((err) => console.error("Error creating notification:", err));
  };

  return (
    <div className="min-h-screen text-gray-800 font-sans">
      <Navbar />
      <main className="max-w-3xl mx-auto p-8">
        <h2 className="text-2xl font-semibold mb-6">Send Notification</h2>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-2xl shadow-lg space-y-4"
        >
          <div>
            <label className="block text-gray-700 mb-2">Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="w-full border border-gray-300 rounded-lg p-2"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Message</label>
            <textarea
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              className="w-full border border-gray-300 rounded-lg p-2"
              rows="4"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Type</label>
            <select
              value={formData.notification_type}
              onChange={(e) =>
                setFormData({ ...formData, notification_type: e.target.value })
              }
              className="w-full border border-gray-300 rounded-lg p-2"
            >
              <option value="ANNOUNCE">Announcement</option>
              <option value="PAYMENT">Payment Reminder</option>
              <option value="MAINT">Maintenance</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Target Tenant</label>
            <select
              value={formData.tenant}
              onChange={(e) =>
                setFormData({ ...formData, tenant: e.target.value })
              }
              className="w-full border border-gray-300 rounded-lg p-2"
            >
              <option value="">All Tenants</option>
              {tenants.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.user.username}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="bg-gradient-to-r from-sky-500 to-blue-500 text-white px-5 py-2 rounded-xl shadow hover:opacity-90 transition"
          >
            Send Notification
          </button>
        </form>
      </main>
    </div>
  );
}
