
import React from 'react';
import { ArrowDownCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface IncomeCardProps {
  income: number;
}

const IncomeCard: React.FC<IncomeCardProps> = ({ income }) => {
  return (
    <Card className="border-l-4 border-income shadow-md">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Total Income</CardTitle>
        <ArrowDownCircle className="h-4 w-4 text-income" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-income">
          ${income.toFixed(2)}
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          Money coming in
        </p>
      </CardContent>
    </Card>
  );
};

export default IncomeCard;
