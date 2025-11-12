import React, { useState } from "react";
import Navbar from "../components/Navbar";
import BackButton from "../components/BackButton";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

const RegisterReportPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    message: "",
    image: null,
    status: "SUBMITTED", // match backend enum
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === "file" ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");
    setError("");

    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("message", formData.message);
      data.append("status", formData.status);
      if (formData.image) data.append("image", formData.image);

      const res = await API.post("reports/tenant/add/", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Report created:", res.data);
      setSuccess("Report submitted successfully!");
      setTimeout(() => navigate("/tenant/reports"), 1500); // redirect after success
    } catch (err) {
      console.error("Error submitting report:", err);
      setError("Failed to submit report. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen text-gray-800 font-sans">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <BackButton />

        <h2 className="text-2xl font-semibold mb-6">Add Report</h2>

        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-lg rounded-2xl p-8 max-w-3xl mx-auto space-y-6"
          encType="multipart/form-data"
        >
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

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => navigate("/tenant/reports")}
              className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-5 py-2 rounded-xl transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="bg-gradient-to-r from-pink-500 to-red-500 text-white px-6 py-2 rounded-xl shadow hover:opacity-90 transition"
            >
              {loading ? "Submitting..." : "Save Report"}
            </button>
          </div>

          {success && <p className="text-green-600 text-center">{success}</p>}
          {error && <p className="text-red-600 text-center">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default RegisterReportPage;
