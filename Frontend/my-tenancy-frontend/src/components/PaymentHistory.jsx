import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { CheckCircle, Clock, Download } from "lucide-react";

const payments = [
  { id: 1, date: "Nov 1, 2024", amount: "$1,500", status: "paid", method: "Bank Transfer" },
  { id: 2, date: "Oct 1, 2024", amount: "$1,500", status: "paid", method: "Bank Transfer" },
  { id: 3, date: "Sep 1, 2024", amount: "$1,500", status: "paid", method: "Credit Card" },
];

const PaymentHistory = () => {
  return (
    <Card className="h-[270px] flex flex-col">
      <CardContent className="p-4 flex-1 overflow-y-auto">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-gray-900">Recent Payments</h3>
          <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
            View All
          </Button>
        </div>
        
        <div className="space-y-2">
          {payments.map((payment) => (
            <div
              key={payment.id}
              className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center gap-3">
                {payment.status === "paid" ? (
                  <CheckCircle className="h-5 w-5 text-green-600" />
                ) : (
                  <Clock className="h-5 w-5 text-yellow-600" />
                )}
                <div>
                  <p className="font-medium text-gray-900 text-sm">{payment.date}</p>
                  <p className="text-xs text-gray-600">{payment.method}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-semibold text-gray-900 text-sm">{payment.amount}</span>
                <Button variant="ghost" size="icon" className="hover:bg-gray-200 h-8 w-8">
                  <Download className="h-3 w-3" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PaymentHistory;