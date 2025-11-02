import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { CreditCard, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function TenantPayments() {
  const navigate = useNavigate();
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [amount, setAmount] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Get user ID from JWT
  const getUserId = () => {
    const token = localStorage.getItem('access_token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        return decoded.user_id;
      } catch (e) {
        return null;
      }
    }
    return null;
  };

  // Fetch payment history
  useEffect(() => {
    const fetchPayments = async () => {
      setLoading(true);
      setError('');
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
        console.log('Fetched payments:', res.data); // Debug log
        setPayments(res.data);
      } catch (err) {
        setError('Failed to load payments');
        console.error('Error fetching payments:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchPayments();
    // eslint-disable-next-line
  }, []);

  // Handle new payment submission
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
      const postRes = await axios.post(
        'http://localhost:8000/api/payments/',
        {
          tenant: userId,
          amount: Number(amount),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
        }
      );
      console.log('Payment POST response:', postRes.data); // Debug log
      setSuccess('Payment submitted successfully');
      setAmount('');
      // Refresh payment list
      const res = await axios.get(`http://localhost:8000/api/payments/?tenant_id=${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      });
      console.log('Payments after submit:', res.data); // Debug log
      setPayments(res.data);
    } catch (err) {
      setError('Failed to submit payment');
      console.error('Error submitting payment:', err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 py-8 max-w-3xl">
        <div className="bg-white rounded-xl shadow-md p-8">
          {/* Alerts */}
          {error && <div className="mb-4 p-3 bg-red-50 text-red-600 rounded">{error}</div>}
          {success && <div className="mb-4 p-3 bg-green-50 text-green-600 rounded">{success}</div>}

          {/* Payment Form */}
          <form onSubmit={handlePayment} className="mb-8 flex flex-col sm:flex-row gap-4 items-end">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
              <input
                type="number"
                min="1"
                step="0.01"
                value={amount}
                onChange={e => setAmount(e.target.value)}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Enter amount"
                required
              />
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-60"
            >
              {submitting ? <Loader2 size={18} className="animate-spin" /> : <CreditCard size={18} />}
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
                    <th className="px-4 py-2 text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {payments.map((payment) => (
                    <tr key={payment.id} className="border-t">
                      <td className="px-4 py-2">{new Date(payment.date).toLocaleDateString()}</td>
                      <td className="px-4 py-2">${payment.amount.toFixed(2)}</td>
                      <td className="px-4 py-2">
                        {payment.status === 'completed' ? (
                          <span className="flex items-center gap-1 text-green-600"><CheckCircle size={16} /> Completed</span>
                        ) : payment.status === 'failed' ? (
                          <span className="flex items-center gap-1 text-red-600"><XCircle size={16} /> Failed</span>
                        ) : (
                          <span className="flex items-center gap-1 text-gray-500"><Loader2 size={16} /> Pending</span>
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
