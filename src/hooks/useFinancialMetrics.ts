import { useMemo } from 'react';
import { Transaction, Category } from '@/types';

/**
 * Custom hook for calculating financial metrics
 */
export const useFinancialMetrics = (transactions: Transaction[], categories: Category[]) => {
  const metrics = useMemo(() => {
    // Calculate total income
    const totalIncome = transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
      
    // Calculate total expenses
    const totalExpenses = transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
      
    // Calculate net savings
    const netSavings = totalIncome - totalExpenses;
    
    // Get recent transactions
    const recentTransactions = [...transactions]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 5);

    // Calculate budget progress (example: if expenses exceed 80% of income)
    const budgetProgress = totalIncome > 0 ? (totalExpenses / totalIncome) * 100 : 0;

    // Calculate spending by category
    const getTopSpendingCategories = () => {
      const categorySpending = categories.map(category => {
        const total = transactions
          .filter(t => t.category === category.name && t.type === 'expense')
          .reduce((sum, t) => sum + t.amount, 0);
        return { ...category, total };
      }).filter(c => c.total > 0).sort((a, b) => b.total - a.total).slice(0, 3);
      
      return categorySpending;
    };

    const topCategories = getTopSpendingCategories();

    // Generate dynamic insights
    const generateInsights = () => {
      const insights = [];

      if (transactions.length === 0) {
        insights.push({
          title: "Welcome to HGS Budget!",
          content: "Start tracking your finances by adding your first transaction.",
          type: 'info' as const
        });
      } else {
        if (budgetProgress > 90) {
          insights.push({
            title: "Budget Alert",
            content: "You're approaching your budget limit. Consider reviewing your expenses.",
            type: 'warning' as const
          });
        }
        
        if (netSavings > 0) {
          insights.push({
            title: "Great Savings!",
            content: `You've saved ₹${netSavings.toLocaleString()} this month. Keep it up!`,
            type: 'success' as const
          });
        }

        if (categories.length < 5) {
          insights.push({
            title: "Organize Better",
            content: "Add more categories to better track your spending patterns.",
            type: 'tip' as const
          });
        }
        
        if (transactions.length > 10) {
          insights.push({
            title: "Active Tracker",
            content: `You're doing great! You've tracked ${transactions.length} transactions.`,
            type: 'premium' as const
          });
        }
      }

      return insights;
    };

    const insights = generateInsights();

    return {
      totalIncome,
      totalExpenses,
      netSavings,
      recentTransactions,
      budgetProgress,
      topCategories,
      insights,
      transactionCount: transactions.length
    };
  }, [transactions, categories]);

  return metrics;
}; 