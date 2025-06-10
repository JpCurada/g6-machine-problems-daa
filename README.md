# Group 6: Centralized Machine Problems Repository

[![Python 3.11](https://img.shields.io/badge/Python-3.11-blue.svg)](https://www.python.org/downloads/release/python-311/)
[![React](https://img.shields.io/badge/Built%20with-React-61DAFB.svg)](https://reactjs.org/)
[![FastAPI](https://img.shields.io/badge/API-FastAPI-009688.svg)](https://fastapi.tiangolo.com/)
[![TypeScript](https://img.shields.io/badge/Built%20with-TypeScript-3178C6.svg)](https://www.typescriptlang.org/)

## Table of Contents
- [Overview](#overview)
- [Architecture](#architecture)
- [Directory Structure](#directory-structure)
- [Group Members](#group-members)
- [Environment Setup](#environment-setup)
- [Usage](#usage)

## Overview
This repository serves as the centralized hub for all machine problems (MPs) of Group 6 in the Design and Analysis of Algorithms course. The project features an interactive web application with algorithm visualizations and analysis tools, built with a React TypeScript frontend and FastAPI Python backend.

## Architecture
- **Frontend**: React with TypeScript, Vite build tool, and Tailwind CSS for styling
- **Backend**: FastAPI with Python for algorithm implementations and API endpoints
- **Visualization**: Interactive step-by-step algorithm visualizations with animation controls
- **Algorithms**: Implementations of various algorithmic paradigms including Brute Force and Decrease & Conquer

## Directory Structure
```
├── backend/                 # FastAPI backend application
│   ├── algorithms/          # Algorithm implementations by paradigm
│   │   ├── brute_force/     # Brute force algorithms
│   │   └── decrease_and_conquer/  # Decrease and conquer algorithms
│   ├── routes.py           # API route definitions
│   ├── api.py              # FastAPI application entry point
│   └── requirements.txt    # Python dependencies
├── frontend/               # React TypeScript frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── services/       # API service layer
│   │   ├── hooks/          # Custom React hooks
│   │   └── pages/          # Application pages
│   ├── package.json        # Node.js dependencies
│   └── vite.config.ts      # Vite configuration
└── README.md               # Project documentation
```

## Group Members
- CURADA, John Paul M.
- ZARAGOZA, Marie Criz 
- LUCERO, Ken Audie S.
- FAELDONIA, Elias Von Isaac R. 
- OJA, Ma. Izabelle L.
- RACELIS, Michael Richmond V.
- CANSINO, Florence Lee F.
- RAMILO, Gian G.
- MAGTANONG, Gabriel Andre E.

## Environment Setup

### Prerequisites
- Python 3.11 or higher
- Node.js 18 or higher
- npm or yarn package manager

### Backend Setup
1. Create and activate a Python virtual environment:
   ```bash
   python -m venv virt
   # On Windows:
   .\virt\Scripts\activate
   # On macOS/Linux:
   source virt/bin/activate
   ```

2. Install Python dependencies:
   ```bash
   cd backend
   pip install -r requirements.txt
   ```

### Frontend Setup
1. Install Node.js dependencies:
   ```bash
   cd frontend
   npm install
   ```

## Usage

### Running the Application

1. **Start the Backend Server:**
   ```bash
   # From the root directory
   uvicorn backend.api:app --reload
   ```
   The API will be available at `http://localhost:8000`
   API documentation: `http://localhost:8000/docs`

2. **Start the Frontend Development Server:**
   ```bash
   # In a new terminal, from the frontend directory
   cd frontend
   npm run dev
   ```
   The application will be available at `http://localhost:5173`

### Available Algorithms

**Brute Force Algorithms:**
- Bubble Sort
- Selection Sort
- Linear Search
- Travelling Salesman Problem
- Knapsack Problem

**Decrease and Conquer Algorithms:**
- Binary Search
- Insertion Sort
- Josephus Problem
- Russian Multiplication Method

### Features
- Interactive algorithm visualization with step-by-step animations
- Real-time performance metrics and analysis
- Configurable input parameters for each algorithm
- Responsive design for desktop and mobile devices
- API endpoint testing through integrated documentation

This repository is for academic use only by Group 6 members of the Design and Analysis of Algorithms course.











