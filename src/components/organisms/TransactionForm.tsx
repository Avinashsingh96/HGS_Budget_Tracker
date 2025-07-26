import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Transaction, Category } from '@/types';
import { Plus, X } from 'lucide-react';

interface TransactionFormProps {
  categories: Category[];
  onSubmit: (transaction: Omit<Transaction, 'id'>) => void;
  onCancel: () => void;
  transaction?: Transaction;
  isEditing?: boolean;
}

const defaultIcons = {
  income: ['💰', '💵', '🏦', '📈', '🎯'],
  expense: ['🏠', '🛒', '☕', '🚗', '🎬', '🍕', '💊', '📚', '🎮', '✈️']
};

export const TransactionForm: React.FC<TransactionFormProps> = ({
  categories,
  onSubmit,
  onCancel,
  transaction,
  isEditing = false
}) => {
  const [formData, setFormData] = useState({
    type: transaction?.type || 'expense',
    amount: transaction?.amount || 0,
    category: transaction?.category || 'no-category',
    description: transaction?.description || '',
    date: transaction?.date || new Date().toISOString().split('T')[0],
    icon: transaction?.icon || '💰'
  });

  // Debug: Log categories when they change
  React.useEffect(() => {
    console.log('🔄 TransactionForm categories updated:', categories);
    console.log('🔄 Filtered categories for type', formData.type, ':', categories.filter(cat => cat.type === formData.type));
  }, [categories, formData.type]);

  const [showIconSelector, setShowIconSelector] = useState(false);

  const filteredCategories = categories.filter(cat => cat.type === formData.type && cat.name && cat.name.trim() !== '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.category || formData.category === 'no-category' || !formData.description || formData.amount <= 0) {
      return;
    }
    // Ensure we don't submit with invalid category
    const cleanFormData = {
      ...formData,
      category: formData.category === 'no-category' ? '' : formData.category
    };
    onSubmit(cleanFormData);
  };

  const handleIconSelect = (icon: string) => {
    setFormData(prev => ({ ...prev, icon }));
    setShowIconSelector(false);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto bg-white shadow-2xl border-0 rounded-xl overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8">
        <CardTitle className="flex items-center justify-between text-white">
          <span className="text-2xl font-bold">
            {isEditing ? '✏️ Edit Transaction' : '➕ Add New Transaction'}
          </span>
          <Button variant="ghost" size="sm" onClick={onCancel} className="text-white hover:bg-white/20 rounded-full">
            <X className="h-6 w-6" />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-8 bg-white">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* First Row - Type and Icon */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <label className="text-sm font-semibold text-gray-700">Transaction Type</label>
              <Select
                value={formData.type}
                onValueChange={(value: 'income' | 'expense') =>
                  setFormData(prev => ({ ...prev, type: value, category: '', icon: value === 'income' ? '💰' : '🏠' }))
                }
              >
                <SelectTrigger className="h-12 border-2 border-gray-200 hover:border-blue-300 focus:border-blue-500 rounded-lg">
                  <SelectValue placeholder="Select transaction type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="income">💰 Income</SelectItem>
                  <SelectItem value="expense">💸 Expense</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-semibold text-gray-700">Icon</label>
              <div className="relative">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full justify-start h-12 border-2 border-gray-200 hover:border-blue-300 focus:border-blue-500 rounded-lg"
                  onClick={() => setShowIconSelector(!showIconSelector)}
                >
                  <span className="mr-2 text-lg">{formData.icon}</span>
                  <span className="font-medium">Select Icon</span>
                </Button>
                {showIconSelector && (
                  <div className="absolute top-full left-0 right-0 mt-1 p-4 bg-white border-2 border-gray-200 rounded-lg shadow-xl z-10">
                    <div className="grid grid-cols-6 gap-3">
                      {(formData.type === 'income' ? defaultIcons.income : defaultIcons.expense).map((icon) => (
                        <button
                          key={icon}
                          type="button"
                          className="p-3 hover:bg-blue-50 rounded-lg text-xl transition-colors"
                          onClick={() => handleIconSelect(icon)}
                        >
                          {icon}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Second Row - Category and Description */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <label className="text-sm font-semibold text-gray-700">Category</label>
              {categories.length === 0 ? (
                <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg text-center">
                  <div className="text-gray-500 mb-2">No categories created yet</div>
                  <div className="text-sm text-gray-400 mb-3">
                    You need to create categories before adding transactions
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      // This will be handled by the parent component
                      onCancel();
                    }}
                    className="text-blue-600 border-blue-300 hover:bg-blue-50"
                  >
                    Go to Category Management
                  </Button>
                </div>
              ) : (
                <Select
                  value={formData.category === 'no-category' ? '' : formData.category}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
                >
                <SelectTrigger className="h-12 border-2 border-gray-200 hover:border-blue-300 focus:border-blue-500 rounded-lg">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {filteredCategories.length > 0 ? (
                    filteredCategories.map((category) => (
                      <SelectItem key={category.id} value={category.name || `category-${category.id}`} className="py-3">
                        <span className="text-lg mr-2">{category.icon}</span>
                        <span className="font-medium">{category.name || 'Unnamed Category'}</span>
                      </SelectItem>
                    ))
                  ) : (
                    <div className="p-3 text-center">
                      <div className="text-gray-500 mb-2">No {formData.type} categories available</div>
                      <div className="text-sm text-gray-400">
                        Create categories first in Category Management
                      </div>
                    </div>
                  )}
                </SelectContent>
              </Select>
              )}
            </div>

            <div className="space-y-3">
              <label className="text-sm font-semibold text-gray-700">Description</label>
              <Input
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Enter description"
                className="h-12 border-2 border-gray-200 hover:border-blue-300 focus:border-blue-500 rounded-lg"
                required
              />
            </div>
          </div>

          {/* Third Row - Amount and Date */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <label className="text-sm font-semibold text-gray-700">Amount (₹)</label>
              <Input
                type="number"
                value={formData.amount}
                onChange={(e) => setFormData(prev => ({ ...prev, amount: parseFloat(e.target.value) || 0 }))}
                placeholder="0.00"
                min="0"
                step="0.01"
                className="h-12 border-2 border-gray-200 hover:border-blue-300 focus:border-blue-500 rounded-lg"
                required
              />
            </div>

            <div className="space-y-3">
              <label className="text-sm font-semibold text-gray-700">Date</label>
              <Input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                className="h-12 border-2 border-gray-200 hover:border-blue-300 focus:border-blue-500 rounded-lg"
                required
              />
            </div>
          </div>

          <div className="flex space-x-4 pt-8">
            <Button 
              type="submit" 
              className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-4 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 text-lg"
            >
              <Plus className="h-6 w-6 mr-3" />
              {isEditing ? 'Update' : 'Add'} Transaction
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              onClick={onCancel}
              className="px-8 py-4 border-2 border-gray-300 hover:border-gray-400 rounded-lg font-semibold transition-all duration-300 text-lg"
            >
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}; 