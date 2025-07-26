import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Transaction } from '@/types';
import { Calendar, ChevronRight, Plus, TrendingUp, TrendingDown, Eye, Filter } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RecentTransactionsCardProps {
  recentTransactions: Transaction[];
  onViewHistory: () => void;
  onAddTransaction: () => void;
}

const RecentTransactionsCard: React.FC<RecentTransactionsCardProps> = ({
  recentTransactions,
  onViewHistory,
  onAddTransaction
}) => {
  return (
    <Card className="border-0 shadow-xl rounded-2xl overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50 border-b border-gray-100">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-indigo-100 rounded-lg">
              <Calendar className="w-5 h-5 text-indigo-600" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900">Recent Transactions</h3>
              <p className="text-sm text-gray-600">Your latest financial activities</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button 
              variant="ghost" 
              size="sm"
              className="text-indigo-600 hover:text-indigo-700"
            >
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={onViewHistory}
              className="text-indigo-600 hover:text-indigo-700"
            >
              View All <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 sm:p-6">
        {recentTransactions.length > 0 ? (
          <div className="space-y-3 sm:space-y-4">
            {recentTransactions.map((transaction) => (
              <div key={transaction.id} className="group flex items-center justify-between p-3 sm:p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition-all duration-200 hover:shadow-md">
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <div className={cn(
                    "p-2 sm:p-3 rounded-full transition-colors",
                    transaction.type === 'income' ? "bg-green-100 group-hover:bg-green-200" : "bg-red-100 group-hover:bg-red-200"
                  )}>
                    {transaction.type === 'income' ? (
                      <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                    ) : (
                      <TrendingDown className="w-4 h-4 sm:w-5 sm:h-5 text-red-600" />
                    )}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 group-hover:text-gray-700 text-sm sm:text-base">{transaction.description}</p>
                    <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-600">
                      <span>{new Date(transaction.date).toLocaleDateString()}</span>
                      <span>•</span>
                      <span className="px-2 py-1 bg-gray-100 rounded-full text-xs">{transaction.category}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <div className="text-right">
                    <p className={cn(
                      "font-bold text-base sm:text-lg",
                      transaction.type === 'income' ? "text-green-600" : "text-red-600"
                    )}>
                      {transaction.type === 'income' ? '+' : '-'}₹{transaction.amount.toLocaleString()}
                    </p>
                  </div>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 sm:py-12">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
              <Plus className="w-8 h-8 sm:w-10 sm:h-10 text-blue-600" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">No transactions yet</h3>
            <p className="text-gray-600 mb-4 sm:mb-6 max-w-md mx-auto text-sm sm:text-base">
              Start tracking your finances by adding your first transaction. 
              It only takes a few seconds to get started!
            </p>
            <Button 
              onClick={onAddTransaction}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 sm:px-8 py-2 sm:py-3 text-base sm:text-lg"
              size="lg"
            >
              <Plus className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
              Add Your First Transaction
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RecentTransactionsCard; 