import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Avatar, AvatarFallback } from "../components/ui/avatar";
import API from "../api/axios";

export function RecentTenants() {
  const [tenants, setTenants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("dashboard/recent-tenants/")
      .then((res) => setTenants(res.data))
      .catch((err) => console.error("Error fetching recent tenants:", err))
      .finally(() => setLoading(false));
  }, []);

  const getInitials = (name) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("");

  if (loading) {
    return (
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Recent Tenants</CardTitle>
        </CardHeader>
        <CardContent>Loading...</CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-md">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-semibold text-gray-800">
          Recent Tenants
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {tenants.length === 0 ? (
            <p className="text-gray-500">No tenants found.</p>
          ) : (
            tenants.map((tenant) => (
              <div
                key={tenant.id}
                className="flex items-center justify-between border-b border-gray-200 pb-4 last:border-0 last:pb-0 hover:bg-gray-50 p-2 rounded-lg transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback className="bg-blue-100 text-blue-600 font-medium">
                      {getInitials(tenant.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-gray-800">{tenant.name}</p>
                    <p className="text-sm text-gray-500">
                      {tenant.property || "No property assigned"}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-800">
                    ₱{Number(tenant.monthly_rent).toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-500">
                    Lease until {tenant.lease_end}
                  </p>
                </div>
                <Badge className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-xs font-semibold">
                  Active
                </Badge>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
