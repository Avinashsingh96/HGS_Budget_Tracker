import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Transaction, Category } from '@/types';
import { Search, Filter, X, Calendar, DollarSign, Tag } from 'lucide-react';

interface TransactionSearchProps {
  transactions: Transaction[];
  categories: Category[];
  onFilterChange: (filteredTransactions: Transaction[]) => void;
}

interface FilterState {
  searchTerm: string;
  type: 'all' | 'income' | 'expense';
  category: string;
  minAmount: string;
  maxAmount: string;
  startDate: string;
  endDate: string;
  sortBy: 'date' | 'amount' | 'description';
  sortOrder: 'asc' | 'desc';
}

const TransactionSearch: React.FC<TransactionSearchProps> = ({
  transactions,
  categories,
  onFilterChange
}) => {
  const [filters, setFilters] = useState<FilterState>({
    searchTerm: '',
    type: 'all',
    category: 'all',
    minAmount: '',
    maxAmount: '',
    startDate: '',
    endDate: '',
    sortBy: 'date',
    sortOrder: 'desc'
  });

  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  // Apply filters and update parent component
  useEffect(() => {
    let filtered = [...transactions];

    // Search term filter
    if (filters.searchTerm) {
      const searchLower = filters.searchTerm.toLowerCase();
      filtered = filtered.filter(t => 
        t.description.toLowerCase().includes(searchLower) ||
        t.category.toLowerCase().includes(searchLower) ||
        t.amount.toString().includes(searchLower)
      );
    }

    // Type filter
    if (filters.type !== 'all') {
      filtered = filtered.filter(t => t.type === filters.type);
    }

    // Category filter
    if (filters.category !== 'all') {
      filtered = filtered.filter(t => t.category === filters.category);
    }

    // Amount range filter
    if (filters.minAmount) {
      filtered = filtered.filter(t => t.amount >= parseFloat(filters.minAmount));
    }
    if (filters.maxAmount) {
      filtered = filtered.filter(t => t.amount <= parseFloat(filters.maxAmount));
    }

    // Date range filter
    if (filters.startDate) {
      filtered = filtered.filter(t => t.date >= filters.startDate);
    }
    if (filters.endDate) {
      filtered = filtered.filter(t => t.date <= filters.endDate);
    }

    // Sort transactions
    filtered.sort((a, b) => {
      let aValue: any, bValue: any;

      switch (filters.sortBy) {
        case 'date':
          aValue = new Date(a.date).getTime();
          bValue = new Date(b.date).getTime();
          break;
        case 'amount':
          aValue = a.amount;
          bValue = b.amount;
          break;
        case 'description':
          aValue = a.description.toLowerCase();
          bValue = b.description.toLowerCase();
          break;
        default:
          aValue = new Date(a.date).getTime();
          bValue = new Date(b.date).getTime();
      }

      if (filters.sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    onFilterChange(filtered);
  }, [filters, transactions, onFilterChange]);

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      searchTerm: '',
      type: 'all',
      category: 'all',
      minAmount: '',
      maxAmount: '',
      startDate: '',
      endDate: '',
      sortBy: 'date',
      sortOrder: 'desc'
    });
  };

  const hasActiveFilters = Object.values(filters).some(value => 
    value !== '' && value !== 'all' && value !== 'date' && value !== 'desc'
  );

  // Get filtered categories based on type
  const filteredCategories = categories.filter(cat => 
    filters.type === 'all' || cat.type === filters.type
  );

  return (
    <Card className="bg-white shadow-lg border-0 rounded-xl overflow-hidden mb-6">
      <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl font-bold text-white flex items-center">
              <Search className="h-5 w-5 mr-2" />
              Search & Filter Transactions
            </CardTitle>
            <p className="text-blue-100 text-sm mt-1">
              Find and organize your transactions
            </p>
          </div>
          <div className="flex space-x-2">
            <Button
              onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
              variant="outline"
              size="sm"
              className="bg-white/20 text-white border-white/30 hover:bg-white/30"
            >
              <Filter className="h-4 w-4 mr-2" />
              {showAdvancedFilters ? 'Hide' : 'Show'} Filters
            </Button>
            {hasActiveFilters && (
              <Button
                onClick={clearFilters}
                variant="outline"
                size="sm"
                className="bg-red-500/20 text-white border-red-300 hover:bg-red-500/30"
              >
                <X className="h-4 w-4 mr-2" />
                Clear All
              </Button>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6">
        {/* Basic Search */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              value={filters.searchTerm}
              onChange={(e) => handleFilterChange('searchTerm', e.target.value)}
              placeholder="Search transactions by description, category, or amount..."
              className="pl-10 h-12 border-2 border-gray-200 hover:border-blue-300 focus:border-blue-500 rounded-lg"
            />
          </div>
        </div>

        {/* Advanced Filters */}
        {showAdvancedFilters && (
          <div className="space-y-6">
            {/* First Row - Type and Category */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 flex items-center">
                  <Tag className="h-4 w-4 mr-2" />
                  Transaction Type
                </label>
                <Select
                  value={filters.type}
                  onValueChange={(value: 'all' | 'income' | 'expense') => 
                    handleFilterChange('type', value)
                  }
                >
                  <SelectTrigger className="h-10 border-2 border-gray-200 hover:border-blue-300 focus:border-blue-500 rounded-lg">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="income">💰 Income</SelectItem>
                    <SelectItem value="expense">💸 Expense</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 flex items-center">
                  <Tag className="h-4 w-4 mr-2" />
                  Category
                </label>
                <Select
                  value={filters.category}
                  onValueChange={(value) => handleFilterChange('category', value)}
                >
                  <SelectTrigger className="h-10 border-2 border-gray-200 hover:border-blue-300 focus:border-blue-500 rounded-lg">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {filteredCategories.map((category) => (
                      <SelectItem key={category.id} value={category.name}>
                        <span className="mr-2">{category.icon}</span>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Second Row - Amount Range */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 flex items-center">
                  <DollarSign className="h-4 w-4 mr-2" />
                  Minimum Amount
                </label>
                <Input
                  type="number"
                  value={filters.minAmount}
                  onChange={(e) => handleFilterChange('minAmount', e.target.value)}
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                  className="h-10 border-2 border-gray-200 hover:border-blue-300 focus:border-blue-500 rounded-lg"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 flex items-center">
                  <DollarSign className="h-4 w-4 mr-2" />
                  Maximum Amount
                </label>
                <Input
                  type="number"
                  value={filters.maxAmount}
                  onChange={(e) => handleFilterChange('maxAmount', e.target.value)}
                  placeholder="10000.00"
                  min="0"
                  step="0.01"
                  className="h-10 border-2 border-gray-200 hover:border-blue-300 focus:border-blue-500 rounded-lg"
                />
              </div>
            </div>

            {/* Third Row - Date Range */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  Start Date
                </label>
                <Input
                  type="date"
                  value={filters.startDate}
                  onChange={(e) => handleFilterChange('startDate', e.target.value)}
                  className="h-10 border-2 border-gray-200 hover:border-blue-300 focus:border-blue-500 rounded-lg"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  End Date
                </label>
                <Input
                  type="date"
                  value={filters.endDate}
                  onChange={(e) => handleFilterChange('endDate', e.target.value)}
                  className="h-10 border-2 border-gray-200 hover:border-blue-300 focus:border-blue-500 rounded-lg"
                />
              </div>
            </div>

            {/* Fourth Row - Sort Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Sort By</label>
                <Select
                  value={filters.sortBy}
                  onValueChange={(value: 'date' | 'amount' | 'description') => 
                    handleFilterChange('sortBy', value)
                  }
                >
                  <SelectTrigger className="h-10 border-2 border-gray-200 hover:border-blue-300 focus:border-blue-500 rounded-lg">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="date">Date</SelectItem>
                    <SelectItem value="amount">Amount</SelectItem>
                    <SelectItem value="description">Description</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Sort Order</label>
                <Select
                  value={filters.sortOrder}
                  onValueChange={(value: 'asc' | 'desc') => 
                    handleFilterChange('sortOrder', value)
                  }
                >
                  <SelectTrigger className="h-10 border-2 border-gray-200 hover:border-blue-300 focus:border-blue-500 rounded-lg">
                    <SelectValue placeholder="Sort order" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="desc">Newest/High to Low</SelectItem>
                    <SelectItem value="asc">Oldest/Low to High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )}

        {/* Active Filters Summary */}
        {hasActiveFilters && (
          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h4 className="text-sm font-semibold text-blue-800 mb-2">Active Filters:</h4>
            <div className="flex flex-wrap gap-2">
              {filters.searchTerm && (
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                  Search: "{filters.searchTerm}"
                </span>
              )}
              {filters.type !== 'all' && (
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                  Type: {filters.type}
                </span>
              )}
              {filters.category !== 'all' && (
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                  Category: {filters.category}
                </span>
              )}
              {(filters.minAmount || filters.maxAmount) && (
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                  Amount: ₹{filters.minAmount || '0'} - ₹{filters.maxAmount || '∞'}
                </span>
              )}
              {(filters.startDate || filters.endDate) && (
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                  Date: {filters.startDate || '∞'} to {filters.endDate || '∞'}
                </span>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TransactionSearch; 