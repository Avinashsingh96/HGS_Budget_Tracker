import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * Enhanced Quick Action Component with Premium Features
 */
interface QuickActionProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick: () => void;
  variant?: 'default' | 'primary' | 'secondary' | 'premium' | 'success' | 'warning';
  badge?: string;
  stats?: string;
}

const QuickAction: React.FC<QuickActionProps> = ({ 
  icon, 
  title, 
  description, 
  onClick, 
  variant = 'default',
  badge,
  stats
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'primary':
        return {
          card: 'bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200 hover:from-blue-100 hover:to-indigo-100',
          icon: 'bg-blue-100 text-blue-600',
          title: 'text-blue-900',
          description: 'text-blue-700',
          badge: 'bg-blue-600 text-white'
        };
      case 'secondary':
        return {
          card: 'bg-gradient-to-br from-slate-50 to-gray-50 border-slate-200 hover:from-slate-100 hover:to-gray-100',
          icon: 'bg-slate-100 text-slate-600',
          title: 'text-slate-900',
          description: 'text-slate-700',
          badge: 'bg-slate-600 text-white'
        };
      case 'premium':
        return {
          card: 'bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200 hover:from-purple-100 hover:to-pink-100',
          icon: 'bg-purple-100 text-purple-600',
          title: 'text-purple-900',
          description: 'text-purple-700',
          badge: 'bg-purple-600 text-white'
        };
      case 'success':
        return {
          card: 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 hover:from-green-100 hover:to-emerald-100',
          icon: 'bg-green-100 text-green-600',
          title: 'text-green-900',
          description: 'text-green-700',
          badge: 'bg-green-600 text-white'
        };
      case 'warning':
        return {
          card: 'bg-gradient-to-br from-orange-50 to-amber-50 border-orange-200 hover:from-orange-100 hover:to-amber-100',
          icon: 'bg-orange-100 text-orange-600',
          title: 'text-orange-900',
          description: 'text-orange-700',
          badge: 'bg-orange-600 text-white'
        };
      default:
        return {
          card: 'bg-gradient-to-br from-slate-50 to-gray-50 border-slate-200 hover:from-slate-100 hover:to-gray-100',
          icon: 'bg-slate-100 text-slate-600',
          title: 'text-slate-900',
          description: 'text-slate-700',
          badge: 'bg-slate-600 text-white'
        };
    }
  };

  const classes = getVariantClasses();

  return (
    <div 
      onClick={onClick}
      className={cn(
        "group cursor-pointer rounded-2xl p-6 border transition-all duration-300 hover:shadow-lg hover:scale-[1.02]",
        classes.card
      )}
    >
      <div className="flex items-start justify-between mb-4">
        <div className={cn("p-3 rounded-xl transition-colors", classes.icon)}>
          {icon}
        </div>
        {badge && (
          <span className={cn(
            "px-2 py-1 text-xs font-medium rounded-full",
            classes.badge
          )}>
            {badge}
          </span>
        )}
      </div>
      
      <div className="space-y-2">
        <h3 className={cn("text-lg font-semibold", classes.title)}>
          {title}
        </h3>
        <p className={cn("text-sm leading-relaxed", classes.description)}>
          {description}
        </p>
        {stats && (
          <p className={cn("text-xs font-medium", classes.description)}>
            {stats}
          </p>
        )}
      </div>
      
      <div className="mt-4 flex items-center text-sm font-medium text-blue-600 group-hover:text-blue-700 transition-colors">
        Get Started
        <ArrowUpRight className="w-4 h-4 ml-1 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
      </div>
    </div>
  );
};

export default QuickAction; 