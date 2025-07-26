import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Category } from '@/types';
import { indexedDBService } from '@/services/indexedDB';

interface DebugPanelProps {
  categories: Category[];
  onReset: () => void;
}

export const DebugPanel: React.FC<DebugPanelProps> = ({ categories, onReset }) => {
  const handleForceReset = async () => {
    try {
      await indexedDBService.forceResetDatabase();
      window.location.reload();
    } catch (error) {
      console.error('Error resetting database:', error);
    }
  };

  const handleClearCategories = async () => {
    try {
      await indexedDBService.clearCategories();
      window.location.reload();
    } catch (error) {
      console.error('Error clearing categories:', error);
    }
  };

  return (
    <Card className="mb-6 border-orange-200 bg-orange-50">
      <CardHeader>
        <CardTitle className="text-orange-800">🔧 Debug Panel - Categories ({categories.length})</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-orange-700 mb-2">Current Categories:</h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              {categories.map((cat, index) => (
                <div key={cat.id} className="flex items-center space-x-2 p-2 bg-white rounded border">
                  <span>{cat.icon}</span>
                  <span className="font-medium">{cat.name}</span>
                  <span className="text-xs text-gray-500">({cat.type})</span>
                  <span className="text-xs text-gray-400">#{index + 1}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex space-x-2">
            <Button
              onClick={handleClearCategories}
              variant="outline"
              size="sm"
              className="border-orange-300 text-orange-700 hover:bg-orange-100"
            >
              🗑️ Clear Categories Only
            </Button>
            <Button
              onClick={handleForceReset}
              variant="outline"
              size="sm"
              className="border-red-300 text-red-700 hover:bg-red-100"
            >
              🔄 Force Reset Database
            </Button>
            <Button
              onClick={onReset}
              variant="outline"
              size="sm"
              className="border-blue-300 text-blue-700 hover:bg-blue-100"
            >
              🔄 Reload App
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}; 