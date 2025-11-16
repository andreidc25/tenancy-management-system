import React from "react";

const TenantInfoCard = ({ title, value, icon: Icon, color = "blue" }) => {
  // Tailwind dynamic color map
  const colorMap = {
    blue: "bg-blue-100 text-blue-600",
    green: "bg-green-100 text-green-600",
    orange: "bg-orange-100 text-orange-600",
    cyan: "bg-cyan-100 text-cyan-600",
  };

  return (
    <div
      className="bg-white rounded-2xl shadow-md p-6 flex items-center justify-between hover:shadow-lg transition-all"
    >
      <div>
        <h2 className="text-gray-500 text-sm font-medium">{title}</h2>
        <p className="text-3xl font-semibold text-gray-900 mt-1">{value}</p>
      </div>
      <div className={`p-3 rounded-full ${colorMap[color]}`}>
        <Icon className={`w-6 h-6 ${colorMap[color].split(" ")[1]}`} />
      </div>
    </div>
  );
};

export default TenantInfoCard;
