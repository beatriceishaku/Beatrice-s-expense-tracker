
import React from 'react';
import { useExpense, Transaction } from '@/context/ExpenseContext';
import { ArrowDownCircle, ArrowUpCircle, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import { useToast } from "@/components/ui/use-toast";
import { Button } from '@/components/ui/button';

const TransactionList: React.FC = () => {
  const { state, deleteTransaction } = useExpense();
  const { toast } = useToast();
  
  const handleDelete = (id: string) => {
    deleteTransaction(id);
    toast({
      title: "Transaction deleted",
      description: "The transaction has been removed",
    });
  };
  
  if (state.transactions.length === 0) {
    return (
      <div className="text-center p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-2">No Transactions</h2>
        <p className="text-gray-500">
          Add your first transaction to get started.
        </p>
      </div>
    );
  }
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <h2 className="text-xl font-semibold p-6 border-b">Recent Transactions</h2>
      
      <div className="divide-y">
        {state.transactions.map((transaction) => (
          <div 
            key={transaction.id} 
            className="p-4 flex items-center justify-between hover:bg-gray-50"
          >
            <div className="flex items-center">
              <div className={`p-2 rounded-full mr-4 ${
                transaction.type === 'income' ? 'bg-green-100' : 'bg-red-100'
              }`}>
                {transaction.type === 'income' ? (
                  <ArrowDownCircle className="h-5 w-5 text-income" />
                ) : (
                  <ArrowUpCircle className="h-5 w-5 text-expense" />
                )}
              </div>
              
              <div>
                <h3 className="font-medium">{transaction.description}</h3>
                <div className="flex text-sm text-gray-500 space-x-2">
                  <span>{transaction.category}</span>
                  <span>•</span>
                  <span>
                    {format(new Date(transaction.date), 'MMM d, yyyy')}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className={`font-medium ${
                transaction.type === 'income' ? 'text-income' : 'text-expense'
              }`}>
                {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toFixed(2)}
              </span>
              
              <Button
                variant="ghost" 
                size="icon"
                onClick={() => handleDelete(transaction.id)}
                aria-label="Delete transaction"
              >
                <Trash2 className="h-4 w-4 text-gray-500 hover:text-red-500" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionList;
