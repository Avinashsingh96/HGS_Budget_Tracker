import React from 'react';
import AnalyticsDashboard from '@/components/organisms/AnalyticsDashboard';
import { TransactionForm } from '@/components/organisms/TransactionForm';
import { Transaction, Category } from '@/types';
import { ArrowLeft, BarChart3, TrendingUp, DollarSign, TrendingDown, Plus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAppDispatch } from '@/store/hooks';
import { addTransaction } from '@/store/slices/budgetSlice';
import { getGradientClass, getCardBackgroundClass, cn } from '@/lib/utils';

interface AnalyticsPageProps {
  transactions: Transaction[];
  categories: Category[];
  onBack: () => void;
  isTransactionFormOpen?: boolean;
  onCloseTransactionForm?: () => void;
  onAddCategory?: () => void;
}

const AnalyticsPage: React.FC<AnalyticsPageProps> = ({
  transactions,
  categories,
  onBack,
  isTransactionFormOpen = false,
  onCloseTransactionForm,
  onAddCategory
}) => {
  const dispatch = useAppDispatch();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={onBack}
            className="mb-4 text-gray-600 hover:text-gray-900 flex items-center group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Dashboard
          </Button>
          
          <div className="mb-6">
            <h1 className="text-4xl font-bold text-gray-900 mb-3">Financial Analytics</h1>
            <p className="text-gray-600 text-lg leading-relaxed">
              Comprehensive insights into your spending patterns, income trends, and financial health
            </p>
          </div>
        </div>

        {/* Quick Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className={cn(
            "border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]",
            getCardBackgroundClass('income')
          )}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-600 mb-1">Total Income</p>
                  <p className="text-2xl font-bold text-green-800">
                    ₹{transactions
                      .filter(t => t.type === 'income')
                      .reduce((sum, t) => sum + t.amount, 0)
                      .toLocaleString()}
                  </p>
                </div>
                <div className="p-3 bg-green-100 rounded-full">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className={cn(
            "border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]",
            getCardBackgroundClass('expense')
          )}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-red-600 mb-1">Total Expenses</p>
                  <p className="text-2xl font-bold text-red-800">
                    ₹{transactions
                      .filter(t => t.type === 'expense')
                      .reduce((sum, t) => sum + t.amount, 0)
                      .toLocaleString()}
                  </p>
                </div>
                <div className="p-3 bg-red-100 rounded-full">
                  <TrendingDown className="h-6 w-6 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className={cn(
            "border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]",
            getCardBackgroundClass('savings')
          )}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-600 mb-1">Net Balance</p>
                  <p className="text-2xl font-bold text-blue-800">
                    ₹{(transactions
                      .filter(t => t.type === 'income')
                      .reduce((sum, t) => sum + t.amount, 0) -
                      transactions
                      .filter(t => t.type === 'expense')
                      .reduce((sum, t) => sum + t.amount, 0))
                      .toLocaleString()}
                  </p>
                </div>
                <div className="p-3 bg-blue-100 rounded-full">
                  <DollarSign className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className={cn(
            "border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]",
            getCardBackgroundClass('neutral')
          )}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Total Transactions</p>
                  <p className="text-2xl font-bold text-gray-800">
                    {transactions.length}
                  </p>
                </div>
                <div className="p-3 bg-gray-100 rounded-full">
                  <BarChart3 className="h-6 w-6 text-gray-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Analytics Dashboard */}
        <Card className="border-0 shadow-xl rounded-2xl overflow-hidden">
          <CardHeader className={cn(
            "text-white p-8",
            getGradientClass('primary')
          )}>
            <CardTitle className="flex items-center text-2xl font-bold">
              <BarChart3 className="h-8 w-8 mr-3" />
              Financial Analytics Dashboard
            </CardTitle>
            <p className="text-blue-100 mt-2">
              Interactive charts and insights to help you understand your financial patterns
            </p>
          </CardHeader>
          <CardContent className="p-0">
            <AnalyticsDashboard
              transactions={transactions}
              categories={categories}
            />
          </CardContent>
        </Card>

        {/* Transaction Form Modal */}
        {isTransactionFormOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-2 sm:p-4">
            <div className="w-full max-w-2xl bg-white rounded-xl shadow-2xl flex flex-col max-h-[90vh]">
              {/* Sticky Header */}
              <div className="flex items-center justify-between p-4 border-b flex-shrink-0 sticky top-0 bg-white z-10">
                <span className="text-xl font-bold text-blue-700 flex items-center">
                  <span className="mr-2">
                    <Plus className="h-6 w-6 text-blue-700" />
                  </span>
                  Add New Transaction
                </span>
                <Button variant="ghost" size="sm" onClick={() => onCloseTransactionForm?.()} className="text-gray-700 hover:bg-gray-100 rounded-full">
                  <X className="h-5 w-5" />
                </Button>
              </div>
              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto p-4">
                <TransactionForm
                  categories={categories}
                  onSubmit={(newTransaction) => {
                    dispatch(addTransaction(newTransaction));
                    onCloseTransactionForm?.();
                  }}
                  onCancel={() => onCloseTransactionForm?.()}
                  onAddCategory={onAddCategory}
                  hideHeader={true}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnalyticsPage; 