from fastapi import APIRouter, HTTPException
import time
from datetime import datetime
from .schemas import *

from backend.algorithms.brute_force.bubble_sort import fnBubbleSort
from backend.algorithms.brute_force.selection_sort import fnSelectionSort
from backend.algorithms.brute_force.linear_search import fnLinearSearch
from backend.algorithms.brute_force.travelling_salesman import fnTSPBruteForce
from backend.algorithms.brute_force.knapsack_problem import fnKnapsackBruteForce

from backend.algorithms.decrease_and_conquer.binary_search import fnBinarySearch
from backend.algorithms.decrease_and_conquer.josephus_problem import josephus_problem
from backend.algorithms.decrease_and_conquer.russian_peasant_multiplication import russian_multiply   
from backend.algorithms.decrease_and_conquer.insertion_sort import fnInsertionSort

# NEW ALGORITHM IMPORTS
from backend.algorithms.greedy.dijkstra import fnDijkstra
from backend.algorithms.greedy.huffman_code import fnHuffmanCoding
from backend.algorithms.divide_and_conquer.quick_sort import fnQuickSort
from backend.algorithms.divide_and_conquer.strassen_multiplication import fnMatrixMultiplication

from backend.comparison.limitations import (
    clsBinarySearchLimitationAnalyzer, 
    clsJosephusProblemLimitationAnalyzer, 
    clsRussianPeasantMultiplicationLimitationAnalyzer, 
    clsInsertionSortLimitationAnalyzer
)

router = APIRouter()

def time_function(func, *args, **kwargs):
    """Simple timing decorator"""
    start = time.perf_counter()
    try:
        result = func(*args, **kwargs)
        end = time.perf_counter()
        return result, (end - start) * 1000, None  # Convert to milliseconds
    except Exception as e:
        end = time.perf_counter()
        return None, (end - start) * 1000, str(e)

# ===== BRUTE FORCE ALGORITHMS =====

@router.post("/brute-force/bubble-sort", response_model=AlgorithmResponse)
async def bubble_sort_endpoint(request: SortRequest):
    """Execute bubble sort algorithm"""
    result, exec_time, error = time_function(fnBubbleSort, request.array, request.ascending)
    
    if error:
        raise HTTPException(status_code=400, detail=error)
    
    sorted_result, steps = result
    return AlgorithmResponse(
        result=sorted_result,
        steps=steps,
        execution_time=exec_time,
        algorithm="bubble-sort",
        metadata={
            "input_size": len(request.array),
            "steps_count": len(steps),
            "complexity": "O(n²)",
            "stable": True,
            "in_place": True
        }
    )

@router.post("/brute-force/selection-sort", response_model=AlgorithmResponse)
async def selection_sort_endpoint(request: SortRequest):
    """Execute selection sort algorithm"""
    result, exec_time, error = time_function(fnSelectionSort, request.array, request.ascending)
    
    if error:
        raise HTTPException(status_code=400, detail=error)
    
    sorted_result, steps = result
    return AlgorithmResponse(
        result=sorted_result,
        steps=steps,
        execution_time=exec_time,
        algorithm="selection-sort",
        metadata={
            "input_size": len(request.array),
            "steps_count": len(steps),
            "complexity": "O(n²)",
            "stable": False,
            "in_place": True
        }
    )

@router.post("/brute-force/linear-search", response_model=SearchResponse)
async def linear_search_endpoint(request: SearchRequest):
    """Execute linear search algorithm"""
    result, exec_time, error = time_function(fnLinearSearch, request.array, request.target)
    
    if error:
        raise HTTPException(status_code=400, detail=error)
    
    return SearchResponse(
        index=result,
        found=result != -1,
        steps=[],
        execution_time=exec_time,
        algorithm="linear-search",
        comparisons=len(request.array) if result == -1 else result + 1
    )

@router.post("/brute-force/tsp", response_model=TSPResponse)
async def tsp_brute_force_endpoint(request: TSPRequest):
    """Execute TSP brute force algorithm"""
    result, exec_time, error = time_function(
        fnTSPBruteForce, 
        request.distance_matrix, 
        request.start_city
    )
    
    if error:
        raise HTTPException(status_code=400, detail=error)
    
    best_path, min_distance, all_paths = result
    
    # Calculate factorial for total permutations
    import math
    n = len(request.distance_matrix)
    total_perms = math.factorial(n - 1) if n > 1 else 1
    
    return TSPResponse(
        optimal_path=best_path,
        min_distance=min_distance,
        all_paths=all_paths[:10],  # Limit for performance
        execution_time=exec_time,
        algorithm="tsp-brute-force",
        cities_count=n,
        total_permutations=total_perms
    )

@router.post("/brute-force/knapsack", response_model=KnapsackResponse)
async def knapsack_brute_force_endpoint(request: KnapsackRequest):
    """Execute knapsack brute force algorithm"""
    result, exec_time, error = time_function(
        fnKnapsackBruteForce,
        request.items,
        request.capacity
    )
    
    if error:
        raise HTTPException(status_code=400, detail=error)
    
    best_items, best_value, all_subsets = result
    
    # Calculate total weight of best solution
    total_weight = sum(
        item[1] for item in request.items 
        if item[0] in best_items
    )
    
    return KnapsackResponse(
        best_items=best_items,
        best_value=best_value,
        total_weight=total_weight,
        all_subsets=all_subsets[:20],  # Limit output
        execution_time=exec_time,
        algorithm="knapsack-brute-force",
        items_count=len(request.items)
    )

# ===== DECREASE AND CONQUER ALGORITHMS =====

@router.post("/decrease-conquer/binary-search", response_model=SearchResponse)
async def binary_search_endpoint(request: BinarySearchRequest):
    """Execute binary search algorithm"""
    result, exec_time, error = time_function(fnBinarySearch, request.array, request.target)
    
    if error:
        raise HTTPException(status_code=400, detail=error)
    
    # fnBinarySearch returns (index, steps)
    if isinstance(result, tuple):
        index, steps = result
    else:
        index, steps = result, []
    
    import math
    max_comparisons = math.ceil(math.log2(len(request.array))) if request.array else 0
    
    return SearchResponse(
        index=index,
        found=index != -1,
        steps=steps,
        execution_time=exec_time,
        algorithm="binary-search",
        comparisons=len(steps) if steps else max_comparisons
    )

@router.post("/decrease-conquer/insertion-sort", response_model=AlgorithmResponse)
async def insertion_sort_endpoint(request: SortRequest):
    """Execute insertion sort algorithm"""
    result, exec_time, error = time_function(fnInsertionSort, request.array, request.ascending)
    
    if error:
        raise HTTPException(status_code=400, detail=error)
    
    sorted_result, steps = result
    return AlgorithmResponse(
        result=sorted_result,
        steps=steps,
        execution_time=exec_time,
        algorithm="insertion-sort",
        metadata={
            "input_size": len(request.array),
            "steps_count": len(steps),
            "complexity": "O(n²) worst case, O(n) best case",
            "stable": True,
            "in_place": True
        }
    )

@router.post("/decrease-conquer/josephus", response_model=JosephusResponse)
async def josephus_endpoint(request: JosephusRequest):
    """Solve Josephus problem"""
    result, exec_time, error = time_function(
        josephus_problem, 
        request.length, 
        request.interval
    )
    
    if error:
        raise HTTPException(status_code=400, detail=error)
    
    survivor, elimination_order = result
    
    return JosephusResponse(
        survivor=survivor,
        elimination_order=elimination_order,
        execution_time=exec_time,
        algorithm="josephus-problem",
        people_count=request.length
    )

@router.post("/decrease-conquer/russian-multiply", response_model=RussianMultiplyResponse)
async def russian_multiply_endpoint(request: RussianMultiplyRequest):
    """Execute Russian peasant multiplication"""
    result, exec_time, error = time_function(
        russian_multiply,
        request.multiplier,
        request.multiplicand
    )
    
    if error:
        raise HTTPException(status_code=400, detail=error)
    
    product, halving, doubling = result
    
    return RussianMultiplyResponse(
        product=product,
        halving_sequence=halving,
        doubling_sequence=doubling,
        execution_time=exec_time,
        algorithm="russian-multiplication",
        steps_count=len(halving),
        multiplier=request.multiplier,
        multiplicand=request.multiplicand
    )

# ===== DIVIDE AND CONQUER ALGORITHMS =====

@router.post("/divide-conquer/quick-sort", response_model=AlgorithmResponse)
async def quick_sort_endpoint(request: SortRequest):
    """Execute quicksort algorithm"""
    result, exec_time, error = time_function(fnQuickSort, request.array, request.ascending)
    
    if error:
        raise HTTPException(status_code=400, detail=error)
    
    sorted_result, steps = result
    return AlgorithmResponse(
        result=sorted_result,
        steps=steps,
        execution_time=exec_time,
        algorithm="quick-sort",
        metadata={
            "input_size": len(request.array),
            "steps_count": len(steps),
            "complexity": "O(n log n) average, O(n²) worst case",
            "stable": False,
            "in_place": True
        }
    )

@router.post("/divide-conquer/strassen-multiplication", response_model=MatrixMultiplicationResponse)
async def strassen_multiplication_endpoint(request: MatrixMultiplicationRequest):
    """Execute Strassen's matrix multiplication algorithm"""
    result, exec_time, error = time_function(
        fnMatrixMultiplication, 
        request.matrix_a, 
        request.matrix_b, 
        request.method
    )
    
    if error:
        raise HTTPException(status_code=400, detail=error)
    
    result_matrix, steps = result
    
    return MatrixMultiplicationResponse(
        result_matrix=result_matrix,
        steps=steps,
        execution_time=exec_time,
        algorithm="strassen-multiplication",
        method=request.method,
        matrix_size=len(request.matrix_a),
        operations_count=len(steps)
    )

# ===== GREEDY ALGORITHMS =====

@router.post("/greedy/dijkstra", response_model=DijkstraResponse)
async def dijkstra_endpoint(request: DijkstraRequest):
    """Execute Dijkstra's shortest path algorithm"""
    result, exec_time, error = time_function(
        fnDijkstra, 
        request.graph_data, 
        request.start_vertex
    )
    
    if error:
        raise HTTPException(status_code=400, detail=error)
    
    distances, steps, paths = result
    
    return DijkstraResponse(
        distances=distances,
        paths=paths,
        steps=steps,
        execution_time=exec_time,
        algorithm="dijkstra",
        start_vertex=request.start_vertex,
        vertices_count=len(request.graph_data['vertices'])
    )

@router.post("/greedy/huffman-coding", response_model=HuffmanResponse)
async def huffman_coding_endpoint(request: HuffmanRequest):
    """Execute Huffman coding algorithm"""
    result, exec_time, error = time_function(fnHuffmanCoding, request.message)
    
    if error:
        raise HTTPException(status_code=400, detail=error)
    
    codes, encoded_message, steps, frequencies = result
    
    # Calculate compression metrics
    original_length = len(request.message) * 8  # ASCII bits
    encoded_length = len(encoded_message)
    compression_ratio = (encoded_length / original_length) * 100 if original_length > 0 else 0
    
    return HuffmanResponse(
        codes=codes,
        encoded_message=encoded_message,
        character_frequencies=frequencies,
        steps=steps,
        execution_time=exec_time,
        algorithm="huffman-coding",
        original_length=original_length,
        encoded_length=encoded_length,
        compression_ratio=compression_ratio
    )

# ===== LIMITATION ANALYSIS ENDPOINTS =====

@router.post("/analysis/binary-search", response_model=LimitationAnalysisResponse)
async def binary_search_analysis(request: LimitationAnalysisRequest):
    """Analyze binary search limitations"""
    try:
        analyzer = clsBinarySearchLimitationAnalyzer()
        
        results = []
        for size in request.input_sizes:
            # Generate test data
            test_data = list(range(1, size + 1))  # Sorted array
            target = size // 2  # Middle element
            
            # Run analysis
            start_time = time.perf_counter()
            index, steps = fnBinarySearch(test_data, target)
            end_time = time.perf_counter()
            
            results.append({
                "input_size": size,
                "execution_time": (end_time - start_time) * 1000,
                "comparisons": len(steps) if steps else 0,
                "found": index != -1,
                "theoretical_max_comparisons": size.bit_length() - 1
            })
        
        summary = {
            "algorithm": "binary-search",
            "time_complexity": "O(log n)",
            "space_complexity": "O(1)",
            "average_comparisons": sum(r["comparisons"] for r in results) / len(results),
            "requires_sorted_input": True
        }
        
        recommendations = [
            "Use only on sorted arrays",
            "Excellent for large datasets",
            "Consider sorting cost if array is unsorted",
            "O(log n) makes it very scalable"
        ]
        
        return LimitationAnalysisResponse(
            algorithm="binary-search",
            analysis_type=request.test_type,
            results=results,
            summary=summary,
            recommendations=recommendations
        )
        
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/analysis/josephus", response_model=LimitationAnalysisResponse)
async def josephus_analysis(request: LimitationAnalysisRequest):
    """Analyze Josephus problem limitations"""
    try:
        results = []
        for size in request.input_sizes:
            interval = 3  # Fixed interval for testing
            
            start_time = time.perf_counter()
            survivor, elimination_order = josephus_problem(size, interval)
            end_time = time.perf_counter()
            
            results.append({
                "input_size": size,
                "execution_time": (end_time - start_time) * 1000,
                "survivor": survivor,
                "interval": interval,
                "eliminations": len(elimination_order) - 1
            })
        
        summary = {
            "algorithm": "josephus-problem",
            "time_complexity": "O(n)",
            "space_complexity": "O(n)",
            "pattern": "Elimination sequence depends on interval",
            "scalability": "Linear growth"
        }
        
        recommendations = [
            "Efficient for simulation problems",
            "Memory usage grows with input size",
            "Good performance characteristics",
            "Useful for circular elimination problems"
        ]
        
        return LimitationAnalysisResponse(
            algorithm="josephus-problem",
            analysis_type=request.test_type,
            results=results,
            summary=summary,
            recommendations=recommendations
        )
        
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/analysis/russian-multiply", response_model=LimitationAnalysisResponse)
async def russian_multiply_analysis(request: LimitationAnalysisRequest):
    """Analyze Russian multiplication limitations"""
    try:
        results = []
        test_pairs = [
            (17, 19), (125, 64), (255, 127), (1023, 511), (2047, 1024)
        ]
        
        for i, size in enumerate(request.input_sizes[:len(test_pairs)]):
            multiplier, multiplicand = test_pairs[i]
            
            start_time = time.perf_counter()
            product, halving, doubling = russian_multiply(multiplier, multiplicand)
            end_time = time.perf_counter()
            
            results.append({
                "multiplier": multiplier,
                "multiplicand": multiplicand,
                "product": product,
                "steps": len(halving),
                "execution_time": (end_time - start_time) * 1000,
                "theoretical_steps": multiplier.bit_length()
            })
        
        summary = {
            "algorithm": "russian-multiplication",
            "time_complexity": "O(log n)",
            "space_complexity": "O(log n)",
            "operations": "Only addition, halving, doubling",
            "efficiency": "Logarithmic in input size"
        }
        
        recommendations = [
            "Excellent for teaching binary concepts",
            "Useful when multiplication is expensive",
            "Good for mental calculation techniques",
            "Demonstrates logarithmic algorithms"
        ]
        
        return LimitationAnalysisResponse(
            algorithm="russian-multiplication",
            analysis_type=request.test_type,
            results=results,
            summary=summary,
            recommendations=recommendations
        )
        
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

# ===== UTILITY ENDPOINTS =====

@router.get("/algorithms", response_model=AlgorithmListResponse)
async def get_algorithms():
    """Get list of available algorithms"""
    brute_force = [
        "bubble-sort", "selection-sort", "linear-search", "tsp", "knapsack"
    ]
    decrease_conquer = [
        "binary-search", "insertion-sort", "josephus", "russian-multiply"
    ]
    divide_conquer = [
        "quick-sort", "strassen-multiplication"
    ]
    greedy = [
        "dijkstra", "huffman-coding"
    ]
    optimization = ["tsp", "knapsack"]
    
    total = len(brute_force) + len(decrease_conquer) + len(divide_conquer) + len(greedy)
    
    return AlgorithmListResponse(
        brute_force=brute_force,
        decrease_and_conquer=decrease_conquer,
        divide_and_conquer=divide_conquer,
        greedy=greedy,
        optimization=optimization,
        total=total
    )

@router.get("/health", response_model=HealthResponse)
async def health_check():
    """Simple health check"""
    return HealthResponse(
        status="healthy",
        message="Algorithm Visualizer API is running",
        algorithms_available=13,  # Updated to include new algorithms
        timestamp=datetime.now().isoformat()
    )

@router.get("/algorithms/{algorithm}/info")
async def get_algorithm_info(algorithm: str):
    """Get detailed information about a specific algorithm"""
    
    algorithm_info = {
        "bubble-sort": {
            "name": "Bubble Sort",
            "category": "brute-force",
            "complexity": {"time": "O(n²)", "space": "O(1)"},
            "characteristics": ["Stable", "In-place", "Adaptive"],
            "description": "Simple comparison-based sorting algorithm"
        },
        "selection-sort": {
            "name": "Selection Sort", 
            "category": "brute-force",
            "complexity": {"time": "O(n²)", "space": "O(1)"},
            "characteristics": ["Unstable", "In-place", "Not adaptive"],
            "description": "Finds minimum element and places it at the beginning"
        },
        "linear-search": {
            "name": "Linear Search",
            "category": "brute-force", 
            "complexity": {"time": "O(n)", "space": "O(1)"},
            "characteristics": ["Works on unsorted data", "Simple"],
            "description": "Sequential search through array elements"
        },
        "binary-search": {
            "name": "Binary Search",
            "category": "decrease-and-conquer",
            "complexity": {"time": "O(log n)", "space": "O(1)"},
            "characteristics": ["Requires sorted input", "Very efficient"],
            "description": "Divide and conquer search algorithm"
        },
        "tsp": {
            "name": "Traveling Salesman Problem",
            "category": "optimization",
            "complexity": {"time": "O(n!)", "space": "O(n)"},
            "characteristics": ["NP-hard", "Exponential time"],
            "description": "Find shortest route visiting all cities"
        },
        "knapsack": {
            "name": "0/1 Knapsack Problem", 
            "category": "optimization",
            "complexity": {"time": "O(2^n)", "space": "O(2^n)"},
            "characteristics": ["NP-hard", "Exponential time"],
            "description": "Maximize value within weight constraint"
        },
        "insertion-sort": {
            "name": "Insertion Sort",
            "category": "decrease-and-conquer",
            "complexity": {"time": "O(n²)", "space": "O(1)"},
            "characteristics": ["Stable", "In-place", "Adaptive"],
            "description": "Builds sorted array one element at a time"
        },
        "quick-sort": {
            "name": "Quick Sort",
            "category": "divide-and-conquer",
            "complexity": {"time": "O(n log n) avg, O(n²) worst", "space": "O(log n)"},
            "characteristics": ["Unstable", "In-place", "Divide-and-conquer"],
            "description": "Efficiently sorts by partitioning around a pivot"
        },
        "strassen-multiplication": {
            "name": "Strassen Matrix Multiplication",
            "category": "divide-and-conquer",
            "complexity": {"time": "O(n^2.807)", "space": "O(n²)"},
            "characteristics": ["Divide-and-conquer", "Optimized multiplication"],
            "description": "Matrix multiplication using 7 recursive multiplications"
        },
        "dijkstra": {
            "name": "Dijkstra's Shortest Path",
            "category": "greedy",
            "complexity": {"time": "O((V + E) log V)", "space": "O(V)"},
            "characteristics": ["Greedy", "Single-source shortest path", "Non-negative weights"],
            "description": "Finds shortest paths from source to all vertices"
        },
        "huffman-coding": {
            "name": "Huffman Coding",
            "category": "greedy",
            "complexity": {"time": "O(n log n)", "space": "O(n)"},
            "characteristics": ["Greedy", "Lossless compression", "Optimal prefix codes"],
            "description": "Creates optimal variable-length codes for data compression"
        },
        "josephus": {
            "name": "Josephus Problem",
            "category": "decrease-and-conquer", 
            "complexity": {"time": "O(n²)", "space": "O(1)"},
            "characteristics": ["Stable", "In-place", "Adaptive", "Online"],
            "description": "Builds sorted array one element at a time"
        },
        "josephus": {
            "name": "Josephus Problem",
            "category": "mathematical",
            "complexity": {"time": "O(n)", "space": "O(n)"},
            "characteristics": ["Elimination problem", "Circular"],
            "description": "Find survivor in circular elimination process"
        },
        "russian-multiply": {
            "name": "Russian Peasant Multiplication",
            "category": "mathematical",
            "complexity": {"time": "O(log n)", "space": "O(log n)"},
            "characteristics": ["Binary-based", "Ancient algorithm"],
            "description": "Multiply using only addition, halving, doubling"
        }
    }
    
    if algorithm not in algorithm_info:
        raise HTTPException(status_code=404, detail=f"Algorithm '{algorithm}' not found")
    
    return algorithm_info[algorithm]

@router.get("/algorithms/categories")
async def get_algorithm_categories():
    """Get algorithms organized by categories"""
    return {
        "brute_force": {
            "description": "Algorithms that try all possible solutions",
            "algorithms": ["bubble-sort", "selection-sort", "linear-search", "tsp", "knapsack"],
            "characteristics": ["Exhaustive search", "Guaranteed optimal solution", "High time complexity"]
        },
        "decrease_and_conquer": {
            "description": "Algorithms that reduce problem size at each step", 
            "algorithms": ["binary-search", "insertion-sort", "josephus", "russian-multiply"],
            "characteristics": ["Divide problem", "Solve smaller instance", "Often recursive"]
        },
        "optimization": {
            "description": "Hard optimization problems",
            "algorithms": ["tsp", "knapsack"],
            "characteristics": ["NP-hard", "Exponential solutions", "Practical limits"]
        }
    }