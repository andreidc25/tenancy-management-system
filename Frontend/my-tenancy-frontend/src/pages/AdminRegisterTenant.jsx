import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

const AddTenantPage = () => {
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    property: "",
  });
  const [loading, setLoading] = useState(true);

  // 🧱 Fetch properties
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await API.get("properties/");
        setProperties(res.data);
      } catch (err) {
        console.error("Failed to fetch properties:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("tenant-register/", formData);
      alert(res.data.message || "Tenant successfully registered!");
      navigate("/admin/tenants");
    } catch (err) {
      console.error("Failed to register tenant:", err.response?.data || err.message);
      alert("Error: Could not register tenant. Check console for details.");
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen text-gray-500">
        Loading properties...
      </div>
    );

  return (
    <div className="bg-gray-50 min-h-screen text-gray-800 font-sans">
      <Navbar />
      <header className="px-8 py-6 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Register New Tenant</h2>
      </header>

      <main className="p-8">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-lg rounded-2xl p-8 max-w-2xl mx-auto space-y-6"
        >
          {/* Username */}
          <div>
            <label className="block font-medium mb-2">Username:</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter tenant username"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring focus:ring-blue-200 focus:outline-none"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block font-medium mb-2">Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter tenant email"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring focus:ring-blue-200 focus:outline-none"
              required
            />
          </div>

          {/* Property */}
          <div>
            <label className="block font-medium mb-2">Assign Property:</label>
            <select
              name="property"
              value={formData.property}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring focus:ring-blue-200 focus:outline-none"
              required
            >
              <option value="">-- Select Property --</option>
              {properties.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name || p.location || `Property #${p.id}`}
                </option>
              ))}
            </select>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => navigate("/admin/tenants")}
              className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-5 py-2 rounded-xl transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-gradient-to-r from-green-500 to-emerald-400 text-white px-6 py-2 rounded-xl shadow hover:opacity-90 transition"
            >
              Register Tenant
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default AddTenantPage;
