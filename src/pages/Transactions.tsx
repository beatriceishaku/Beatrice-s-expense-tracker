
import React from 'react';
import TransactionForm from '@/components/transactions/TransactionForm';
import TransactionList from '@/components/transactions/TransactionList';

const Transactions: React.FC = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Transactions</h1>
        <p className="text-gray-500 mt-1">
          Manage your income and expenses
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TransactionForm />
        <TransactionList />
      </div>
    </div>
  );
};

export default Transactions;
