
import { useEffect } from "react";
import DashboardSummary from "@/components/DashboardSummary";
import ExpenseChart from "@/components/ExpenseChart";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useExpense } from "@/context/ExpenseContext";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";

const Dashboard = () => {
  const { expenses } = useExpense();
  
  // Get recent expenses (last 5)
  const recentExpenses = [...expenses]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  useEffect(() => {
    document.title = "Dashboard - CostCraft";
  }, []);

  return (
    <div className="container mx-auto p-4 max-w-6xl pb-20 sm:pb-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <Link to="/expenses">
          <Button className="bg-[#0EA5E9] hover:bg-[#0EA5E9]/90">
            <Plus className="mr-2 h-4 w-4" /> New Expense
          </Button>
        </Link>
      </div>

      <div className="mb-6">
        <DashboardSummary />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ExpenseChart />

        <Card className="p-4">
          <h2 className="text-lg font-medium mb-4">Recent Expenses</h2>
          {recentExpenses.length > 0 ? (
            <div className="space-y-3">
              {recentExpenses.map((expense) => (
                <div key={expense.id} className="flex justify-between border-b pb-2">
                  <div>
                    <p className="font-medium">{expense.title}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(expense.date).toLocaleDateString()}
                    </p>
                  </div>
                  <p className="font-bold">${expense.amount.toFixed(2)}</p>
                </div>
              ))}
              <div className="pt-2">
                <Link to="/expenses" className="text-[#0EA5E9] text-sm hover:underline">
                  View all expenses →
                </Link>
              </div>
            </div>
          ) : (
            <div className="text-center py-6">
              <p className="text-gray-500 mb-2">No expenses yet</p>
              <Link to="/expenses">
                <Button variant="outline" size="sm">
                  Add your first expense
                </Button>
              </Link>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
