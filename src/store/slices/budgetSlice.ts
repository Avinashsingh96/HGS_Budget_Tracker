import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { AppState, Transaction, Category, User, } from '@/types';
import { indexedDBService } from '@/services/indexedDB';

// Async thunks
export const initializeApp = createAsyncThunk(
  'budget/initializeApp',
  async (_, { rejectWithValue }) => {
    try {
      console.log('Starting app initialization...');
      await indexedDBService.init();

      console.log('Loading data from IndexedDB...');
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

      return { transactions, categories, user, };
    } catch (error) {
      console.error('App initialization failed:', error);
      return rejectWithValue(error instanceof Error ? error.message : 'Database initialization failed');
    }
  }
);

export const addTransaction = createAsyncThunk(
  'budget/addTransaction',
  async (transaction: Omit<Transaction, 'id'>) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: uuidv4(),
    };
    await indexedDBService.addTransaction(newTransaction);
    return newTransaction;
  }
);

export const updateTransaction = createAsyncThunk(
  'budget/updateTransaction',
  async (transaction: Transaction) => {
    await indexedDBService.updateTransaction(transaction);
    return transaction;
  }
);

export const deleteTransaction = createAsyncThunk(
  'budget/deleteTransaction',
  async (id: string) => {
    await indexedDBService.deleteTransaction(id);
    return id;
  }
);

export const addCategory = createAsyncThunk(
  'budget/addCategory',
  async (category: Omit<Category, 'id'>) => {
    const newCategory: Category = {
      ...category,
      id: uuidv4(),
    };
    await indexedDBService.addCategory(newCategory);
    return newCategory;
  }
);

export const updateCategory = createAsyncThunk(
  'budget/updateCategory',
  async (category: Category) => {
    await indexedDBService.updateCategory(category);
    return category;
  }
);

export const deleteCategory = createAsyncThunk(
  'budget/deleteCategory',
  async (id: string) => {
    await indexedDBService.deleteCategory(id);
    return id;
  }
);

export const addCustomCategory = createAsyncThunk(
  'budget/addCustomCategory',
  async (category: Omit<Category, 'id'>) => {
    console.log('🔄 Creating new category in Redux thunk:', category);
    const newCategory: Category = {
      ...category,
      id: uuidv4(),
    };
    console.log('📝 Saving category to IndexedDB:', newCategory);
    await indexedDBService.addCategory(newCategory);
    console.log('✅ Category saved to IndexedDB successfully');
    return newCategory;
  }
);

export const saveUser = createAsyncThunk(
  'budget/saveUser',
  async (user: User) => {
    await indexedDBService.saveUser(user);
    return user;
  }
);


// Data export/import actions
export const exportData = createAsyncThunk(
  'budget/exportData',
  async () => {
    const data = await indexedDBService.exportAllData();
    return data;
  }
);

export const importData = createAsyncThunk(
  'budget/importData',
  async (data: any) => {
    await indexedDBService.importAllData(data);
    // Reinitialize app to load imported data
    const [transactions, categories, user,] = await Promise.all([
      indexedDBService.getTransactions(),
      indexedDBService.getCategories(),
      indexedDBService.getUser(),

    ]);
    return { transactions, categories, user, };
  }
);

// Initial state
const initialState: AppState = {
  transactions: [],
  categories: [],
  user: null,
  budgets: [],
  goals: [],
  settings: null,
  isLoading: false,
  error: null,
};

// Slice
const budgetSlice = createSlice({
  name: 'budget',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Initialize app
    builder
      .addCase(initializeApp.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(initializeApp.fulfilled, (state, action) => {
        state.isLoading = false;
        state.transactions = action.payload.transactions;
        state.categories = action.payload.categories;
        state.user = action.payload.user;

      })
      .addCase(initializeApp.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to initialize app';
      });

    // Add transaction
    builder
      .addCase(addTransaction.fulfilled, (state, action) => {
        state.transactions.push(action.payload);
      })
      .addCase(addTransaction.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to add transaction';
      });

    // Update transaction
    builder
      .addCase(updateTransaction.fulfilled, (state, action) => {
        const index = state.transactions.findIndex(t => t.id === action.payload.id);
        if (index !== -1) {
          state.transactions[index] = action.payload;
        }
      })
      .addCase(updateTransaction.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to update transaction';
      });

    // Delete transaction
    builder
      .addCase(deleteTransaction.fulfilled, (state, action) => {
        state.transactions = state.transactions.filter(t => t.id !== action.payload);
      })
      .addCase(deleteTransaction.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to delete transaction';
      });

    // Add category
    builder
      .addCase(addCategory.fulfilled, (state, action) => {
        state.categories.push(action.payload);
      })
      .addCase(addCategory.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to add category';
      });

    // Add custom category
    builder
      .addCase(addCustomCategory.fulfilled, (state, action) => {
        console.log('🔄 Redux: Adding custom category to state:', action.payload);
        state.categories.push(action.payload);
        console.log('✅ Redux: Categories state after adding:', state.categories);
      })
      .addCase(addCustomCategory.rejected, (state, action) => {
        console.error('❌ Redux: Failed to add custom category:', action.error);
        state.error = action.error.message || 'Failed to add custom category';
      });

    // Update category
    builder
      .addCase(updateCategory.fulfilled, (state, action) => {
        const index = state.categories.findIndex(c => c.id === action.payload.id);
        if (index !== -1) {
          state.categories[index] = action.payload;
        }
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to update category';
      });

    // Delete category
    builder
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.categories = state.categories.filter(c => c.id !== action.payload);
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to delete category';
      });

    // Save user
    builder
      .addCase(saveUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(saveUser.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to save user';
      });


    builder
      .addCase(importData.fulfilled, (state, action) => {
        state.transactions = action.payload.transactions;
        state.categories = action.payload.categories;
        state.user = action.payload.user;

      });
  },
});

export const { clearError, setLoading } = budgetSlice.actions;
export default budgetSlice.reducer; 