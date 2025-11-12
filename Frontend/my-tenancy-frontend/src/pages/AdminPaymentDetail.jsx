import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/axios";
import Navbar from "../components/Navbar";
import BackButton from "../components/BackButton";

export default function AdminPaymentDetail() {
  const { id } = useParams();
  const [payment, setPayment] = useState(null);
  const [newStatus, setNewStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPayment = async () => {
      try {
        const res = await API.get(`payments/${id}/`);
        setPayment(res.data);
        setNewStatus(res.data.status);
      } catch (err) {
        console.error("Error loading payment:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPayment();
  }, [id]);

  const handleStatusUpdate = async () => {
    try {
      await API.patch(`payments/${id}/update-status/`, { status: newStatus });
      alert("✅ Payment status updated!");
      navigate("/admin/payments");
    } catch (err) {
      console.error("Error updating payment status:", err);
      alert("❌ Failed to update status.");
    }
  };

  if (loading) return <p className="p-6">Loading payment...</p>;
  if (!payment) return <p className="p-6 text-red-500">Payment not found.</p>;

  return (
    <div className="bg-gray-50 min-h-screen text-gray-800">
      <Navbar />
      <div className="p-8 space-y-6">
        <BackButton />
        <h1 className="text-2xl font-bold mb-4">Payment Details</h1>

        <div className="bg-white rounded-xl shadow-md p-6 space-y-4">
          <p><strong>Tenant:</strong> {payment.tenant}</p>
          <p><strong>Property:</strong> {payment.property}</p>
          <p><strong>Amount:</strong> ₱{payment.amount.toLocaleString()}</p>
          <p><strong>Method:</strong> {payment.payment_method}</p>
          <p><strong>Status:</strong> {payment.status}</p>
          <p><strong>Payment Date:</strong> {payment.payment_date}</p>
          <p><strong>Notes:</strong> {payment.notes || "None"}</p>

          {payment.proof && (
            <div className="mt-4">
              <strong>Proof of Payment:</strong>
              <img
                src={payment.proof}
                alt="Proof of Payment"
                className="mt-2 w-96 rounded-lg shadow"
              />
            </div>
          )}

          <div className="mt-6">
            <label className="block mb-2 font-medium">Update Status</label>
            <select
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
              className="border p-2 rounded-lg w-64"
            >
              <option value="PENDING">Pending</option>
              <option value="COMPLETED">Completed</option>
              <option value="FAILED">Failed</option>
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
