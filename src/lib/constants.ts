/**
 * Application Constants
 * 
 * This file contains all the constants used throughout the HGS Budget Tracker application.
 * Centralizing constants here makes the application easier to maintain and configure.
 */

/**
 * Database Configuration
 */
export const DB_CONFIG = {
  name: 'BudgetTrackerDB',
  version: 2,
  stores: {
    transactions: 'transactions',
    categories: 'categories',
    user: 'user',
    budgets: 'budgets',
    goals: 'goals',
    settings: 'settings'
  }
} as const;

/**
 * Application Settings
 */
export const APP_CONFIG = {
  name: 'HGS Budget Tracker',
  version: '1.0.0',
  description: 'A comprehensive budget tracking application',
  defaultCurrency: 'INR',
  defaultLocale: 'en-IN',
  defaultMonthlyBudget: 50000,
  maxTransactionAmount: 999999999,
  minTransactionAmount: 0.01,
  maxDescriptionLength: 100,
  maxCategoryNameLength: 50,
  itemsPerPage: 20,
  maxRecentTransactions: 5,
  sessionTimeout: 30 * 60 * 1000, // 30 minutes
} as const;

/**
 * Transaction Types
 */
export const TRANSACTION_TYPES = {
  INCOME: 'income',
  EXPENSE: 'expense'
} as const;

/**
 * Default Categories
 */
export const DEFAULT_CATEGORIES = {
  INCOME: [
    { name: 'Salary', type: 'income', color: '#10B981' },
    { name: 'Freelance', type: 'income', color: '#3B82F6' },
    { name: 'Investment', type: 'income', color: '#8B5CF6' },
    { name: 'Business', type: 'income', color: '#F59E0B' },
    { name: 'Other Income', type: 'income', color: '#06B6D4' }
  ],
  EXPENSE: [
    { name: 'Food & Dining', type: 'expense', color: '#EF4444' },
    { name: 'Transportation', type: 'expense', color: '#F97316' },
    { name: 'Shopping', type: 'expense', color: '#EC4899' },
    { name: 'Entertainment', type: 'expense', color: '#8B5CF6' },
    { name: 'Healthcare', type: 'expense', color: '#10B981' },
    { name: 'Education', type: 'expense', color: '#3B82F6' },
    { name: 'Housing', type: 'expense', color: '#F59E0B' },
    { name: 'Utilities', type: 'expense', color: '#6366F1' },
    { name: 'Insurance', type: 'expense', color: '#84CC16' },
    { name: 'Other Expenses', type: 'expense', color: '#6B7280' }
  ]
} as const;

/**
 * Color Palette
 */
export const COLORS = {
  primary: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a'
  },
  success: {
    50: '#f0fdf4',
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#86efac',
    400: '#4ade80',
    500: '#22c55e',
    600: '#16a34a',
    700: '#15803d',
    800: '#166534',
    900: '#14532d'
  },
  warning: {
    50: '#fffbeb',
    100: '#fef3c7',
    200: '#fde68a',
    300: '#fcd34d',
    400: '#fbbf24',
    500: '#f59e0b',
    600: '#d97706',
    700: '#b45309',
    800: '#92400e',
    900: '#78350f'
  },
  error: {
    50: '#fef2f2',
    100: '#fee2e2',
    200: '#fecaca',
    300: '#fca5a5',
    400: '#f87171',
    500: '#ef4444',
    600: '#dc2626',
    700: '#b91c1c',
    800: '#991b1b',
    900: '#7f1d1d'
  },
  gray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827'
  }
} as const;

/**
 * Chart Colors
 */
export const CHART_COLORS = [
  '#3B82F6', '#EF4444', '#10B981', '#F59E0B', '#8B5CF6',
  '#06B6D4', '#84CC16', '#F97316', '#EC4899', '#6366F1',
  '#14B8A6', '#F43F5E', '#8B5CF6', '#06B6D4', '#84CC16'
] as const;

/**
 * Date Formats
 */
export const DATE_FORMATS = {
  display: 'dd MMM yyyy',
  input: 'yyyy-MM-dd',
  month: 'MMM yyyy',
  short: 'dd/MM/yyyy',
  time: 'HH:mm',
  datetime: 'dd MMM yyyy HH:mm'
} as const;

/**
 * Validation Rules
 */
export const VALIDATION_RULES = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phone: /^[6-9]\d{9}$/,
  amount: /^\d+(\.\d{1,2})?$/,
  name: /^[a-zA-Z\s]{2,50}$/,
  description: /^.{1,100}$/
} as const;

/**
 * Error Messages
 */
export const ERROR_MESSAGES = {
  required: 'This field is required',
  invalidEmail: 'Please enter a valid email address',
  invalidPhone: 'Please enter a valid phone number',
  invalidAmount: 'Please enter a valid amount',
  invalidName: 'Name must be 2-50 characters long',
  invalidDescription: 'Description must be 1-100 characters long',
  amountTooHigh: 'Amount cannot exceed ₹999,999,999',
  amountTooLow: 'Amount must be at least ₹0.01',
  networkError: 'Network error. Please check your connection.',
  databaseError: 'Database error. Please try again.',
  unknownError: 'An unexpected error occurred. Please try again.'
} as const;

/**
 * Success Messages
 */
export const SUCCESS_MESSAGES = {
  transactionAdded: 'Transaction added successfully',
  transactionUpdated: 'Transaction updated successfully',
  transactionDeleted: 'Transaction deleted successfully',
  categoryAdded: 'Category added successfully',
  categoryUpdated: 'Category updated successfully',
  categoryDeleted: 'Category deleted successfully',
  budgetSet: 'Budget set successfully',
  goalAdded: 'Goal added successfully',
  goalUpdated: 'Goal updated successfully',
  goalDeleted: 'Goal deleted successfully',
  dataExported: 'Data exported successfully',
  dataImported: 'Data imported successfully',
  settingsSaved: 'Settings saved successfully'
} as const;

/**
 * Navigation Routes
 */
export const ROUTES = {
  home: '/',
  analytics: '/analytics',
  transactions: '/transactions',
  categories: '/categories',
  goals: '/goals',
  settings: '/settings',
  export: '/export',
  import: '/import'
} as const;

/**
 * Local Storage Keys
 */
export const STORAGE_KEYS = {
  theme: 'hgs-theme',
  language: 'hgs-language',
  currency: 'hgs-currency',
  lastSync: 'hgs-last-sync',
  userPreferences: 'hgs-user-preferences'
} as const;

/**
 * API Endpoints (for future use)
 */
export const API_ENDPOINTS = {
  base: '/api/v1',
  transactions: '/transactions',
  categories: '/categories',
  budgets: '/budgets',
  goals: '/goals',
  analytics: '/analytics',
  export: '/export',
  import: '/import'
} as const;

/**
 * Animation Durations
 */
export const ANIMATION_DURATIONS = {
  fast: 150,
  normal: 300,
  slow: 500,
  verySlow: 1000
} as const;

/**
 * Breakpoints
 */
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536
} as const;

/**
 * Z-Index Values
 */
export const Z_INDEX = {
  dropdown: 1000,
  sticky: 1020,
  fixed: 1030,
  modalBackdrop: 1040,
  modal: 1050,
  popover: 1060,
  tooltip: 1070
} as const; 