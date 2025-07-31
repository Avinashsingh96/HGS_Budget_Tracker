/**
 * @fileoverview Main entry point for the HGS Budget Tracker React application.
 * This file initializes the React application with Redux store integration
 * and renders the root App component into the DOM.
 * 
 * @author HGS Budget Tracker Team
 * @version 1.0.0
 * @since 2024
 */

/**
 * React library import for JSX support and React features.
 * React is the core library that provides the foundation for building
 * user interfaces with components.
 */
import React from 'react'

/**
 * ReactDOM client-side rendering utilities.
 * ReactDOM provides methods to render React components to the DOM.
 * The 'client' import is specifically for React 18+ concurrent features
 * and is the modern way to render React applications.
 */
import ReactDOM from 'react-dom/client'

/**
 * Redux Provider component for global state management.
 * The Provider wraps the entire application and makes the Redux store
 * available to all child components through React's context API.
 */
import { Provider } from 'react-redux'

/**
 * Redux store configuration and instance.
 * This store contains all the application state, reducers, and middleware
 * for managing the budget tracker's data (transactions, categories, etc.).
 */
import { store } from './store'

/**
 * Root App component that contains the entire application structure.
 * This is the main component that defines the routing, layout, and
 * overall structure of the budget tracker application.
 */
import App from './App.tsx'

/**
 * Global CSS styles for the application.
 * This file contains Tailwind CSS utilities and custom styles that
 * define the visual appearance and layout of the entire application.
 */
import './index.css'

/**
 * Application entry point - renders the React app to the DOM.
 * 
 * This code:
 * 1. Finds the DOM element with id 'root' (typically in index.html)
 * 2. Creates a React root using ReactDOM.createRoot() (React 18+ API)
 * 3. Renders the App component wrapped in necessary providers
 * 
 * @description The render process:
 * - ReactDOM.createRoot() creates a root container for concurrent features
 * - React.StrictMode enables additional development checks and warnings
 * - Provider makes the Redux store available throughout the component tree
 * - App component is the main application component
 * 
 * @example
 * // The DOM structure this creates:
 * <div id="root">
 *   <App /> <!-- Wrapped in Provider and StrictMode -->
 * </div>
 */
ReactDOM.createRoot(document.getElementById('root')!).render(
  /**
   * React.StrictMode is a development-only feature that:
   * - Identifies components with unsafe lifecycles
   * - Warns about legacy string ref API usage
   * - Warns about deprecated findDOMNode usage
   * - Detects unexpected side effects
   * - Detects legacy context API
   * - Ensures reusable state
   */
  <React.StrictMode>
    /**
     * Redux Provider component that:
     * - Wraps the entire application
     * - Provides the Redux store to all child components
     * - Enables components to access and modify global state
     * - Uses React Context API internally for state distribution
     */
    <Provider store={store}>
      /**
       * Main App component that contains:
       * - Application routing configuration
       * - Main layout structure
       * - Navigation components
       * - All page components and their logic
       */
      <App />
    </Provider>
  </React.StrictMode>,
) 