
import { useExpense } from "@/context/ExpenseContext";
import { useTheme } from "@/context/ThemeContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Wallet, PiggyBank, BadgeDollarSign } from "lucide-react";

const DashboardSummary = () => {
  const { expenses, getTotalExpenses } = useExpense();
  const { theme } = useTheme();
  
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
  
  const getNeonCardStyles = (color: string) => {
    if (theme === 'dark') {
      return {
        cardClass: `dark:bg-gray-900 dark:border-${color}-500/30 dark:shadow-[0_0_15px_rgba(${
          color === 'purple' ? '162,102,247' : color === 'pink' ? '245,110,179' : '14,245,227'
        },0.2)] transform hover:scale-[1.03] hover:shadow-[0_0_20px_rgba(${
          color === 'purple' ? '162,102,247' : color === 'pink' ? '245,110,179' : '14,245,227'
        },0.4)]`,
        textClass: `dark:text-${color === 'purple' ? 'purple' : color === 'pink' ? 'pink' : 'cyan'}-400 dark:filter dark:drop-shadow-[0_0_3px_rgba(${
          color === 'purple' ? '162,102,247' : color === 'pink' ? '245,110,179' : '14,245,227'
        },0.5)]`
      };
    }
    return {
      cardClass: '',
      textClass: ''
    };
  };

  const totalStyles = getNeonCardStyles('cyan');
  const thisMonthStyles = getNeonCardStyles('pink');
  const lastMonthStyles = getNeonCardStyles('purple');
  
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card className={`transition-all duration-300 ${totalStyles.cardClass}`}>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium dark:text-white">Total Expenses</CardTitle>
          <Wallet className={`h-4 w-4 text-muted-foreground ${theme === 'dark' ? 'dark:text-cyan-400' : ''}`} />
        </CardHeader>
        <CardContent>
          <div className={`text-2xl font-bold ${totalStyles.textClass}`}>${totalExpenses.toFixed(2)}</div>
          <p className="text-xs text-muted-foreground dark:text-gray-400">Lifetime tracking</p>
        </CardContent>
      </Card>
      
      <Card className={`transition-all duration-300 ${thisMonthStyles.cardClass}`}>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium dark:text-white">This Month</CardTitle>
          <BadgeDollarSign className={`h-4 w-4 text-muted-foreground ${theme === 'dark' ? 'dark:text-pink-400' : ''}`} />
        </CardHeader>
        <CardContent>
          <div className={`text-2xl font-bold ${thisMonthStyles.textClass}`}>${thisMonthTotal.toFixed(2)}</div>
          <p className="text-xs text-muted-foreground dark:text-gray-400">
            {Math.abs(percentageChange).toFixed(1)}%
            {percentageChange > 0 ? (
              <span className="text-red-500 dark:text-red-400"> increase</span>
            ) : percentageChange < 0 ? (
              <span className="text-green-500 dark:text-green-400"> decrease</span>
            ) : (
              <span> no change</span>
            )}
            {" from last month"}
          </p>
        </CardContent>
      </Card>
      
      <Card className={`transition-all duration-300 ${lastMonthStyles.cardClass}`}>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium dark:text-white">Last Month</CardTitle>
          <PiggyBank className={`h-4 w-4 text-muted-foreground ${theme === 'dark' ? 'dark:text-purple-400' : ''}`} />
        </CardHeader>
        <CardContent>
          <div className={`text-2xl font-bold ${lastMonthStyles.textClass}`}>${lastMonthTotal.toFixed(2)}</div>
          <p className="text-xs text-muted-foreground dark:text-gray-400">Previous period</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardSummary;
