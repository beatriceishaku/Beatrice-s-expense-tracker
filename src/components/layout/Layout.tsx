
import React from 'react';
import { Link } from 'react-router-dom';
import { Wallet, PieChart, BarChartBig } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="hidden md:flex flex-col w-64 bg-white border-r border-gray-200 shadow-sm">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <Wallet className="h-6 w-6 text-accent" />
            <span>ExpenseTracker</span>
          </h1>
        </div>
        
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            <li>
              <Link 
                to="/" 
                className="flex items-center text-gray-700 px-4 py-3 rounded-lg hover:bg-gray-100"
              >
                <PieChart className="mr-3 h-5 w-5" />
                Dashboard
              </Link>
            </li>
            <li>
              <Link 
                to="/transactions" 
                className="flex items-center text-gray-700 px-4 py-3 rounded-lg hover:bg-gray-100"
              >
                <BarChartBig className="mr-3 h-5 w-5" />
                Transactions
              </Link>
            </li>
          </ul>
        </nav>
        
        <div className="p-4 border-t border-gray-200">
          <div className="text-sm text-gray-500">
            © 2025 ExpenseTracker
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Mobile Header */}
        <header className="md:hidden bg-white border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <Wallet className="h-5 w-5 text-accent" />
              <span>ExpenseTracker</span>
            </h1>
          </div>
        </header>
        
        {/* Page Content */}
        <main className="flex-1 overflow-auto p-4 md:p-8 bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
