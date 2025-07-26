import React from 'react';
import { Button } from '@/components/ui/button';
import { TrendingUp, TrendingDown, DollarSign, Calendar, Bell, Search, User } from 'lucide-react';
import { cn, getGradientClass } from '@/lib/utils';

/**
 * Enhanced Dashboard Header Component
 */
interface DashboardHeaderProps {
  totalIncome: number;
  totalExpenses: number;
  netSavings: number;
  transactionCount: number;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ 
  totalIncome, 
  totalExpenses, 
  netSavings, 
  transactionCount 
}) => {
  return (
    <div className={cn(
      "relative overflow-hidden rounded-2xl p-8 text-white",
      getGradientClass('primary')
    )}>
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-black/10" />
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full translate-y-16 -translate-x-16" />
      
      {/* Content */}
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">Welcome back! 👋</h1>
            <p className="text-blue-100 text-lg">Here's your financial overview for July 2025</p>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
              <Search className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/20 relative">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
            </Button>
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
              <User className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">Total Income</p>
                <p className="text-2xl font-bold">₹{totalIncome.toLocaleString()}</p>
              </div>
              <div className="p-2 bg-green-500/20 rounded-lg">
                <TrendingUp className="w-5 h-5 text-green-300" />
              </div>
            </div>
          </div>
          
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">Total Expenses</p>
                <p className="text-2xl font-bold">₹{totalExpenses.toLocaleString()}</p>
              </div>
              <div className="p-2 bg-red-500/20 rounded-lg">
                <TrendingDown className="w-5 h-5 text-red-300" />
              </div>
            </div>
          </div>
          
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">Net Savings</p>
                <p className="text-2xl font-bold">₹{netSavings.toLocaleString()}</p>
              </div>
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <DollarSign className="w-5 h-5 text-blue-300" />
              </div>
            </div>
          </div>
          
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">Transactions</p>
                <p className="text-2xl font-bold">{transactionCount}</p>
              </div>
              <div className="p-2 bg-purple-500/20 rounded-lg">
                <Calendar className="w-5 h-5 text-purple-300" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader; 