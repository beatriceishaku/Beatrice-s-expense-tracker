
import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { useExpense } from '@/context/ExpenseContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const COLORS = [
  '#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', 
  '#82CA9D', '#FFC658', '#FF6B6B', '#A4DE6C', '#D0ED57'
];

const SpendingChart: React.FC = () => {
  const { state } = useExpense();
  
  const chartData = useMemo(() => {
    const expensesByCategory: Record<string, number> = {};
    
    // Only process expense transactions
    state.transactions
      .filter(t => t.type === 'expense')
      .forEach(transaction => {
        if (expensesByCategory[transaction.category]) {
          expensesByCategory[transaction.category] += transaction.amount;
        } else {
          expensesByCategory[transaction.category] = transaction.amount;
        }
      });
    
    // Convert to array format for chart
    return Object.entries(expensesByCategory).map(([name, value]) => ({
      name,
      value,
    }));
  }, [state.transactions]);
  
  if (chartData.length === 0) {
    return (
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Spending By Category</CardTitle>
        </CardHeader>
        <CardContent className="text-center p-6">
          <p className="text-gray-500">
            Add expenses to see your spending breakdown.
          </p>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Spending By Category</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64 md:h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
              >
                {chartData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={COLORS[index % COLORS.length]} 
                  />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value) => {
                  return [`$${Number(value).toFixed(2)}`, 'Amount'];
                }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default SpendingChart;
