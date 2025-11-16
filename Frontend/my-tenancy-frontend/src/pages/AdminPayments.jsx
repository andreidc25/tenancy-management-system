import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom"; // ✅ Add this
import API from "../api/axios";

const AdminPaymentsPage = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [acknowledging, setAcknowledging] = useState(null);
  const navigate = useNavigate(); // ✅ Initialize navigate

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const res = await API.get("payments/");
        setPayments(res.data);
      } catch (err) {
        console.error("Failed to fetch payments:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPayments();
  }, []);

  const handleAcknowledge = async (paymentId) => {
    setAcknowledging(paymentId);
    try {
      await API.patch(`payments/${paymentId}/`, { status: "COMPLETED" });
      setPayments((prev) =>
        prev.map((p) =>
          p.id === paymentId ? { ...p, status: "COMPLETED" } : p
        )
      );
    } catch (err) {
      console.error("Error acknowledging payment:", err);
    } finally {
      setAcknowledging(null);
    }
  };

  return (
    <div className="min-h-screen text-gray-800 font-sans">
      <Navbar />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <header className="px-8 py-6 border-b border-gray-200">
          <h2 className="text-2xl font-semibold">Payment History</h2>
        </header>

        <main className="p-8">
        <div className="bg-white shadow-lg rounded-2xl p-6 overflow-x-auto">
          <table className="min-w-full border-collapse w-full">
            <thead>
              <tr className="text-left bg-gray-100">
                <th className="py-3 px-4 rounded-tl-lg">Tenant</th>
                <th className="py-3 px-4">Amount</th>
                <th className="py-3 px-4">Payment Method</th>
                <th className="py-3 px-4">Payment Date</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 rounded-tr-lg">Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6" className="text-center py-6 text-gray-500">
                    Loading...
                  </td>
                </tr>
              ) : payments.length > 0 ? (
                payments.map((payment) => (
                  <tr
                    key={payment.id}
                    className="border-t hover:bg-gray-50 cursor-pointer"
                    onClick={() => navigate(`/admin/payments/${payment.id}`)} // ✅ New
                  >
                    <td className="py-3 px-4 font-medium">
                      {payment.tenant_name}
                    </td>
                    <td className="py-3 px-4">₱{payment.amount}</td>
                    <td className="py-3 px-4">
                      {payment.payment_method === "BANK"
                        ? "Bank Transfer"
                        : payment.payment_method === "CASH"
                        ? "Cash"
                        : "Online Payment"}
                    </td>
                    <td className="py-3 px-4">{payment.payment_date}</td>
                    <td
                      className={`py-3 px-4 font-semibold ${
                        payment.status === "COMPLETED"
                          ? "text-green-500"
                          : payment.status === "PENDING"
                          ? "text-yellow-500"
                          : "text-red-500"
                      }`}
                    >
                      {payment.status}
                    </td>
                    <td className="py-3 px-4">
                      {payment.status !== "COMPLETED" && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation(); // ✅ prevent click from triggering navigation
                            handleAcknowledge(payment.id);
                          }}
                          className="bg-gradient-to-r from-blue-500 to-indigo-400 text-white px-4 py-2 rounded-xl shadow hover:opacity-90 transition"
                          disabled={acknowledging === payment.id}
                        >
                          {acknowledging === payment.id
                            ? "Acknowledging..."
                            : "Acknowledge"}
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-6 text-gray-500">
                    No payments found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
      </motion.div>
    </div>
  );
};

export default AdminPaymentsPage;
