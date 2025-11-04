import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

const ReportsPage = () => {
  const [reports, setReports] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://127.0.0.1:8000/reports/all/")
      .then((res) => res.json())
      .then((data) => setReports(data.reports))
      .catch((err) => console.error("Error fetching reports:", err));
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen text-gray-800 font-sans">
      <Navbar />

      <header className="px-8 py-6 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Reports</h2>
        <button
          onClick={() => navigate("/admin/reports/add")}
          className="bg-gradient-to-r from-pink-500 to-red-500 text-white px-5 py-2 rounded-xl shadow hover:opacity-90 transition"
        >
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
              {reports.length > 0 ? (
                reports.map((report) => (
                  <tr
                    key={report.id}
                    className="border-t hover:bg-gray-50 cursor-pointer"
                  >
                    <td className="py-3 px-4 text-blue-600 font-medium hover:underline">
                      {report.title}
                    </td>
                    <td className="py-3 px-4">{report.tenant}</td>
                    <td
                      className={`py-3 px-4 font-semibold ${
                        report.status === "Resolved"
                          ? "text-green-500"
                          : report.status === "In Progress"
                          ? "text-yellow-500"
                          : "text-gray-500"
                      }`}
                    >
                      {report.status}
                    </td>
                    <td className="py-3 px-4">{report.created_at}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="py-6 text-center text-gray-400 italic"
                  >
                    No reports found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default ReportsPage;
