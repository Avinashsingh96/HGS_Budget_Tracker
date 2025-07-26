export interface Transaction {
  id: string;
  type: 'income' | 'expense';
  amount: number;
  category: string;
  description: string;
  date: string;
  icon: string;
}

export interface Category {
  id: string;
  name: string;
  type: 'income' | 'expense';
  icon: string;
  color: string;
}

export interface BudgetSummary {
  totalIncome: number;
  totalExpenses: number;
  balance: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface AppState {
  transactions: Transaction[];
  categories: Category[];
  user: User | null;
  budgets: Budget[];
  goals: FinancialGoal[];
  settings: AppSettings | null;
  isLoading: boolean;
  error: string | null;
}

export interface Budget {
  id: string;
  categoryId: string;
  categoryName: string;
  amount: number;
  period: 'monthly' | 'weekly' | 'yearly';
  startDate: string;
  endDate?: string;
  isActive: boolean;
}

export interface FinancialGoal {
  id: string;
  name: string;
  description: string;
  targetAmount: number;
  currentAmount: number;
  targetDate: string;
  type: 'savings' | 'debt-payoff' | 'investment' | 'emergency-fund' | 'vacation' | 'purchase';
  priority: 'low' | 'medium' | 'high';
  isActive: boolean;
  createdAt: string;
}

export interface AppSettings {
  theme: 'light' | 'dark' | 'auto';
  currency: string;
  currencySymbol: string;
  dateFormat: 'MM/DD/YYYY' | 'DD/MM/YYYY' | 'YYYY-MM-DD';
  notifications: {
    budgetAlerts: boolean;
    goalReminders: boolean;
    weeklyReports: boolean;
    monthlyReports: boolean;
  };
  display: {
    showCurrencySymbol: boolean;
    showDecimals: boolean;
    compactMode: boolean;
  };
  privacy: {
    autoLock: boolean;
    lockTimeout: number;
    requirePassword: boolean;
  };
}

export interface IndexedDBConfig {
  name: string;
  version: number;
  stores: {
    transactions: string;
    categories: string;
    user: string;
  };
} 