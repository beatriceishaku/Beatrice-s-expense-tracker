
import React, { useMemo } from 'react';
import { format } from 'date-fns';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useExpense } from '@/context/ExpenseContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const TransactionLineChart: React.FC = () => {
  const { state } = useExpense();
  
  const chartData = useMemo(() => {
    // Group transactions by date
    const transactionsByDate = state.transactions.reduce((acc, transaction) => {
      const date = format(new Date(transaction.date), 'MM/dd');
      
      if (!acc[date]) {
        acc[date] = {
          date,
          income: 0,
          expense: 0,
        };
      }
      
      if (transaction.type === 'income') {
        acc[date].income += transaction.amount;
      } else {
        acc[date].expense += transaction.amount;
      }
      
      return acc;
    }, {} as Record<string, { date: string; income: number; expense: number }>);
    
    // Convert to array and sort by date
    return Object.values(transactionsByDate).sort((a, b) => {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    });
  }, [state.transactions]);
  
  if (chartData.length === 0) {
    return (
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Transaction History</CardTitle>
        </CardHeader>
        <CardContent className="text-center p-6">
          <p className="text-gray-500">
            Add transactions to see your history over time.
          </p>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Transaction History</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64 md:h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip formatter={(value) => [`$${Number(value).toFixed(2)}`, '']} />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="income" 
                stroke="#4ade80" 
                name="Income" 
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
              <Line 
                type="monotone" 
                dataKey="expense" 
                stroke="#f87171" 
                name="Expense" 
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default TransactionLineChart;
