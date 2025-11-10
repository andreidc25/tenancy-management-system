import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { month: "Jul", collected: 28500, expected: 30000 },
  { month: "Aug", collected: 29200, expected: 30000 },
  { month: "Sep", collected: 30000, expected: 30000 },
  { month: "Oct", collected: 29800, expected: 30000 },
  { month: "Nov", collected: 28900, expected: 30000 },
  { month: "Dec", collected: 27500, expected: 30000 },
];

export function RentCollectionChart() {
  return (
    <Card className="shadow-md">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-semibold text-gray-800">Rent Collection (Last 6 Months)</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis 
              dataKey="month" 
              tick={{ fill: '#6b7280' }}
              axisLine={{ stroke: '#e5e7eb' }}
            />
            <YAxis 
              tick={{ fill: '#6b7280' }}
              axisLine={{ stroke: '#e5e7eb' }}
              tickFormatter={(value) => `₱${value.toLocaleString()}`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#ffffff",
                border: "1px solid #e5e7eb",
                borderRadius: "0.5rem",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              }}
              formatter={(value) => [`₱${value.toLocaleString()}`, value === data[0].expected ? 'Expected' : 'Collected']}
            />
            <Bar 
              dataKey="collected" 
              fill="#3b82f6" 
              radius={[4, 4, 0, 0]}
              name="Collected"
            />
            <Bar 
              dataKey="expected" 
              fill="#93c5fd" 
              radius={[4, 4, 0, 0]}
              name="Expected"
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}