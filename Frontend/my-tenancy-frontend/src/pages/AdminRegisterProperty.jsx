import React, { useState } from "react";
import Navbar from "../components/Navbar";

const RegisterPropertyPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    propertyType: "",
    unitNumber: "",
    rentPrice: "",
    isAvailable: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Property Registered:", formData);
    // Later, connect to your Django API endpoint here (POST /api/properties/)
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
              name="propertyType"
              value={formData.propertyType}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring focus:ring-blue-200 focus:outline-none"
              required
            >
              <option value="">-- Select Type --</option>
              <option value="House">House</option>
              <option value="Apartment">Apartment</option>
              <option value="Condo">Condo</option>
            </select>
          </div>

          {/* Unit Number */}
          <div>
            <label className="block font-medium mb-2">Unit Number:</label>
            <input
              type="number"
              name="unitNumber"
              value={formData.unitNumber}
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
              name="rentPrice"
              value={formData.rentPrice}
              onChange={handleChange}
              placeholder="Enter rent price"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring focus:ring-blue-200 focus:outline-none"
            />
          </div>

          {/* Availability */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              name="isAvailable"
              checked={formData.isAvailable}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label className="font-medium">Is Available</label>
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
              className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-2 rounded-xl shadow hover:opacity-90 transition"
            >
              Save Property
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default RegisterPropertyPage;
