import React from "react";
import { useNavigate } from "react-router-dom";
import { Building2, Users, TrendingUp, Wrench } from "lucide-react";
import { StatCard } from "../components/StatCard";
import { RecentTenants } from "../components/RecentTenants";
import { RentCollectionChart } from "../components/RentCollectionChart";
import { UpcomingLeases } from "../components/UpcomingLeases";
import { QuickPicks } from "../components/QuickPicks";
import Navbar from "../components/Navbar";

const AdminDashboard = () => {

  return (
    <>
      <Navbar />
      <div className="p-8 space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
          <p className="text-muted-foreground mt-1">Welcome back! Here's an overview of all properties and tenants.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Properties"
            value={24}
            icon={Building2}
            trend={{ value: "2 new this month", positive: true }}
          />
          <StatCard
            title="Total Tenants"
            value={156}
            icon={Users}
            trend={{ value: "5 new this month", positive: true }}
          />
          <StatCard
            title="Overall Occupancy"
            value="92%"
            icon={TrendingUp}
            trend={{ value: "3% from last month", positive: true }}
          />
          <StatCard
            title="Maintenance Requests"
            value={12}
            icon={Wrench}
            trend={{ value: "4 new this week", positive: false }}
          />
        </div>

        {/* Charts and Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RentCollectionChart />
          <UpcomingLeases />
        </div>

        {/* Quick Picks */}
        <QuickPicks />

        {/* Recent Tenants */}
        <RecentTenants />
      </div>
    </>
  );
};

export default AdminDashboard;
