import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { Building2, Users, CreditCard, FileText, Home, Menu, X } from "lucide-react";

const getQuickPicks = (userType) => [
  {
    title: userType === 'Admin' ? "Properties" : "Property Info",
    icon: Building2,
    href: userType === 'Admin' ? "/admin/properties" : "/tenant/property-info",
    hoverColor: "hover:bg-blue-600",
    activeColor: "bg-blue-600",
    underlineColor: "bg-blue-500",
  },
  {
    title: userType === 'Admin' ? "Tenants" : "Profile",
    icon: Users,
    href: userType === 'Admin' ? "/admin/tenants" : "/tenant/profile",
    hoverColor: "hover:bg-green-600",
    activeColor: "bg-green-600",
    underlineColor: "bg-green-500",
  },
  {
    title: "Payments",
    icon: CreditCard,
    href: userType === 'Admin' ? "/admin/payments" : "/tenant/payments",
    hoverColor: "hover:bg-amber-600",
    activeColor: "bg-amber-600",
    underlineColor: "bg-amber-500",
  },
  {
    title: "Reports",
    icon: FileText,
    href: userType === 'Admin' ? "/admin/reports" : "/tenant/reports",
    hoverColor: "hover:bg-violet-600",
    activeColor: "bg-violet-600",
    underlineColor: "bg-violet-500",
  },
];

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [username, setUsername] = useState("");
  const [userType, setUserType] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        
        // Get username from token
        const userName = decoded.username || decoded.name || decoded.sub || decoded.email || "";
        setUsername(userName);
        
        // Check if user is staff/admin
        const isStaff = decoded.is_staff || decoded.isStaff || decoded.is_admin || false;
        setUserType(isStaff ? "Admin" : "Client");
      } catch (error) {
        console.error("Failed to decode token:", error);
        setUsername("");
        setUserType(null);
      }
    } else {
      setUsername("");
      setUserType(null);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    navigate("/");
  };

  const quickPicks = getQuickPicks(userType);

  return (
    <nav className="text-white shadow-lg" style={{ fontFamily: 'Poppins, sans-serif', background: 'linear-gradient(135deg, #0d1726 0%, #1a2942 50%, #0d1726 100%)' }}>
      <div className="px-4 py-4 flex justify-between items-center">
        {/* Left: Logo (clickable to dashboard) */}
        <img 
          src="/landscape logo.svg" 
          alt="Tenancy System" 
          className="h-15 cursor-pointer hover:opacity-80 transition-opacity"
          onClick={() => {
            navigate(userType === 'Admin' ? "/admin" : "/tenant");
            setIsMobileMenuOpen(false);
          }}
          onContextMenu={(e) => e.preventDefault()}
          onDragStart={(e) => e.preventDefault()}
          draggable="false"
        />
        
        {/* Center: Navigation menu (QuickPicks) - Desktop */}
        {userType && (
          <div className="hidden md:flex items-center gap-1">
            {quickPicks.map((item) => {
              const isActive = location.pathname.startsWith(item.href);
              // Extract the color from hoverColor (e.g., "hover:bg-blue-600" -> "blue-600")
              const colorMatch = item.hoverColor.match(/bg-(\w+-\d+)/);
              const underlineColorClass = colorMatch ? `bg-${colorMatch[1]}` : item.underlineColor;
              
              return (
                <button
                  key={item.title}
                  onClick={() => navigate(item.href)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 whitespace-nowrap group relative overflow-hidden ${item.hoverColor}`}
                >
                  <item.icon className="h-4 w-4 group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-medium">{item.title}</span>
                  {isActive && (
                    <span className={`absolute bottom-0 left-0 right-0 h-1 ${underlineColorClass} rounded-b-lg`}></span>
                  )}
                </button>
              );
            })}
          </div>
        )}
        
        {/* Right: User info and logout - Desktop */}
        <div className="hidden xl:flex items-center gap-4">
          {username && (
            <span className="font-medium flex items-center gap-2">
              <span className="text-white text-sm">{username}</span>
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

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-2">
          {/* User info - Tablet view */}
          {username && (
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-gray-700 rounded-lg">
              <span className="text-sm font-medium">{username}</span>
              {userType && (
                <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                  userType === 'Admin' ? 'bg-purple-500 text-white' : 'bg-blue-500 text-white'
                }`}>
                  {userType}
                </span>
              )}
            </div>
          )}
          
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 hover:bg-gray-700 rounded-lg transition"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#1a2332] border-t border-gray-700">
          {/* User Info - Mobile */}
          {username && (
            <div className="px-4 py-3 border-b border-gray-700 flex items-center justify-between">
              <span className="text-white font-medium text-sm">{username}</span>
              {userType && (
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                  userType === 'Admin' 
                    ? 'bg-red-500 text-white' 
                    : 'bg-emerald-500 text-white'
                }`}>
                  {userType}
                </span>
              )}
            </div>
          )}

          {/* Navigation Links - Mobile */}
          {userType && (
            <div className="py-2">
              {quickPicks.map((item) => {
                const isActive = location.pathname.startsWith(item.href);
                return (
                  <button
                    key={item.title}
                    onClick={() => {
                      navigate(item.href);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 transition-all duration-200 ${
                      isActive ? item.activeColor : 'hover:bg-gray-700'
                    }`}
                  >
                    <item.icon className="h-5 w-5" />
                    <span className="text-sm font-medium">{item.title}</span>
                  </button>
                );
              })}
            </div>
          )}

          {/* Logout Button - Mobile */}
          <div className="px-4 py-3 border-t border-gray-700">
            <button 
              onClick={() => {
                handleLogout();
                setIsMobileMenuOpen(false);
              }}
              className="w-full bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg flex items-center justify-center gap-2 text-sm transition"
            >
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
        </div>
      )}
    </nav>
  );
};

export default Navbar;
