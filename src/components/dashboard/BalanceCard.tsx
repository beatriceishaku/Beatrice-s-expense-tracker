
import React from 'react';
import { Wallet } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface BalanceCardProps {
  balance: number;
}

const BalanceCard: React.FC<BalanceCardProps> = ({ balance }) => {
  return (
    <Card className="border-l-4 border-balance shadow-md">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
        <Wallet className="h-4 w-4 text-balance" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-balance">
          ${balance.toFixed(2)}
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          Your current balance
        </p>
      </CardContent>
    </Card>
  );
};

export default BalanceCard;
