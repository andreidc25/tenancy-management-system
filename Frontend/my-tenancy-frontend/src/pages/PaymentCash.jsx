import React, { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import BackButton from "../components/BackButton";

export default function PaymentCash() {
  const navigate = useNavigate();
  const [proof, setProof] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const amount = localStorage.getItem("pending_payment_amount");

    if (!amount) {
      setError("No payment amount found. Please try again.");
      return;
    }

    if (!proof) {
      setError("Please upload proof of payment.");
      return;
    }

    try {
      setUploading(true);

      // ✅ Get correct tenant profile ID
      const res = await API.get("tenants/profile/me/");
      const tenantId = res.data.tenant_id;

      const formData = new FormData();
      formData.append("tenant", tenantId);
      formData.append("amount", amount);
      formData.append("payment_method", "CASH");
      formData.append("proof", proof);

      await API.post("payments/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setSuccess("Payment proof uploaded successfully!");
      localStorage.removeItem("pending_payment_amount");
      navigate("/tenant/payments");
    } catch (err) {
      console.error("Error submitting cash payment:", err);
      setError("Failed to upload payment proof. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 py-8 max-w-lg">
        <BackButton />
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-4">Cash Payment Proof</h2>

          {error && <div className="mb-4 p-3 bg-red-50 text-red-600 rounded">{error}</div>}
          {success && <div className="mb-4 p-3 bg-green-50 text-green-600 rounded">{success}</div>}

          <form onSubmit={handleSubmit}>
            <label className="block mb-2 font-medium text-gray-700">
              Upload Proof of Payment (e.g. receipt image)
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setProof(e.target.files[0])}
              className="block w-full border rounded p-2 mb-4"
              required
            />

            <button
              type="submit"
              disabled={uploading}
              className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {uploading ? "Uploading..." : "Submit Payment"}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
