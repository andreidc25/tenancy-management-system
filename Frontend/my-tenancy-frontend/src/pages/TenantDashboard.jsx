import React from "react";
import { useNavigate } from "react-router-dom";
import { Wallet, Calendar, AlertCircle, TrendingUp } from "lucide-react";
import { ClientStatCard } from "../components/StatCard";
import { QuickPicks } from "../components/QuickPicks";
import PropertyOverview from "../components/PropertyOverview";
import PaymentHistory from "../components/PaymentHistory";
import Navbar from "../components/Navbar";

const Index = () => {
  return (
    <>
      <Navbar />
      <div className="p-8 space-y-8">
        <div>
        <h1 className="text-3xl font-bold text-foreground">Tenant Dashboard</h1>
        <p className="text-muted-foreground mt-1">Welcome back! Here's an overview of your rental information.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <ClientStatCard
          title="Next Rent Due"
          value="₱1,500"
          icon={Wallet}
          trend="Due Dec 1, 2024"
          status="warning"
        />
        <ClientStatCard
          title="Lease Ends In"
          value="8 Months"
          icon={Calendar}
          trend="Aug 31, 2025"
          status="info"
        />
        <ClientStatCard
          title="Maintenance Requests"
          value="2"
          icon={AlertCircle}
          trend="1 pending response"
          status="warning"
        />
        <ClientStatCard
          title="Payment Status"
          value="Up to Date"
          icon={TrendingUp}
          trend="All payments current"
          status="success"
        />
      </div>

      {/* Property Overview and Payment History */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PropertyOverview />
        <PaymentHistory />
      </div>

      {/* Quick Picks */}
      <QuickPicks />
    </div>
    </>
  );
};

export default Index;