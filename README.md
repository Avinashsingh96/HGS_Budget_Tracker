# HGS Budget Tracker

A comprehensive, modern budget tracking application built with React, TypeScript, and Redux. This application helps users manage their personal finances with an intuitive interface and powerful analytics.

## 🚀 Features

### Core Functionality
- **Transaction Management**: Add, edit, and delete income and expense transactions
- **Category Management**: Organize transactions with customizable categories
- **Budget Tracking**: Set and monitor monthly budgets with visual progress indicators
- **Financial Analytics**: Comprehensive charts and insights for better financial planning
- **Data Persistence**: Local data storage using IndexedDB for offline functionality
- **Export/Import**: Backup and restore your financial data

### User Experience
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Modern UI**: Clean, intuitive interface built with Tailwind CSS
- **Real-time Updates**: Instant feedback and data synchronization
- **Keyboard Shortcuts**: Power user features for faster navigation
- **Dark/Light Theme**: Customizable appearance preferences

### Advanced Features
- **Financial Goals**: Set and track savings and spending goals
- **Smart Insights**: AI-powered financial recommendations and alerts
- **Search & Filter**: Advanced transaction search and filtering capabilities
- **Data Visualization**: Interactive charts and graphs for financial analysis
- **Performance Optimized**: Fast loading and smooth interactions

## 🛠️ Technology Stack

### Frontend
- **React 18** - Modern React with hooks and concurrent features
- **TypeScript** - Type-safe development with enhanced IDE support
- **Redux Toolkit** - State management with RTK Query for data fetching
- **React Router** - Client-side routing with nested routes
- **Tailwind CSS** - Utility-first CSS framework for rapid UI development

### UI Components
- **Radix UI** - Accessible, unstyled UI primitives
- **Lucide React** - Beautiful, customizable icons
- **Recharts** - Composable charting library for data visualization
- **Class Variance Authority** - Type-safe component variants

### Development Tools
- **Vite** - Fast build tool and development server
- **ESLint** - Code linting and formatting
- **TypeScript** - Static type checking
- **PostCSS** - CSS processing and optimization

## 📁 Project Structure

```
src/
├── components/           # React components organized by atomic design
│   ├── molecules/       # Small, reusable components
│   ├── organisms/       # Complex components composed of molecules
│   ├── pages/          # Page-level components
│   ├── templates/      # Layout templates
│   └── ui/             # Base UI components
├── lib/                # Utility libraries and constants
│   ├── utils.ts        # Common utility functions
│   └── constants.ts    # Application constants
├── services/           # Data and external service integrations
│   └── indexedDB.ts    # IndexedDB service for local storage
├── store/              # Redux store configuration
│   ├── hooks.ts        # Redux hooks
│   ├── index.ts        # Store configuration
│   └── slices/         # Redux slices
├── types/              # TypeScript type definitions
└── utils/              # Additional utility functions
```

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/hgs-budget-tracker.git
   cd hgs-budget-tracker
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the application

### Building for Production

```bash
npm run build
# or
yarn build
```

The built files will be in the `dist/` directory.

## 📖 Usage Guide

### Adding Transactions
1. Click the "Add Transaction" button on the home page
2. Fill in the transaction details (amount, description, category, date)
3. Select the transaction type (income or expense)
4. Click "Save" to add the transaction

### Managing Categories
1. Navigate to the Categories page
2. Click "Add Category" to create a new category
3. Customize the category name, type, and color
4. Use the edit/delete buttons to manage existing categories

### Setting Budgets
1. Go to the Analytics page
2. Click on "Budget Settings"
3. Set your monthly budget for different categories
4. Monitor your progress with visual indicators

### Viewing Analytics
1. Visit the Analytics page for comprehensive insights
2. Explore different chart types (pie, bar, line charts)
3. Filter data by date range and categories
4. Export reports for external analysis

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:

```env
VITE_APP_NAME=HGS Budget Tracker
VITE_APP_VERSION=1.0.0
VITE_DEFAULT_CURRENCY=INR
VITE_DEFAULT_LOCALE=en-IN
```

### Customization
- **Colors**: Modify the color palette in `src/lib/constants.ts`
- **Categories**: Update default categories in the constants file
- **Validation**: Adjust validation rules as needed
- **Styling**: Customize Tailwind CSS classes and components

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests in watch mode
npm test:watch

# Generate coverage report
npm test:coverage
```

## 📦 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Configure build settings:
   - Build Command: `npm run build`
   - Output Directory: `dist`
3. Deploy automatically on push to main branch

### Netlify
1. Connect your repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Deploy your site

### Manual Deployment
1. Build the project: `npm run build`
2. Upload the `dist/` folder to your web server
3. Configure your server to serve the static files

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Add tests** for new functionality
5. **Commit your changes**
   ```bash
   git commit -m 'Add amazing feature'
   ```
6. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
7. **Open a Pull Request**

### Code Style Guidelines
- Use TypeScript for all new code
- Follow ESLint configuration
- Write meaningful commit messages
- Add JSDoc comments for functions
- Use meaningful variable and function names

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **React Team** for the amazing framework
- **Tailwind CSS** for the utility-first CSS framework
- **Redux Toolkit** for simplified state management
- **Vite** for the fast build tool
- **Lucide** for the beautiful icons
- **Recharts** for the charting library

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/your-username/hgs-budget-tracker/issues) page
2. Create a new issue with detailed information
3. Contact the development team

## 🔄 Changelog

### Version 1.0.0 (Current)
- ✨ Initial release with core budget tracking features
- 🎨 Modern, responsive UI design
- 📊 Comprehensive analytics and reporting
- 💾 Local data persistence with IndexedDB
- 🔧 Optimized code structure and performance
- 📱 Mobile-friendly interface
- 🎯 Financial goals and insights
- 📤 Export/import functionality

---

**Made with ❤️ by the HGS Budget Tracker Team** 