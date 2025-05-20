
import { useState, useEffect } from "react";
import { useExpense } from "@/context/ExpenseContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Reports = () => {
  const { expenses, categories } = useExpense();
  const [period, setPeriod] = useState("monthly");

  useEffect(() => {
    document.title = "Reports - CostCraft";
  }, []);

  // Helper function to format date
  const formatDate = (date: Date) => {
    const months = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    return `${months[date.getMonth()]} ${date.getFullYear()}`;
  };

  // Get monthly data for the last 6 months
  const getMonthlyData = () => {
    const data: Record<string, number> = {};
    
    // Initialize the last 6 months with 0
    for (let i = 5; i >= 0; i--) {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      date.setDate(1);
      data[formatDate(date)] = 0;
    }
    
    // Populate with actual data
    expenses.forEach(expense => {
      const expenseDate = new Date(expense.date);
      const key = formatDate(expenseDate);
      
      // Only consider the last 6 months
      const sixMonthsAgo = new Date();
      sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 5);
      sixMonthsAgo.setDate(1);
      sixMonthsAgo.setHours(0, 0, 0, 0);
      
      if (expenseDate >= sixMonthsAgo) {
        data[key] = (data[key] || 0) + expense.amount;
      }
    });
    
    return Object.entries(data).map(([month, total]) => ({
      month,
      total,
    }));
  };

  // Get weekly data for the last 12 weeks
  const getWeeklyData = () => {
    const data: Record<string, number> = {};
    
    // Initialize the last 12 weeks with 0
    for (let i = 11; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - (i * 7));
      const weekNum = Math.floor(date.getDate() / 7) + 1;
      const key = `W${weekNum} ${formatDate(date)}`;
      data[key] = 0;
    }
    
    // Populate with actual data
    expenses.forEach(expense => {
      const expenseDate = new Date(expense.date);
      const weekNum = Math.floor(expenseDate.getDate() / 7) + 1;
      const key = `W${weekNum} ${formatDate(expenseDate)}`;
      
      // Only consider the last 12 weeks
      const twelveWeeksAgo = new Date();
      twelveWeeksAgo.setDate(twelveWeeksAgo.getDate() - (11 * 7));
      twelveWeeksAgo.setHours(0, 0, 0, 0);
      
      if (expenseDate >= twelveWeeksAgo && data[key] !== undefined) {
        data[key] = (data[key] || 0) + expense.amount;
      }
    });
    
    return Object.entries(data).map(([week, total]) => ({
      week,
      total,
    }));
  };

  // Get category totals
  const getCategoryData = () => {
    const data: Record<string, number> = {};
    
    // Initialize all categories with 0
    categories.forEach(category => {
      data[category.name] = 0;
    });
    
    // Populate with actual data
    expenses.forEach(expense => {
      const category = categories.find(cat => cat.id === expense.category);
      if (category) {
        data[category.name] = (data[category.name] || 0) + expense.amount;
      }
    });
    
    return Object.entries(data)
      .map(([category, total]) => ({
        category,
        total,
      }))
      .sort((a, b) => b.total - a.total);
  };

  const getChartData = () => {
    switch (period) {
      case "monthly":
        return getMonthlyData();
      case "weekly":
        return getWeeklyData();
      case "category":
        return getCategoryData();
      default:
        return [];
    }
  };

  const chartData = getChartData();
  
  const getDataKey = () => {
    switch (period) {
      case "monthly":
        return "month";
      case "weekly":
        return "week";
      case "category":
        return "category";
      default:
        return "";
    }
  };

  const customTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 border shadow-sm rounded-md">
          <p className="font-medium">{label}</p>
          <p className="text-[#0EA5E9]">{`$${payload[0].value.toFixed(2)}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="container mx-auto p-4 max-w-6xl pb-20 sm:pb-4">
      <h1 className="text-2xl font-bold mb-6">Reports</h1>
      
      <div className="mb-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex justify-between items-center">
              <span>Expense Trends</span>
              <div className="flex items-center">
                <Label htmlFor="period" className="mr-2">View by:</Label>
                <Select value={period} onValueChange={setPeriod}>
                  <SelectTrigger id="period" className="w-[150px]">
                    <SelectValue placeholder="Select period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="category">By Category</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[400px]">
              {chartData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 70 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis 
                      dataKey={getDataKey()} 
                      angle={-45}
                      textAnchor="end"
                      tick={{ fontSize: 12 }}
                      height={70}
                    />
                    <YAxis 
                      tickFormatter={(value) => `$${value}`}
                      width={80}
                    />
                    <Tooltip content={customTooltip} />
                    <Bar dataKey="total" fill="#0EA5E9" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <p className="text-muted-foreground">No expense data available</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Top Categories</CardTitle>
          </CardHeader>
          <CardContent>
            {getCategoryData().length > 0 ? (
              <div className="space-y-4">
                {getCategoryData().slice(0, 5).map((item, index) => {
                  const category = categories.find(cat => cat.name === item.category);
                  const percentage = Math.round((item.total / getCategoryData().reduce((sum, current) => sum + current.total, 0)) * 100);
                  
                  return (
                    <div key={index}>
                      <div className="flex justify-between mb-1">
                        <div className="flex items-center">
                          <div
                            className="w-3 h-3 rounded-full mr-2"
                            style={{ backgroundColor: category?.color || "#71717A" }}
                          ></div>
                          <span>{item.category}</span>
                        </div>
                        <span className="font-medium">${item.total.toFixed(2)}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="h-2 rounded-full"
                          style={{
                            width: `${percentage}%`,
                            backgroundColor: category?.color || "#71717A"
                          }}
                        ></div>
                      </div>
                      <p className="text-xs text-right mt-1 text-gray-500">{percentage}%</p>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="flex items-center justify-center h-[200px]">
                <p className="text-muted-foreground">No category data available</p>
              </div>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Summary Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            {expenses.length > 0 ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-500">Average Expense</p>
                    <p className="text-lg font-bold mt-1">
                      ${(expenses.reduce((sum, expense) => sum + expense.amount, 0) / expenses.length).toFixed(2)}
                    </p>
                  </div>
                  
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-500">Highest Expense</p>
                    <p className="text-lg font-bold mt-1">
                      ${Math.max(...expenses.map(expense => expense.amount)).toFixed(2)}
                    </p>
                  </div>
                  
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-500">Total Expenses</p>
                    <p className="text-lg font-bold mt-1">
                      {expenses.length}
                    </p>
                  </div>
                  
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-500">Categories Used</p>
                    <p className="text-lg font-bold mt-1">
                      {new Set(expenses.map(expense => expense.category)).size}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-[200px]">
                <p className="text-muted-foreground">No expense data available</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Reports;
