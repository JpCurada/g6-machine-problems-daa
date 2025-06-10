# Frontend Application

This is the React TypeScript frontend for the Algorithm Visualization application. It provides an interactive user interface for configuring, executing, and visualizing various algorithms with step-by-step animations.

## Technology Stack

- **React 18** - Modern React with hooks and functional components
- **TypeScript** - Type-safe JavaScript development
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework for styling
- **React Hooks** - Custom hooks for API integration and state management

## Features

- Interactive algorithm configuration with dynamic input forms
- Real-time algorithm visualization with step-by-step animations
- Responsive design that works on desktop and mobile devices
- Performance metrics and execution time tracking
- Smooth animations and transitions for enhanced user experience
- Type-safe API integration with the FastAPI backend

## Setup Instructions

### Prerequisites
- Node.js 18 or higher
- npm or yarn package manager

### Installation

1. **Navigate to the frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

### Development

1. **Start the development server:**
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:5173`

2. **Build for production:**
   ```bash
   npm run build
   ```

3. **Preview production build:**
   ```bash
   npm run preview
   ```

## Project Structure

```
frontend/
├── src/
│   ├── components/          # React components
│   │   ├── common/         # Shared UI components
│   │   └── visualizations/ # Algorithm visualization components
│   ├── hooks/              # Custom React hooks
│   ├── pages/              # Application pages
│   ├── services/           # API service layer
│   ├── styles/             # CSS and styling files
│   └── main.tsx            # Application entry point
├── public/                 # Static assets
├── package.json            # Node.js dependencies and scripts
├── tailwind.config.js      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
└── vite.config.ts          # Vite configuration
```

## Available Algorithms

The frontend supports visualization for the following algorithms:

**Brute Force:**
- Bubble Sort with step-by-step array visualization
- Selection Sort with highlighting of current elements
- Linear Search with element-by-element progression
- Travelling Salesman Problem with path visualization
- Knapsack Problem with subset selection display

**Decrease and Conquer:**
- Binary Search with range narrowing animation
- Insertion Sort with sorted/unsorted region highlighting
- Josephus Problem with elimination sequence
- Russian Multiplication with step-by-step calculation

## Configuration

The application automatically detects the API base URL:
- Development: `http://localhost:8000`
- Production: Uses environment variable or falls back to production URL

## Development Guidelines

- All components are written in TypeScript with proper type definitions
- API calls are handled through custom hooks in the `hooks/` directory
- Styling uses Tailwind CSS utility classes
- Animation states are managed with React state and CSS transitions

For questions or issues, please refer to the main project documentation.
