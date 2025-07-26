import { useEffect } from 'react';
import { useAppDispatch } from '@/store/hooks';
import { initializeApp } from '@/store/slices/budgetSlice';

/**
 * Custom hook for application initialization
 * 
 * Handles the initialization of the application on mount,
 * including loading data from IndexedDB and setting up
 * the initial application state.
 */
export const useAppInitialization = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const initializeAppData = async () => {
      try {
        // Initialize app with data from IndexedDB
        await dispatch(initializeApp());
        
        console.log('Application initialized successfully');
      } catch (error) {
        console.error('Failed to initialize application:', error);
      }
    };

    initializeAppData();
  }, [dispatch]);
}; 