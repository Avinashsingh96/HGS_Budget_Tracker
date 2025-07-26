import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Category, Transaction } from '@/types';
import { Edit, Trash2, Plus, TrendingUp, TrendingDown, BarChart3 } from 'lucide-react';

interface CategoryListProps {
  categories: Category[];
  transactions: Transaction[];
  onAddCategory: () => void;
  onEditCategory: (category: Category) => void;
  onDeleteCategory: (id: string) => void;
  deletingCategoryId?: string | null;
}

const CategoryList: React.FC<CategoryListProps> = ({
  categories,
  transactions,
  onAddCategory,
  onEditCategory,
  onDeleteCategory,
  deletingCategoryId = null
}) => {
  // Debug: Log categories when they change
  React.useEffect(() => {
    console.log('🔄 CategoryList categories updated:', categories);
  }, [categories]);
  
  const [selectedType, setSelectedType] = useState<'all' | 'income' | 'expense'>('all');

  // Calculate category usage statistics
  const getCategoryStats = (categoryId: string) => {
    const categoryTransactions = transactions.filter(t => {
      const category = categories.find(c => c.id === categoryId);
      return category && t.category === category.name && t.type === category.type;
    });
    
    const totalAmount = categoryTransactions.reduce((sum, t) => sum + t.amount, 0);
    const transactionCount = categoryTransactions.length;
    
    return { totalAmount, transactionCount };
  };

  // Filter categories by type
  const filteredCategories = categories.filter(cat => 
    selectedType === 'all' || cat.type === selectedType
  );

  // Group categories by type
  const incomeCategories = categories.filter(cat => cat.type === 'income');
  const expenseCategories = categories.filter(cat => cat.type === 'expense');

  const handleDeleteCategory = (category: Category) => {
    const stats = getCategoryStats(category.id);
    if (stats.transactionCount > 0) {
      const message = `This category has ${stats.transactionCount} transaction(s) with a total of ₹${stats.totalAmount.toLocaleString()}. Are you sure you want to delete it?`;
      if (!confirm(message)) {
        return;
      }
    }
    onDeleteCategory(category.id);
  };

  return (
    <Card className="bg-white shadow-lg border-0 rounded-xl overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl font-bold text-white flex items-center">
              <BarChart3 className="h-5 w-5 mr-2" />
              Category Management
            </CardTitle>
            <p className="text-purple-100 text-sm mt-1">
              Manage your income and expense categories
            </p>
          </div>
          <Button
            onClick={onAddCategory}
            className="bg-white text-purple-600 hover:bg-purple-50 px-4 py-2 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Category
          </Button>
        </div>
      </CardHeader>

      <CardContent className="p-6">
        {/* Category Type Filter */}
        <div className="flex space-x-2 mb-6">
          <Button
            variant={selectedType === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedType('all')}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
          >
            All ({categories.length})
          </Button>
          <Button
            variant={selectedType === 'income' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedType('income')}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            <TrendingUp className="h-4 w-4 mr-1" />
            Income ({incomeCategories.length})
          </Button>
          <Button
            variant={selectedType === 'expense' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedType('expense')}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            <TrendingDown className="h-4 w-4 mr-1" />
            Expense ({expenseCategories.length})
          </Button>
        </div>

        {/* Categories Grid */}
        {filteredCategories.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📂</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No Categories Found</h3>
            <p className="text-gray-500 mb-4">
              {selectedType === 'all' 
                ? "You haven't created any categories yet." 
                : `No ${selectedType} categories found.`
              }
            </p>
            <Button
              onClick={onAddCategory}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Your First Category
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredCategories.map((category) => {
              const stats = getCategoryStats(category.id);
              return (
                <Card
                  key={category.id}
                  className="border-2 border-gray-100 hover:border-gray-200 transition-all duration-300 hover:shadow-lg transform hover:scale-105"
                  style={{ borderLeftColor: category.color, borderLeftWidth: '4px' }}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div
                          className="w-12 h-12 rounded-full flex items-center justify-center text-xl shadow-md"
                          style={{ backgroundColor: category.color }}
                        >
                          {category.icon}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-800">{category.name}</h3>
                          <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                            category.type === 'income' 
                              ? 'bg-green-100 text-green-700' 
                              : 'bg-red-100 text-red-700'
                          }`}>
                            {category.type}
                          </span>
                        </div>
                      </div>
                      <div className="flex space-x-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onEditCategory(category)}
                          className="h-8 w-8 p-0 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-full"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteCategory(category)}
                          disabled={deletingCategoryId === category.id}
                          className="h-8 w-8 p-0 bg-red-50 hover:bg-red-100 text-red-600 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {deletingCategoryId === category.id ? (
                            <div className="animate-spin rounded-full h-4 w-4 border-2 border-red-600 border-t-transparent"></div>
                          ) : (
                            <Trash2 className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>

                    {/* Category Statistics */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Transactions:</span>
                        <span className="font-medium text-gray-700">{stats.transactionCount}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Total Amount:</span>
                        <span className={`font-semibold ${
                          category.type === 'income' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          ₹{stats.totalAmount.toLocaleString()}
                        </span>
                      </div>
                      {stats.transactionCount > 0 && (
                        <div className="pt-2 border-t border-gray-100">
                          <div className="text-xs text-gray-500">
                            Average: ₹{(stats.totalAmount / stats.transactionCount).toLocaleString()}
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        {/* Summary Stats */}
        {filteredCategories.length > 0 && (
          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-semibold text-gray-700 mb-3">Summary</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="text-gray-500">Total Categories:</span>
                <div className="font-semibold text-gray-700">{filteredCategories.length}</div>
              </div>
              <div>
                <span className="text-gray-500">Total Transactions:</span>
                <div className="font-semibold text-gray-700">
                  {filteredCategories.reduce((sum, cat) => sum + getCategoryStats(cat.id).transactionCount, 0)}
                </div>
              </div>
              <div>
                <span className="text-gray-500">Total Income:</span>
                <div className="font-semibold text-green-600">
                  ₹{filteredCategories
                    .filter(cat => cat.type === 'income')
                    .reduce((sum, cat) => sum + getCategoryStats(cat.id).totalAmount, 0)
                    .toLocaleString()}
                </div>
              </div>
              <div>
                <span className="text-gray-500">Total Expenses:</span>
                <div className="font-semibold text-red-600">
                  ₹{filteredCategories
                    .filter(cat => cat.type === 'expense')
                    .reduce((sum, cat) => sum + getCategoryStats(cat.id).totalAmount, 0)
                    .toLocaleString()}
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CategoryList; 