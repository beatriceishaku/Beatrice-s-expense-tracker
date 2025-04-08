
import React from 'react';
import { ArrowUpCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ExpenseCardProps {
  expense: number;
}

const ExpenseCard: React.FC<ExpenseCardProps> = ({ expense }) => {
  return (
    <Card className="border-l-4 border-expense shadow-md">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
        <ArrowUpCircle className="h-4 w-4 text-expense" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-expense">
          ${expense.toFixed(2)}
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          Money going out
        </p>
      </CardContent>
    </Card>
  );
};

export default ExpenseCard;
