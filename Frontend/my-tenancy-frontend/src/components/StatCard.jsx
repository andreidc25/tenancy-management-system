import { Card, CardContent } from "../components/ui/card";

export function StatCard({ title, value, icon: Icon, trend, className }) {
  return (
    <Card className={className}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-3xl font-bold text-foreground">{value}</p>
            {trend && (
              <p className={`text-sm font-medium ${trend.positive ? "text-accent" : "text-destructive"}`}>
                {trend.positive ? "↑" : "↓"} {trend.value}
              </p>
            )}
          </div>
          <div className={`rounded-full p-3 ${trend?.positive ? "bg-accent/10" : "bg-primary/10"}`}>
            <Icon className={`h-6 w-6 ${trend?.positive ? "text-accent" : "text-primary"}`} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}