
import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useExpense } from '@/context/ExpenseContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const IncomeBarChart: React.FC = () => {
  const { state } = useExpense();
  
  const chartData = useMemo(() => {
    // Only use income transactions
    const incomeTransactions = state.transactions.filter(t => t.type === 'income');
    
    // Group by category
    const incomeByCategory = incomeTransactions.reduce((acc, transaction) => {
      const { category, amount } = transaction;
      
      if (!acc[category]) {
        acc[category] = {
          category,
          amount: 0,
        };
      }
      
      acc[category].amount += amount;
      
      return acc;
    }, {} as Record<string, { category: string; amount: number }>);
    
    // Convert to array for the chart
    return Object.values(incomeByCategory);
  }, [state.transactions]);
  
  if (chartData.length === 0) {
    return (
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Income By Category</CardTitle>
        </CardHeader>
        <CardContent className="text-center p-6">
          <p className="text-gray-500">
            Add income transactions to see your income breakdown.
          </p>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Income By Category</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64 md:h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip formatter={(value) => [`$${Number(value).toFixed(2)}`, 'Amount']} />
              <Legend />
              <Bar dataKey="amount" fill="#4ade80" name="Income Amount" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default IncomeBarChart;
