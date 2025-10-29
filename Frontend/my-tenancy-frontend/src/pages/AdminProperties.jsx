import React from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

const PropertiesPage = () => {
const navigate = useNavigate();  
    return (
    <div className="bg-gray-50 min-h-screen text-gray-800 font-sans">
      <Navbar />

      <header className="px-8 py-6 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Properties</h2>
        <button 
            onClick={() => navigate("/admin/properties/add")}
            className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-5 py-2 rounded-xl shadow hover:opacity-90 transition">
          + Add Property
        </button>
      </header>

      <main className="p-8">
        <div className="bg-white shadow-lg rounded-2xl p-6">
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
              <tr className="border-t hover:bg-gray-50">
                <td className="py-3 px-4 text-blue-600 font-medium cursor-pointer hover:underline">
                  Pasig
                </td>
                <td className="py-3 px-4">House</td>
                <td className="py-3 px-4">1</td>
                <td className="py-3 px-4 text-green-500 font-semibold">
                  Available
                </td>
                <td className="py-3 px-4">Oct 29, 2025</td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default PropertiesPage;
