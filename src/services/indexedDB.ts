import { Transaction, Category, User, IndexedDBConfig } from '@/types';

const DB_CONFIG: IndexedDBConfig = {
  name: 'BudgetTrackerDB',
  version: 2,
  stores: {
    transactions: 'transactions',
    categories: 'categories',
    user: 'user',
  }
};

class IndexedDBService {
  private db: IDBDatabase | null = null;

  async init(): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        console.log('Initializing IndexedDB...');
        const request = indexedDB.open(DB_CONFIG.name, DB_CONFIG.version);

        request.onerror = () => {
          console.error('IndexedDB open error:', request.error);
          reject(new Error(`Failed to open database: ${request.error?.message || 'Unknown error'}`));
        };

        request.onsuccess = () => {
          console.log('IndexedDB opened successfully');
          this.db = request.result;
          resolve();
        };

        request.onupgradeneeded = (event) => {
          console.log('IndexedDB upgrade needed, creating stores...');
          const db = (event.target as IDBOpenDBRequest).result;
          const oldVersion = event.oldVersion;
          const newVersion = event.newVersion;

          console.log(`Upgrading database from version ${oldVersion} to ${newVersion}`);

          try {
            // Create object stores
            if (!db.objectStoreNames.contains(DB_CONFIG.stores.transactions)) {
              console.log('Creating transactions store...');
              const transactionStore = db.createObjectStore(DB_CONFIG.stores.transactions, { keyPath: 'id' });
              transactionStore.createIndex('date', 'date', { unique: false });
              transactionStore.createIndex('type', 'type', { unique: false });
            }

            if (!db.objectStoreNames.contains(DB_CONFIG.stores.categories)) {
              console.log('Creating categories store...');
              const categoryStore = db.createObjectStore(DB_CONFIG.stores.categories, { keyPath: 'id' });
              categoryStore.createIndex('type', 'type', { unique: false });
            }

            if (!db.objectStoreNames.contains(DB_CONFIG.stores.user)) {
              console.log('Creating user store...');
              db.createObjectStore(DB_CONFIG.stores.user, { keyPath: 'id' });
            }


            console.log('All stores created successfully');
          } catch (error) {
            console.error('Error creating stores:', error);
            reject(new Error(`Failed to create database stores: ${error}`));
          }
        };

        request.onblocked = () => {
          console.warn('IndexedDB blocked - another connection is open');
          reject(new Error('Database is blocked by another connection. Please close other tabs with this app and try again.'));
        };
      } catch (error) {
        console.error('Unexpected error during database initialization:', error);
        reject(new Error(`Unexpected error: ${error}`));
      }
    });
  }

  private getTransaction(storeName: string, mode: IDBTransactionMode = 'readonly'): IDBObjectStore {
    if (!this.db) throw new Error('Database not initialized');
    const transaction = this.db.transaction(storeName, mode);
    return transaction.objectStore(storeName);
  }

  // Transaction methods
  async addTransaction(transaction: Transaction): Promise<void> {
    const store = this.getTransaction(DB_CONFIG.stores.transactions, 'readwrite');
    return new Promise((resolve, reject) => {
      const request = store.add(transaction);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  async getTransactions(): Promise<Transaction[]> {
    const store = this.getTransaction(DB_CONFIG.stores.transactions);
    return new Promise((resolve, reject) => {
      const request = store.getAll();
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async updateTransaction(transaction: Transaction): Promise<void> {
    const store = this.getTransaction(DB_CONFIG.stores.transactions, 'readwrite');
    return new Promise((resolve, reject) => {
      const request = store.put(transaction);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  async deleteTransaction(id: string): Promise<void> {
    const store = this.getTransaction(DB_CONFIG.stores.transactions, 'readwrite');
    return new Promise((resolve, reject) => {
      const request = store.delete(id);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  // Category methods
  async addCategory(category: Category): Promise<void> {
    console.log('🔄 Adding category to IndexedDB:', category);
    const store = this.getTransaction(DB_CONFIG.stores.categories, 'readwrite');
    return new Promise((resolve, reject) => {
      const request = store.add(category);
      request.onsuccess = () => {
        console.log('✅ Category added to IndexedDB successfully');
        resolve();
      };
      request.onerror = () => {
        console.error('❌ Error adding category to IndexedDB:', request.error);
        reject(request.error);
      };
    });
  }

  async getCategories(): Promise<Category[]> {
    console.log('🔄 Loading categories from IndexedDB...');
    const store = this.getTransaction(DB_CONFIG.stores.categories);
    return new Promise((resolve, reject) => {
      const request = store.getAll();
      request.onsuccess = () => {
        console.log('✅ Categories loaded from IndexedDB:', request.result);
        resolve(request.result);
      };
      request.onerror = () => {
        console.error('❌ Error loading categories from IndexedDB:', request.error);
        reject(request.error);
      };
    });
  }

  async updateCategory(category: Category): Promise<void> {
    const store = this.getTransaction(DB_CONFIG.stores.categories, 'readwrite');
    return new Promise((resolve, reject) => {
      const request = store.put(category);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  async deleteCategory(id: string): Promise<void> {
    const store = this.getTransaction(DB_CONFIG.stores.categories, 'readwrite');
    return new Promise((resolve, reject) => {
      const request = store.delete(id);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  // User methods
  async saveUser(user: User): Promise<void> {
    const store = this.getTransaction(DB_CONFIG.stores.user, 'readwrite');
    return new Promise((resolve, reject) => {
      const request = store.put(user);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  async getUser(): Promise<User | null> {
    const store = this.getTransaction(DB_CONFIG.stores.user);
    return new Promise((resolve, reject) => {
      const request = store.getAll();
      request.onsuccess = () => {
        const users = request.result;
        resolve(users.length > 0 ? users[0] : null);
      };
      request.onerror = () => reject(request.error);
    });
  }

  async clearAllData(): Promise<void> {
    const stores = Object.values(DB_CONFIG.stores);
    const promises = stores.map(storeName => {
      const store = this.getTransaction(storeName, 'readwrite');
      return new Promise<void>((resolve, reject) => {
        const request = store.clear();
        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
      });
    });
    await Promise.all(promises);
  }

  async clearCategories(): Promise<void> {
    const store = this.getTransaction(DB_CONFIG.stores.categories, 'readwrite');
    return new Promise((resolve, reject) => {
      const request = store.clear();
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  async forceResetDatabase(): Promise<void> {
    return new Promise((resolve, reject) => {
      // Close the current database connection
      if (this.db) {
        this.db.close();
        this.db = null;
      }

      // Delete the entire database
      const deleteRequest = indexedDB.deleteDatabase(DB_CONFIG.name);

      deleteRequest.onsuccess = async () => {
        console.log('Database deleted successfully');
        try {
          // Wait a bit to ensure deletion is complete
          await new Promise(resolve => setTimeout(resolve, 100));

          // Reinitialize the database
          await this.init();
          console.log('Database reinitialized successfully');
          resolve();
        } catch (error) {
          console.error('Failed to reinitialize database:', error);
          reject(error);
        }
      };

      deleteRequest.onerror = () => {
        reject(deleteRequest.error);
      };
    });
  }

  async clearAllStores(): Promise<void> {
    try {
      console.log('Clearing all stores...');

      if (!this.db) {
        throw new Error('Database not initialized');
      }

      const storeNames = Object.values(DB_CONFIG.stores);

      for (const storeName of storeNames) {
        if (this.db.objectStoreNames.contains(storeName)) {
          const transaction = this.db.transaction(storeName, 'readwrite');
          const store = transaction.objectStore(storeName);
          const clearRequest = store.clear();

          await new Promise<void>((resolve, reject) => {
            clearRequest.onsuccess = () => {
              console.log(`Cleared store: ${storeName}`);
              resolve();
            };
            clearRequest.onerror = () => {
              console.error(`Failed to clear store: ${storeName}`, clearRequest.error);
              reject(new Error(`Failed to clear store ${storeName}: ${clearRequest.error?.message || 'Unknown error'}`));
            };
          });
        }
      }

      console.log('All stores cleared successfully');
    } catch (error) {
      console.error('Error clearing stores:', error);
      throw error;
    }
  }



  // Export/Import methods
  async exportAllData(): Promise<any> {
    const [transactions, categories, user,] = await Promise.all([
      this.getTransactions(),
      this.getCategories(),
      this.getUser(),
    ]);

    return {
      transactions,
      categories,
      user,

      exportDate: new Date().toISOString(),
      version: '1.0'
    };
  }

  async importAllData(data: any): Promise<void> {
    // Clear existing data
    await this.clearAllData();

    // Import new data
    if (data.transactions) {
      for (const transaction of data.transactions) {
        await this.addTransaction(transaction);
      }
    }

    if (data.categories) {
      for (const category of data.categories) {
        await this.addCategory(category);
      }
    }

    if (data.user) {
      await this.saveUser(data.user);
    }


  }
}

export const indexedDBService = new IndexedDBService(); 