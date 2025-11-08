import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { CreditCard, CheckCircle, XCircle, Loader2, Wallet } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import BackButton from '../components/BackButton';

export default function TenantPayments() {
  const navigate = useNavigate();
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [amount, setAmount] = useState('');
  const [method, setMethod] = useState('BANK'); // Default to Bank Transfer
  const [submitting, setSubmitting] = useState(false);

  // Decode user ID from token
  const getUserId = () => {
    const token = localStorage.getItem('access_token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        return decoded.user_id;
      } catch {
        return null;
      }
    }
    return null;
  };

  // Fetch all payments by tenant
  useEffect(() => {
    const fetchPayments = async () => {
      setLoading(true);
      const userId = getUserId();
      if (!userId) {
        setError('Authentication required');
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get(`http://localhost:8000/api/payments/?tenant_id=${userId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
        });
        setPayments(res.data);
      } catch (err) {
        console.error('Error fetching payments:', err);
        setError('Failed to load payments');
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  // Handle payment submission
  const handlePayment = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    setSuccess('');

    const userId = getUserId();
    if (!userId) {
      setError('Authentication required');
      setSubmitting(false);
      return;
    }

    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      setError('Please enter a valid amount');
      setSubmitting(false);
      return;
    }

    try {
      await axios.post(
        'http://localhost:8000/api/payments/',
        {
          tenant: userId,
          amount: Number(amount),
          payment_method: method, // match Django field name
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
        }
      );

      setSuccess('Payment submitted successfully');
      setAmount('');
      setMethod('BANK');

      // Refresh payments list
      const res = await axios.get(`http://localhost:8000/api/payments/?tenant_id=${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      });
      setPayments(res.data);
    } catch (err) {
      console.error('Error submitting payment:', err);
      setError('Failed to submit payment');
    } finally {
      setSubmitting(false);
    }
  };

  // Helper: display readable label for method
  const getMethodLabel = (code) => {
    switch (code) {
      case 'CASH':
        return 'Cash';
      case 'BANK':
        return 'Bank Transfer';
      case 'ONLINE':
        return 'Online Payment';
      default:
        return code;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 py-8 max-w-3xl">
        <BackButton />
        <div className="bg-white rounded-xl shadow-md p-8">
          {/* Alerts */}
          {error && <div className="mb-4 p-3 bg-red-50 text-red-600 rounded">{error}</div>}
          {success && <div className="mb-4 p-3 bg-green-50 text-green-600 rounded">{success}</div>}

          {/* Payment Form */}
          <form onSubmit={handlePayment} className="mb-8 flex flex-col sm:flex-row gap-4 items-end flex-wrap">
            <div className="flex-1 min-w-[150px]">
              <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
              <input
                type="number"
                min="1"
                step="0.01"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Enter amount"
                required
              />
            </div>

            {/* Payment Method Dropdown */}
            <div className="flex-1 min-w-[150px]">
              <label className="block text-sm font-medium text-gray-700 mb-1">Payment Method</label>
              <select
                value={method}
                onChange={(e) => setMethod(e.target.value)}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              >
                <option value="CASH">Cash</option>
                <option value="BANK">Bank Transfer</option>
                <option value="ONLINE">Online Payment</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-60"
            >
              {submitting ? <Loader2 size={18} className="animate-spin" /> : <Wallet size={18} />}
              Pay
            </button>
          </form>

          {/* Payment History */}
          <h2 className="text-lg font-semibold mb-2">Payment History</h2>
          {loading ? (
            <div className="py-8 text-center text-gray-500">Loading payments...</div>
          ) : payments.length === 0 ? (
            <div className="py-8 text-center text-gray-400">No payments found.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full border text-sm">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-4 py-2 text-left">Date</th>
                    <th className="px-4 py-2 text-left">Amount</th>
                    <th className="px-4 py-2 text-left">Method</th>
                    <th className="px-4 py-2 text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {payments.map((payment) => (
                    <tr key={payment.id} className="border-t">
                      <td className="px-4 py-2">
                        {new Date(payment.payment_date).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-2">₱{Number(payment.amount).toFixed(2)}</td>
                      <td className="px-4 py-2">{getMethodLabel(payment.payment_method)}</td>
                      <td className="px-4 py-2">
                        {payment.status === 'COMPLETED' ? (
                          <span className="flex items-center gap-1 text-green-600">
                            <CheckCircle size={16} /> Completed
                          </span>
                        ) : payment.status === 'FAILED' ? (
                          <span className="flex items-center gap-1 text-red-600">
                            <XCircle size={16} /> Failed
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 text-gray-500">
                            <Loader2 size={16} /> Pending
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
