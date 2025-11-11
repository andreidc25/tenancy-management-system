import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Avatar, AvatarFallback } from "../components/ui/avatar";

const tenants = [
  {
    id: 1,
    name: "Sarah Johnson",
    unit: "Unit 101",
    rent: "$1,500",
    status: "paid",
    dueDate: "Jan 15, 2025",
  },
  {
    id: 2,
    name: "Michael Chen",
    unit: "Unit 203",
    rent: "$1,800",
    status: "pending",
    dueDate: "Jan 15, 2025",
  },
  {
    id: 3,
    name: "Emily Davis",
    unit: "Unit 305",
    rent: "$1,650",
    status: "paid",
    dueDate: "Jan 15, 2025",
  },
  {
    id: 4,
    name: "James Wilson",
    unit: "Unit 402",
    rent: "$2,000",
    status: "overdue",
    dueDate: "Jan 1, 2025",
  },
  {
    id: 5,
    name: "Lisa Anderson",
    unit: "Unit 506",
    rent: "$1,750",
    status: "paid",
    dueDate: "Jan 15, 2025",
  },
];

export function RecentTenants() {
  const getStatusColor = (status) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-600 hover:bg-green-200";
      case "pending":
        return "bg-yellow-100 text-yellow-600 hover:bg-yellow-200";
      case "overdue":
        return "bg-red-100 text-red-600 hover:bg-red-200";
      default:
        return "bg-gray-100 text-gray-600 hover:bg-gray-200";
    }
  };

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("");
  };

  return (
    <Card className="shadow-md">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-semibold text-gray-800">Recent Tenants</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {tenants.map((tenant) => (
            <div key={tenant.id} className="flex items-center justify-between border-b border-gray-200 pb-4 last:border-0 last:pb-0 hover:bg-gray-50 p-2 rounded-lg transition-colors">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarFallback className="bg-blue-100 text-blue-600 font-medium">
                    {getInitials(tenant.name)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-gray-800">{tenant.name}</p>
                  <p className="text-sm text-gray-500">{tenant.unit}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="font-medium text-gray-800">{tenant.rent}</p>
                  <p className="text-sm text-gray-500">{tenant.dueDate}</p>
                </div>
                <Badge className={`${getStatusColor(tenant.status)} capitalize px-2 py-1 rounded-full text-xs font-semibold`}>
                  {tenant.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}