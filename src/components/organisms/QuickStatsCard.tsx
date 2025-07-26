import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown, DollarSign, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';

interface QuickStatsCardProps {
  totalIncome: number;
  totalExpenses: number;
  netSavings: number;
  transactionCount: number;
}

const QuickStatsCard: React.FC<QuickStatsCardProps> = ({
  totalIncome,
  totalExpenses,
  netSavings,
  transactionCount
}) => {
  return (
    <Card className="border-0 shadow-xl rounded-2xl overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-100">
        <CardTitle className="flex items-center space-x-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Calendar className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-900">Quick Stats</h3>
            <p className="text-sm text-gray-600">Your financial summary</p>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 sm:p-6">
        <div className="space-y-3 sm:space-y-4">
          <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <TrendingUp className="w-4 h-4 text-green-600" />
              </div>
              <span className="font-medium text-gray-900 text-sm sm:text-base">Income</span>
            </div>
            <span className="font-bold text-green-600 text-sm sm:text-base">₹{totalIncome.toLocaleString()}</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-red-100 rounded-lg">
                <TrendingDown className="w-4 h-4 text-red-600" />
              </div>
              <span className="font-medium text-gray-900 text-sm sm:text-base">Expenses</span>
            </div>
            <span className="font-bold text-red-600 text-sm sm:text-base">₹{totalExpenses.toLocaleString()}</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <DollarSign className="w-4 h-4 text-blue-600" />
              </div>
              <span className="font-medium text-gray-900 text-sm sm:text-base">Savings</span>
            </div>
            <span className={cn(
              "font-bold text-sm sm:text-base",
              netSavings >= 0 ? "text-green-600" : "text-red-600"
            )}>
              ₹{netSavings.toLocaleString()}
            </span>
          </div>
          <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Calendar className="w-4 h-4 text-purple-600" />
              </div>
              <span className="font-medium text-gray-900 text-sm sm:text-base">Transactions</span>
            </div>
            <span className="font-bold text-purple-600 text-sm sm:text-base">{transactionCount}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickStatsCard; 