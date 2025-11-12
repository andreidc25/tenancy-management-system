import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { CheckCircle, XCircle, Loader2, Wallet } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import BackButton from '../components/BackButton';
import API from '../api/axios'; // ✅ Use the centralized Axios instance

export default function TenantPayments() {
  const navigate = useNavigate();
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [amount, setAmount] = useState('');
  const [method, setMethod] = useState('BANK');
  const [balanceInfo, setBalanceInfo] = useState(null);

  // ✅ Decode user ID from JWT token
  const getUserId = () => {
    const token = localStorage.getItem('access_token');
    if (token) {
      try {
        return jwtDecode(token).user_id;
      } catch {
        return null;
      }
    }
    return null;
  };

  // ✅ Fetch payments and balance
  useEffect(() => {
    const fetchPaymentsAndBalance = async () => {
      setLoading(true);
      const userId = getUserId();
      if (!userId) {
        setError('Authentication required');
        setLoading(false);
        return;
      }

      try {
        const [paymentsRes, balanceRes] = await Promise.all([
          API.get(`payments/?tenant_id=${userId}`),
          API.get(`tenants/balance/${userId}/`),
        ]);

        setPayments(paymentsRes.data);
        setBalanceInfo(balanceRes.data);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load payments or balance');
      } finally {
        setLoading(false);
      }
    };

    fetchPaymentsAndBalance();
  }, []);

  // ✅ Redirect to appropriate payment flow
  const handleRedirectPayment = async (e) => {
    e.preventDefault();
    setError('');

    if (!amount || Number(amount) <= 0) {
      setError('Please enter a valid amount');
      return;
    }

    try {
      // ✅ Fetch the tenant profile to get correct tenant ID
      const profileRes = await API.get('tenants/profile/me/');
      const tenantProfileId = profileRes.data.tenant_id;

      // ✅ Store both values (for next page)
      localStorage.setItem('pending_payment_amount', amount);
      localStorage.setItem('tenant_profile_id', tenantProfileId);

      // ✅ Redirect based on payment method
      if (method === 'CASH') navigate('/tenant/payments/cash');
      else if (method === 'ONLINE') navigate('/tenant/payments/online');
      else navigate('/tenant/payments/bank');
    } catch (err) {
      console.error('Error fetching tenant profile:', err);
      setError('Could not identify your tenant profile.');
    }
  };

  // ✅ Helper function to show readable payment method names
  const getMethodLabel = (code) => {
    switch (code) {
      case 'CASH':
        return 'Cash';
      case 'BANK':
        return 'Bank Transfer';
      case 'ONLINE':
        return 'Online Payment';
      default:
        return code || 'N/A';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 py-8 max-w-3xl">
        <BackButton />

        {/* Account Summary */}
        {balanceInfo && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <h3 className="text-lg font-semibold text-blue-800 flex items-center gap-2">
              <Wallet size={18} /> Account Summary
            </h3>

            <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600">Monthly Rent</p>
                <p className="font-medium text-gray-900">
                  ₱{balanceInfo.monthly_rent.toFixed(2)}
                </p>
              </div>
              <div>
                <p className="text-gray-600">Months Due</p>
                <p className="font-medium text-gray-900">
                  {balanceInfo.months_due}
                </p>
              </div>
              <div>
                <p className="text-gray-600">Total Paid</p>
                <p className="font-medium text-green-700">
                  ₱{balanceInfo.total_paid.toFixed(2)}
                </p>
              </div>
              <div>
                <p className="text-gray-600">Remaining Balance</p>
                <p
                  className={`font-medium ${
                    balanceInfo.balance > 0
                      ? 'text-red-600'
                      : 'text-green-600'
                  }`}
                >
                  ₱{balanceInfo.balance.toFixed(2)}
                </p>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div
                    className="bg-green-500 h-2 rounded-full"
                    style={{
                      width: `${Math.min(
                        (balanceInfo.total_paid / balanceInfo.total_due) * 100,
                        100
                      )}%`,
                    }}
                  ></div>
                </div>
              </div>
            </div>

            {balanceInfo.overdue && (
              <div className="mt-3 p-2 bg-red-50 border border-red-200 text-red-700 rounded">
                ⚠️ Your rent is overdue! Please settle your balance soon.
              </div>
            )}
          </div>
        )}

        {/* Payment Form */}
        <div className="bg-white rounded-xl shadow-md p-8">
          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-600 rounded">
              {error}
            </div>
          )}

          <form
            onSubmit={handleRedirectPayment}
            className="mb-8 flex flex-col sm:flex-row gap-4 items-end flex-wrap"
          >
            <div className="flex-1 min-w-[150px]">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Amount
              </label>
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

            <div className="flex-1 min-w-[150px]">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Payment Method
              </label>
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
              className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <Wallet size={18} /> Pay
            </button>
          </form>

          {/* Payment History */}
          <h2 className="text-lg font-semibold mb-2">Payment History</h2>
          {loading ? (
            <div className="py-8 text-center text-gray-500">
              Loading payments...
            </div>
          ) : payments.length === 0 ? (
            <div className="py-8 text-center text-gray-400">
              No payments found.
            </div>
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
                      <td className="px-4 py-2">
                        ₱{Number(payment.amount).toFixed(2)}
                      </td>
                      <td className="px-4 py-2">
                        {getMethodLabel(payment.payment_method)}
                      </td>
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
