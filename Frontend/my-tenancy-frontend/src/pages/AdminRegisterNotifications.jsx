import React, { useState } from "react";
import Navbar from "../components/Navbar";

const RegisterNotificationPage = () => {
  const [formData, setFormData] = useState({
    title: "",
    message: "",
    notificationType: "Announcement",
    tenant: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Notification Created:", formData);
    // Later: connect to your Django API (POST /api/notifications/)
  };

  return (
    <div className="min-h-screen text-gray-800 font-sans">
      <Navbar />

      {/* Page Header */}
      <header className="px-8 py-6 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Add Notification</h2>
      </header>

      <main className="p-8">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-lg rounded-2xl p-8 max-w-3xl mx-auto space-y-6"
        >
          {/* Title */}
          <div>
            <label className="block font-medium mb-2">Title:</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter notification title"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring focus:ring-blue-200 focus:outline-none"
              required
            />
          </div>

          {/* Message */}
          <div>
            <label className="block font-medium mb-2">Message:</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Enter message content"
              rows="5"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring focus:ring-blue-200 focus:outline-none resize-none"
              required
            ></textarea>
          </div>

          {/* Notification Type */}
          <div>
            <label className="block font-medium mb-2">Notification Type:</label>
            <select
              name="notificationType"
              value={formData.notificationType}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring focus:ring-blue-200 focus:outline-none"
            >
              <option value="Announcement">Announcement</option>
              <option value="Payment Reminder">Payment Reminder</option>
              <option value="Maintenance">Maintenance</option>
            </select>
          </div>

          {/* Tenant Selector */}
          <div>
            <label className="block font-medium mb-2">Tenant:</label>
            <select
              name="tenant"
              value={formData.tenant}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring focus:ring-blue-200 focus:outline-none"
            >
              <option value="">-- Select Tenant --</option>
              <option value="bonbon.acm">bonbon.acm</option>
              <option value="juan.delacruz">juan.delacruz</option>
              <option value="maria.santos">maria.santos</option>
            </select>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-5 py-2 rounded-xl transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-gradient-to-r from-sky-500 to-blue-500 text-white px-6 py-2 rounded-xl shadow hover:opacity-90 transition"
            >
              Save Notification
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default RegisterNotificationPage;
