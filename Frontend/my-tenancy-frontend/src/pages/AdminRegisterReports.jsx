import React, { useState } from "react";
import Navbar from "../components/Navbar";

const RegisterReportPage = () => {
  const [formData, setFormData] = useState({
    tenant: "",
    title: "",
    message: "",
    image: null,
    status: "Submitted",
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === "file" ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Prepare form data for Django API (multipart/form-data)
    const data = new FormData();
    data.append("tenant", formData.tenant);
    data.append("title", formData.title);
    data.append("message", formData.message);
    data.append("status", formData.status);
    if (formData.image) data.append("image", formData.image);

    console.log("Report Submitted:", formData);
    // Later: POST this to your Django backend (e.g., /api/reports/)
    // fetch("http://localhost:8000/api/reports/", { method: "POST", body: data });
  };

  return (
    <div className="bg-gray-50 min-h-screen text-gray-800 font-sans">
      <Navbar />

      {/* Page Header */}
      <header className="px-8 py-6 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Add Report</h2>
      </header>

      {/* Form */}
      <main className="p-8">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-lg rounded-2xl p-8 max-w-3xl mx-auto space-y-6"
          encType="multipart/form-data"
        >
          {/* Tenant */}
          <div>
            <label className="block font-medium mb-2">Tenant:</label>
            <select
              name="tenant"
              value={formData.tenant}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring focus:ring-blue-200 focus:outline-none"
              required
            >
              <option value="">-- Select Tenant --</option>
              <option value="bonbon.acm">bonbon.acm</option>
              <option value="juan.delacruz">juan.delacruz</option>
              <option value="maria.santos">maria.santos</option>
            </select>
          </div>

          {/* Title */}
          <div>
            <label className="block font-medium mb-2">Title:</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter report title"
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
              placeholder="Describe the issue..."
              rows="5"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring focus:ring-blue-200 focus:outline-none resize-none"
              required
            ></textarea>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block font-medium mb-2">Image:</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white focus:ring focus:ring-blue-200 focus:outline-none"
            />
            <p className="text-sm text-gray-500 mt-1">
              (Optional) Upload a photo related to the report
            </p>
          </div>

          {/* Status */}
          <div>
            <label className="block font-medium mb-2">Status:</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring focus:ring-blue-200 focus:outline-none"
            >
              <option value="Submitted">Submitted</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
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
              className="bg-gradient-to-r from-pink-500 to-red-500 text-white px-6 py-2 rounded-xl shadow hover:opacity-90 transition"
            >
              Save Report
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default RegisterReportPage;
