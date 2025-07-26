import React from 'react';
import { Lightbulb, AlertCircle, CheckCircle, Info, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * Enhanced Insight Card Component
 */
interface InsightCardProps {
  title: string;
  content: string;
  type: 'tip' | 'warning' | 'success' | 'info' | 'premium';
  icon?: React.ReactNode;
  action?: {
    label: string;
    onClick: () => void;
  };
}

const InsightCard: React.FC<InsightCardProps> = ({ title, content, type, icon, action }) => {
  const getIcon = () => {
    if (icon) return icon;
    
    switch (type) {
      case 'tip':
        return <Lightbulb className="w-5 h-5" />;
      case 'warning':
        return <AlertCircle className="w-5 h-5" />;
      case 'success':
        return <CheckCircle className="w-5 h-5" />;
      case 'info':
        return <Info className="w-5 h-5" />;
      case 'premium':
        return <Star className="w-5 h-5" />;
      default:
        return <Info className="w-5 h-5" />;
    }
  };

  const getBgColor = () => {
    switch (type) {
      case 'tip':
        return 'bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200';
      case 'warning':
        return 'bg-gradient-to-br from-orange-50 to-amber-50 border-orange-200';
      case 'success':
        return 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-200';
      case 'info':
        return 'bg-gradient-to-br from-slate-50 to-gray-50 border-slate-200';
      case 'premium':
        return 'bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200';
      default:
        return 'bg-gradient-to-br from-slate-50 to-gray-50 border-slate-200';
    }
  };

  const getIconColor = () => {
    switch (type) {
      case 'tip':
        return 'bg-blue-100 text-blue-600';
      case 'warning':
        return 'bg-orange-100 text-orange-600';
      case 'success':
        return 'bg-green-100 text-green-600';
      case 'info':
        return 'bg-slate-100 text-slate-600';
      case 'premium':
        return 'bg-purple-100 text-purple-600';
      default:
        return 'bg-slate-100 text-slate-600';
    }
  };

  const getTextColor = () => {
    switch (type) {
      case 'tip':
        return 'text-blue-900';
      case 'warning':
        return 'text-orange-900';
      case 'success':
        return 'text-green-900';
      case 'info':
        return 'text-slate-900';
      case 'premium':
        return 'text-purple-900';
      default:
        return 'text-slate-900';
    }
  };

  const getDescriptionColor = () => {
    switch (type) {
      case 'tip':
        return 'text-blue-700';
      case 'warning':
        return 'text-orange-700';
      case 'success':
        return 'text-green-700';
      case 'info':
        return 'text-slate-700';
      case 'premium':
        return 'text-purple-700';
      default:
        return 'text-slate-700';
    }
  };

  return (
    <div className={cn(
      "rounded-xl p-4 border transition-all duration-300 hover:shadow-md",
      getBgColor()
    )}>
      <div className="flex items-start space-x-3">
        <div className={cn("p-2 rounded-lg", getIconColor())}>
          {getIcon()}
        </div>
        <div className="flex-1 min-w-0">
          <h4 className={cn("font-semibold text-sm mb-1", getTextColor())}>
            {title}
          </h4>
          <p className={cn("text-sm leading-relaxed", getDescriptionColor())}>
            {content}
          </p>
          {action && (
            <button
              onClick={action.onClick}
              className={cn(
                "mt-2 text-xs font-medium hover:underline transition-colors",
                getDescriptionColor()
              )}
            >
              {action.label}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default InsightCard; 