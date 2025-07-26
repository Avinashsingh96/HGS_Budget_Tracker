import { indexedDBService } from '@/services/indexedDB';

export const clearDatabase = async () => {
  try {
    await indexedDBService.clearAllData();
    console.log('Database cleared successfully');
    window.location.reload();
  } catch (error) {
    console.error('Error clearing database:', error);
  }
};

export const clearCategoriesOnly = async () => {
  try {
    await indexedDBService.clearCategories();
    console.log('Categories cleared successfully');
    window.location.reload();
  } catch (error) {
    console.error('Error clearing categories:', error);
  }
}; 