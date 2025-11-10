import React from "react";
import { useNavigate } from "react-router-dom";
import { Building2, Users, TrendingUp, Wrench } from "lucide-react";
import { StatCard } from "../components/StatCard";
import { RecentTenants } from "../components/RecentTenants";
import { RentCollectionChart } from "../components/RentCollectionChart";
import { UpcomingLeases } from "../components/UpcomingLeases";
import { QuickPicks } from "../components/QuickPicks";
import Navbar from "../components/Navbar";

const Index = () => {
  return (
    <>
      <Navbar />
      <div className="p-8 space-y-8">
        <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard Overview</h1>
        <p className="text-muted-foreground mt-1">Welcome back! Here's what's happening with your properties.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Properties"
          value={24}
          icon={Building2}
          trend={{ value: "12% from last month", positive: true }}
        />
        <StatCard
          title="Occupied Units"
          value="92%"
          icon={Users}
          trend={{ value: "3% from last month", positive: true }}
        />
        <StatCard
          title="Rent Collection Rate"
          value="87%"
          icon={TrendingUp}
          trend={{ value: "5% from last month", positive: false }}
        />
        <StatCard
          title="Pending Maintenance"
          value={8}
          icon={Wrench}
          trend={{ value: "2 less than last week", positive: true }}
        />
      </div>

      {/* Charts and Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RentCollectionChart />
        <UpcomingLeases />
      </div>

      {/* Quick Picks */}
      <QuickPicks />

      <RecentTenants />
    </div>
    </>
  );
};

export default Index;