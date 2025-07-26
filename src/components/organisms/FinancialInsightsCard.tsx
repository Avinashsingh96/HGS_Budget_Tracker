import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Lightbulb } from 'lucide-react';
import InsightCard from '@/components/molecules/InsightCard';

interface FinancialInsightsCardProps {
  insights: Array<{
    title: string;
    content: string;
    type: 'tip' | 'warning' | 'success' | 'info' | 'premium';
  }>;
  onAddTransaction: () => void;
}

const FinancialInsightsCard: React.FC<FinancialInsightsCardProps> = ({
  insights,
  onAddTransaction
}) => {
  return (
    <Card className="border-0 shadow-xl rounded-2xl overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-yellow-50 to-orange-50 border-b border-gray-100">
        <CardTitle className="flex items-center space-x-3">
          <div className="p-2 bg-yellow-100 rounded-lg">
            <Lightbulb className="w-5 h-5 text-yellow-600" />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-900">Quick Tips</h3>
            <p className="text-sm text-gray-600">Smart financial advice</p>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 sm:p-6">
        <div className="space-y-3 sm:space-y-4">
          {insights.slice(0, 2).map((insight, index) => (
            <InsightCard
              key={index}
              title={insight.title}
              content={insight.content}
              type={insight.type}
              action={index === 0 ? {
                label: "Learn More",
                onClick: onAddTransaction
              } : undefined}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default FinancialInsightsCard; 