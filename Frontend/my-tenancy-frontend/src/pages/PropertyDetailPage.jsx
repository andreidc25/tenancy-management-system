import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate, useParams } from "react-router-dom";

const PropertyDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch property details
  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/properties/${id}/`);
        if (!response.ok) throw new Error("Failed to fetch property details");
        const data = await response.json();
        setProperty(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  // Handle form input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProperty((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle form submit (PUT update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/properties/${id}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(property),
      });
      if (!response.ok) throw new Error("Failed to update property");
      navigate("/admin/properties");
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  // Handle delete
  const handleDelete = async () => {
    const confirmed = window.confirm("Are you sure you want to delete this property?");
    if (!confirmed) return;

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/properties/${id}/`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete property");
      navigate("/admin/properties");
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  if (loading) return <p className="p-8 text-gray-500">Loading property...</p>;
  if (error) return <p className="p-8 text-red-500">{error}</p>;

  return (
    <div className="bg-gray-50 min-h-screen text-gray-800 font-sans">
      <Navbar />
      <main className="p-8 max-w-2xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6">Edit Property</h2>

        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-lg rounded-2xl p-6 space-y-4"
        >
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={property.name || ""}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Address</label>
            <input
              type="text"
              name="address"
              value={property.address || ""}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Property Type</label>
            <select
              name="property_type"
              value={property.property_type || ""}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
              required
            >
              <option value="HOUSE">House</option>
              <option value="APARTMENT">Apartment</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Unit Number</label>
            <input
              type="text"
              name="unit_number"
              value={property.unit_number || ""}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Rent Price (₱)</label>
            <input
              type="number"
              step="0.01"
              name="rent_price"
              value={property.rent_price || ""}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
              required
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="is_available"
              checked={property.is_available}
              onChange={handleChange}
              className="h-4 w-4"
            />
            <label className="text-sm font-medium">Available</label>
          </div>

          <div className="flex justify-between mt-6">
            <button
              type="button"
              onClick={() => navigate("/admin/properties")}
              className="px-4 py-2 border rounded-md hover:bg-gray-100"
            >
              Back
            </button>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleDelete}
                className="px-5 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Delete
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
};

export default PropertyDetailPage;
