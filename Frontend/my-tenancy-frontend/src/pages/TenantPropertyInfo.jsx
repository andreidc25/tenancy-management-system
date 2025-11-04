import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Home, MapPin, Phone, Calendar, DollarSign, User } from "lucide-react";

export default function TenantPropertyInfo() {
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // A small set of endpoints to try (backend may differ). We'll try each until one returns data.
  const endpoints = [
    "http://localhost:8000/api/properties/me/",
    "http://localhost:8000/api/tenant/property/",
    "http://localhost:8000/api/properties/",
  ];

  useEffect(() => {
    let mounted = true;

    async function fetchProperty() {
      setLoading(true);
      setError("");

      for (const url of endpoints) {
        try {
          const res = await axios.get(url, { withCredentials: true });
          // Accept both single-object and list responses
          const data = Array.isArray(res.data) ? res.data[0] : res.data;
          if (data) {
            if (!mounted) return;
            setProperty(data);
            setLoading(false);
            return;
          }
        } catch (e) {
          // try next
        }
      }

      // If we reach here no endpoint responded; use a friendly message and fallback sample data
      if (!mounted) return;
      setError("Could not load property data from the API. Showing sample data.");
      setProperty({
        title: "Apartment",
        address: "***************",
        landlord: "*******",
        landlord_phone: "************",
        rent: 1200,
        lease_start: "2024-01-01",
        lease_end: "2024-12-31",
        notes: "Water included. No pets without permission.",
      });
      setLoading(false);
    }

    fetchProperty();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-gray-900 text-white px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="px-3 py-2 bg-gray-800/60 hover:bg-gray-800/80 rounded-md"
          >
            Back
          </button>
          <h1 className="text-xl font-semibold">Property Info</h1>
        </div>
      </header>

      <main className="p-8 max-w-4xl mx-auto">
        {loading ? (
          <div className="text-center py-20 text-gray-500">Loading property info…</div>
        ) : (
          <div className="bg-white rounded-xl shadow p-6">
            {error && (
              <div className="mb-4 text-sm text-yellow-700 bg-yellow-50 border border-yellow-100 p-3 rounded">
                {error}
              </div>
            )}

            <div className="flex items-start gap-6">
              <div className="p-3 bg-indigo-50 rounded-lg">
                <Home size={36} className="text-indigo-600" />
              </div>

              <div className="flex-1">
                <h2 className="text-lg font-semibold">{property.title || "Property"}</h2>
                <p className="text-sm text-gray-600 mt-1 flex items-center gap-2">
                  <MapPin size={14} /> {property.address}
                </p>

                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="text-xs text-gray-500">Landlord</div>
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

                  <div className="space-y-2">
                    <div className="text-xs text-gray-500">Rent</div>
                    <div className="flex items-center gap-3">
                      <DollarSign size={18} />
                      <div className="font-medium">${property.rent}</div>
                    </div>
                    <div className="text-xs text-gray-500 mt-2">Lease</div>
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <Calendar size={14} /> {property.lease_start} → {property.lease_end}
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
          </div>
        )}
      </main>
    </div>
  );
}
