# Backend API Documentation

This is the FastAPI backend for the Algorithm Visualization application. It provides REST API endpoints for executing various algorithms and returning results with step-by-step execution data.

## Features

- RESTful API endpoints for algorithm execution
- Step-by-step algorithm visualization data
- Performance metrics and execution time tracking
- Interactive API documentation with Swagger UI
- Algorithm implementations organized by paradigm

## Setup Instructions

### Prerequisites
- Python 3.11 or higher
- pip package manager

### Installation

1. **Create and activate a virtual environment:**
   ```bash
   python -m venv virt
   ```

2. **Activate the virtual environment:**
   ```bash
   # On Windows:
   .\virt\Scripts\activate
   
   # On macOS/Linux:
   source virt/bin/activate
   ```

3. **Navigate to the backend directory:**
   ```bash
   cd backend
   ```

4. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

### Running the Server

1. **Start the development server:**
   ```bash
   # From the root directory
   uvicorn backend.api:app --reload
   ```

2. **Access the application:**
   - API Base URL: `http://localhost:8000`
   - Interactive API Documentation: `http://localhost:8000/docs`
   - Alternative API Docs: `http://localhost:8000/redoc`

## API Endpoints

### Brute Force Algorithms
- `POST /brute-force/bubble-sort` - Execute bubble sort algorithm
- `POST /brute-force/selection-sort` - Execute selection sort algorithm
- `POST /brute-force/linear-search` - Execute linear search algorithm
- `POST /brute-force/tsp` - Solve Travelling Salesman Problem
- `POST /brute-force/knapsack` - Solve Knapsack Problem

### Decrease and Conquer Algorithms
- `POST /decrease-conquer/binary-search` - Execute binary search algorithm
- `POST /decrease-conquer/insertion-sort` - Execute insertion sort algorithm
- `POST /decrease-conquer/josephus` - Solve Josephus Problem
- `POST /decrease-conquer/russian-multiply` - Execute Russian multiplication

### Utility Endpoints
- `GET /algorithms` - Get list of available algorithms
- `GET /algorithms/{algorithm}/info` - Get algorithm information
- `GET /health` - Health check endpoint

## Project Structure

```
backend/
├── algorithms/                 # Algorithm implementations
│   ├── brute_force/           # Brute force paradigm
│   └── decrease_and_conquer/  # Decrease and conquer paradigm
├── api.py                     # FastAPI application entry point
├── routes.py                  # API route definitions
└── requirements.txt           # Python dependencies
```

## Development

The API uses FastAPI with automatic interactive documentation. All endpoints include proper request/response models and validation. For questions or issues, please refer to the main project documentation.

