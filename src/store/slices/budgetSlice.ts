// Import necessary dependencies from Redux Toolkit
// createSlice: Creates a slice of Redux state with reducers
// createAsyncThunk: Creates async action creators for handling API calls
// PayloadAction: TypeScript type for action payloads
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

// Import UUID generator for creating unique IDs
import { v4 as uuidv4 } from 'uuid';

// Import TypeScript types for type safety
import { AppState, Transaction, Category, User, } from '@/types';

// Import our IndexedDB service for persistent data storage
import { indexedDBService } from '@/services/indexedDB';

// ============================================================================
// ASYNC THUNKS - These handle asynchronous operations like API calls
// ============================================================================

/**
 * Async thunk to initialize the application
 * This runs when the app first loads to set up the database and load existing data
 */
export const initializeApp = createAsyncThunk(
  // Action type name - follows Redux naming convention
  'budget/initializeApp',
  
  // Async function that performs the initialization
  async (_, { rejectWithValue }) => {
    try {
      console.log('Starting app initialization...');
      
      // Initialize the IndexedDB database
      await indexedDBService.init();

      console.log('Loading data from IndexedDB...');
      
      // Load all data from IndexedDB in parallel for better performance
      const [transactions, categories, user,] = await Promise.all([
        indexedDBService.getTransactions(),
        indexedDBService.getCategories(),
        indexedDBService.getUser(),
      ]);

      console.log('Data loaded successfully:', {
        transactions: transactions.length,
        categories: categories.length,
        user: user ? 'exists' : 'null',
      });

      // Return the loaded data to be stored in Redux state
      return { transactions, categories, user, };
    } catch (error) {
      console.error('App initialization failed:', error);
      // Return error message for error handling in the reducer
      return rejectWithValue(error instanceof Error ? error.message : 'Database initialization failed');
    }
  }
);

/**
 * Async thunk to add a new transaction
 * Creates a new transaction with a unique ID and saves it to IndexedDB
 */
export const addTransaction = createAsyncThunk(
  'budget/addTransaction',
  async (transaction: Omit<Transaction, 'id'>) => {
    // Create new transaction with unique ID
    const newTransaction: Transaction = {
      ...transaction,
      id: uuidv4(), // Generate unique identifier
    };
    
    // Save to IndexedDB for persistence
    await indexedDBService.addTransaction(newTransaction);
    
    // Return the new transaction to be added to Redux state
    return newTransaction;
  }
);

/**
 * Async thunk to update an existing transaction
 * Updates a transaction in IndexedDB and returns the updated version
 */
export const updateTransaction = createAsyncThunk(
  'budget/updateTransaction',
  async (transaction: Transaction) => {
    // Update the transaction in IndexedDB
    await indexedDBService.updateTransaction(transaction);
    
    // Return the updated transaction to update Redux state
    return transaction;
  }
);

/**
 * Async thunk to delete a transaction
 * Removes a transaction from IndexedDB by its ID
 */
export const deleteTransaction = createAsyncThunk(
  'budget/deleteTransaction',
  async (id: string) => {
    // Delete from IndexedDB
    await indexedDBService.deleteTransaction(id);
    
    // Return the ID to remove from Redux state
    return id;
  }
);

/**
 * Async thunk to add a new category
 * Creates a new category with a unique ID and saves it to IndexedDB
 */
export const addCategory = createAsyncThunk(
  'budget/addCategory',
  async (category: Omit<Category, 'id'>) => {
    // Create new category with unique ID
    const newCategory: Category = {
      ...category,
      id: uuidv4(),
    };
    
    // Save to IndexedDB
    await indexedDBService.addCategory(newCategory);
    
    // Return the new category to be added to Redux state
    return newCategory;
  }
);

/**
 * Async thunk to update an existing category
 * Updates a category in IndexedDB and returns the updated version
 */
export const updateCategory = createAsyncThunk(
  'budget/updateCategory',
  async (category: Category) => {
    // Update the category in IndexedDB
    await indexedDBService.updateCategory(category);
    
    // Return the updated category to update Redux state
    return category;
  }
);

/**
 * Async thunk to delete a category
 * Removes a category from IndexedDB by its ID
 */
export const deleteCategory = createAsyncThunk(
  'budget/deleteCategory',
  async (id: string) => {
    // Delete from IndexedDB
    await indexedDBService.deleteCategory(id);
    
    // Return the ID to remove from Redux state
    return id;
  }
);

/**
 * Async thunk to add a custom category (with enhanced logging)
 * This is similar to addCategory but includes detailed logging for debugging
 */
export const addCustomCategory = createAsyncThunk(
  'budget/addCustomCategory',
  async (category: Omit<Category, 'id'>) => {
    console.log('🔄 Creating new category in Redux thunk:', category);
    
    // Create new category with unique ID
    const newCategory: Category = {
      ...category,
      id: uuidv4(),
    };
    
    console.log('📝 Saving category to IndexedDB:', newCategory);
    
    // Save to IndexedDB
    await indexedDBService.addCategory(newCategory);
    
    console.log('✅ Category saved to IndexedDB successfully');
    
    // Return the new category to be added to Redux state
    return newCategory;
  }
);

/**
 * Async thunk to save user data
 * Saves user information to IndexedDB for persistence
 */
export const saveUser = createAsyncThunk(
  'budget/saveUser',
  async (user: User) => {
    // Save user to IndexedDB
    await indexedDBService.saveUser(user);
    
    // Return the user data to update Redux state
    return user;
  }
);

// ============================================================================
// DATA EXPORT/IMPORT ACTIONS - For backup and restore functionality
// ============================================================================

/**
 * Async thunk to export all data
 * Exports all data from IndexedDB for backup purposes
 */
export const exportData = createAsyncThunk(
  'budget/exportData',
  async () => {
    // Get all data from IndexedDB
    const data = await indexedDBService.exportAllData();
    return data;
  }
);

/**
 * Async thunk to import data
 * Imports data into IndexedDB and reloads the app state
 */
export const importData = createAsyncThunk(
  'budget/importData',
  async (data: any) => {
    // Import all data into IndexedDB
    await indexedDBService.importAllData(data);
    
    // Reinitialize app to load imported data
    const [transactions, categories, user,] = await Promise.all([
      indexedDBService.getTransactions(),
      indexedDBService.getCategories(),
      indexedDBService.getUser(),
    ]);
    
    // Return the imported data to update Redux state
    return { transactions, categories, user, };
  }
);

// ============================================================================
// INITIAL STATE - The starting state of our Redux store
// ============================================================================

/**
 * Initial state for the budget slice
 * This defines the structure and default values for our Redux state
 */
const initialState: AppState = {
  transactions: [], // Array to store all transactions
  categories: [],   // Array to store all categories
  user: null,       // User information (null if not set)
  budgets: [],      // Array to store budget information
  goals: [],        // Array to store financial goals
  settings: null,   // App settings (null if not set)
  isLoading: false, // Loading state for async operations
  error: null,      // Error state for error handling
};

// ============================================================================
// REDUX SLICE - The main slice that handles all state updates
// ============================================================================

/**
 * Create the budget slice using Redux Toolkit's createSlice
 * This automatically generates action creators and handles immutable updates
 */
const budgetSlice = createSlice({
  name: 'budget', // Name of the slice for debugging
  initialState,   // Starting state defined above
  
  // Synchronous reducers (for simple state updates)
  reducers: {
    /**
     * Clear any error messages from the state
     */
    clearError: (state) => {
      state.error = null;
    },
    
    /**
     * Set the loading state manually
     */
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
  
  // Extra reducers handle async thunk actions
  extraReducers: (builder) => {
    // ============================================================================
    // INITIALIZE APP REDUCERS
    // ============================================================================
    
    // Handle the pending state of initializeApp
    builder
      .addCase(initializeApp.pending, (state) => {
        state.isLoading = true;  // Show loading indicator
        state.error = null;      // Clear any previous errors
      })
      
      // Handle the successful completion of initializeApp
      .addCase(initializeApp.fulfilled, (state, action) => {
        state.isLoading = false; // Hide loading indicator
        
        // Update state with loaded data
        state.transactions = action.payload.transactions;
        state.categories = action.payload.categories;
        state.user = action.payload.user;
      })
      
      // Handle errors in initializeApp
      .addCase(initializeApp.rejected, (state, action) => {
        state.isLoading = false; // Hide loading indicator
        state.error = action.error.message || 'Failed to initialize app';
      });

    // ============================================================================
    // TRANSACTION REDUCERS
    // ============================================================================
    
    // Handle successful transaction addition
    builder
      .addCase(addTransaction.fulfilled, (state, action) => {
        // Add the new transaction to the transactions array
        state.transactions.push(action.payload);
      })
      
      // Handle transaction addition errors
      .addCase(addTransaction.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to add transaction';
      });

    // Handle successful transaction update
    builder
      .addCase(updateTransaction.fulfilled, (state, action) => {
        // Find the transaction by ID and update it
        const index = state.transactions.findIndex(t => t.id === action.payload.id);
        if (index !== -1) {
          state.transactions[index] = action.payload;
        }
      })
      
      // Handle transaction update errors
      .addCase(updateTransaction.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to update transaction';
      });

    // Handle successful transaction deletion
    builder
      .addCase(deleteTransaction.fulfilled, (state, action) => {
        // Remove the transaction from the array by filtering out the deleted ID
        state.transactions = state.transactions.filter(t => t.id !== action.payload);
      })
      
      // Handle transaction deletion errors
      .addCase(deleteTransaction.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to delete transaction';
      });

    // ============================================================================
    // CATEGORY REDUCERS
    // ============================================================================
    
    // Handle successful category addition
    builder
      .addCase(addCategory.fulfilled, (state, action) => {
        // Add the new category to the categories array
        state.categories.push(action.payload);
      })
      
      // Handle category addition errors
      .addCase(addCategory.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to add category';
      });

    // Handle successful custom category addition (with logging)
    builder
      .addCase(addCustomCategory.fulfilled, (state, action) => {
        console.log('🔄 Redux: Adding custom category to state:', action.payload);
        
        // Add the new category to the categories array
        state.categories.push(action.payload);
        
        console.log('✅ Redux: Categories state after adding:', state.categories);
      })
      
      // Handle custom category addition errors
      .addCase(addCustomCategory.rejected, (state, action) => {
        console.error('❌ Redux: Failed to add custom category:', action.error);
        state.error = action.error.message || 'Failed to add custom category';
      });

    // Handle successful category update
    builder
      .addCase(updateCategory.fulfilled, (state, action) => {
        // Find the category by ID and update it
        const index = state.categories.findIndex(c => c.id === action.payload.id);
        if (index !== -1) {
          state.categories[index] = action.payload;
        }
      })
      
      // Handle category update errors
      .addCase(updateCategory.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to update category';
      });

    // Handle successful category deletion
    builder
      .addCase(deleteCategory.fulfilled, (state, action) => {
        // Remove the category from the array by filtering out the deleted ID
        state.categories = state.categories.filter(c => c.id !== action.payload);
      })
      
      // Handle category deletion errors
      .addCase(deleteCategory.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to delete category';
      });

    // ============================================================================
    // USER REDUCERS
    // ============================================================================
    
    // Handle successful user save
    builder
      .addCase(saveUser.fulfilled, (state, action) => {
        // Update the user state with the saved user data
        state.user = action.payload;
      })
      
      // Handle user save errors
      .addCase(saveUser.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to save user';
      });

    // ============================================================================
    // DATA IMPORT REDUCERS
    // ============================================================================
    
    // Handle successful data import
    builder
      .addCase(importData.fulfilled, (state, action) => {
        // Update state with imported data
        state.transactions = action.payload.transactions;
        state.categories = action.payload.categories;
        state.user = action.payload.user;
      });
  },
});

// Export the action creators for use in components
export const { clearError, setLoading } = budgetSlice.actions;

// Export the reducer to be used in the store configuration
export default budgetSlice.reducer; 