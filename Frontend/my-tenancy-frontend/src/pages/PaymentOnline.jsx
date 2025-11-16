import React, { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function PaymentOnline() {
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
      setError("Please upload your online payment screenshot.");
      return;
    }

    try {
      setUploading(true);

      const res = await API.get("tenants/profile/me/");
      const tenantId = res.data.tenant_id;

      const formData = new FormData();
      formData.append("tenant", tenantId);
      formData.append("amount", amount);
      formData.append("payment_method", "ONLINE");
      formData.append("proof", proof);

      await API.post("payments/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setSuccess("Online payment uploaded successfully!");
      localStorage.removeItem("pending_payment_amount");
      navigate("/tenant/payments");
    } catch (err) {
      console.error("Error submitting online payment:", err);
      setError("Failed to submit online payment. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="container mx-auto px-4 py-8 max-w-lg">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Online Payment</h1>
        <div className="bg-white p-6 rounded-xl shadow-md text-center">
          <h2 className="text-xl font-semibold mb-4">Payment Instructions</h2>

          <p className="text-gray-700 mb-4">
            Send your payment to our spoof GCash account:
          </p>
          <p className="font-semibold text-blue-700">GCash Number: 0912-345-6789</p>

          <div className="mt-4 mb-4">
            <img
              src="/gcash_qr.png"
              alt="GCash QR"
              className="w-40 mx-auto border rounded-lg"
            />
          </div>

          {error && <div className="mb-4 p-3 bg-red-50 text-red-600 rounded">{error}</div>}
          {success && <div className="mb-4 p-3 bg-green-50 text-green-600 rounded">{success}</div>}

          <form onSubmit={handleSubmit}>
            <label className="block mb-2 font-medium text-gray-700">
              Upload Screenshot of Payment
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
              {uploading ? "Uploading..." : "Submit Proof"}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
