import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Category } from '@/types';
import { PieChart } from 'lucide-react';

interface TopSpendingCategoriesCardProps {
  topCategories: (Category & { total: number })[];
  totalExpenses: number;
}

const TopSpendingCategoriesCard: React.FC<TopSpendingCategoriesCardProps> = ({
  topCategories,
  totalExpenses
}) => {
  if (topCategories.length === 0) {
    return null;
  }

  return (
    <Card className="border-0 shadow-xl rounded-2xl overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50 border-b border-gray-100">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-emerald-100 rounded-lg">
              <PieChart className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900">Top Spending Categories</h3>
              <p className="text-sm text-gray-600">Where your money goes most</p>
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 sm:p-6">
        <div className="space-y-3 sm:space-y-4">
          {topCategories.map((category, index) => (
            <div key={category.id} className="flex items-center justify-between p-3 sm:p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center space-x-3 sm:space-x-4">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center text-white font-bold text-xs sm:text-sm">
                  {index + 1}
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm sm:text-base">{category.name}</p>
                  <p className="text-xs sm:text-sm text-gray-600">{category.type}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-base sm:text-lg text-gray-900">₹{category.total.toLocaleString()}</p>
                <p className="text-xs sm:text-sm text-gray-600">
                  {totalExpenses > 0 ? ((category.total / totalExpenses) * 100).toFixed(1) : 0}% of total
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TopSpendingCategoriesCard; 