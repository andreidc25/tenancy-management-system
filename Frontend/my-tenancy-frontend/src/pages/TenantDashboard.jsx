import React, { useEffect, useState } from "react";
import { Wallet, Calendar, AlertCircle, TrendingUp } from "lucide-react";
import { ClientStatCard } from "../components/StatCard";
import { QuickPicks } from "../components/QuickPicks";
import PropertyOverview from "../components/PropertyOverview";
import PaymentHistory from "../components/PaymentHistory";
import Navbar from "../components/Navbar";
import API from "../api/axios";

const TenantDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("dashboard/tenant-summary/")
      .then((res) => setStats(res.data))
      .catch((err) => console.error("Error fetching tenant summary:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="p-8 text-lg text-gray-500">Loading your dashboard...</div>
      </>
    );
  }

  if (!stats) {
    return (
      <>
        <Navbar />
        <div className="p-8 text-red-500 text-lg">
          Unable to load tenant information.
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="p-8 space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Tenant Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Welcome back, {stats.tenant_name}! Here’s an overview of your rental information.
          </p>
        </div>

        {/* ✅ Stats Grid (Dynamic) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <ClientStatCard
            title="Next Rent Due"
            value={stats.next_rent_due}
            icon={Wallet}
            trend={`Due ${
              stats.next_due_date
                ? new Date(stats.next_due_date).toLocaleDateString()
                : "soon"
            }`}
            status="warning"
          />
          <ClientStatCard
            title="Lease Ends In"
            value={`${stats.lease_months_left || 0} Months`}
            icon={Calendar}
            trend={`Ends ${
              stats.lease_end_date
                ? new Date(stats.lease_end_date).toLocaleDateString()
                : "unknown"
            }`}
            status="info"
          />
          <ClientStatCard
            title="Maintenance Requests"
            value={stats.total_reports} // ✅ corrected
            icon={AlertCircle}
            trend={`${stats.pending_reports} pending`}
            status="warning"
          />
          <ClientStatCard
            title="Payment Status"
            value={stats.payment_status}
            icon={TrendingUp}
            trend="Latest records"
            status={stats.payment_status === "Up to Date" ? "success" : "warning"}
          />
        </div>

        {/* Overview and History */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <PropertyOverview />
          <PaymentHistory />
        </div>

        <QuickPicks />
      </div>
    </>
  );
};

export default TenantDashboard;
