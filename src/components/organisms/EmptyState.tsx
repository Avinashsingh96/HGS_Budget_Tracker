import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Plus, FolderOpen, TrendingUp, Settings } from 'lucide-react';

interface EmptyStateProps {
  onAddTransaction: () => void;
  onNavigateToCategories: () => void;
  onNavigateToAnalytics: () => void;
  onOpenSettings: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  onAddTransaction,
  onNavigateToCategories,
  onNavigateToAnalytics,
  onOpenSettings
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-2xl mx-auto text-center">
        {/* Main Empty State */}
        <div className="mb-8">
          <div className="text-8xl mb-6">📊</div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to Budget Tracker</h1>
          <p className="text-xl text-gray-600 mb-8">
            Start managing your finances by creating your first categories and transactions.
          </p>
        </div>

        {/* Quick Start Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={onNavigateToCategories}>
            <CardContent className="p-6 text-center">
              <FolderOpen className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Create Categories</h3>
              <p className="text-gray-600 mb-4">
                Set up income and expense categories to organize your finances
              </p>
              <div className="flex justify-center space-x-2 text-sm">
                <span className="px-2 py-1 bg-green-100 text-green-700 rounded">Income</span>
                <span className="px-2 py-1 bg-red-100 text-red-700 rounded">Expenses</span>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={onAddTransaction}>
            <CardContent className="p-6 text-center">
              <Plus className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Add Transactions</h3>
              <p className="text-gray-600 mb-4">
                Record your income and expenses to start tracking your money
              </p>
              <div className="flex justify-center space-x-2 text-sm">
                <span className="px-2 py-1 bg-green-100 text-green-700 rounded">+ Income</span>
                <span className="px-2 py-1 bg-red-100 text-red-700 rounded">- Expenses</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <Button 
            size="lg" 
            onClick={onAddTransaction}
            className="w-full md:w-auto px-8 py-3 text-lg"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Your First Transaction
          </Button>
          
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button 
              variant="outline" 
              onClick={onNavigateToCategories}
              className="flex items-center"
            >
                             <FolderOpen className="w-4 h-4 mr-2" />
              Manage Categories
            </Button>
            
            <Button 
              variant="outline" 
              onClick={onNavigateToAnalytics}
              className="flex items-center"
            >
              <TrendingUp className="w-4 h-4 mr-2" />
              View Analytics
            </Button>
            
            <Button 
              variant="outline" 
              onClick={onOpenSettings}
              className="flex items-center"
            >
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>

        {/* Tips Section */}
        <div className="mt-12 p-6 bg-white rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-4">💡 Getting Started Tips</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="text-center">
              <div className="text-2xl mb-2">📂</div>
              <div className="font-medium">1. Create Categories</div>
              <div className="text-gray-600">Organize your finances</div>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-2">📝</div>
              <div className="font-medium">2. Add Transactions</div>
              <div className="text-gray-600">Track your money flow</div>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-2">📊</div>
              <div className="font-medium">3. View Insights</div>
              <div className="text-gray-600">Analyze your patterns</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 