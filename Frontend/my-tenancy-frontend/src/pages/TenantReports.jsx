import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import BackButton from '../components/BackButton';
import API from "../api/axios";

export default function TenantReports() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReports = async () => {
      setLoading(true);
      try {
        const res = await API.get("reports/tenant/");
        console.log("Reports data:", res.data);
        setReports(res.data.reports || []);
      } catch (err) {
        console.error("Error fetching reports:", err);
        if (err.response?.status === 403) {
          localStorage.clear();
          navigate("/");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, [navigate]);

  return (
    <div className="bg-gray-50 min-h-screen text-gray-800 font-sans">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          <BackButton />
          
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Reports</h2>
            <button
              onClick={() => navigate("/tenant/reports/add")}
              className="bg-gradient-to-r from-pink-500 to-red-500 text-white px-5 py-2 rounded-xl shadow hover:opacity-90 transition"
            >
              + Add Report
            </button>
          </div>

          <div className="bg-white shadow-lg rounded-2xl p-6">
            {loading ? (
              <div className="py-8 text-center text-gray-500">
                Loading reports...
              </div>
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
                        onClick={() => navigate(`/tenant/reports/${report.id}`)}
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
        </div>
      </div>
    </div>
  );
}