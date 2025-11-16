import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

const PropertiesPage = () => {
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch properties from the Django backend
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/properties/");
        if (!response.ok) throw new Error("Failed to fetch properties");
        const data = await response.json();
        console.log("Fetched properties:", data); // ✅ For debugging
        setProperties(data);
      } catch (err) {
        console.error("Error fetching properties:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  return (
    <div className="min-h-screen text-gray-800 font-sans">
      <Navbar />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <header className="px-8 py-6 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-2xl font-semibold">Properties</h2>
        <button
          onClick={() => navigate("/admin/properties/add")}
          className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-5 py-2 rounded-xl shadow hover:opacity-90 transition"
        >
          + Add Property
        </button>
      </header>

      {/* Main content */}
      <main className="p-8">
        <div className="bg-white shadow-lg rounded-2xl p-6">
          {loading ? (
            <p className="text-gray-500">Loading properties...</p>
          ) : error ? (
            <p className="text-red-500">Error: {error}</p>
          ) : properties.length === 0 ? (
            <p className="text-gray-500">No properties found.</p>
          ) : (
            <table className="min-w-full border-collapse w-full">
              <thead>
                <tr className="text-left bg-gray-100">
                  <th className="py-3 px-4 rounded-tl-lg">Name</th>
                  <th className="py-3 px-4">Property Type</th>
                  <th className="py-3 px-4">Unit Number</th>
                  <th className="py-3 px-4">Availability</th>
                  <th className="py-3 px-4 rounded-tr-lg">Date Added</th>
                </tr>
              </thead>
              <tbody>
                {properties.map((property) => (
                  <tr
                    key={property.id}
                    className="border-t hover:bg-gray-50 cursor-pointer"
                    onClick={() => navigate(`/admin/properties/${property.id}`)}
                  >
                    <td className="py-3 px-4 text-blue-600 font-medium hover:underline">
                      {property.name}
                    </td>
                    <td className="py-3 px-4">
                      {property.property_type === "HOUSE" ? "House" : "Apartment"}
                    </td>
                    <td className="py-3 px-4">{property.unit_number || "-"}</td>
                    <td
                      className={`py-3 px-4 font-semibold ${
                        property.is_available ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      {property.is_available ? "Available" : "Occupied"}
                    </td>
                    <td className="py-3 px-4">
                      {new Date(property.date_added).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>
      </motion.div>
    </div>
  );
};

export default PropertiesPage;
