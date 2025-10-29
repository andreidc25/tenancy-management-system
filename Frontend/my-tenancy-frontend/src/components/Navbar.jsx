import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
const navigate = useNavigate();
  return (
    <nav className="bg-[#0d1726] text-white px-8 py-4 flex justify-between items-center shadow-lg">
      <h1 className="text-xl font-bold">Tenancy System</h1>
      <div className="flex items-center gap-4">
        <span>Welcome, Admin</span>
        <button 
            onClick={() => navigate("/")}
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg flex items-center gap-2 text-sm transition">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 11-4 0v-1m0-10V5a2 2 0 114 0v1"
            />
          </svg>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
