import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

const ReportsPage = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReports = async () => {
      setLoading(true);
      try {
        const res = await API.get("reports/all/");
        console.log("Admin reports:", res.data);
        setReports(res.data);
      } catch (err) {
        console.error("Error fetching reports:", err);
        setError("Failed to load reports.");
      } finally {
        setLoading(false);
      }
    };
    fetchReports();
  }, []);

  return (
    <div className="min-h-screen text-gray-800 font-sans">
      <Navbar />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <header className="px-8 py-6 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-2xl font-semibold">Reports</h2>
        </header>

        <main className="p-8">
        <div className="bg-white shadow-lg rounded-2xl p-6">
          {loading ? (
            <p className="text-center text-gray-500 py-6">Loading reports...</p>
          ) : error ? (
            <p className="text-center text-red-500 py-6">{error}</p>
          ) : (
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
                      onClick={() => navigate(`/admin/reports/${report.id}`)}
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
          )}
        </div>
      </main>
      </motion.div>
    </div>
  );
};

export default ReportsPage;
