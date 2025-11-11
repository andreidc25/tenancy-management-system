import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/axios";
import Navbar from "../components/Navbar";
import BackButton from "../components/BackButton";

export default function AdminReportDetail() {
  const { id } = useParams();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newStatus, setNewStatus] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const res = await API.get(`reports/${id}/`);
        setReport(res.data);
        setNewStatus(res.data.status);
      } catch (err) {
        console.error("Error loading report:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchReport();
  }, [id]);

  const handleStatusUpdate = async () => {
    try {
      await API.patch(`reports/${id}/update-status/`, { status: newStatus });
      alert("✅ Report status updated!");
      navigate("/admin/reports");
    } catch (err) {
      console.error("Error updating status:", err);
      alert("❌ Failed to update status.");
    }
  };

  if (loading) return <p className="p-6">Loading report...</p>;
  if (!report) return <p className="p-6 text-red-500">Report not found.</p>;

  return (
    <div className="bg-gray-50 min-h-screen text-gray-800">
      <Navbar />
      <div className="p-8 space-y-6">
        <BackButton />
        <h1 className="text-2xl font-bold">{report.title}</h1>

        <div className="bg-white rounded-xl shadow-md p-6 space-y-4">
          <p><strong>Tenant:</strong> {report.tenant}</p>
          <p><strong>Property:</strong> {report.property}</p>
          <p><strong>Message:</strong> {report.message}</p>
          <p><strong>Status:</strong> 
            <span className="ml-2 px-2 py-1 rounded bg-gray-100 text-sm">
              {report.status.replace("_", " ")}
            </span>
          </p>
          <p><strong>Date:</strong> {report.created_at}</p>

          {report.image && (
            <div className="mt-4">
              <strong>Attached Image:</strong>
              <img
                src={report.image}
                alt="Report"
                className="mt-2 w-96 rounded-lg shadow"
              />
            </div>
          )}

          {/* 🆕 Status update form */}
          <div className="mt-6">
            <label className="block mb-2 font-medium">Update Status</label>
            <select
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
              className="border p-2 rounded-lg w-64"
            >
              <option value="SUBMITTED">Submitted</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="RESOLVED">Resolved</option>
            </select>
            <button
              onClick={handleStatusUpdate}
              className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
