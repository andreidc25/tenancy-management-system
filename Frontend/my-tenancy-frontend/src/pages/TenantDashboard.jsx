import React from "react";
import { useNavigate } from "react-router-dom";
import { Home, User, CreditCard, Bell, FileText, LogOut } from "lucide-react";

export default function TenantDashboard() {
  const navigate = useNavigate();

  const cards = [
    { title: "Property Info", icon: <Home size={40} />, color: "from-indigo-500 to-indigo-600", route: "/tenant/property-info" },
    { title: "Profile", icon: <User size={40} />, color: "from-emerald-500 to-emerald-600", route: "/tenant/profile" },
    { title: "Payments", icon: <CreditCard size={40} />, color: "from-amber-500 to-amber-600", route: "/tenant/payments" },
    { title: "Notifications", icon: <Bell size={40} />, color: "from-sky-500 to-sky-600", route: "/tenant/notifications" },
    { title: "Reports", icon: <FileText size={40} />, color: "from-rose-500 to-rose-600", route: "/tenant/reports" },
  ];

  const handleLogout = () => {
    navigate("/"); // Redirect back to login page
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-gray-900 text-white flex justify-between items-center px-8 py-4 shadow-md">
        <h1 className="text-xl font-semibold tracking-wide">Dashboard</h1>
        <div className="flex items-center gap-4">
          <span className="text-gray-200">Welcome, Client</span>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-sm font-medium transition"
          >
            <LogOut size={16} /> Logout
          </button>
        </div>
      </header>

      {/* Dashboard Cards */}
      <main className="flex-grow flex flex-col items-center justify-center px-6 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-5xl">
          {cards.map((card, index) => (
            <div
              key={index}
              onClick={() => navigate(card.route)}
              className={`group bg-gradient-to-br ${card.color} text-white rounded-2xl shadow-lg transform hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 p-8 cursor-pointer flex flex-col items-center justify-center`}
            >
              <div className="mb-4 group-hover:scale-110 transition-transform duration-300">
                {card.icon}
              </div>
              <h2 className="text-lg font-semibold tracking-wide">{card.title}</h2>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
