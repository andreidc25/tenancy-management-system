import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Home, MapPin, Phone, Calendar, DollarSign, User } from "lucide-react";
import Navbar from "../components/Navbar";
import API from "../api/axios";

export default function TenantPropertyInfo() {
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    async function fetchProperty() {
      setLoading(true);
      setError("");

      try {
        const token = localStorage.getItem("access_token");
        console.log("Current token:", token ? token.substring(0, 20) + "..." : "No token");

        const res = await API.get("tenants/profile/");
        console.log("Raw API response:", res.data);
        
        if (!mounted) return;

        if (res.data) {
          setProperty({
            title: res.data.property || "Property",
            address: res.data.address || "Address not available",
            landlord: res.data.landlord_name || "Not assigned",
            landlord_phone: res.data.landlord_phone || "N/A",
            rent: res.data.monthly_rent || 0,
            lease_start_date: res.data.lease_start_date || "Not available",
            lease_end_date: res.data.lease_end_date || "Not available",
            notes: res.data.notes || ""
          });
          setLoading(false);
          setError("");
        } else {
          throw new Error("No data received from API");
        }
      } catch (err) {
        console.error("Failed to fetch property data:", err);
        if (!mounted) return;
        
        setError("Could not load property data from the API.");
        setProperty({
          title: "Property",
          address: "Address not available",
          landlord: "Not assigned",
          landlord_phone: "N/A",
          rent: 0,
          lease_start_date: "Not available",
          lease_end_date: "Not available",
          notes: ""
        });
        setLoading(false);
        
        if (err.response?.status === 403) {
          localStorage.clear();
          navigate("/");
        }
      }
    }

    fetchProperty();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      <motion.main 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="p-8 max-w-4xl mx-auto"
      >
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Property Information</h1>
        {loading ? (
          <div className="text-center py-20 text-gray-500">Loading property info…</div>
        ) : (
          <div className="bg-white rounded-xl shadow p-6">
            {error && (
              <div className="mb-6 text-sm text-red-600 bg-red-50 border border-red-200 p-4 rounded-lg">
                {error}
              </div>
            )}

            {property && (
              <div className="flex items-start gap-6">
                <div className="p-3 bg-indigo-50 rounded-lg">
                  <Home size={36} className="text-indigo-600" />
                </div>

                <div className="flex-1">
                  <h2 className="text-xl font-semibold mb-2">{property.title}</h2>
                  <p className="text-sm text-gray-600 flex items-center gap-2 mb-4">
                    <MapPin size={14} /> {property.address}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <p className="text-sm text-gray-500">Landlord</p>
                      <div className="flex items-center gap-3">
                        <User size={18} />
                        <div>
                          <div className="font-medium">{property.landlord}</div>
                          <div className="text-sm text-gray-600 flex items-center gap-2">
                            <Phone size={14} /> {property.landlord_phone}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="text-sm text-gray-500">Rent</div>
                      <div className="flex items-center gap-3">
                        <DollarSign size={18} />
                        <div className="font-medium">₱{(property.rent || 0).toLocaleString()}.00</div>
                      </div>
                      <div className="text-sm text-gray-500">Lease Period</div>
                      <div className="flex items-center gap-3 text-sm text-gray-600">
                        <Calendar size={14} /> {property.lease_start_date} → {property.lease_end_date}
                      </div>
                    </div>
                  </div>

                  {property.notes && (
                    <div className="mt-6">
                      <h3 className="text-sm font-semibold">Notes</h3>
                      <p className="text-sm text-gray-700 mt-1">{property.notes}</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </motion.main>
    </div>
  );
}
