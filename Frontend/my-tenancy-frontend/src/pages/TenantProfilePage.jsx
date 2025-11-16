import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import API from "../api/axios";

const TenantProfilePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tenant, setTenant] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTenant = async () => {
      try {
        const res = await API.get(`tenants/${id}/`);
        setTenant(res.data);
      } catch (err) {
        console.error("Failed to fetch tenant:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTenant();
  }, [id]);

  const handleSave = async () => {
    try {
      await API.patch(`tenants/${id}/`, tenant);
      alert("Tenant updated successfully!");
    } catch (err) {
      console.error("Failed to update tenant:", err);
      alert("Error updating tenant.");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!tenant) return <div>Tenant not found.</div>;

  return (
    <div className="min-h-screen text-gray-800 font-sans">
      <Navbar />

      <div className="p-8 max-w-3xl mx-auto bg-white shadow-lg rounded-2xl">
        <button
          onClick={() => navigate(-1)}
          className="text-blue-600 hover:underline mb-4"
        >
          ← Back
        </button>
        <h2 className="text-2xl font-semibold mb-6">
          Edit Tenant: {tenant.full_name}
        </h2>

        <form className="grid grid-cols-2 gap-4">
          <label className="flex flex-col">
            Full Name
            <input
              type="text"
              value={tenant.full_name || ""}
              onChange={(e) =>
                setTenant({ ...tenant, full_name: e.target.value })
              }
              className="border rounded-lg p-2 mt-1"
            />
          </label>

          <label className="flex flex-col">
            Email
            <input
              type="email"
              value={tenant.email || ""}
              onChange={(e) => setTenant({ ...tenant, email: e.target.value })}
              className="border rounded-lg p-2 mt-1"
            />
          </label>

          <label className="flex flex-col">
            Phone Number
            <input
              type="text"
              value={tenant.phone_number || ""}
              onChange={(e) =>
                setTenant({ ...tenant, phone_number: e.target.value })
              }
              className="border rounded-lg p-2 mt-1"
            />
          </label>

          <label className="flex flex-col">
            Property
            <input
              type="text"
              value={tenant.property || ""}
              onChange={(e) =>
                setTenant({ ...tenant, property: e.target.value })
              }
              className="border rounded-lg p-2 mt-1"
            />
          </label>

          <label className="flex flex-col">
            Monthly Rent
            <input
              type="number"
              value={tenant.monthly_rent || ""}
              onChange={(e) =>
                setTenant({ ...tenant, monthly_rent: e.target.value })
              }
              className="border rounded-lg p-2 mt-1"
            />
          </label>

          <label className="flex flex-col">
            Security Deposit
            <input
              type="number"
              value={tenant.security_deposit || ""}
              onChange={(e) =>
                setTenant({ ...tenant, security_deposit: e.target.value })
              }
              className="border rounded-lg p-2 mt-1"
            />
          </label>

          <label className="flex flex-col col-span-2">
            Lease Start
            <input
              type="date"
              value={tenant.lease_start_date || ""}
              onChange={(e) =>
                setTenant({ ...tenant, lease_start_date: e.target.value })
              }
              className="border rounded-lg p-2 mt-1"
            />
          </label>

          <label className="flex flex-col col-span-2">
            Lease End
            <input
              type="date"
              value={tenant.lease_end_date || ""}
              onChange={(e) =>
                setTenant({ ...tenant, lease_end_date: e.target.value })
              }
              className="border rounded-lg p-2 mt-1"
            />
          </label>
        </form>

        <div className="mt-6 flex justify-end">
          <button
            onClick={handleSave}
            className="bg-green-500 text-white px-6 py-2 rounded-lg hover:opacity-90 transition"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default TenantProfilePage;
