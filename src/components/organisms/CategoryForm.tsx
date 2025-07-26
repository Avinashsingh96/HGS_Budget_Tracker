import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Category } from '@/types';
import { Plus, X, Palette, Smile } from 'lucide-react';

interface CategoryFormProps {
  category?: Category;
  onSubmit: (category: Omit<Category, 'id'>) => void;
  onCancel: () => void;
  isEditing?: boolean;
  isSubmitting?: boolean;
  hideHeader?: boolean;
}

const defaultIcons = {
  income: ['💰', '💵', '🏦', '📈', '🎯', '💎', '🏆', '⭐', '🌟', '💫'],
  expense: ['🏠', '🛒', '☕', '🚗', '🎬', '🍕', '💊', '📚', '🎮', '✈️', '🏥', '🎓', '💼', '🎨', '🏃', '🍔']
};

const defaultColors = [
  '#EF4444', '#F59E0B', '#10B981', '#3B82F6', '#8B5CF6', '#EC4899',
  '#06B6D4', '#84CC16', '#F97316', '#6366F1', '#14B8A6', '#F43F5E'
];

const CategoryForm: React.FC<CategoryFormProps> = ({
  category,
  onSubmit,
  onCancel,
  isEditing = false,
  isSubmitting = false,
  hideHeader = false
}) => {
  const [formData, setFormData] = useState({
    name: category?.name || '',
    type: category?.type || 'expense',
    icon: category?.icon || '💰',
    color: category?.color || '#3B82F6'
  });

  const [showIconSelector, setShowIconSelector] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      return;
    }
    onSubmit(formData);
  };

  const handleIconSelect = (icon: string) => {
    setFormData(prev => ({ ...prev, icon }));
    setShowIconSelector(false);
  };

  const handleColorSelect = (color: string) => {
    setFormData(prev => ({ ...prev, color }));
    setShowColorPicker(false);
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-white shadow-2xl border-0 rounded-xl overflow-hidden">
      {!hideHeader && (
        <CardHeader className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-6">
          <CardTitle className="flex items-center justify-between text-white">
            <span className="text-xl font-bold">
              {isEditing ? '✏️ Edit Category' : '➕ Add New Category'}
            </span>
            <Button variant="ghost" size="sm" onClick={onCancel} className="text-white hover:bg-white/20 rounded-full">
              <X className="h-5 w-5" />
            </Button>
          </CardTitle>
        </CardHeader>
      )}
      
      <CardContent className="p-6 bg-white">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Category Name */}
          <div className="space-y-3">
            <label className="text-sm font-semibold text-gray-700">Category Name</label>
            <Input
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Enter category name"
              className="h-12 border-2 border-gray-200 hover:border-green-300 focus:border-green-500 rounded-lg"
              required
            />
          </div>

          {/* Category Type */}
          <div className="space-y-3">
            <label className="text-sm font-semibold text-gray-700">Category Type</label>
            <Select
              value={formData.type}
              onValueChange={(value: 'income' | 'expense') =>
                setFormData(prev => ({ 
                  ...prev, 
                  type: value, 
                  icon: value === 'income' ? '💰' : '🏠' 
                }))
              }
            >
              <SelectTrigger className="h-12 border-2 border-gray-200 hover:border-green-300 focus:border-green-500 rounded-lg">
                <SelectValue placeholder="Select category type" />
              </SelectTrigger>
              <SelectContent className="z-[70]">
                <SelectItem value="income">💰 Income</SelectItem>
                <SelectItem value="expense">💸 Expense</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Icon and Color Selection */}
          <div className="grid grid-cols-2 gap-4">
            {/* Icon Selection */}
            <div className="space-y-3">
              <label className="text-sm font-semibold text-gray-700 flex items-center">
                <Smile className="h-4 w-4 mr-2" />
                Icon
              </label>
              <div className="relative">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full justify-start h-12 border-2 border-gray-200 hover:border-green-300 focus:border-green-500 rounded-lg"
                  onClick={() => setShowIconSelector(!showIconSelector)}
                >
                  <span className="mr-2 text-lg">{formData.icon}</span>
                  <span className="font-medium">Select Icon</span>
                </Button>
                {showIconSelector && (
                  <div className="absolute top-full left-0 right-0 mt-1 p-4 bg-white border-2 border-gray-200 rounded-lg shadow-xl z-[70]">
                    <div className="grid grid-cols-5 gap-2">
                      {(formData.type === 'income' ? defaultIcons.income : defaultIcons.expense).map((icon) => (
                        <button
                          key={icon}
                          type="button"
                          className="p-2 hover:bg-green-50 rounded-lg text-lg transition-colors"
                          onClick={() => handleIconSelect(icon)}
                        >
                          {icon}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Color Selection */}
            <div className="space-y-3">
              <label className="text-sm font-semibold text-gray-700 flex items-center">
                <Palette className="h-4 w-4 mr-2" />
                Color
              </label>
              <div className="relative">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full justify-start h-12 border-2 border-gray-200 hover:border-green-300 focus:border-green-500 rounded-lg"
                  onClick={() => setShowColorPicker(!showColorPicker)}
                  style={{ borderLeftColor: formData.color, borderLeftWidth: '4px' }}
                >
                  <div 
                    className="w-4 h-4 rounded-full mr-2" 
                    style={{ backgroundColor: formData.color }}
                  />
                  <span className="font-medium">Select Color</span>
                </Button>
                {showColorPicker && (
                  <div className="absolute top-full left-0 right-0 mt-1 p-4 bg-white border-2 border-gray-200 rounded-lg shadow-xl z-[70]">
                    <div className="grid grid-cols-6 gap-2">
                      {defaultColors.map((color) => (
                        <button
                          key={color}
                          type="button"
                          className="w-8 h-8 rounded-full border-2 border-gray-200 hover:border-gray-400 transition-colors"
                          style={{ backgroundColor: color }}
                          onClick={() => handleColorSelect(color)}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Preview */}
          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="text-sm font-semibold text-gray-700 mb-2">Preview:</h4>
            <div className="flex items-center space-x-3">
              <div 
                className="w-10 h-10 rounded-full flex items-center justify-center text-lg"
                style={{ backgroundColor: formData.color }}
              >
                {formData.icon}
              </div>
              <div>
                <p className="font-medium text-gray-800">{formData.name || 'Category Name'}</p>
                <p className="text-sm text-gray-500 capitalize">{formData.type}</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3 pt-4">
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
                  {isEditing ? 'Updating...' : 'Creating...'}
                </>
              ) : (
                <>
                  <Plus className="h-5 w-5 mr-2" />
                  {isEditing ? 'Update' : 'Add'} Category
                </>
              )}
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              onClick={onCancel}
              disabled={isSubmitting}
              className="px-6 py-3 border-2 border-gray-300 hover:border-gray-400 rounded-lg font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default CategoryForm; 