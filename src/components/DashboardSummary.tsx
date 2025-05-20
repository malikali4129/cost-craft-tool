import { useExpense } from "@/context/ExpenseContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Wallet, PiggyBank, BadgeDollarSign } from "lucide-react";

const DashboardSummary = () => {
  const { expenses, getTotalExpenses } = useExpense();
  
  const totalExpenses = getTotalExpenses();
  
  const getThisMonthExpenses = () => {
    const today = new Date();
    const thisMonth = today.getMonth();
    const thisYear = today.getFullYear();
    
    return expenses
      .filter(expense => {
        const expenseDate = new Date(expense.date);
        return expenseDate.getMonth() === thisMonth && expenseDate.getFullYear() === thisYear;
      })
      .reduce((total, expense) => total + expense.amount, 0);
  };
  
  const getLastMonthExpenses = () => {
    const today = new Date();
    let lastMonth = today.getMonth() - 1;
    let lastMonthYear = today.getFullYear();
    
    if (lastMonth < 0) {
      lastMonth = 11;
      lastMonthYear -= 1;
    }
    
    return expenses
      .filter(expense => {
        const expenseDate = new Date(expense.date);
        return expenseDate.getMonth() === lastMonth && expenseDate.getFullYear() === lastMonthYear;
      })
      .reduce((total, expense) => total + expense.amount, 0);
  };
  
  const thisMonthTotal = getThisMonthExpenses();
  const lastMonthTotal = getLastMonthExpenses();
  
  const percentageChange = lastMonthTotal === 0 
    ? 0 
    : ((thisMonthTotal - lastMonthTotal) / lastMonthTotal) * 100;
  
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
          <Wallet className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${totalExpenses.toFixed(2)}</div>
          <p className="text-xs text-muted-foreground">Lifetime tracking</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">This Month</CardTitle>
          <BadgeDollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${thisMonthTotal.toFixed(2)}</div>
          <p className="text-xs text-muted-foreground">
            {Math.abs(percentageChange).toFixed(1)}%
            {percentageChange > 0 ? (
              <span className="text-red-500"> increase</span>
            ) : percentageChange < 0 ? (
              <span className="text-green-500"> decrease</span>
            ) : (
              <span> no change</span>
            )}
            {" from last month"}
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Last Month</CardTitle>
          <PiggyBank className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${lastMonthTotal.toFixed(2)}</div>
          <p className="text-xs text-muted-foreground">Previous period</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardSummary;
