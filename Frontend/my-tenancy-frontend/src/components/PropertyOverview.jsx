import React, { useEffect, useState } from "react";
import API from "../api/axios";
import { Home, MapPin, Building2, DollarSign, Calendar } from "lucide-react";

const PropertyOverview = () => {
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await API.get("dashboard/tenant-property/");
        setProperty(res.data);
      } catch (err) {
        console.error("Error loading property:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProperty();
  }, []);

  if (loading)
    return (
      <div className="bg-white shadow-md rounded-2xl p-6 text-gray-500">
        Loading property details...
      </div>
    );

  if (!property)
    return (
      <div className="bg-white shadow-md rounded-2xl p-6 text-gray-400 italic">
        No property assigned.
      </div>
    );

  return (
    <div className="bg-white shadow-md rounded-2xl p-6 space-y-4 hover:shadow-lg transition-shadow duration-300">
      <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
        <Home className="text-blue-600" size={22} /> Property Overview
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 text-gray-700 text-sm">
        <p className="flex items-center gap-2">
          <MapPin className="text-gray-400" size={16} />
          <span className="font-medium">Address:</span> {property.address}
        </p>

        <p className="flex items-center gap-2">
          <Building2 className="text-gray-400" size={16} />
          <span className="font-medium">Type:</span> {property.property_type}
        </p>

        <p className="flex items-center gap-2">
          <Home className="text-gray-400" size={16} />
          <span className="font-medium">Unit:</span> {property.unit_number || "N/A"}
        </p>

        <p className="flex items-center gap-2">
          <DollarSign className="text-gray-400" size={16} />
          <span className="font-medium">Rent:</span> ₱{property.rent_price}
        </p>

        <p className="flex items-center gap-2 sm:col-span-2">
          <Calendar className="text-gray-400" size={16} />
          <span className="font-medium">Lease:</span>{" "}
          {new Date(property.lease_start_date).toLocaleDateString()} —{" "}
          {new Date(property.lease_end_date).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

export default PropertyOverview;
