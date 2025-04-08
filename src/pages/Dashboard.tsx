
import React from 'react';
import { useExpense } from '@/context/ExpenseContext';
import BalanceCard from '@/components/dashboard/BalanceCard';
import IncomeCard from '@/components/dashboard/IncomeCard';
import ExpenseCard from '@/components/dashboard/ExpenseCard';
import SpendingChart from '@/components/dashboard/SpendingChart';
import TransactionLineChart from '@/components/dashboard/TransactionLineChart';
import IncomeBarChart from '@/components/dashboard/IncomeBarChart';
import TransactionList from '@/components/transactions/TransactionList';

const Dashboard: React.FC = () => {
  const { state } = useExpense();
  
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-gray-500 mt-1">
          Welcome to Beatrice's financial overview
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <BalanceCard balance={state.balance} />
        <IncomeCard income={state.income} />
        <ExpenseCard expense={state.expense} />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TransactionLineChart />
        <IncomeBarChart />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SpendingChart />
        <TransactionList />
      </div>
    </div>
  );
};

export default Dashboard;
