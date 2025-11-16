import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Building2, Users, TrendingUp, Wrench } from "lucide-react";
import Navbar from "../components/Navbar";
import { StatCard } from "../components/StatCard";
import { RentCollectionChart } from "../components/RentCollectionChart";
import { UpcomingLeases } from "../components/UpcomingLeases";
import { RecentTenants } from "../components/RecentTenants";
import API from "../api/axios";

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("dashboard/admin-dashboard-stats/")
      .then((res) => {
        setStats(res.data);
      })
      .catch((err) => {
        console.error("Error fetching dashboard data:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="p-8 text-lg">Loading admin dashboard...</div>
      </>
    );
  }

  if (!stats) {
    return (
      <>
        <Navbar />
        <div className="p-8 text-lg text-red-500">
          Failed to load dashboard data.
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="p-8 space-y-8"
      >
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Admin Dashboard
          </h1>
          <p className="text-muted-foreground mt-1">
            Welcome back! Here's an overview of all properties and tenants.
          </p>
        </div>

        {/* ✅ Stats Grid (Dynamic from Backend) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Properties"
            value={stats.total_properties}
            icon={Building2}
            trend={{ value: "Updated live", positive: true }}
          />
          <StatCard
            title="Total Tenants"
            value={stats.total_tenants}
            icon={Users}
            trend={{
              value: `${stats.new_tenants_this_month} new this month`,
              positive: true,
            }}
          />
          <StatCard
            title="Overall Occupancy"
            value={stats.occupancy_rate}
            icon={TrendingUp}
            trend={{ value: "From backend data", positive: true }}
          />
          <StatCard
            title="Maintenance Requests"
            value={stats.maintenance_requests}
            icon={Wrench}
            trend={{ value: "Pending / In Progress", positive: false }}
          />
        </div>

        {/* Other Components (can be connected later) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RentCollectionChart />
          <UpcomingLeases />
        </div>

        <RecentTenants />
      </motion.div>
    </>
  );
}
