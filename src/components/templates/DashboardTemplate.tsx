import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TransactionForm } from '@/components/organisms/TransactionForm';
import SummaryCard from '@/components/molecules/SummaryCard';
import TransactionItem from '@/components/molecules/TransactionItem';
import { Transaction, Category, BudgetSummary } from '@/types';
import { Plus, TrendingUp, TrendingDown, DollarSign, History, Settings, BarChart3, HelpCircle, Keyboard, Pencil, X } from 'lucide-react';
import { PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

interface DashboardTemplateProps {
  transactions: Transaction[];
  categories: Category[];
  summary: BudgetSummary;
  user: { name: string } | null;
  onAddTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  onEditTransaction: (transaction: Transaction) => void;
  onDeleteTransaction: (id: string) => void;
  onNavigateToCategories: () => void;
  onNavigateToHistory: () => void;
  onNavigateToAnalytics: () => void;
  onOpenSettings: () => void;
  onOpenHelp: () => void;
  onOpenKeyboardShortcuts: () => void;
}

export const DashboardTemplate: React.FC<DashboardTemplateProps> = ({
  transactions,
  categories,
  summary,
  user,
  onAddTransaction,
  onEditTransaction,
  onDeleteTransaction,
  onNavigateToCategories,
  onNavigateToHistory,
  onNavigateToAnalytics,
  onOpenSettings,
  onOpenHelp,
  onOpenKeyboardShortcuts,
}) => {
  // Debug: Log categories when they change
  React.useEffect(() => {
    console.log('🔄 Dashboard categories updated:', categories);
  }, [categories]);
  const [showForm, setShowForm] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
  const [showCharts, setShowCharts] = useState(false);

  const handleEdit = (transaction: Transaction) => {
    setEditingTransaction(transaction);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      onDeleteTransaction(id);
    }
  };

  const handleFormSubmit = (transaction: Omit<Transaction, 'id'>) => {
    if (editingTransaction) {
      onEditTransaction({ ...transaction, id: editingTransaction.id });
    } else {
      onAddTransaction(transaction);
    }
    setShowForm(false);
    setEditingTransaction(null);
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingTransaction(null);
  };

  // Prepare chart data
  const expenseData = categories
    .filter(cat => cat.type === 'expense')
    .map(category => {
      const total = transactions
        .filter(t => t.category === category.name && t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0);
      return {
        name: category.name,
        value: total,
        icon: category.icon,
      };
    })
    .filter(item => item.value > 0);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center space-x-4 mb-4">
            <h1 className="text-4xl font-bold text-gray-800 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Mini Budget Planner
            </h1>
            <div className="flex space-x-2">
              <Button
                onClick={onOpenKeyboardShortcuts}
                variant="ghost"
                size="sm"
                className="text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-full"
                title="Keyboard Shortcuts (⌘ + /)"
              >
                <Keyboard className="h-4 w-4" />
              </Button>
              <Button
                onClick={onOpenHelp}
                variant="ghost"
                size="sm"
                className="text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-full"
                title="Help & Tutorial"
              >
                <HelpCircle className="h-4 w-4" />
              </Button>
              <Button
                onClick={onOpenSettings}
                variant="ghost"
                size="sm"
                className="text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-full"
                title="Settings (⌘ + ,)"
              >
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
          {user && (
            <p className="text-gray-600 text-lg">
              Welcome back, <span className="font-semibold text-blue-600">{user.name}</span>
            </p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="mb-8 text-center space-y-4">
          <div>
            <Button
              onClick={() => setShowForm(true)}
              className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              size="lg"
            >
              <Plus className="h-5 w-5" />
              <span className="text-lg font-semibold">Add Transaction</span>
            </Button>
          </div>
          <div className="flex justify-center space-x-4">
            <Button
              onClick={onNavigateToHistory}
              variant="outline"
              className="flex items-center space-x-2 border-2 border-indigo-300 hover:border-indigo-400 text-indigo-600 hover:text-indigo-700 px-6 py-2 rounded-full shadow-md hover:shadow-lg transition-all duration-300"
            >
              <History className="h-4 w-4" />
              <span className="font-semibold">Transaction History</span>
            </Button>
            <Button
              onClick={onNavigateToAnalytics}
              variant="outline"
              className="flex items-center space-x-2 border-2 border-green-300 hover:border-green-400 text-green-600 hover:text-green-700 px-6 py-2 rounded-full shadow-md hover:shadow-lg transition-all duration-300"
            >
              <TrendingUp className="h-4 w-4" />
              <span className="font-semibold">Analytics & Goals</span>
            </Button>
            <Button
              onClick={onNavigateToCategories}
              variant="outline"
              className="flex items-center space-x-2 border-2 border-purple-300 hover:border-purple-400 text-purple-600 hover:text-purple-700 px-6 py-2 rounded-full shadow-md hover:shadow-lg transition-all duration-300"
            >
              <Settings className="h-4 w-4" />
              <span className="font-semibold">Manage Categories</span>
            </Button>
          </div>
        </div>

        {/* Transaction Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-2 sm:p-4 backdrop-blur-sm">
            <div className="w-full max-w-2xl bg-white rounded-xl shadow-2xl flex flex-col max-h-[90vh]">
              {/* Sticky Header */}
              <div className="flex items-center justify-between p-4 border-b flex-shrink-0 sticky top-0 bg-white z-10">
                <span className="text-xl font-bold text-blue-700 flex items-center">
                  <span className="mr-2">
                    {editingTransaction ? (
                      <Pencil className="h-6 w-6 text-blue-700" />
                    ) : (
                      <Plus className="h-6 w-6 text-blue-700" />
                    )}
                  </span>
                  {editingTransaction ? 'Edit Transaction' : 'Add New Transaction'}
                </span>
                <Button variant="ghost" size="sm" onClick={handleFormCancel} className="text-gray-700 hover:bg-gray-100 rounded-full">
                  <X className="h-5 w-5" />
                </Button>
              </div>
              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto p-4">
                <TransactionForm
                  categories={categories}
                  onSubmit={handleFormSubmit}
                  onCancel={handleFormCancel}
                  transaction={editingTransaction || undefined}
                  isEditing={!!editingTransaction}
                  hideHeader={true}
                />
              </div>
            </div>
          </div>
        )}

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <SummaryCard
            title="Total Income"
            amount={summary.totalIncome}
            trend="up"
            trendValue={12.5}
            icon={<TrendingUp className="w-5 h-5" />}
            color="income"
            subtitle="Your total earnings"
          />
          <SummaryCard
            title="Total Expenses"
            amount={summary.totalExpenses}
            trend="down"
            trendValue={8.2}
            icon={<TrendingDown className="w-5 h-5" />}
            color="expense"
            subtitle="Your total spending"
          />
          <SummaryCard
            title="Balance"
            amount={summary.balance}
            trend={summary.balance >= 0 ? "up" : "down"}
            trendValue={summary.balance >= 0 ? 15.3 : -5.2}
            icon={<DollarSign className="w-5 h-5" />}
            color={summary.balance >= 0 ? "savings" : "expense"}
            subtitle={summary.balance >= 0 ? "You're in the green!" : "Time to save more"}
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Transactions */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
              </CardHeader>
              <CardContent>
                {transactions.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">
                    No transactions yet. Add your first transaction to get started!
                  </p>
                ) : (
                  <div className="space-y-2">
                    {[...transactions]
                      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                      .slice(0, 10)
                      .map((transaction) => (
                        <TransactionItem
                          key={transaction.id}
                          transaction={transaction}
                          onEdit={handleEdit}
                          onDelete={handleDelete}
                        />
                      ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Breakdown/Charts */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Breakdown
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowCharts(!showCharts)}
                  >
                    {showCharts ? <BarChart3 className="h-4 w-4" /> : <RechartsPieChart className="h-4 w-4" />}
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {showCharts && expenseData.length > 0 ? (
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPieChart>
                        <Pie
                          data={expenseData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {expenseData.map((_, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => [`₹${value}`, 'Amount']} />
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {expenseData.length > 0 ? (
                      expenseData.map((item, _) => (
                        <div key={item.name} className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <span>{item.icon}</span>
                            <span className="text-sm">{item.name}</span>
                          </div>
                          <span className="text-sm font-medium">
                            ₹{item.value.toLocaleString()}
                          </span>
                        </div>
                      ))
                    ) : (
                      <p className="text-muted-foreground text-center py-8">
                        No expense data to display
                      </p>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}; 