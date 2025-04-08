
import React from 'react';
import { useExpense } from '@/context/ExpenseContext';
import { ArrowDownCircle, ArrowUpCircle, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import { useToast } from "@/components/ui/use-toast";
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent className="text-center p-6">
          <p className="text-gray-500">
            Add your first transaction to get started.
          </p>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Recent Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Type</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {state.transactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell>
                  <div className={`p-2 rounded-full inline-flex ${
                    transaction.type === 'income' ? 'bg-green-100' : 'bg-red-100'
                  }`}>
                    {transaction.type === 'income' ? (
                      <ArrowDownCircle className="h-5 w-5 text-income" />
                    ) : (
                      <ArrowUpCircle className="h-5 w-5 text-expense" />
                    )}
                  </div>
                </TableCell>
                <TableCell className="font-medium">{transaction.description}</TableCell>
                <TableCell>{transaction.category}</TableCell>
                <TableCell>{format(new Date(transaction.date), 'MMM d, yyyy')}</TableCell>
                <TableCell className={`font-medium ${
                  transaction.type === 'income' ? 'text-income' : 'text-expense'
                }`}>
                  {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toFixed(2)}
                </TableCell>
                <TableCell>
                  <Button
                    variant="ghost" 
                    size="icon"
                    onClick={() => handleDelete(transaction.id)}
                    aria-label="Delete transaction"
                  >
                    <Trash2 className="h-4 w-4 text-gray-500 hover:text-red-500" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default TransactionList;
