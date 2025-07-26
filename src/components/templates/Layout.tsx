/**
 * Layout Component
 * 
 * A simple layout wrapper that provides consistent structure for all pages.
 * This component handles the basic layout without requiring complex props.
 */

import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Home, 
  BarChart3, 
  History, 
  Settings,
  Plus,
  Menu,
  X,
  FolderPlus
} from 'lucide-react';
import { Button } from '../ui/button';
import { cn } from '../../lib/utils';

interface LayoutProps {
  children: React.ReactNode;
  onAddTransaction?: () => void;
  onAddCategory?: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, onAddTransaction, onAddCategory }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  const navigation = [
    { name: 'Dashboard', href: '/', icon: Home },
    { name: 'Analytics', href: '/analytics', icon: BarChart3 },
    { name: 'Transactions', href: '/transactions', icon: History },
    { name: 'Categories', href: '/categories', icon: Settings },
  ];

  const isActive = (href: string) => {
    return location.pathname === href;
  };

  const handleNavigation = (href: string) => {
    navigate(href);
    setSidebarOpen(false);
  };

  const handleAddTransaction = () => {
    if (onAddTransaction) {
      onAddTransaction();
    } else {
      navigate('/transactions?action=add');
    }
  };

  const handleAddCategory = () => {
    if (onAddCategory) {
      onAddCategory();
    } else {
      navigate('/categories?action=add');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 lg:flex-shrink-0",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <h1 className="text-xl font-bold text-gray-900">HGS Budget</h1>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.name}
                  onClick={() => handleNavigation(item.href)}
                  className={cn(
                    "w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors",
                    isActive(item.href)
                      ? "bg-blue-100 text-blue-700"
                      : "text-gray-700 hover:bg-gray-100"
                  )}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.name}</span>
                </button>
              );
            })}
          </nav>

          {/* Quick Actions */}
          <div className="p-4 border-t">
            {/* Add Transaction button removed from here */}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <div className="bg-white shadow-sm border-b px-4 py-3 flex items-center justify-between">
          {/* Left side - Mobile menu button and app title */}
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden"
            >
              <Menu className="w-5 h-5" />
            </Button>
            <h1 className="text-lg font-semibold text-gray-900 lg:hidden">HGS Budget</h1>
          </div>
          
          {/* Right side - Action buttons */}
          <div className="flex items-center space-x-3">
            <Button
              onClick={handleAddCategory}
              variant="outline"
              className="border-green-600 text-green-600 hover:bg-green-50"
              size="sm"
            >
              <FolderPlus className="w-4 h-4 mr-2" />
              Add Category
            </Button>
            <Button
              onClick={handleAddTransaction}
              className="bg-blue-600 hover:bg-blue-700 text-white"
              size="sm"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Transaction
            </Button>
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1 px-4 sm:px-6 lg:px-8 pt-4 lg:pt-6 pb-6 lg:pb-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout; 