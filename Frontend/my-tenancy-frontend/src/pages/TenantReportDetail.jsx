import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import BackButton from "../components/BackButton";
import API from "../api/axios";

export default function TenantReportDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const res = await API.get(`reports/tenant/${id}/`);
        setReport(res.data);
      } catch (err) {
        console.error("Error fetching report:", err);
        if (err.response?.status === 403) {
          localStorage.clear();
          navigate("/");
        } else if (err.response?.status === 404) {
          alert("Report not found.");
          navigate("/tenant/reports");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchReport();
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-gray-500">
        <Navbar />
        <p>Loading report details...</p>
      </div>
    );
  }

  if (!report) return null;

  const getStatusColor = (status) => {
    switch (status) {
      case "RESOLVED":
        return "bg-green-100 text-green-700";
      case "IN_PROGRESS":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen text-gray-800 font-sans">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <BackButton />
        <div className="bg-white shadow-lg rounded-2xl p-6 mt-4">
          <h1 className="text-2xl font-semibold mb-2">{report.title}</h1>
          <div className="flex items-center gap-2 mb-4">
            <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(report.status)}`}>
              {report.status.replace("_", " ")}
            </span>
            <span className="text-sm text-gray-500">
              Created: {new Date(report.created_at).toLocaleDateString()}
            </span>
          </div>

          <p className="text-gray-700 leading-relaxed mb-6 whitespace-pre-line">
            {report.message || "No message provided."}
          </p>

          {report.image && (
            <div className="border rounded-xl overflow-hidden shadow-sm max-w-md">
              <img
                src={`http://127.0.0.1:8000${report.image}`}
                alt="Report Evidence"
                className="w-full object-cover"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
