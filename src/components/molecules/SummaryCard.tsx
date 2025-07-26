import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { cn, getCardBackgroundClass, getTextColorClass, getGradientClass } from '@/lib/utils';

interface SummaryCardProps {
  title: string;
  amount: number;
  trend: 'up' | 'down' | 'neutral';
  trendValue: number;
  icon: React.ReactNode;
  color: 'income' | 'expense' | 'savings' | 'neutral' | 'success' | 'warning' | 'info';
  subtitle?: string;
  progress?: number;
}

const SummaryCard: React.FC<SummaryCardProps> = ({ 
  title, 
  amount, 
  trend, 
  trendValue, 
  icon, 
  color,
  subtitle,
  progress
}) => {
  const getIconBgColor = () => {
    switch (color) {
      case 'income':
        return 'bg-green-100 text-green-600';
      case 'expense':
        return 'bg-red-100 text-red-600';
      case 'savings':
        return 'bg-blue-100 text-blue-600';
      case 'success':
        return 'bg-green-100 text-green-600';
      case 'warning':
        return 'bg-orange-100 text-orange-600';
      case 'info':
        return 'bg-blue-100 text-blue-600';
      default:
        return 'bg-slate-100 text-slate-600';
    }
  };

  const getTrendIcon = () => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-green-600" />;
      case 'down':
        return <TrendingDown className="h-4 w-4 text-red-600" />;
      default:
        return <Minus className="h-4 w-4 text-slate-600" />;
    }
  };

  const getTrendColor = () => {
    switch (trend) {
      case 'up':
        return 'text-green-600';
      case 'down':
        return 'text-red-600';
      default:
        return 'text-slate-600';
    }
  };

  const getAmountColor = () => {
    switch (color) {
      case 'income':
        return 'text-green-700';
      case 'expense':
        return 'text-red-700';
      case 'savings':
        return 'text-blue-700';
      case 'success':
        return 'text-green-700';
      case 'warning':
        return 'text-orange-700';
      case 'info':
        return 'text-blue-700';
      default:
        return 'text-slate-700';
    }
  };

  return (
    <Card className={cn(
      "relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-[1.02]",
      getCardBackgroundClass(color)
    )}>
      <CardContent className="p-6">
        {/* Header with Icon and Trend */}
        <div className="flex items-center justify-between mb-4">
          <div className={cn(
            "p-3 rounded-xl",
            getIconBgColor()
          )}>
            {icon}
          </div>
          <div className="flex items-center space-x-1">
            {getTrendIcon()}
            <span className={cn(
              "text-sm font-medium",
              getTrendColor()
            )}>
              {trendValue > 0 ? '+' : ''}{trendValue}%
            </span>
          </div>
        </div>

        {/* Amount and Title */}
        <div className="mb-3">
          <div className={cn(
            "text-2xl font-bold mb-1",
            getAmountColor()
          )}>
            ₹{amount.toLocaleString()}
          </div>
          <h3 className={cn(
            "text-sm font-semibold",
            getTextColorClass('secondary')
          )}>
            {title}
          </h3>
          {subtitle && (
            <p className={cn(
              "text-xs",
              getTextColorClass('muted')
            )}>
              {subtitle}
            </p>
          )}
        </div>

        {/* Progress Bar */}
        {progress !== undefined && (
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className={getTextColorClass('muted')}>Progress</span>
              <span className={cn(
                "font-medium",
                getAmountColor()
              )}>
                {progress.toFixed(1)}%
              </span>
            </div>
            <Progress 
              value={progress} 
              className="h-2"
              style={{
                '--progress-background': color === 'income' ? '#dcfce7' : 
                                        color === 'expense' ? '#fef2f2' : 
                                        color === 'savings' ? '#dbeafe' : '#f1f5f9',
                '--progress-foreground': color === 'income' ? '#16a34a' : 
                                        color === 'expense' ? '#dc2626' : 
                                        color === 'savings' ? '#2563eb' : '#64748b'
              } as React.CSSProperties}
            />
          </div>
        )}

        {/* Gradient Overlay */}
        <div className={cn(
          "absolute top-0 right-0 w-32 h-32 opacity-10 rounded-full -translate-y-16 translate-x-16",
          getGradientClass(color)
        )} />
      </CardContent>
    </Card>
  );
};

export default SummaryCard; 