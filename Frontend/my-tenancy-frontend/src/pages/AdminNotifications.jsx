import React from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

const NotificationsPage = () => {
const navigate = useNavigate();  
  return (
    <div className="bg-gray-50 min-h-screen text-gray-800 font-sans">
      <Navbar />

      <header className="px-8 py-6 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Notifications</h2>
        <button 
          onClick={() => navigate("/admin/notifications/add")}
          className="bg-gradient-to-r from-sky-500 to-blue-500 text-white px-5 py-2 rounded-xl shadow hover:opacity-90 transition">
          + Add Notification
        </button>
      </header>

      <main className="p-8">
        <div className="bg-white shadow-lg rounded-2xl p-6">
          <table className="min-w-full border-collapse w-full">
            <thead>
              <tr className="text-left bg-gray-100">
                <th className="py-3 px-4 rounded-tl-lg">Title</th>
                <th className="py-3 px-4">Tenant</th>
                <th className="py-3 px-4">Type</th>
                <th className="py-3 px-4">Created At</th>
                <th className="py-3 px-4 rounded-tr-lg">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t hover:bg-gray-50">
                <td className="py-3 px-4 text-blue-600 font-medium hover:underline cursor-pointer">
                  Payment Reminder
                </td>
                <td className="py-3 px-4">bonbon.acm</td>
                <td className="py-3 px-4">Payment Reminder</td>
                <td className="py-3 px-4">Oct 29, 2025, 6:00 a.m.</td>
                <td className="py-3 px-4 text-red-500 font-semibold flex items-center gap-2">
                  ❌ Unread
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default NotificationsPage;
