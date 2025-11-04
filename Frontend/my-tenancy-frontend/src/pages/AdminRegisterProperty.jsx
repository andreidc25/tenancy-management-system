import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

const RegisterPropertyPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    property_type: "", // match Django field
    unit_number: "",
    rent_price: "",
    is_available: true,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Handle form submission (POST to Django)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://127.0.0.1:8000/api/properties/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Failed to create property");
      }

      // Redirect back to property list
      navigate("/admin/properties");
    } catch (err) {
      console.error("Error adding property:", err);
      setError("Failed to save property. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen text-gray-800 font-sans">
      <Navbar />

      <header className="px-8 py-6 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Add Property</h2>
      </header>

      <main className="p-8">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-lg rounded-2xl p-8 max-w-3xl mx-auto space-y-6"
        >
          {/* Property Name */}
          <div>
            <label className="block font-medium mb-2">Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter property name"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring focus:ring-blue-200 focus:outline-none"
              required
            />
          </div>

          {/* Address */}
          <div>
            <label className="block font-medium mb-2">Address:</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter address"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring focus:ring-blue-200 focus:outline-none"
              required
            />
          </div>

          {/* Property Type */}
          <div>
            <label className="block font-medium mb-2">Property Type:</label>
            <select
              name="property_type"
              value={formData.property_type}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring focus:ring-blue-200 focus:outline-none"
              required
            >
              <option value="">-- Select Type --</option>
              <option value="HOUSE">House</option>
              <option value="APARTMENT">Apartment</option>
            </select>
          </div>

          {/* Unit Number */}
          <div>
            <label className="block font-medium mb-2">Unit Number:</label>
            <input
              type="text"
              name="unit_number"
              value={formData.unit_number}
              onChange={handleChange}
              placeholder="Enter unit number"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring focus:ring-blue-200 focus:outline-none"
            />
          </div>

          {/* Rent Price */}
          <div>
            <label className="block font-medium mb-2">Rent Price (₱):</label>
            <input
              type="number"
              name="rent_price"
              value={formData.rent_price}
              onChange={handleChange}
              placeholder="Enter rent price"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring focus:ring-blue-200 focus:outline-none"
              required
            />
          </div>

          {/* Availability */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              name="is_available"
              checked={formData.is_available}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label className="font-medium">Is Available</label>
          </div>

          {/* Error Message */}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => navigate("/admin/properties")}
              className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-5 py-2 rounded-xl transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-2 rounded-xl shadow hover:opacity-90 transition ${
                loading && "opacity-60 cursor-not-allowed"
              }`}
            >
              {loading ? "Saving..." : "Save Property"}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default RegisterPropertyPage;
