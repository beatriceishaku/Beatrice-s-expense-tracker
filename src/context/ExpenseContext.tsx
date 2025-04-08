
import React, { createContext, useContext, useReducer, ReactNode } from 'react';

// Define the transaction type
export interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  date: string;
}

// Define the state type
interface ExpenseState {
  transactions: Transaction[];
  balance: number;
  income: number;
  expense: number;
}

// Define action types
type ExpenseAction =
  | { type: 'ADD_TRANSACTION'; payload: Transaction }
  | { type: 'DELETE_TRANSACTION'; payload: string }
  | { type: 'RESET' };

// Create the initial state
const initialState: ExpenseState = {
  transactions: [],
  balance: 0,
  income: 0,
  expense: 0,
};

// Create the reducer function
const expenseReducer = (state: ExpenseState, action: ExpenseAction): ExpenseState => {
  switch (action.type) {
    case 'ADD_TRANSACTION': {
      const transactions = [...state.transactions, action.payload];
      
      // Calculate new totals
      let income = 0;
      let expense = 0;
      
      transactions.forEach(transaction => {
        if (transaction.type === 'income') {
          income += transaction.amount;
        } else {
          expense += transaction.amount;
        }
      });
      
      const balance = income - expense;
      
      return {
        ...state,
        transactions,
        balance,
        income,
        expense,
      };
    }
    
    case 'DELETE_TRANSACTION': {
      const transactions = state.transactions.filter(
        transaction => transaction.id !== action.payload
      );
      
      // Recalculate totals
      let income = 0;
      let expense = 0;
      
      transactions.forEach(transaction => {
        if (transaction.type === 'income') {
          income += transaction.amount;
        } else {
          expense += transaction.amount;
        }
      });
      
      const balance = income - expense;
      
      return {
        ...state,
        transactions,
        balance,
        income,
        expense,
      };
    }
    
    case 'RESET':
      return initialState;
    
    default:
      return state;
  }
};

// Create context
type ExpenseContextType = {
  state: ExpenseState;
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  deleteTransaction: (id: string) => void;
  reset: () => void;
};

const ExpenseContext = createContext<ExpenseContextType | undefined>(undefined);

// Create provider component
export const ExpenseProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(expenseReducer, initialState);
  
  // Add a transaction
  const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: Date.now().toString(),
    };
    
    dispatch({
      type: 'ADD_TRANSACTION',
      payload: newTransaction,
    });
  };
  
  // Delete a transaction
  const deleteTransaction = (id: string) => {
    dispatch({
      type: 'DELETE_TRANSACTION',
      payload: id,
    });
  };
  
  // Reset the state
  const reset = () => {
    dispatch({ type: 'RESET' });
  };
  
  return (
    <ExpenseContext.Provider
      value={{
        state,
        addTransaction,
        deleteTransaction,
        reset,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};

// Create a custom hook for using the context
export const useExpense = () => {
  const context = useContext(ExpenseContext);
  
  if (context === undefined) {
    throw new Error('useExpense must be used within an ExpenseProvider');
  }
  
  return context;
};
