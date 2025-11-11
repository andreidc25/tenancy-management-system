import { Card, CardContent } from "../components/ui/card";

// ============================================
// BASE STAT CARD (Shared Component)
// ============================================
export function StatCard({ title, value, icon: Icon, trend, className }) {
  return (
    <Card className={className}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-3xl font-bold text-foreground">{value}</p>
            {trend && (
              <p className={`text-sm font-medium ${trend.positive ? "text-green-600" : "text-red-600"}`}>
                {trend.positive ? "↑" : "↓"} {trend.value}
              </p>
            )}
          </div>
          <div className={`rounded-full p-3 ${trend?.positive ? "bg-green-100" : "bg-blue-100"}`}>
            <Icon className={`h-6 w-6 ${trend?.positive ? "text-green-600" : "text-blue-600"}`} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// ============================================
// ADMIN STAT CARD (For Admin Dashboard)
// ============================================
export function AdminStatCard({ title, value, icon: Icon, trend, onClick, className }) {
  return (
    <Card 
      className={`${className} ${onClick ? 'cursor-pointer hover:shadow-lg transition-all' : ''}`}
      onClick={onClick}
    >
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className="text-3xl font-bold text-gray-900">{value}</p>
            {trend && (
              <p className={`text-sm font-medium flex items-center gap-1 ${trend.positive ? "text-green-600" : "text-red-600"}`}>
                {trend.positive ? "↑" : "↓"} {trend.value}
              </p>
            )}
          </div>
          <div className={`rounded-lg p-3 ${trend?.positive ? "bg-green-500" : "bg-blue-500"}`}>
            <Icon className="h-6 w-6 text-white" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// ============================================
// CLIENT STAT CARD (For Tenant Dashboard)
// ============================================
export function ClientStatCard({ title, value, icon: Icon, trend, status = "default", className }) {
  const statusColors = {
    success: "bg-green-100 text-green-600",
    warning: "bg-yellow-100 text-yellow-600",
    info: "bg-blue-100 text-blue-600",
    default: "bg-gray-100 text-gray-600",
  };

  return (
    <Card className={`${className} hover:shadow-lg transition-shadow`}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-sm text-gray-600 mb-1">{title}</p>
            <p className="text-3xl font-bold text-gray-900 mb-2">{value}</p>
            {trend && (
              <p className="text-sm text-gray-500">{trend}</p>
            )}
          </div>
          <div className={`p-3 rounded-lg ${statusColors[status]}`}>
            <Icon className="h-6 w-6" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}