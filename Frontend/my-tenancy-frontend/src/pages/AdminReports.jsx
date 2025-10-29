import React from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

const ReportsPage = () => {
const navigate = useNavigate();  
  return (
    <div className="bg-gray-50 min-h-screen text-gray-800 font-sans">
      <Navbar />

      <header className="px-8 py-6 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Reports</h2>
        <button 
            onClick={() => navigate("/admin/reports/add")}
            className="bg-gradient-to-r from-pink-500 to-red-500 text-white px-5 py-2 rounded-xl shadow hover:opacity-90 transition">
          + Add Report
        </button>
      </header>

      <main className="p-8">
        <div className="bg-white shadow-lg rounded-2xl p-6">
          <table className="min-w-full border-collapse w-full">
            <thead>
              <tr className="text-left bg-gray-100">
                <th className="py-3 px-4 rounded-tl-lg">Title</th>
                <th className="py-3 px-4">Tenant</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 rounded-tr-lg">Created At</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t hover:bg-gray-50">
                <td className="py-3 px-4 text-blue-600 font-medium hover:underline cursor-pointer">
                  Sirang Tubo
                </td>
                <td className="py-3 px-4">bonbon.acm</td>
                <td className="py-3 px-4 text-yellow-500 font-semibold">In Progress</td>
                <td className="py-3 px-4">Oct 29, 2025, 6:06 a.m.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default ReportsPage;
