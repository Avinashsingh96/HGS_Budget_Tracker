/**
 * Home Page Component
 * 
 * This is the main dashboard/home page that provides users with:
 * - Quick overview of financial status
 * - Recent transactions
 * - Budget progress
 * - Quick actions
 * - Financial insights and tips
 * 
 * Features:
 * - Responsive grid layout
 * - Real-time data updates
 * - Interactive charts and progress indicators
 * - Quick action buttons for common tasks
 */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { Button } from '@/components/ui/button';
import { TransactionForm } from '@/components/organisms/TransactionForm';
import CategoryForm from '@/components/organisms/CategoryForm';
import { addTransaction, addCustomCategory } from '@/store/slices/budgetSlice';
import { Category } from '@/types';
import { 
  Plus, 
  BarChart3,
  Calendar,
  Settings,
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Target,
  ChevronRight,
  X
} from 'lucide-react';

import SummaryCard from '@/components/molecules/SummaryCard';
import QuickAction from '@/components/molecules/QuickAction';
import DashboardHeader from '@/components/organisms/DashboardHeader';
import RecentTransactionsCard from '@/components/organisms/RecentTransactionsCard';
import TopSpendingCategoriesCard from '@/components/organisms/TopSpendingCategoriesCard';
import QuickStatsCard from '@/components/organisms/QuickStatsCard';
import FinancialHealthCard from '@/components/organisms/FinancialHealthCard';
import FinancialInsightsCard from '@/components/organisms/FinancialInsightsCard';
import { useFinancialMetrics } from '@/hooks/useFinancialMetrics';

/**
 * Enhanced Home Page Component
 */
interface HomePageProps {
  isTransactionFormOpen?: boolean;
  onCloseTransactionForm?: () => void;
  onAddTransaction?: () => void;
  onAddCategory?: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ 
  isTransactionFormOpen = false, 
  onCloseTransactionForm,
  onAddTransaction,
  onAddCategory
}) => {
  const navigate = useNavigate();
  const { transactions, categories } = useAppSelector(state => state.budget);
  const dispatch = useAppDispatch();
  const [isCategoryFormOpen, setIsCategoryFormOpen] = useState(false);
  
  // Debug: Log category modal state changes
  useEffect(() => {
    console.log('🔄 isCategoryFormOpen state changed:', isCategoryFormOpen);
  }, [isCategoryFormOpen]);
  
  // Use custom hook for financial calculations
  const {
    totalIncome,
    totalExpenses,
    netSavings,
    recentTransactions,
    budgetProgress,
    topCategories,
    insights,
    transactionCount
  } = useFinancialMetrics(transactions, categories);

  // Navigation handlers
  const handleAddTransaction = () => {
    console.log('🔄 handleAddTransaction called from QuickAction');
    onAddTransaction?.();
  };
  const handleViewAnalytics = () => navigate('/analytics');
  const handleManageCategories = () => navigate('/categories');
  const handleViewHistory = () => navigate('/transactions');
  
  // Category form handlers
  const handleAddCategory = () => {
    console.log('🔄 handleAddCategory called, setting isCategoryFormOpen to true');
    setIsCategoryFormOpen(true);
  };
  
  const handleCategorySubmit = async (categoryData: Omit<Category, 'id'>) => {
    try {
      console.log('🔄 handleCategorySubmit called, submitting category:', categoryData);
      await dispatch(addCustomCategory(categoryData)).unwrap();
      console.log('🔄 Category submitted successfully, closing modal');
      setIsCategoryFormOpen(false);
    } catch (error) {
      console.error('Error adding category:', error);
      alert('Failed to add category. Please try again.');
    }
  };

  const handleCategoryCancel = () => {
    console.log('🔄 handleCategoryCancel called, closing modal');
    setIsCategoryFormOpen(false);
  };

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6 lg:space-y-8">
      {/* Enhanced Header */}
      <DashboardHeader
        totalIncome={totalIncome}
        totalExpenses={totalExpenses}
        netSavings={netSavings}
        transactionCount={transactionCount}
      />

      {/* Quick Actions Grid */}
      <div>
        <div className="flex items-center justify-between mb-4 lg:mb-6">
        <div>
            <h2 className="text-xl lg:text-2xl xl:text-3xl font-bold text-gray-900 mb-1 lg:mb-2">Quick Actions</h2>
            <p className="text-gray-600 text-sm lg:text-base xl:text-lg">Get started with these common tasks</p>
        </div>
          <Button variant="outline" size="sm" className="text-blue-600 hover:text-blue-700">
          <Settings className="w-4 h-4 mr-2" />
            Customize
        </Button>
      </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        <QuickAction
          icon={<Plus className="w-6 h-6" />}
          title="Add Transaction"
            description="Record new income or expense with detailed categorization"
          onClick={handleAddTransaction}
          variant="primary"
            badge={transactions.length === 0 ? "New" : undefined}
            stats={`${transactions.length} total`}
        />
        <QuickAction
          icon={<BarChart3 className="w-6 h-6" />}
          title="View Analytics"
            description="Explore detailed insights and spending patterns"
          onClick={handleViewAnalytics}
            variant="premium"
            stats="Advanced"
        />
        <QuickAction
          icon={<Calendar className="w-6 h-6" />}
          title="Transaction History"
            description="Browse and manage all your financial records"
          onClick={handleViewHistory}
            variant="secondary"
            stats={`${transactions.length} items`}
        />
        <QuickAction
          icon={<Settings className="w-6 h-6" />}
          title="Manage Categories"
            description="Organize your spending with custom categories"
          onClick={handleManageCategories}
            variant="success"
            stats={`${categories.length} categories`}
        />
        </div>
      </div>

      {/* Enhanced Financial Summary Cards */}
      <div>
        <div className="flex items-center justify-between mb-4 lg:mb-6">
          <div>
            <h2 className="text-xl lg:text-2xl xl:text-3xl font-bold text-gray-900 mb-1 lg:mb-2">Financial Overview</h2>
            <p className="text-gray-600 text-sm lg:text-base xl:text-lg">Your key financial metrics at a glance</p>
          </div>
          <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
            View Details <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
        <SummaryCard
          title="Total Income"
          amount={totalIncome}
          trend="up"
          trendValue={12.5}
          icon={<TrendingUp className="w-5 h-5" />}
            color="income"
            subtitle="This month"
            progress={totalIncome > 0 ? Math.min(100, (totalIncome / 10000) * 100) : 0}
        />
        <SummaryCard
          title="Total Expenses"
          amount={totalExpenses}
          trend="down"
          trendValue={8.2}
          icon={<TrendingDown className="w-5 h-5" />}
            color="expense"
            subtitle="This month"
            progress={totalIncome > 0 ? Math.min(100, (totalExpenses / totalIncome) * 100) : 0}
        />
        <SummaryCard
          title="Net Savings"
          amount={netSavings}
          trend={netSavings >= 0 ? "up" : "down"}
          trendValue={netSavings >= 0 ? 15.3 : -5.2}
          icon={<DollarSign className="w-5 h-5" />}
            color={netSavings >= 0 ? "savings" : "expense"}
            subtitle="This month"
            progress={netSavings >= 0 ? Math.min(100, (netSavings / Math.max(totalIncome, 1)) * 100) : 0}
          />
          <SummaryCard
            title="Budget Progress"
            amount={budgetProgress}
            trend={budgetProgress > 100 ? "down" : "up"}
            trendValue={budgetProgress > 100 ? -12.5 : 8.3}
            icon={<Target className="w-5 h-5" />}
            color={budgetProgress > 100 ? "warning" : "success"}
            subtitle="This month"
            progress={Math.min(100, budgetProgress)}
          />
        </div>
      </div>

      {/* Enhanced Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
        {/* Enhanced Recent Transactions */}
        <div className="lg:col-span-2 xl:col-span-2 space-y-4 lg:space-y-6">
          {/* Recent Transactions Card */}
          <RecentTransactionsCard
            recentTransactions={recentTransactions}
            onViewHistory={handleViewHistory}
            onAddTransaction={handleAddTransaction}
          />

          {/* Spending by Category Card */}
          <TopSpendingCategoriesCard
            topCategories={topCategories}
            totalExpenses={totalExpenses}
          />
        </div>

        {/* Enhanced Sidebar Content */}
        <div className="lg:col-span-1 xl:col-span-2 space-y-4 lg:space-y-6">
          {/* Quick Stats Card - Moved to top for better visibility */}
          <QuickStatsCard
            totalIncome={totalIncome}
            totalExpenses={totalExpenses}
            netSavings={netSavings}
            transactionCount={transactionCount}
          />

          {/* Enhanced Financial Health Score - Simplified */}
          <FinancialHealthCard
            budgetProgress={budgetProgress}
            transactionCount={transactionCount}
            onViewAnalytics={handleViewAnalytics}
          />

          {/* Enhanced Financial Insights - Simplified */}
          <FinancialInsightsCard
            insights={insights}
            onAddTransaction={handleAddTransaction}
                  />
        </div>
      </div>

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
                hideHeader={true}
                onAddCategory={onAddCategory}
              />
            </div>
          </div>
        </div>
      )}

      {/* Category Form Modal */}
      {isCategoryFormOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black bg-opacity-50 p-2 sm:p-4" onClick={handleCategoryCancel}>
          <div className="w-full max-w-md bg-white rounded-xl shadow-2xl flex flex-col max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
            {/* Sticky Header */}
            <div className="flex items-center justify-between p-4 border-b flex-shrink-0 sticky top-0 bg-white z-10">
              <span className="text-xl font-bold text-green-700 flex items-center">
                <span className="mr-2">
                  <Plus className="h-6 w-6 text-green-700" />
                </span>
                Add New Category
              </span>
              <Button variant="ghost" size="sm" onClick={handleCategoryCancel} className="text-gray-700 hover:bg-gray-100 rounded-full">
                <X className="h-5 w-5" />
              </Button>
            </div>
            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-4">
              <CategoryForm
                key={`category-form-${isCategoryFormOpen}`}
                onSubmit={handleCategorySubmit}
                onCancel={handleCategoryCancel}
                hideHeader={true}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage; 