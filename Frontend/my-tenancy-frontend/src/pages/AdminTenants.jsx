import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const TenantsPage = () => {
const navigate = useNavigate();
  return (
    <div className="bg-gray-50 min-h-screen text-gray-800 font-sans">
      <Navbar />

      <header className="px-8 py-6 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Tenant Profiles</h2>
        <button
          onClick={() => navigate("/admin/tenants/add")}
          className="bg-gradient-to-r from-green-500 to-emerald-400 text-white px-5 py-2 rounded-xl shadow hover:opacity-90 transition"
        >
          + Add Tenant
        </button>
      </header>

      <main className="p-8">
        <div className="bg-white shadow-lg rounded-2xl p-6">
          <table className="min-w-full border-collapse w-full">
            <thead>
              <tr className="text-left bg-gray-100">
                <th className="py-3 px-4 rounded-tl-lg">Full Name</th>
                <th className="py-3 px-4">Phone Number</th>
                <th className="py-3 px-4">Property</th>
                <th className="py-3 px-4">Lease Start</th>
                <th className="py-3 px-4">Monthly Rent</th>
                <th className="py-3 px-4">Security Deposit</th>
                <th className="py-3 px-4">Lease End</th>
                <th className="py-3 px-4 rounded-tr-lg">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t hover:bg-gray-50">
                <td className="py-3 px-4 text-blue-600 font-medium hover:underline cursor-pointer">
                  bonbon.acm
                </td>
                <td className="py-3 px-4">-</td>
                <td className="py-3 px-4">-</td>
                <td className="py-3 px-4">Oct 29, 2025</td>
                <td className="py-3 px-4">₱0.01</td>
                <td className="py-3 px-4">₱0.01</td>
                <td className="py-3 px-4">Nov 29, 2025</td>
                <td className="py-3 px-4 text-green-500 font-semibold">Active</td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default TenantsPage;
