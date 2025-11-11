import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import API from "../api/axios";

export default function PaymentHistory() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const res = await API.get("payments/tenant/history/");
        console.log("Payment history:", res.data);
        setPayments(res.data);
      } catch (err) {
        console.error("Error fetching payments:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPayments();
  }, []);

  return (
    <Card className="shadow-md">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-semibold text-gray-800">
          Recent Payments
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="text-center text-gray-500 py-6">Loading payments...</div>
        ) : payments.length === 0 ? (
          <div className="text-center text-gray-400 italic py-6">
            No payment records found
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm border-t border-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-3 text-left">Date</th>
                  <th className="px-4 py-3 text-left">Method</th>
                  <th className="px-4 py-3 text-left">Amount</th>
                  <th className="px-4 py-3 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((p) => (
                  <tr key={p.id} className="border-b hover:bg-gray-50 transition">
                    <td className="px-4 py-3">
                      {new Date(p.payment_date).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3">{p.method || "—"}</td>
                    <td className="px-4 py-3 font-semibold">₱{p.amount.toLocaleString()}</td>
                    <td
                      className={`px-4 py-3 font-semibold ${
                        p.status === "COMPLETED"
                          ? "text-green-600"
                          : p.status === "PENDING"
                          ? "text-yellow-600"
                          : "text-gray-600"
                      }`}
                    >
                      {p.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
