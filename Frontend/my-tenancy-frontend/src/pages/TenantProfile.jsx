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
  Edit3,
  Save,
  X,
  Lock,
} from "lucide-react";
import API from "../api/axios";

const TenantProfile = () => {
  const navigate = useNavigate();
  const [tenant, setTenant] = useState(null);
  const [editData, setEditData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const [error, setError] = useState(null);

  // ✅ Fetch tenant data
  useEffect(() => {
    const fetchTenantProfile = async () => {
      try {
        const res = await API.get("tenants/profile/");
        setTenant(res.data);
        setEditData(res.data);
      } catch (err) {
        console.error("Failed to fetch tenant profile:", err.response?.status, err.response?.data);
        if (err.response?.status === 403) {
          localStorage.clear();
          navigate("/");
        }
      }
    };
    fetchTenantProfile();
  }, [navigate]);

  const handleLogout = () => navigate("/");
  const handleBack = () => navigate(-1);

  // ✅ Handle Save button
  const handleSave = async () => {
    try {
      // 🟢 Update profile info first
      const profileRes = await API.patch("tenants/profile/", {
        full_name: editData.full_name,
        phone_number: editData.phone_number,
        email: editData.email,
      });

      const updated = profileRes.data?.data ?? profileRes.data;
      setTenant(updated);
      setEditData(updated);

      // 🟡 Handle password change
      if (
        editData.current_password?.trim() &&
        editData.new_password?.trim() &&
        editData.confirm_password?.trim()
      ) {
        const passRes = await API.post("tenants/profile/change-password/", {
          current_password: editData.current_password,
          new_password: editData.new_password,
          confirm_password: editData.confirm_password,
        });
        if (passRes.data.message) alert("Password changed successfully!");
      }

      alert("Profile updated successfully!");
      setIsEditing(false);
      setShowPasswordFields(false);
    } catch (err) {
      console.error("Failed to update tenant:", err.response?.data || err);
      alert(err.response?.data?.error || "Error updating profile.");
    }
  };

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
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            Return to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar title="Tenant Profile" userName={tenant.full_name || tenant.username} onLogout={handleLogout} />

      <main className="container mx-auto px-6 py-8">
        <Button variant="outline" onClick={handleBack} className="mb-6 gap-2">
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <TenantInfoCard title="Property" value={tenant.property || "N/A"} icon={Home} color="blue" />
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

        {/* Grid of Detail Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 🧍 Personal Info */}
          <Card
            className="cursor-pointer hover:shadow-lg transition"
            onClick={() => !isEditing && setIsEditing(true)}
          >
            <CardHeader className="flex justify-between items-center">
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Personal Information
              </CardTitle>
              {!isEditing && <Edit3 className="w-5 h-5 text-gray-500" />}
            </CardHeader>

            <CardContent className="space-y-4">
              {isEditing ? (
                <>
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label className="text-sm text-gray-600">Full Name</label>
                      <input
                        type="text"
                        value={editData.full_name || ""}
                        onChange={(e) => setEditData({ ...editData, full_name: e.target.value })}
                        className="w-full border rounded-md p-2 mt-1"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-gray-600">Phone Number</label>
                      <input
                        type="text"
                        value={editData.phone_number || ""}
                        onChange={(e) => setEditData({ ...editData, phone_number: e.target.value })}
                        className="w-full border rounded-md p-2 mt-1"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-gray-600">Email</label>
                      <input
                        type="email"
                        value={editData.email || ""}
                        onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                        className="w-full border rounded-md p-2 mt-1"
                      />
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    onClick={() => setShowPasswordFields(!showPasswordFields)}
                    className="w-full mt-4 flex items-center gap-2"
                  >
                    <Lock className="w-4 h-4" />
                    {showPasswordFields ? "Hide Password Fields" : "Change Password"}
                  </Button>

                  {showPasswordFields && (
                    <div className="grid grid-cols-1 gap-4 mt-4">
                      <div>
                        <label className="text-sm text-gray-600">Current Password</label>
                        <input
                          type="password"
                          value={editData.current_password || ""}
                          onChange={(e) =>
                            setEditData({ ...editData, current_password: e.target.value })
                          }
                          className="w-full border rounded-md p-2 mt-1"
                        />
                      </div>
                      <div>
                        <label className="text-sm text-gray-600">New Password</label>
                        <input
                          type="password"
                          value={editData.new_password || ""}
                          onChange={(e) =>
                            setEditData({ ...editData, new_password: e.target.value })
                          }
                          className="w-full border rounded-md p-2 mt-1"
                        />
                      </div>
                      <div>
                        <label className="text-sm text-gray-600">Confirm Password</label>
                        <input
                          type="password"
                          value={editData.confirm_password || ""}
                          onChange={(e) =>
                            setEditData({ ...editData, confirm_password: e.target.value })
                          }
                          className="w-full border rounded-md p-2 mt-1"
                        />
                      </div>
                    </div>
                  )}

                  <div className="flex justify-end gap-3 mt-6">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setIsEditing(false);
                        setShowPasswordFields(false);
                      }}
                      className="gap-2"
                    >
                      <X className="w-4 h-4" /> Cancel
                    </Button>
                    <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700 gap-2">
                      <Save className="w-4 h-4" /> Save
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-start gap-3">
                    <User className="w-5 h-5 text-gray-500 mt-1" />
                    <div>
                      <p className="text-sm text-gray-500">Full Name</p>
                      <p className="font-semibold">{tenant.full_name || "N/A"}</p>
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
                      <p className="font-semibold">{tenant.email || "N/A"}</p>
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* 🏠 Property Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Home className="w-5 h-5" />
                Property Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gray-500 mt-1" />
                <div>
                  <p className="text-sm text-gray-500">Property</p>
                  <p className="font-semibold">{tenant.property || "N/A"}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-gray-500 mt-1" />
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <Badge variant={tenant.is_active ? "default" : "secondary"} className="mt-1">
                    {tenant.is_active ? "Active" : "Inactive"}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 📄 Lease Information */}
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
                  <p className="font-semibold">{tenant.lease_start_date || "N/A"}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-gray-500 mt-1" />
                <div>
                  <p className="text-sm text-gray-500">Lease End Date</p>
                  <p className="font-semibold">{tenant.lease_end_date || "N/A"}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 💰 Payment Status */}
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
              <Button
                onClick={() => navigate("/tenant/payments")}
                className="w-full mt-4 bg-cyan-500 hover:bg-cyan-600"
              >
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
