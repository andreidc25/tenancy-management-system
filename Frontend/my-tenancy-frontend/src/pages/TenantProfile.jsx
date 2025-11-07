import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from '../components/Navbar';
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
  CheckCircle
} from "lucide-react";

// Mock tenant data - replace with your actual data source
const mockTenantData = {
  fullName: "Juan Renter",
  phone: "09226241103",
  email: "juan.renter@example.com",
  property: "Sunset Villa - Unit A1",
  address: "123 Sunset Boulevard, Manila",
  leaseStartDate: "Nov. 4, 2025",
  leaseEndDate: "Nov. 4, 2026",
  monthlyRent: 15000.00,
  securityDeposit: 4000.00,
  isActive: true,
  paymentStatus: "Paid",
  emergencyContact: "Maria Renter - 09220265793"
};

const TenantProfile = () => {
  const navigate = useNavigate();
  const [tenant] = useState(mockTenantData);

  const handleLogout = () => {
    navigate("/");
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar
        title="Tenant Profile"
        userName={tenant.fullName}
        onLogout={handleLogout}
      />

      <main className="container mx-auto px-6 py-8">
        <Button
          variant="outline"
          onClick={handleBack}
          className="mb-6 gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>

        {/* Status Cards (animated, dashboard style) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <TenantInfoCard
            title="Property"
            value={tenant.property.split(" - ")[0]}
            icon={Home}
            color="blue"
            delay={0.1}
          />
          <TenantInfoCard
            title="Monthly Rent"
            value={`₱${tenant.monthlyRent.toLocaleString()}`}
            icon={DollarSign}
            color="green"
            delay={0.2}
          />
          <TenantInfoCard
            title="Security Deposit"
            value={`₱${tenant.securityDeposit.toLocaleString()}`}
            icon={CreditCard}
            color="orange"
            delay={0.3}
          />
        </div>

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
                  <p className="font-semibold">{tenant.fullName}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-gray-500 mt-1" />
                <div>
                  <p className="text-sm text-gray-500">Phone Number</p>
                  <p className="font-semibold">{tenant.phone}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-gray-500 mt-1" />
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-semibold">{tenant.email}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-gray-500 mt-1" />
                <div>
                  <p className="text-sm text-gray-500">Emergency Contact</p>
                  <p className="font-semibold">{tenant.emergencyContact}</p>
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
                  <p className="font-semibold">{tenant.property}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gray-500 mt-1" />
                <div>
                  <p className="text-sm text-gray-500">Address</p>
                  <p className="font-semibold">{tenant.address}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-gray-500 mt-1" />
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <Badge
                    variant={tenant.isActive ? "default" : "secondary"}
                    className="mt-1"
                  >
                    {tenant.isActive ? "Active" : "Inactive"}
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
                  <p className="font-semibold">{tenant.leaseStartDate}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-gray-500 mt-1" />
                <div>
                  <p className="text-sm text-gray-500">Lease End Date</p>
                  <p className="font-semibold">{tenant.leaseEndDate}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <DollarSign className="w-5 h-5 text-gray-500 mt-1" />
                <div>
                  <p className="text-sm text-gray-500">Monthly Rent</p>
                  <p className="font-semibold">
                    ₱{tenant.monthlyRent.toLocaleString()}.00
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CreditCard className="w-5 h-5 text-gray-500 mt-1" />
                <div>
                  <p className="text-sm text-gray-500">Security Deposit</p>
                  <p className="font-semibold">
                    ₱{tenant.securityDeposit.toLocaleString()}.00
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
                    {tenant.paymentStatus}
                  </Badge>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <DollarSign className="w-5 h-5 text-gray-500 mt-1" />
                <div>
                  <p className="text-sm text-gray-500">Total Deposit</p>
                  <p className="font-semibold">
                    ₱{tenant.securityDeposit.toLocaleString()}.00
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
