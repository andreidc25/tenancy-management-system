import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Calendar } from "lucide-react";

const leases = [
  {
    id: 1,
    tenant: "David Martinez",
    unit: "Unit 208",
    expiryDate: "Feb 15, 2025",
    daysLeft: 37,
  },
  {
    id: 2,
    tenant: "Rachel Green",
    unit: "Unit 412",
    expiryDate: "Feb 28, 2025",
    daysLeft: 50,
  },
  {
    id: 3,
    tenant: "Tom Anderson",
    unit: "Unit 115",
    expiryDate: "Mar 10, 2025",
    daysLeft: 60,
  },
];

export function UpcomingLeases() {
  return (
    <Card className="shadow-md">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-semibold text-gray-800">Upcoming Lease Expirations</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {leases.map((lease) => (
            <div
              key={lease.id}
              className="flex items-center justify-between border-b border-gray-200 pb-4 last:border-0 last:pb-0 hover:bg-gray-50 p-2 rounded-lg transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100">
                  <Calendar className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-800">{lease.tenant}</p>
                  <p className="text-sm text-gray-600">{lease.unit}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-800">{lease.expiryDate}</p>
                <p className="text-sm text-gray-500">{lease.daysLeft} days left</p>
              </div>
            </div>
          ))}
          <Button 
            variant="outline" 
            className="w-full mt-4 border-gray-200 hover:bg-gray-50 text-gray-700"
          >
            View All Leases
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}