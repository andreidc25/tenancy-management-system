import React from "react";
import { motion } from "framer-motion";
import { Home, Users, DollarSign, Settings } from "lucide-react";

// Reusable card component
const StatCard = ({ title, value, icon: Icon, delay }) => (
  <motion.div
    className="bg-white rounded-2xl shadow-md p-6 flex items-center justify-between hover:shadow-lg transition-all"
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5, type: "spring" }}
  >
    <div>
      <h2 className="text-gray-500 text-sm font-medium">{title}</h2>
      <p className="text-3xl font-semibold text-gray-900 mt-1">{value}</p>
    </div>
    <div className="p-3 bg-blue-100 rounded-full">
      <Icon className="text-blue-600 w-6 h-6" />
    </div>
  </motion.div>
);

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Navbar */}
      <header className="bg-white shadow-sm py-4 px-8 flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-800">Admin Dashboard</h1>
        <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition">
          <Settings className="w-5 h-5" />
          <span>Settings</span>
        </button>
      </header>

      {/* Main content */}
      <main className="flex-1 p-8">
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          animate="visible"
        >
          <StatCard
            title="Total Properties"
            value="24"
            icon={Home}
            delay={0.1}
          />
          <StatCard
            title="Active Tenants"
            value="83"
            icon={Users}
            delay={0.2}
          />
          <StatCard
            title="Pending Payments"
            value="$12,450"
            icon={DollarSign}
            delay={0.3}
          />
        </motion.div>

        {/* Recent Activity Section */}
        <motion.div
          className="mt-10 bg-white rounded-2xl shadow-md p-6"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Recent Activity
          </h2>
          <ul className="space-y-3 text-gray-700">
            <li>🏠 New tenant added: John Doe — Apartment 204</li>
            <li>💳 Payment received from Sarah Lee ($1,200)</li>
            <li>🔧 Maintenance request completed for Unit 305</li>
          </ul>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="text-center py-4 text-sm text-gray-500 border-t">
        © {new Date().getFullYear()} Tenancy Management System
      </footer>
    </div>
  );
};

export default Dashboard;
