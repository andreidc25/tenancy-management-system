import React, { useState } from "react";
import Navbar from "../components/Navbar";

const RegisterTenantPage = () => {
  const [formData, setFormData] = useState({
    user: "",
    phoneNumber: "",
    property: "",
    leaseStart: "",
    leaseEnd: "",
    monthlyRent: "",
    securityDeposit: "",
    isActive: true,
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
    console.log("Tenant registered:", formData);
    // later connect this with your Django backend via fetch/axios
  };

  return (
    <div className="bg-gray-50 min-h-screen text-gray-800 font-sans">
      <Navbar />

      <header className="px-8 py-6 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Add Tenant Profile</h2>
      </header>

      <main className="p-8">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-lg rounded-2xl p-8 max-w-3xl mx-auto space-y-6"
        >
          {/* User */}
          <div>
            <label className="block font-medium mb-2">User:</label>
            <select
              name="user"
              value={formData.user}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring focus:ring-blue-200 focus:outline-none"
              required
            >
              <option value="">-- Select User --</option>
              <option value="bonbon.acm">bonbon.acm</option>
              <option value="juan.delacruz">juan.delacruz</option>
            </select>
          </div>

          {/* Phone Number */}
          <div>
            <label className="block font-medium mb-2">Phone Number:</label>
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="e.g. 09123456789"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring focus:ring-blue-200 focus:outline-none"
            />
          </div>

          {/* Property */}
          <div>
            <label className="block font-medium mb-2">Property:</label>
            <select
              name="property"
              value={formData.property}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring focus:ring-blue-200 focus:outline-none"
            >
              <option value="">-- Select Property --</option>
              <option value="Pasig Unit 1">Pasig Unit 1</option>
              <option value="Taguig Unit 2">Taguig Unit 2</option>
            </select>
          </div>

          {/* Lease Start Date */}
          <div>
            <label className="block font-medium mb-2">Lease Start Date:</label>
            <input
              type="date"
              name="leaseStart"
              value={formData.leaseStart}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring focus:ring-blue-200 focus:outline-none"
              required
            />
          </div>

          {/* Lease End Date */}
          <div>
            <label className="block font-medium mb-2">Lease End Date:</label>
            <input
              type="date"
              name="leaseEnd"
              value={formData.leaseEnd}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring focus:ring-blue-200 focus:outline-none"
              required
            />
          </div>

          {/* Monthly Rent */}
          <div>
            <label className="block font-medium mb-2">Monthly Rent:</label>
            <input
              type="number"
              name="monthlyRent"
              value={formData.monthlyRent}
              onChange={handleChange}
              placeholder="Enter amount (₱)"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring focus:ring-blue-200 focus:outline-none"
            />
          </div>

          {/* Security Deposit */}
          <div>
            <label className="block font-medium mb-2">Security Deposit:</label>
            <input
              type="number"
              name="securityDeposit"
              value={formData.securityDeposit}
              onChange={handleChange}
              placeholder="Enter amount (₱)"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring focus:ring-blue-200 focus:outline-none"
            />
          </div>

          {/* Active */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              name="isActive"
              checked={formData.isActive}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label className="font-medium">Is Active</label>
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
              className="bg-gradient-to-r from-green-500 to-emerald-400 text-white px-6 py-2 rounded-xl shadow hover:opacity-90 transition"
            >
              Save Tenant
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default RegisterTenantPage;
