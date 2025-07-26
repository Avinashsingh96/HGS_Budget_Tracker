/**
 * Utility Functions Library
 * 
 * This file contains commonly used utility functions for the HGS Budget Tracker application.
 * All functions are well-documented and optimized for performance.
 */

import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Professional Color System for HGS Budget Tracker
 * Provides consistent, accessible, and user-friendly colors across the application
 */

// Primary Brand Colors
export const brandColors = {
  primary: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6', // Main brand blue
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
  },
  secondary: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b', // Main secondary gray
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
  }
}

// Semantic Colors for Financial Data
export const financialColors = {
  income: {
    light: '#dcfce7',
    main: '#16a34a',
    dark: '#15803d',
    text: '#166534',
    bg: '#f0fdf4',
    border: '#bbf7d0'
  },
  expense: {
    light: '#fef2f2',
    main: '#dc2626',
    dark: '#b91c1c',
    text: '#991b1b',
    bg: '#fef2f2',
    border: '#fecaca'
  },
  savings: {
    light: '#dbeafe',
    main: '#2563eb',
    dark: '#1d4ed8',
    text: '#1e40af',
    bg: '#eff6ff',
    border: '#bfdbfe'
  },
  neutral: {
    light: '#f8fafc',
    main: '#64748b',
    dark: '#475569',
    text: '#334155',
    bg: '#f8fafc',
    border: '#e2e8f0'
  }
}

// Status Colors
export const statusColors = {
  success: {
    light: '#dcfce7',
    main: '#16a34a',
    dark: '#15803d',
    text: '#166534'
  },
  warning: {
    light: '#fef3c7',
    main: '#d97706',
    dark: '#b45309',
    text: '#92400e'
  },
  error: {
    light: '#fef2f2',
    main: '#dc2626',
    dark: '#b91c1c',
    text: '#991b1b'
  },
  info: {
    light: '#dbeafe',
    main: '#2563eb',
    dark: '#1d4ed8',
    text: '#1e40af'
  }
}

// Gradient Presets
export const gradients = {
  primary: 'bg-gradient-to-r from-blue-600 to-indigo-600',
  secondary: 'bg-gradient-to-r from-slate-600 to-slate-700',
  success: 'bg-gradient-to-r from-green-600 to-emerald-600',
  warning: 'bg-gradient-to-r from-orange-600 to-red-600',
  info: 'bg-gradient-to-r from-blue-600 to-purple-600',
  premium: 'bg-gradient-to-r from-purple-600 to-pink-600',
  income: 'bg-gradient-to-r from-green-500 to-emerald-500',
  expense: 'bg-gradient-to-r from-red-500 to-rose-500',
  savings: 'bg-gradient-to-r from-blue-500 to-indigo-500',
  neutral: 'bg-gradient-to-r from-slate-500 to-gray-500'
}

// Card Background Presets
export const cardBackgrounds = {
  income: 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-200',
  expense: 'bg-gradient-to-br from-red-50 to-rose-50 border-red-200',
  savings: 'bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200',
  neutral: 'bg-gradient-to-br from-slate-50 to-gray-50 border-slate-200',
  success: 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-200',
  warning: 'bg-gradient-to-br from-orange-50 to-amber-50 border-orange-200',
  error: 'bg-gradient-to-br from-red-50 to-rose-50 border-red-200',
  info: 'bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200'
}

// Text Color Presets
export const textColors = {
  primary: 'text-slate-900',
  secondary: 'text-slate-600',
  muted: 'text-slate-500',
  income: 'text-green-700',
  expense: 'text-red-700',
  savings: 'text-blue-700',
  success: 'text-green-700',
  warning: 'text-orange-700',
  error: 'text-red-700',
  info: 'text-blue-700'
}

// Button Variant Presets
export const buttonVariants = {
  primary: 'bg-blue-600 hover:bg-blue-700 text-white border-blue-600',
  secondary: 'bg-slate-600 hover:bg-slate-700 text-white border-slate-600',
  success: 'bg-green-600 hover:bg-green-700 text-white border-green-600',
  warning: 'bg-orange-600 hover:bg-orange-700 text-white border-orange-600',
  error: 'bg-red-600 hover:bg-red-700 text-white border-red-600',
  outline: 'bg-transparent hover:bg-slate-50 text-slate-700 border-slate-300',
  ghost: 'bg-transparent hover:bg-slate-100 text-slate-700 border-transparent',
  income: 'bg-green-600 hover:bg-green-700 text-white border-green-600',
  expense: 'bg-red-600 hover:bg-red-700 text-white border-red-600',
  savings: 'bg-blue-600 hover:bg-blue-700 text-white border-blue-600'
}

// Helper function to get financial color based on type
export function getFinancialColor(type: 'income' | 'expense' | 'savings' | 'neutral') {
  return financialColors[type]
}

// Helper function to get status color
export function getStatusColor(status: 'success' | 'warning' | 'error' | 'info') {
  return statusColors[status]
}

// Helper function to get gradient class
export function getGradientClass(type: keyof typeof gradients) {
  return gradients[type]
}

// Helper function to get card background class
export function getCardBackgroundClass(type: keyof typeof cardBackgrounds) {
  return cardBackgrounds[type]
}

// Helper function to get text color class
export function getTextColorClass(type: keyof typeof textColors) {
  return textColors[type]
}

// Helper function to get button variant class
export function getButtonVariantClass(type: keyof typeof buttonVariants) {
  return buttonVariants[type]
}

/**
 * Formats a number as currency with proper locale formatting
 * 
 * @param amount - Amount to format
 * @param currency - Currency code (default: 'INR')
 * @param locale - Locale for formatting (default: 'en-IN')
 * @returns Formatted currency string
 */
export function formatCurrency(
  amount: number, 
  currency: string = 'INR', 
  locale: string = 'en-IN'
): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

/**
 * Formats a date to a readable string
 * 
 * @param date - Date to format
 * @param options - Formatting options
 * @returns Formatted date string
 */
export function formatDate(
  date: Date | string, 
  options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }
): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleDateString('en-IN', options);
}

/**
 * Formats a date to a relative time string (e.g., "2 hours ago")
 * 
 * @param date - Date to format
 * @returns Relative time string
 */
export function formatRelativeTime(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - dateObj.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return 'Just now';
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) {
    return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
  }

  return formatDate(dateObj);
}

/**
 * Calculates percentage with proper rounding
 * 
 * @param value - Current value
 * @param total - Total value
 * @param decimals - Number of decimal places (default: 1)
 * @returns Calculated percentage
 */
export function calculatePercentage(
  value: number, 
  total: number, 
  decimals: number = 1
): number {
  if (total === 0) return 0;
  return Math.round((value / total) * 100 * Math.pow(10, decimals)) / Math.pow(10, decimals);
}

/**
 * Generates a random color for categories
 * 
 * @returns Hex color string
 */
export function generateRandomColor(): string {
  const colors = [
    '#3B82F6', '#EF4444', '#10B981', '#F59E0B', '#8B5CF6',
    '#06B6D4', '#84CC16', '#F97316', '#EC4899', '#6366F1'
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}

/**
 * Debounces a function to limit execution frequency
 * 
 * @param func - Function to debounce
 * @param wait - Wait time in milliseconds
 * @returns Debounced function
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

/**
 * Throttles a function to limit execution frequency
 * 
 * @param func - Function to throttle
 * @param limit - Time limit in milliseconds
 * @returns Throttled function
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

/**
 * Validates email format
 * 
 * @param email - Email to validate
 * @returns True if valid email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validates phone number format (Indian format)
 * 
 * @param phone - Phone number to validate
 * @returns True if valid phone format
 */
export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^[6-9]\d{9}$/;
  return phoneRegex.test(phone.replace(/\D/g, ''));
}

/**
 * Capitalizes the first letter of each word
 * 
 * @param str - String to capitalize
 * @returns Capitalized string
 */
export function capitalizeWords(str: string): string {
  return str.replace(/\b\w/g, (char) => char.toUpperCase());
}

/**
 * Truncates text to specified length with ellipsis
 * 
 * @param text - Text to truncate
 * @param maxLength - Maximum length
 * @returns Truncated text
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

/**
 * Groups array items by a specified key
 * 
 * @param array - Array to group
 * @param key - Key to group by
 * @returns Grouped object
 */
export function groupBy<T>(array: T[], key: keyof T): Record<string, T[]> {
  return array.reduce((groups, item) => {
    const group = String(item[key]);
    groups[group] = groups[group] || [];
    groups[group].push(item);
    return groups;
  }, {} as Record<string, T[]>);
}

/**
 * Sorts array by multiple criteria
 * 
 * @param array - Array to sort
 * @param criteria - Array of sort criteria
 * @returns Sorted array
 */
export function sortBy<T>(
  array: T[], 
  criteria: Array<{ key: keyof T; order: 'asc' | 'desc' }>
): T[] {
  return [...array].sort((a, b) => {
    for (const { key, order } of criteria) {
      const aVal = a[key];
      const bVal = b[key];
      
      if (aVal < bVal) return order === 'asc' ? -1 : 1;
      if (aVal > bVal) return order === 'asc' ? 1 : -1;
    }
    return 0;
  });
}

/**
 * Generates a unique ID
 * 
 * @returns Unique ID string
 */
export function generateId(): string {
  return Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
}

/**
 * Checks if a value is empty (null, undefined, empty string, empty array, empty object)
 * 
 * @param value - Value to check
 * @returns True if empty
 */
export function isEmpty(value: any): boolean {
  if (value === null || value === undefined) return true;
  if (typeof value === 'string') return value.trim() === '';
  if (Array.isArray(value)) return value.length === 0;
  if (typeof value === 'object') return Object.keys(value).length === 0;
  return false;
}

/**
 * Deep clones an object
 * 
 * @param obj - Object to clone
 * @returns Cloned object
 */
export function deepClone<T>(obj: T): T {
  if (obj === null || typeof obj !== 'object') return obj;
  if (obj instanceof Date) return new Date(obj.getTime()) as T;
  if (Array.isArray(obj)) return obj.map(item => deepClone(item)) as T;
  
  const cloned = {} as T;
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      cloned[key] = deepClone(obj[key]);
    }
  }
  return cloned;
}

/**
 * Formats file size in human readable format
 * 
 * @param bytes - Size in bytes
 * @returns Formatted size string
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

/**
 * Delays execution for specified time
 * 
 * @param ms - Milliseconds to delay
 * @returns Promise that resolves after delay
 */
export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Retries a function with exponential backoff
 * 
 * @param fn - Function to retry
 * @param maxRetries - Maximum number of retries
 * @param baseDelay - Base delay in milliseconds
 * @returns Promise that resolves with function result
 */
export async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  baseDelay: number = 1000
): Promise<T> {
  let lastError: Error;
  
  for (let i = 0; i <= maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;
      if (i === maxRetries) break;
      
      const delay = baseDelay * Math.pow(2, i);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  
  throw lastError!;
} 