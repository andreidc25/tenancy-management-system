import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import Navbar from '../components/Navbar';
import { Bell, Check, RefreshCw, Trash2 } from 'lucide-react';

export default function TenantNotifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [busyId, setBusyId] = useState(null);

  // Helpers
  function getAuthHeaders() {
    const token = localStorage.getItem('access_token');
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  function getUserId() {
    const token = localStorage.getItem('access_token');
    if (!token) return null;
    try {
      const decoded = jwtDecode(token);
      return decoded.user_id || decoded.sub || decoded.id || null;
    } catch (err) {
      console.error('Failed to decode token', err);
      return null;
    }
  }

  // Fetch notifications for current tenant
  const fetchNotifications = useCallback(async () => {
    setLoading(true);
    setError('');
    const userId = getUserId();
    if (!userId) {
      setError('Authentication required');
      setLoading(false);
      return;
    }

    try {
      // try common endpoints; adjust to your backend
      const url = `http://localhost:8000/api/notifications/?tenant_id=${userId}`;
      const res = await axios.get(url, { headers: getAuthHeaders() });
      console.log('Fetched notifications', res.data);
      setNotifications(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error('Error fetching notifications', err);
      setError('Failed to load notifications');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNotifications();
    // optional polling every 60s
    const id = setInterval(fetchNotifications, 60000);
    return () => clearInterval(id);
  }, [fetchNotifications]);

  // Mark single notification read/unread
  async function toggleRead(n) {
    setBusyId(n.id);
    setError('');
    try {
      const url = `http://localhost:8000/api/notifications/${n.id}/`;
      // optimistic update
      setNotifications(prev => prev.map(x => (x.id === n.id ? { ...x, read: !x.read } : x)));
      await axios.patch(url, { read: !n.read }, { headers: getAuthHeaders() });
    } catch (err) {
      console.error('toggleRead error', err);
      setError('Failed to update notification');
      // rollback
      setNotifications(prev => prev.map(x => (x.id === n.id ? { ...x, read: n.read } : x)));
    } finally {
      setBusyId(null);
    }
  }

  // Mark all as read
  async function markAllRead() {
    setError('');
    try {
      // backend may support bulk endpoint; otherwise patch individually
      const url = `http://localhost:8000/api/notifications/mark-all-read/`;
      await axios.post(url, {}, { headers: getAuthHeaders() });
      // refresh list
      fetchNotifications();
    } catch (err) {
      console.warn('bulk mark-all-read failed, falling back to individual calls', err);
      // fallback: patch each unread
      const unread = notifications.filter(n => !n.read);
      await Promise.all(unread.map(n => axios.patch(`http://localhost:8000/api/notifications/${n.id}/`, { read: true }, { headers: getAuthHeaders() }).catch(e => console.error(e))));
      fetchNotifications();
    }
  }

  // Delete notification
  async function deleteNotification(id) {
    setBusyId(id);
    setError('');
    try {
      await axios.delete(`http://localhost:8000/api/notifications/${id}/`, { headers: getAuthHeaders() });
      setNotifications(prev => prev.filter(n => n.id !== id));
    } catch (err) {
      console.error('deleteNotification error', err);
      setError('Failed to delete notification');
    } finally {
      setBusyId(null);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Bell size={24} className="text-indigo-600" />
              <h1 className="text-xl font-semibold">Notifications</h1>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={fetchNotifications} title="Refresh" className="px-3 py-2 bg-gray-100 rounded hover:bg-gray-200 inline-flex items-center gap-2"><RefreshCw size={16} /> Refresh</button>
              <button onClick={markAllRead} title="Mark all as read" className="px-3 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">Mark all read</button>
            </div>
          </div>

          {loading ? (
            <div className="py-8 text-center text-gray-500">Loading notifications…</div>
          ) : error ? (
            <div className="py-4 text-center text-red-600">{error}</div>
          ) : notifications.length === 0 ? (
            <div className="py-8 text-center text-gray-400">No notifications.</div>
          ) : (
            <ul className="space-y-3">
              {notifications.map(n => (
                <li key={n.id} className={`p-4 rounded border ${n.read ? 'bg-white' : 'bg-indigo-50 border-indigo-100'}`}>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <div className="text-sm font-semibold">{n.title || 'Notification'}</div>
                        {!n.read && <span className="text-xs text-white bg-indigo-600 px-2 py-0.5 rounded ml-2">New</span>}
                      </div>
                      <div className="text-sm text-gray-700 mt-1">{n.body || n.message || ''}</div>
                      <div className="text-xs text-gray-400 mt-2">{n.created || n.timestamp ? new Date(n.created || n.timestamp).toLocaleString() : ''}</div>
                    </div>

                    <div className="ml-4 flex flex-col items-end gap-2">
                      <button onClick={() => toggleRead(n)} disabled={busyId === n.id} className="px-2 py-1 bg-gray-100 rounded hover:bg-gray-200 text-sm">
                        <Check size={14} /> {n.read ? 'Mark unread' : 'Mark read'}
                      </button>
                      <button onClick={() => deleteNotification(n.id)} disabled={busyId === n.id} className="px-2 py-1 bg-red-50 text-red-600 rounded hover:bg-red-100 text-sm">
                        <Trash2 size={14} /> Delete
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </div>
  );
}