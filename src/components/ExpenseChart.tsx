
import { useExpense } from "@/context/ExpenseContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const COLORS = ["#0EA5E9", "#F97316", "#8B5CF6", "#22C55E", "#EF4444", "#71717A"];

const ExpenseChart = () => {
  const { expenses, categories, getExpensesByCategory } = useExpense();
  const expensesByCategory = getExpensesByCategory();
  
  // Transform data for pie chart
  const chartData = Object.keys(expensesByCategory).map((categoryId) => {
    const category = categories.find((cat) => cat.id === categoryId);
    return {
      name: category ? category.name : "Unknown",
      value: expensesByCategory[categoryId],
      color: category ? category.color : "#71717A",
    };
  });
  
  // Sort data by value (descending)
  chartData.sort((a, b) => b.value - a.value);
  
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 border shadow-sm rounded-md">
          <p className="font-medium">{`${payload[0].name}: $${payload[0].value.toFixed(2)}`}</p>
        </div>
      );
    }
    return null;
  };
  
  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Expenses by Category</CardTitle>
      </CardHeader>
      <CardContent>
        {chartData.length > 0 ? (
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/2 h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    nameKey="name"
                    labelLine={false}
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            <div className="w-full md:w-1/2 mt-4 md:mt-0">
              <div className="space-y-2">
                {chartData.map((entry, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div
                        className="w-3 h-3 rounded-full mr-2"
                        style={{ backgroundColor: entry.color }}
                      ></div>
                      <span className="text-sm">{entry.name}</span>
                    </div>
                    <span className="font-medium">
                      ${entry.value.toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-[250px]">
            <p className="text-muted-foreground">No expense data available</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ExpenseChart;
