import { Card, CardContent } from "../components/ui/card";
import { Building2, Users, CreditCard, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const getQuickPicks = (userType) => [
  {
    title: "Property Info",
    description: "View property details",
    icon: Building2,
    href: userType === 'Admin' ? "/admin/properties" : "/tenant/property-info",
    color: "bg-blue-500 text-white",
  },
  {
    title: "Profile",
    description: userType === 'Admin' ? "Manage user profiles" : "View your profile",
    icon: Users,
    href: userType === 'Admin' ? "/admin/tenants" : "/tenant/profile",
    color: "bg-green-500 text-white",
  },
  {
    title: "Payments",
    description: userType === 'Admin' ? "Manage all payments" : "Track your payments",
    icon: CreditCard,
    href: userType === 'Admin' ? "/admin/payments" : "/tenant/payments",
    color: "bg-amber-500 text-white",
  },
  {
    title: "Reports",
    description: userType === 'Admin' ? "View all reports" : "View and submit reports",
    icon: FileText,
    href: userType === 'Admin' ? "/admin/reports" : "/tenant/reports",
    color: "bg-violet-500 text-white",
  },
];

export function QuickPicks() {
  const navigate = useNavigate();
  const [userType, setUserType] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const isStaff = decoded.is_staff || decoded.isStaff || decoded.is_admin || false;
        setUserType(isStaff ? "Admin" : "Client");
      } catch (error) {
        console.error("Failed to decode token:", error);
        setUserType("Client"); // Default to Client if token decode fails
      }
    } else {
      setUserType("Client"); // Default to Client if no token
    }
  }, []);

  const picks = getQuickPicks(userType);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Quick Picks</h2>
          <p className="text-sm text-gray-600">Frequently accessed features</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {picks.map((item) => (
          <Card
            key={item.title}
            onClick={() => navigate(item.href)}
            className="group cursor-pointer transition-all duration-300 hover:shadow-lg transform hover:scale-[1.02] border border-gray-200"
          >
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className={`rounded-lg p-3 ${item.color} shadow-md`}>
                  <item.icon className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800 mb-1 group-hover:text-blue-600">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}