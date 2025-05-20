
import { useEffect } from "react";
import DashboardSummary from "@/components/DashboardSummary";
import ExpenseChart from "@/components/ExpenseChart";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useExpense } from "@/context/ExpenseContext";
import { useTheme } from "@/context/ThemeContext";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";

const Dashboard = () => {
  const { expenses } = useExpense();
  const { theme } = useTheme();
  
  // Get recent expenses (last 5)
  const recentExpenses = [...expenses]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  useEffect(() => {
    document.title = "Dashboard - AIM EXPENSE";
  }, []);

  return (
    <div className="container mx-auto p-4 max-w-6xl pb-20 sm:pb-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold dark:text-white dark:filter dark:drop-shadow-[0_0_2px_rgba(255,255,255,0.8)]">Dashboard</h1>
        <Link to="/expenses">
          <Button className={`${theme === 'dark' ? 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:opacity-90 shadow-[0_0_15px_rgba(102,103,235,0.5)]' : 'bg-[#0EA5E9] hover:bg-[#0EA5E9]/90'} transition-all duration-300`}>
            <Plus className="mr-2 h-4 w-4" /> New Expense
          </Button>
        </Link>
      </div>

      <div className="mb-6">
        <DashboardSummary />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 transform hover:scale-[1.01] transition-all duration-300">
          <Card className={`p-4 ${theme === 'dark' ? 'dark:bg-gray-900 dark:border-purple-500/30 dark:shadow-[0_0_15px_rgba(162,102,247,0.2)]' : ''} transition-all duration-300`}>
            <ExpenseChart />
          </Card>
        </div>

        <Card className={`p-4 transform hover:scale-[1.02] transition-all duration-300 ${theme === 'dark' ? 'dark:bg-gray-900 dark:border-cyan-500/30 dark:shadow-[0_0_15px_rgba(94,230,255,0.3)]' : ''}`}>
          <h2 className="text-lg font-medium mb-4 dark:text-white">Recent Expenses</h2>
          {recentExpenses.length > 0 ? (
            <div className="space-y-3">
              {recentExpenses.map((expense) => (
                <div key={expense.id} className="flex justify-between border-b pb-2 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 p-2 rounded transition-all duration-200">
                  <div>
                    <p className="font-medium dark:text-white">{expense.title}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {new Date(expense.date).toLocaleDateString()}
                    </p>
                  </div>
                  <p className="font-bold dark:text-cyan-400 dark:filter dark:drop-shadow-[0_0_2px_rgba(94,230,255,0.5)]">${expense.amount.toFixed(2)}</p>
                </div>
              ))}
              <div className="pt-2">
                <Link to="/expenses" className={`${theme === 'dark' ? 'text-cyan-400 filter drop-shadow-[0_0_2px_rgba(94,230,255,0.5)]' : 'text-[#0EA5E9]'} text-sm hover:underline transition-all duration-300`}>
                  View all expenses →
                </Link>
              </div>
            </div>
          ) : (
            <div className="text-center py-6">
              <p className="text-gray-500 dark:text-gray-400 mb-2">No expenses yet</p>
              <Link to="/expenses">
                <Button variant="outline" size="sm" className="dark:border-cyan-500/50 dark:text-cyan-400 dark:hover:bg-gray-800 transition-all duration-300">
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
