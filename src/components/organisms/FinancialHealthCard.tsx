import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Sparkles, BarChart3 } from 'lucide-react';

interface FinancialHealthCardProps {
  budgetProgress: number;
  transactionCount: number;
  onViewAnalytics: () => void;
}

const FinancialHealthCard: React.FC<FinancialHealthCardProps> = ({
  budgetProgress,
  transactionCount,
  onViewAnalytics
}) => {
  const healthScore = transactionCount > 0 ? Math.min(100, Math.max(0, 100 - budgetProgress)) : 85;
  const healthMessage = transactionCount > 0 
    ? budgetProgress > 100 
      ? "Budget exceeded - review spending"
      : "Excellent financial management!"
    : "Start tracking to see your score";

  return (
    <Card className="border-0 shadow-xl rounded-2xl overflow-hidden bg-gradient-to-br from-purple-50 to-pink-50">
      <CardContent className="p-6 sm:p-8">
        <div className="text-center">
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg">
            <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-3">Financial Health</h3>
          <div className="text-3xl sm:text-4xl font-bold text-purple-600 mb-3 sm:mb-4">
            {healthScore}%
          </div>
          <div className="mb-4 sm:mb-6">
            <Progress 
              value={healthScore} 
              className="h-2 sm:h-3 bg-purple-100"
            />
          </div>
          <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">
            {healthMessage}
          </p>
          <Button 
            variant="outline" 
            className="border-purple-200 text-purple-600 hover:bg-purple-50"
            onClick={onViewAnalytics}
          >
            <BarChart3 className="w-4 h-4 mr-2" />
            View Analysis
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default FinancialHealthCard; 