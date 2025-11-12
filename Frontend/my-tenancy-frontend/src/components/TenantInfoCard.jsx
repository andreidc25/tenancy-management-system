import React from "react";
import { motion } from "framer-motion";

const TenantInfoCard = ({ title, value, icon: Icon, color = "blue", delay = 0 }) => {
  // Tailwind dynamic color map
  const colorMap = {
    blue: "bg-blue-100 text-blue-600",
    green: "bg-green-100 text-green-600",
    orange: "bg-orange-100 text-orange-600",
    cyan: "bg-cyan-100 text-cyan-600",
  };

  return (
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
      <div className={`p-3 rounded-full ${colorMap[color]}`}>
        <Icon className={`w-6 h-6 ${colorMap[color].split(" ")[1]}`} />
      </div>
    </motion.div>
  );
};

export default TenantInfoCard;
