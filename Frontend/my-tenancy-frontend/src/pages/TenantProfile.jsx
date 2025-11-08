import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import TenantInfoCard from "../components/TenantInfoCard";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import {
  Home,
  Phone,
  Mail,
  MapPin,
  Calendar,
  DollarSign,
  CreditCard,
  FileText,
  User,
  ArrowLeft,
  CheckCircle,
} from "lucide-react";
import API from "../api/axios";

const TenantProfile = () => {
  const navigate = useNavigate();
  const [tenant, setTenant] = useState(null);

  // ✅ Fetch tenant data from backend
  useEffect(() => {
    const fetchTenantProfile = async () => {
      try {
        // Log the current token before making the request
        const token = localStorage.getItem("access_token");
        console.log("Current token in TenantProfile:", token ? token.substring(0, 20) + "..." : "No token");

        const res = await API.get("tenants/profile/");
        console.log("Fetched tenant profile:", res.data);
        setTenant(res.data);
      } catch (err) {
        console.error("Failed to fetch tenant profile:", err.response?.status, err.response?.data);
        // If token is invalid, redirect to login
        if (err.response?.status === 403) {
          console.log("Token might be invalid, clearing localStorage");
          localStorage.clear();
          navigate("/");
        }
      }
    };
    fetchTenantProfile();
  }, [navigate]);

  const [error, setError] = useState(null);

  if (!tenant && !error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Loading profile...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={() => navigate("/")} 
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
            Return to Login
          </button>
        </div>
      </div>
    );
  }

  const handleLogout = () => {
    navigate("/");
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar title="Tenant Profile" userName={tenant.full_name} onLogout={handleLogout} />

      <main className="container mx-auto px-6 py-8">
        <Button variant="outline" onClick={handleBack} className="mb-6 gap-2">
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>

        {/* Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <TenantInfoCard
            title="Property"
            value={tenant.property ? tenant.property.split(" - ")[0] : "N/A"}
            icon={Home}
            color="blue"
          />
          <TenantInfoCard
            title="Monthly Rent"
            value={`₱${tenant.monthly_rent?.toLocaleString() ?? 0}`}
            icon={DollarSign}
            color="green"
          />
          <TenantInfoCard
            title="Security Deposit"
            value={`₱${tenant.security_deposit?.toLocaleString() ?? 0}`}
            icon={CreditCard}
            color="orange"
          />
        </div>

        {/* Info Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <User className="w-5 h-5 text-gray-500 mt-1" />
                <div>
                  <p className="text-sm text-gray-500">Full Name</p>
                  <p className="font-semibold">{tenant.full_name}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-gray-500 mt-1" />
                <div>
                  <p className="text-sm text-gray-500">Phone Number</p>
                  <p className="font-semibold">{tenant.phone_number || "N/A"}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-gray-500 mt-1" />
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-semibold">{tenant.email}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Property Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Home className="w-5 h-5" />
                Property Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <Home className="w-5 h-5 text-gray-500 mt-1" />
                <div>
                  <p className="text-sm text-gray-500">Property</p>
                  <p className="font-semibold">{tenant.property || "N/A"}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gray-500 mt-1" />
                <div>
                  <p className="text-sm text-gray-500">Address</p>
                  <p className="font-semibold">
                    {tenant.address || "Address not available"}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-gray-500 mt-1" />
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <Badge
                    variant={tenant.is_active ? "default" : "secondary"}
                    className="mt-1"
                  >
                    {tenant.is_active ? "Active" : "Inactive"}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Lease Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Lease Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-gray-500 mt-1" />
                <div>
                  <p className="text-sm text-gray-500">Lease Start Date</p>
                  <p className="font-semibold">{tenant.lease_start_date}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-gray-500 mt-1" />
                <div>
                  <p className="text-sm text-gray-500">Lease End Date</p>
                  <p className="font-semibold">{tenant.lease_end_date}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <DollarSign className="w-5 h-5 text-gray-500 mt-1" />
                <div>
                  <p className="text-sm text-gray-500">Monthly Rent</p>
                  <p className="font-semibold">
                    ₱{tenant.monthly_rent?.toLocaleString() ?? 0}.00
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CreditCard className="w-5 h-5 text-gray-500 mt-1" />
                <div>
                  <p className="text-sm text-gray-500">Security Deposit</p>
                  <p className="font-semibold">
                    ₱{tenant.security_deposit?.toLocaleString() ?? 0}.00
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Status */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                Payment Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-gray-500 mt-1" />
                <div>
                  <p className="text-sm text-gray-500">Current Status</p>
                  <Badge variant="default" className="mt-1 bg-green-500">
                    Paid
                  </Badge>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <DollarSign className="w-5 h-5 text-gray-500 mt-1" />
                <div>
                  <p className="text-sm text-gray-500">Total Deposit</p>
                  <p className="font-semibold">
                    ₱{tenant.security_deposit?.toLocaleString() ?? 0}.00
                  </p>
                </div>
              </div>
              <Button className="w-full mt-4 bg-cyan-500 hover:bg-cyan-600">
                View Payment History
              </Button>
              <Button variant="outline" className="w-full">
                Download Lease Agreement
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default TenantProfile;
