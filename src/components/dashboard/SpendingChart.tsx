
import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { useExpense } from '@/context/ExpenseContext';

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
      <div className="p-6 bg-white rounded-lg shadow-md text-center">
        <h2 className="text-xl font-semibold mb-2">Spending By Category</h2>
        <p className="text-gray-500">
          Add expenses to see your spending breakdown.
        </p>
      </div>
    );
  }
  
  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Spending By Category</h2>
      
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
              formatter={(value) => [`$${value.toFixed(2)}`, 'Amount']}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SpendingChart;
