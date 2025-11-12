import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const Navbar = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [userType, setUserType] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    console.log("Token exists:", !!token); // Check if token exists
    if (token) {
      try {
        const decoded = jwtDecode(token);
        console.log("Full decoded token:", decoded); // Log full decoded token
        console.log("Token fields:", Object.keys(decoded)); // Log available fields
        
        // Get username from token
        const userName = decoded.username || decoded.name || decoded.sub || decoded.email || "";
        console.log("Username found:", userName); // Log extracted username
        setUsername(userName);
        
        // Check if user is staff/admin
        const isStaff = decoded.is_staff || decoded.isStaff || decoded.is_admin || false;
        console.log("Is staff:", isStaff); // Log staff status
        setUserType(isStaff ? "Admin" : "Client");
      } catch (error) {
        console.error("Failed to decode token:", error);
        setUsername("");
        setUserType(null);
      }
    } else {
      console.log("No token found in localStorage"); // Log when no token exists
      setUsername("");
      setUserType(null);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    navigate("/");
  };

  return (
    <nav className="bg-[#0d1726] text-white px-8 py-4 flex justify-between items-center shadow-lg">
      <h1 className="text-xl font-bold">Tenancy System</h1>
      <div className="flex items-center gap-4">
            {username && (
              <span className="font-medium flex items-center gap-2">
                <span className="text-white">{username}</span>
                {userType && (
                  <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${
                    userType === 'Admin' 
                      ? 'bg-red-500 text-white' 
                      : 'bg-emerald-500 text-white'
                  }`}>
                    {userType}
                  </span>
                )}
              </span>
            )}
        <button 
            onClick={handleLogout}
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
