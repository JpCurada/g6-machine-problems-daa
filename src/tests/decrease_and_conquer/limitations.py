"""
Algorithm Limitations Testing Framework

This module demonstrates the limitations of common decrease-and-conquer algorithms 
through empirical testing and analysis. Each test class provides comprehensive 
insights into the practical constraints and inefficiencies of these algorithms.

Contributed by Ken Audie Lucero and Izabelle Oja
"""

from src.algorithms.decrease_and_conquer.insertion_sort import fnInsertionSort
from src.algorithms.decrease_and_conquer.binary_search import fnBinarySearch
from src.utils.helpers import create_array, timeit
from src.algorithms.decrease_and_conquer.josephus_problem import josephus_problem
from src.algorithms.decrease_and_conquer.russian_peasant_multiplication import russian_multiply
import time
import sys
import random
from typing import Dict, List, Tuple, Any


class clsInsertionSortLimitationAnalyzer:
    """
    Comprehensive analysis of Insertion Sort algorithm limitations.
    
    Research Summary from Credible Sources:
    
    Time Complexity Analysis:
    - Best Case: O(n) - when array is already sorted
    - Average Case: O(n²) - for random order elements  
    - Worst Case: O(n²) - when array is reverse sorted
    
    Key Limitations Identified:
    1. Quadratic Performance: The O(n²) complexity makes it inefficient for large datasets
    2. Input Sensitivity: Performance varies dramatically based on initial order
    
    References:
    - GeeksforGeeks: https://www.geeksforgeeks.org/insertion-sort-algorithm/
    - Wikipedia: https://en.wikipedia.org/wiki/Insertion_sort
    - W3Schools: https://www.w3schools.com/dsa/dsa_timecomplexity_insertionsort.php
    - Brilliant Math: https://brilliant.org/wiki/insertion/
    """
    
    def __init__(self):
        self.arrTestSizes = [100, 1000, 5000, 10000, 25000]
        
    def _mCreateArray(self, intSize, strArrayType):
        """Wrapper for the helper function to match expected interface."""
        return create_array(self, intSize, strArrayType)
        
    def mAnalyzeQuadraticScaling(self) -> Dict[str, Any]:
        """
        Demonstrates the O(n²) quadratic time complexity limitation.
        
        Returns:
            Dict containing size vs operations data showing quadratic growth
        """
        dictResults = {
            'strTestName': 'Quadratic Time Complexity Limitation',
            'strDescription': 'Shows how operations grow quadratically with input size',
            'arrData': [],
            'strTheoreticalComplexity': 'O(n²)',
            'strLimitationSeverity': 'Critical for large datasets'
        }
        
        for intSize in self.arrTestSizes:
            # Test with random array (average case)
            arrInput = self._mCreateArray(intSize, "random")
            dblStartTime = time.time()
            _, arrSteps = fnInsertionSort(arrInput.copy())
            dblExecutionTime = time.time() - dblStartTime
            
            dictResults['arrData'].append({
                'intInputSize': intSize,
                'intOperationsCount': len(arrSteps),
                'dblExecutionTimeMs': dblExecutionTime * 1000,
                'dblOperationsPerNSquared': len(arrSteps) / (intSize * intSize),
                'intTheoreticalMaxOperations': intSize * (intSize - 1) // 2
            })
            
        return dictResults
    
    def mAnalyzeInputSensitivityExtremes(self) -> Dict[str, Any]:
        """
        Demonstrates extreme input sensitivity across different data distributions.
        
        Returns:
            Dict showing dramatic performance differences based on input order
        """
        intTestSize = 5000
        dictResults = {
            'strTestName': 'Input Sensitivity Limitation',
            'strDescription': 'Shows performance variation based on input characteristics',
            'intTestSize': intTestSize,
            'arrScenarios': []
        }
        
        arrScenarios = [
            ('sorted', 'Already sorted (best case)'),
            ('reverse', 'Reverse sorted (worst case)'), 
            ('random', 'Random order (average case)')
        ]
        
        for strArrayType, strDescription in arrScenarios:
            arrInput = self._mCreateArray(intTestSize, strArrayType)
            
            dblStartTime = time.time()
            _, arrSteps = fnInsertionSort(arrInput.copy())
            dblExecutionTime = time.time() - dblStartTime
            
            dictResults['arrScenarios'].append({
                'strScenario': strArrayType,
                'strDescription': strDescription,
                'intOperationsCount': len(arrSteps),
                'dblExecutionTimeMs': dblExecutionTime * 1000,
                'dblEfficiencyRatio': len(arrSteps) / intTestSize
            })
            
        return dictResults


class clsBinarySearchLimitationAnalyzer:
    """
    Comprehensive analysis of Binary Search algorithm limitations.
    
    Core Requirements and Limitations:
    1. Sorted Data Prerequisite: Binary search ONLY works on sorted arrays
    2. Small Dataset Overhead: Not always faster than linear search for small arrays
    
    Time Complexity Analysis:
    - Best Case: O(1) - target is at middle position
    - Average/Worst Case: O(log n) - logarithmic search space reduction
    
    Key Limitations Identified:
    1. Preprocessing Cost: O(n log n) to sort unsorted data
    2. Limited Applicability: Cannot be used on linked lists efficiently
    
    References:
    - GeeksforGeeks: https://www.geeksforgeeks.org/binary-search/
    - Wikipedia: https://en.wikipedia.org/wiki/Binary_search_algorithm
    - YourAcademy: https://youcademy.org/pros-cons-of-binary-search-algorithm/
    - GeeksforGeeks Complexity: https://www.geeksforgeeks.org/complexity-analysis-of-binary-search/
    """
    
    def __init__(self):
        self.arrTestSizes = [100, 1000, 10000, 100000]
        self.arrSmallSizes = [5, 10, 20, 50]
        
    def _mCreateArray(self, intSize, strArrayType):
        """Wrapper for the helper function to match expected interface."""
        return create_array(self, intSize, strArrayType)
    
    def mAnalyzeSortedDataDependency(self) -> Dict[str, Any]:
        """
        Demonstrates the critical limitation of requiring sorted data.
        
        Returns:
            Dict showing failure cases and preprocessing costs for unsorted data
        """
        dictResults = {
            'strTestName': 'Sorted Data Dependency Limitation',
            'strDescription': 'Binary search fails completely on unsorted data',
            'strCriticalLimitation': 'CANNOT work on unsorted arrays',
            'arrTestCases': []
        }
        
        intTestSize = 1000
        
        # Test scenarios
        arrScenarios = [
            ('sorted', 'Properly sorted array'),
            ('random', 'Completely unsorted array')
        ]
        
        for strArrayType, strDescription in arrScenarios:
            arrInput = self._mCreateArray(intTestSize, strArrayType)
            
            # Pick a target that exists in the array
            intTarget = arrInput[intTestSize // 2] if strArrayType == 'sorted' else arrInput[0]
            
            # Test binary search
            try:
                intIndex, arrSteps = fnBinarySearch(arrInput, intTarget)
                blnSuccess = intIndex != -1 and arrInput[intIndex] == intTarget
            except:
                intIndex, arrSteps = -1, []
                blnSuccess = False
            
            # Calculate preprocessing cost if sorting needed
            if strArrayType != 'sorted':
                dblSortStart = time.time()
                arrSorted = sorted(arrInput)
                dblSortTime = time.time() - dblSortStart
                intSortedIndex, arrSortedSteps = fnBinarySearch(arrSorted, intTarget)
                dblTotalPreprocessingCost = dblSortTime
            else:
                dblTotalPreprocessingCost = 0.0
                arrSortedSteps = arrSteps
            
            dictResults['arrTestCases'].append({
                'strScenario': strArrayType,
                'strDescription': strDescription,
                'blnTargetFound': blnSuccess,
                'intBinarySearchSteps': len(arrSteps),
                'dblPreprocessingTimeMs': dblTotalPreprocessingCost * 1000,
                'dblTotalCostWithSorting': dblTotalPreprocessingCost * 1000 + len(arrSortedSteps),
                'blnWorksCorrectly': blnSuccess if strArrayType == 'sorted' else False
            })
            
        return dictResults
    
    def mAnalyzeSmallDatasetInefficiency(self) -> Dict[str, Any]:
        """
        Demonstrates inefficiency for small datasets compared to linear search.
        
        Returns:
            Dict showing when linear search outperforms binary search
        """
        dictResults = {
            'strTestName': 'Small Dataset Inefficiency',
            'strDescription': 'Binary search overhead makes it slower than linear search for small arrays',
            'arrThresholdAnalysis': []
        }
        
        def mLinearSearchSteps(arrInput, intTarget):
            """Count steps in linear search."""
            intSteps = 0
            for intI, intVal in enumerate(arrInput):
                intSteps += 1
                if intVal == intTarget:
                    return intI, intSteps
            return -1, intSteps
        
        for intSize in self.arrSmallSizes:
            arrInput = self._mCreateArray(intSize, "sorted")
            intTarget = arrInput[-1]  # Worst case for linear search
            
            # Binary search
            _, arrBinarySteps = fnBinarySearch(arrInput, intTarget)
            
            # Linear search
            _, intLinearSteps = mLinearSearchSteps(arrInput, intTarget)
            
            # Performance comparison
            blnBinaryIsBetter = len(arrBinarySteps) < intLinearSteps
            dblEfficiencyRatio = intLinearSteps / len(arrBinarySteps) if len(arrBinarySteps) > 0 else float('inf')
            
            dictResults['arrThresholdAnalysis'].append({
                'intArraySize': intSize,
                'intBinarySearchSteps': len(arrBinarySteps),
                'intLinearSearchSteps': intLinearSteps,
                'blnBinaryIsMoreEfficient': blnBinaryIsBetter,
                'dblEfficiencyRatio': dblEfficiencyRatio,
                'dblOverheadFactor': len(arrBinarySteps) / intLinearSteps if intLinearSteps > 0 else 0
            })
            
        return dictResults


class clsJosephusProblemLimitationAnalyzer:
    """
    Comprehensive analysis of Josephus Problem algorithm limitations.
    
    Algorithm Complexity Analysis:
    - Standard Implementation: O(n²) time complexity due to list operations
    - Optimized Mathematical Solution: O(n) time complexity exists
    - Space Complexity: O(n) for storing elimination order and participants
    
    Key Limitations Identified:
    1. Simulation Overhead: Traditional approach simulates entire elimination process
    2. Large N Inefficiency: Becomes impractical for very large groups (n > 10⁶)
    
    Mathematical Foundation:
    - Recursive relation: J(n,k) = (J(n-1,k) + k-1) % n + 1
    - No simple closed-form solution exists for general case
    
    References:
    - GeeksforGeeks: https://www.geeksforgeeks.org/josephus-problem/
    - Wikipedia: https://en.wikipedia.org/wiki/Josephus_problem
    - CP-Algorithms: https://cp-algorithms.com/others/josephus_problem.html
    - Computer Science Stack Exchange: https://cs.stackexchange.com/questions/58078/josephus-problem-a-faster-solution
    """
    
    def __init__(self):
        self.arrTestSizes = [10, 100, 500, 1000, 2000]
    
    def mAnalyzeComputationalScalingIssues(self) -> Dict[str, Any]:
        """
        Demonstrates how computational complexity scales with problem size.
        
        Returns:
            Dict showing performance degradation with increasing n
        """
        dictResults = {
            'strTestName': 'Computational Scaling Analysis',
            'strDescription': 'Performance degradation with increasing group size',
            'strComplexityAnalysis': 'O(n) best case, O(n²) typical implementation',
            'arrScalingTests': []
        }
        
        for intSize in self.arrTestSizes:
            intK = 2  # Standard Josephus problem with k=2
            
            dblStartTime = time.time()
            intSurvivor, arrEliminationOrder = josephus_problem(intSize, intK)
            dblExecutionTime = time.time() - dblStartTime
            
            # Memory usage analysis
            intEliminationMemory = sys.getsizeof(arrEliminationOrder)
            
            # Theoretical vs actual operations
            intTheoreticalOperations = intSize - 1  # n-1 eliminations needed
            dblActualComplexityIndicator = dblExecutionTime * 1000000  # microseconds
            
            dictResults['arrScalingTests'].append({
                'intGroupSize': intSize,
                'dblExecutionTimeMs': dblExecutionTime * 1000,
                'intMemoryUsageBytes': intEliminationMemory,
                'intSurvivorPosition': intSurvivor,
                'intEliminationSteps': len(arrEliminationOrder),
                'dblTimePerEliminationUs': (dblExecutionTime * 1000000) / len(arrEliminationOrder),
                'dblScalabilityFactor': dblActualComplexityIndicator / intSize if intSize > 0 else 0
            })
            
        return dictResults
    
    def mAnalyzeParameterSensitivity(self) -> Dict[str, Any]:
        """
        Demonstrates how algorithm performance varies with step interval k.
        
        Returns:
            Dict showing performance variation across different k values
        """
        dictResults = {
            'strTestName': 'Parameter Sensitivity Analysis',
            'strDescription': 'Algorithm performance variation with different step intervals',
            'intGroupSize': 1000,
            'arrParameterTests': []
        }
        
        intN = 1000
        arrKValues = [2, 3, 5, 10, 25, 50]
        
        for intK in arrKValues:
            dblStartTime = time.time()
            intSurvivor, arrEliminationOrder = josephus_problem(intN, intK)
            dblExecutionTime = time.time() - dblStartTime
            
            # Analyze elimination pattern efficiency
            intUniquePositions = len(set(arrEliminationOrder))
            dblPatternRandomness = intUniquePositions / len(arrEliminationOrder)
            
            dictResults['arrParameterTests'].append({
                'intStepIntervalK': intK,
                'dblExecutionTimeMs': dblExecutionTime * 1000,
                'intSurvivorPosition': intSurvivor,
                'intEliminationSequenceLength': len(arrEliminationOrder),
                'dblPatternRandomnessRatio': dblPatternRandomness,
                'dblAverageEliminationTimeUs': (dblExecutionTime * 1000000) / len(arrEliminationOrder),
                'dblKEfficiencyRating': len(arrEliminationOrder) / (dblExecutionTime * 1000) if dblExecutionTime > 0 else 0
            })
            
        return dictResults


class clsRussianPeasantMultiplicationLimitationAnalyzer:
    """
    Comprehensive analysis of Russian Peasant Multiplication algorithm limitations.
    
    Algorithm Characteristics:
    - Time Complexity: O(log b) where b is the second operand
    - Space Complexity: O(1) for iterative, O(log b) for recursive implementation
    - Based on binary representation of numbers and bit manipulation
    
    Key Limitations Identified:
    1. Order Dependency: Performance depends on which number is used as multiplier
    2. Implementation Overhead: More complex than direct multiplication
    
    Historical Context:
    - Ancient algorithm with Egyptian and Ethiopian roots
    - Modern relevance mainly for embedded systems without multiplication units
    
    References:
    - GeeksforGeeks: https://www.geeksforgeeks.org/russian-peasant-multiply-two-numbers-using-bitwise-operators/
    - Stack Overflow Analysis: https://stackoverflow.com/questions/54801460/time-efficiency-of-the-russian-peasant-multiplication-algorithm
    - The Math Doctors: https://www.themathdoctors.org/russian-peasant-multiplication-how-and-why/
    - Math Stack Exchange: https://math.stackexchange.com/questions/2099095/proof-of-russian-peasant-multiplication
    """
    
    def __init__(self):
        self.arrTestPairs = [(13, 27), (85, 18), (147, 17), (255, 63), (1023, 511)]
    
    def mAnalyzeOperandOrderDependency(self) -> Dict[str, Any]:
        """
        Demonstrates how algorithm efficiency depends on operand order.
        
        Returns:
            Dict showing performance differences based on which number is the multiplier
        """
        dictResults = {
            'strTestName': 'Operand Order Dependency Analysis',
            'strDescription': 'Performance variation based on which operand is used as multiplier',
            'arrOrderTests': []
        }
        
        arrTestCases = [
            (13, 27, 'Small numbers'),
            (85, 453, 'Medium numbers'),
            (255, 1023, 'Power-of-2 related'),
            (1000, 7, 'Large vs small')
        ]
        
        for intA, intB, strDescription in arrTestCases:
            # Test a * b (a as multiplier)
            dblStartTime = time.time()
            intProduct1, arrHalving1, arrDoubling1 = russian_multiply(intA, intB)
            dblTime1 = time.time() - dblStartTime
            
            # Test b * a (b as multiplier)  
            dblStartTime = time.time()
            intProduct2, arrHalving2, arrDoubling2 = russian_multiply(intB, intA)
            dblTime2 = time.time() - dblStartTime
            
            # Analyze bit patterns
            intABits = intA.bit_length()
            intBBits = intB.bit_length()
            
            strOptimalOrder = 'a_first' if len(arrHalving1) <= len(arrHalving2) else 'b_first'
            dblEfficiencyRatio = max(len(arrHalving1), len(arrHalving2)) / min(len(arrHalving1), len(arrHalving2))
            
            dictResults['arrOrderTests'].append({
                'intOperandA': intA,
                'intOperandB': intB,
                'strDescription': strDescription,
                'intAFirstSteps': len(arrHalving1),
                'intBFirstSteps': len(arrHalving2),
                'dblAFirstTimeMs': dblTime1 * 1000,
                'dblBFirstTimeMs': dblTime2 * 1000,
                'strOptimalOrder': strOptimalOrder,
                'dblEfficiencyRatio': dblEfficiencyRatio,
                'intABitLength': intABits,
                'intBBitLength': intBBits,
                'blnProductsMatch': intProduct1 == intProduct2 == intA * intB
            })
            
        return dictResults
    
    def mAnalyzeBitPatternPerformance(self) -> Dict[str, Any]:
        """
        Analyzes how binary representation affects algorithm performance.
        
        Returns:
            Dict showing correlation between bit patterns and step count
        """
        dictResults = {
            'strTestName': 'Bit Pattern Performance Analysis',
            'strDescription': 'How binary representation affects algorithm efficiency',
            'arrBitPatternTests': []
        }
        
        # Test numbers with different bit patterns
        arrTestNumbers = [
            (15, 'Dense bits: 1111'),
            (16, 'Single bit: 10000'),
            (17, 'Sparse bits: 10001'),
            (85, 'Mixed pattern: 1010101'),
            (255, 'All ones: 11111111'),
            (256, 'Power of 2: 100000000')
        ]
        
        intBaseMultiplicand = 127  # Fixed second operand
        
        for intNum, strBitDescription in arrTestNumbers:
            dblStartTime = time.time()
            intProduct, arrHalving, arrDoubling = russian_multiply(intNum, intBaseMultiplicand)
            dblExecutionTime = time.time() - dblStartTime
            
            # Analyze bit characteristics
            strBinaryRepr = bin(intNum)[2:]  # Remove '0b' prefix
            intOnesCount = strBinaryRepr.count('1')
            intZerosCount = strBinaryRepr.count('0')
            dblBitDensity = intOnesCount / len(strBinaryRepr)
            
            dictResults['arrBitPatternTests'].append({
                'intNumber': intNum,
                'strBinaryRepresentation': strBinaryRepr,
                'strBitDescription': strBitDescription,
                'intTotalBits': len(strBinaryRepr),
                'intOnesCount': intOnesCount,
                'intZerosCount': intZerosCount,
                'dblBitDensity': dblBitDensity,
                'intAlgorithmSteps': len(arrHalving),
                'dblExecutionTimeMs': dblExecutionTime * 1000,
                'dblStepsPerBit': len(arrHalving) / len(strBinaryRepr),
                'blnProductCorrect': intProduct == intNum * intBaseMultiplicand
            })
            
        return dictResults


def mGenerateComprehensiveLimitationReport() -> Dict[str, Any]:
    """
    Generates a comprehensive report analyzing limitations of all algorithms.
    
    Returns:
        Dict containing complete analysis results for all algorithms
    """
    dictReport = {
        'strReportTitle': 'Comprehensive Algorithm Limitations Analysis',
        'strGeneratedTimestamp': time.strftime('%Y-%m-%d %H:%M:%S'),
        'intAlgorithmsAnalyzed': 4,
        'dictAnalysisResults': {}
    }
    
    print("Generating comprehensive algorithm limitations report...")
    
    # Insertion Sort Analysis
    print("Analyzing Insertion Sort limitations...")
    objInsertionAnalyzer = clsInsertionSortLimitationAnalyzer()
    dictReport['dictAnalysisResults']['insertion_sort'] = {
        'strAlgorithmName': 'Insertion Sort',
        'dictQuadraticScaling': objInsertionAnalyzer.mAnalyzeQuadraticScaling(),
        'dictInputSensitivity': objInsertionAnalyzer.mAnalyzeInputSensitivityExtremes()
    }
    
    # Binary Search Analysis  
    print("Analyzing Binary Search limitations...")
    objBinaryAnalyzer = clsBinarySearchLimitationAnalyzer()
    dictReport['dictAnalysisResults']['binary_search'] = {
        'strAlgorithmName': 'Binary Search',
        'dictSortedDataDependency': objBinaryAnalyzer.mAnalyzeSortedDataDependency(),
        'dictSmallDatasetInefficiency': objBinaryAnalyzer.mAnalyzeSmallDatasetInefficiency()
    }
    
    # Josephus Problem Analysis
    print("Analyzing Josephus Problem limitations...")
    objJosephusAnalyzer = clsJosephusProblemLimitationAnalyzer()
    dictReport['dictAnalysisResults']['josephus_problem'] = {
        'strAlgorithmName': 'Josephus Problem',
        'dictComputationalScaling': objJosephusAnalyzer.mAnalyzeComputationalScalingIssues(),
        'dictParameterSensitivity': objJosephusAnalyzer.mAnalyzeParameterSensitivity()
    }
    
    # Russian Peasant Multiplication Analysis
    print("Analyzing Russian Peasant Multiplication limitations...")
    objRpmAnalyzer = clsRussianPeasantMultiplicationLimitationAnalyzer()
    dictReport['dictAnalysisResults']['russian_peasant_multiplication'] = {
        'strAlgorithmName': 'Russian Peasant Multiplication',
        'dictOperandOrderDependency': objRpmAnalyzer.mAnalyzeOperandOrderDependency(),
        'dictBitPatternPerformance': objRpmAnalyzer.mAnalyzeBitPatternPerformance()
    }
    
    print("Comprehensive analysis complete!")
    return dictReport


# # # Example usage and demonstration
# """
# Algorithm Limitations Test Runner - Clear and Understandable Results
# This script executes all test classes and presents results in an easy-to-understand format.
# """

# import json
# import time
# from typing import Dict, Any

# def print_header(title: str, level: int = 1):
#     """Print formatted headers based on level."""
#     if level == 1:
#         print(f"\n{'='*80}")
#         print(f"🔍 {title.upper()}")
#         print(f"{'='*80}")
#     elif level == 2:
#         print(f"\n{'─'*60}")
#         print(f"📊 {title}")
#         print(f"{'─'*60}")
#     else:
#         print(f"\n💡 {title}")
#         print("-" * 40)

# def print_limitation_summary(algorithm: str, limitations: list):
#     """Print a clear summary of algorithm limitations."""
#     print(f"\n🚨 KEY LIMITATIONS OF {algorithm.upper()}:")
#     for i, limitation in enumerate(limitations, 1):
#         print(f"   {i}. {limitation}")

# def run_insertion_sort_analysis():
#     """Run and display Insertion Sort limitation analysis."""
#     print_header("INSERTION SORT ANALYSIS", 1)
    
#     analyzer = clsInsertionSortLimitationAnalyzer()
    
#     # Quadratic Scaling Test
#     print_header("Quadratic Time Complexity Problem", 2)
#     quadratic_results = analyzer.mAnalyzeQuadraticScaling()
    
#     print("📈 PERFORMANCE DEGRADATION:")
#     print(f"   Algorithm: {quadratic_results['strTheoreticalComplexity']} complexity")
#     print(f"   Problem: {quadratic_results['strLimitationSeverity']}")
    
#     print("\n📊 TEST RESULTS (Operations vs Array Size):")
#     for data in quadratic_results['arrData']:
#         size = data['intInputSize']
#         operations = data['intOperationsCount']
#         time_ms = data['dblExecutionTimeMs']
#         efficiency = data['dblOperationsPerNSquared']
        
#         print(f"   Size: {size:>6} → Operations: {operations:>8} → Time: {time_ms:>8.2f}ms → Efficiency: {efficiency:.4f}")
    
#     # Input Sensitivity Test
#     print_header("Input Order Sensitivity Problem", 2)
#     sensitivity_results = analyzer.mAnalyzeInputSensitivityExtremes()
    
#     print(f"📋 TEST SIZE: {sensitivity_results['intTestSize']} elements")
#     print("\n🎯 PERFORMANCE BY INPUT TYPE:")
    
#     best_case = None
#     worst_case = None
    
#     for scenario in sensitivity_results['arrScenarios']:
#         scenario_type = scenario['strScenario']
#         operations = scenario['intOperationsCount']
#         time_ms = scenario['dblExecutionTimeMs']
#         efficiency = scenario['dblEfficiencyRatio']
        
#         status = ""
#         if scenario_type == 'sorted':
#             status = " ✅ BEST CASE"
#             best_case = operations
#         elif scenario_type == 'reverse':
#             status = " ❌ WORST CASE"
#             worst_case = operations
#         else:
#             status = " ⚠️  AVERAGE CASE"
        
#         print(f"   {scenario['strDescription']:<25} → {operations:>8} operations → {time_ms:>8.2f}ms{status}")
    
#     if best_case and worst_case:
#         performance_gap = worst_case / best_case
#         print(f"\n💥 PERFORMANCE GAP: Worst case is {performance_gap:.1f}x slower than best case!")
    
#     print_limitation_summary("Insertion Sort", [
#         f"O(n²) complexity makes it impractical for large datasets (>10,000 elements)",
#         f"Performance varies dramatically based on input order ({performance_gap:.1f}x difference)",
#         "Becomes exponentially slower as data size increases",
#         "Not suitable for real-time applications with large datasets"
#     ])
    
#     return {'quadratic': quadratic_results, 'sensitivity': sensitivity_results}

# def run_binary_search_analysis():
#     """Run and display Binary Search limitation analysis."""
#     print_header("BINARY SEARCH ANALYSIS", 1)
    
#     analyzer = clsBinarySearchLimitationAnalyzer()
    
#     # Sorted Data Dependency Test
#     print_header("Sorted Data Requirement Problem", 2)
#     dependency_results = analyzer.mAnalyzeSortedDataDependency()
    
#     print(f"🚨 CRITICAL REQUIREMENT: {dependency_results['strCriticalLimitation']}")
#     print("\n🧪 TEST RESULTS:")
    
#     for test_case in dependency_results['arrTestCases']:
#         scenario = test_case['strScenario']
#         found = test_case['blnTargetFound']
#         works = test_case['blnWorksCorrectly']
#         preprocessing_time = test_case['dblPreprocessingTimeMs']
        
#         status = "✅ WORKS" if works else "❌ FAILS"
#         print(f"   {test_case['strDescription']:<30} → {status}")
        
#         if preprocessing_time > 0:
#             print(f"      ⏱️  Sorting overhead: {preprocessing_time:.2f}ms")
#             print(f"      💰 Total cost: {test_case['dblTotalCostWithSorting']:.2f} units")
    
#     # Small Dataset Inefficiency Test
#     print_header("Small Dataset Inefficiency Problem", 2)
#     inefficiency_results = analyzer.mAnalyzeSmallDatasetInefficiency()
    
#     print("📊 BINARY SEARCH vs LINEAR SEARCH COMPARISON:")
#     print("   (For small datasets, simpler algorithms can be faster)")
    
#     binary_wins = 0
#     linear_wins = 0
    
#     for test in inefficiency_results['arrThresholdAnalysis']:
#         size = test['intArraySize']
#         binary_steps = test['intBinarySearchSteps']
#         linear_steps = test['intLinearSearchSteps']
#         binary_better = test['blnBinaryIsMoreEfficient']
        
#         winner = "Binary Search ✅" if binary_better else "Linear Search ✅"
#         if binary_better:
#             binary_wins += 1
#         else:
#             linear_wins += 1
        
#         print(f"   Size {size:>2}: Binary={binary_steps:>2} steps, Linear={linear_steps:>2} steps → {winner}")
    
#     print(f"\n📈 THRESHOLD ANALYSIS:")
#     print(f"   Binary Search wins: {binary_wins}/{len(inefficiency_results['arrThresholdAnalysis'])} cases")
#     print(f"   Linear Search wins: {linear_wins}/{len(inefficiency_results['arrThresholdAnalysis'])} cases")
    
#     print_limitation_summary("Binary Search", [
#         "ONLY works on sorted arrays - completely fails on unsorted data",
#         f"Sorting overhead makes it expensive for unsorted data (O(n log n) preprocessing)",
#         f"Not always faster than linear search for small datasets (<50 elements)",
#         "Cannot be used efficiently on linked lists or unsorted data structures"
#     ])
    
#     return {'dependency': dependency_results, 'inefficiency': inefficiency_results}

# def run_josephus_problem_analysis():
#     """Run and display Josephus Problem limitation analysis."""
#     print_header("JOSEPHUS PROBLEM ANALYSIS", 1)
    
#     analyzer = clsJosephusProblemLimitationAnalyzer()
    
#     # Computational Scaling Test
#     print_header("Computational Scaling Problem", 2)
#     scaling_results = analyzer.mAnalyzeComputationalScalingIssues()
    
#     print(f"⚡ COMPLEXITY: {scaling_results['strComplexityAnalysis']}")
#     print("\n📊 PERFORMANCE SCALING:")
    
#     prev_time = None
#     for test in scaling_results['arrScalingTests']:
#         size = test['intGroupSize']
#         time_ms = test['dblExecutionTimeMs']
#         memory_bytes = test['intMemoryUsageBytes']
#         time_per_step = test['dblTimePerEliminationUs']
        
#         scaling_factor = ""
#         if prev_time and prev_time > 0:
#             factor = time_ms / prev_time
#             scaling_factor = f" ({factor:.1f}x slower)"
        
#         print(f"   Group Size: {size:>5} → Time: {time_ms:>8.2f}ms → Memory: {memory_bytes:>8} bytes{scaling_factor}")
#         print(f"                     → Time per elimination: {time_per_step:.2f}μs")
#         prev_time = time_ms
    
#     # Parameter Sensitivity Test
#     print_header("Parameter Sensitivity Problem", 2)
#     param_results = analyzer.mAnalyzeParameterSensitivity()
    
#     print(f"👥 FIXED GROUP SIZE: {param_results['intGroupSize']} people")
#     print("\n🔢 PERFORMANCE BY STEP INTERVAL (k):")
    
#     fastest_k = None
#     slowest_k = None
#     fastest_time = float('inf')
#     slowest_time = 0
    
#     for test in param_results['arrParameterTests']:
#         k = test['intStepIntervalK']
#         time_ms = test['dblExecutionTimeMs']
#         survivor = test['intSurvivorPosition']
#         avg_time = test['dblAverageEliminationTimeUs']
        
#         if time_ms < fastest_time:
#             fastest_time = time_ms
#             fastest_k = k
#         if time_ms > slowest_time:
#             slowest_time = time_ms
#             slowest_k = k
        
#         print(f"   k={k:>2}: {time_ms:>8.2f}ms → Survivor at position {survivor:>3} → Avg: {avg_time:.2f}μs per step")
    
#     if fastest_k and slowest_k:
#         performance_ratio = slowest_time / fastest_time
#         print(f"\n⚡ PARAMETER IMPACT: k={slowest_k} is {performance_ratio:.1f}x slower than k={fastest_k}")
    
#     print_limitation_summary("Josephus Problem", [
#         f"O(n) to O(n²) complexity depending on implementation",
#         f"Memory usage grows linearly with group size",
#         f"Performance varies significantly with step interval k ({performance_ratio:.1f}x difference)",
#         f"Becomes impractical for very large groups (>100,000 people)",
#         "No simple closed-form solution exists for arbitrary parameters"
#     ])
    
#     return {'scaling': scaling_results, 'parameters': param_results}

# def run_russian_peasant_analysis():
#     """Run and display Russian Peasant Multiplication limitation analysis."""
#     print_header("RUSSIAN PEASANT MULTIPLICATION ANALYSIS", 1)
    
#     analyzer = clsRussianPeasantMultiplicationLimitationAnalyzer()
    
#     # Operand Order Dependency Test
#     print_header("Operand Order Dependency Problem", 2)
#     order_results = analyzer.mAnalyzeOperandOrderDependency()
    
#     print("🔄 PERFORMANCE DEPENDS ON WHICH NUMBER IS THE MULTIPLIER:")
    
#     max_efficiency_gap = 0
#     for test in order_results['arrOrderTests']:
#         a = test['intOperandA']
#         b = test['intOperandB']
#         a_first_steps = test['intAFirstSteps']
#         b_first_steps = test['intBFirstSteps']
#         optimal = test['strOptimalOrder']
#         efficiency_ratio = test['dblEfficiencyRatio']
#         a_bits = test['intABitLength']
#         b_bits = test['intBBitLength']
        
#         max_efficiency_gap = max(max_efficiency_gap, efficiency_ratio)
        
#         better_choice = f"Use {a} as multiplier" if optimal == 'a_first' else f"Use {b} as multiplier"
#         print(f"\n   {test['strDescription']}: {a} × {b}")
#         print(f"   → {a} first: {a_first_steps} steps ({a_bits} bits)")
#         print(f"   → {b} first: {b_first_steps} steps ({b_bits} bits)")
#         print(f"   → Efficiency gap: {efficiency_ratio:.1f}x → 💡 {better_choice}")
    
#     # Bit Pattern Performance Test
#     print_header("Bit Pattern Performance Problem", 2)
#     bit_results = analyzer.mAnalyzeBitPatternPerformance()
    
#     print("🔢 ALGORITHM EFFICIENCY DEPENDS ON BINARY REPRESENTATION:")
    
#     most_efficient = None
#     least_efficient = None
#     min_steps = float('inf')
#     max_steps = 0
    
#     for test in bit_results['arrBitPatternTests']:
#         number = test['intNumber']
#         binary = test['strBinaryRepresentation']
#         description = test['strBitDescription']
#         steps = test['intAlgorithmSteps']
#         bit_density = test['dblBitDensity']
#         steps_per_bit = test['dblStepsPerBit']
        
#         if steps < min_steps:
#             min_steps = steps
#             most_efficient = (number, description, steps)
#         if steps > max_steps:
#             max_steps = steps
#             least_efficient = (number, description, steps)
        
#         print(f"   {number:>3} ({description})")
#         print(f"       Binary: {binary} → Density: {bit_density:.2f} → Steps: {steps} → Steps/bit: {steps_per_bit:.2f}")
    
#     if most_efficient and least_efficient:
#         efficiency_gap = max_steps / min_steps
#         print(f"\n⚡ BIT PATTERN IMPACT:")
#         print(f"   Most efficient: {most_efficient[0]} ({most_efficient[1]}) - {most_efficient[2]} steps")
#         print(f"   Least efficient: {least_efficient[0]} ({least_efficient[1]}) - {least_efficient[2]} steps")
#         print(f"   Efficiency gap: {efficiency_gap:.1f}x difference!")
    
#     print_limitation_summary("Russian Peasant Multiplication", [
#         f"Performance depends on operand order (up to {max_efficiency_gap:.1f}x difference)",
#         f"Efficiency varies with binary representation ({efficiency_gap:.1f}x difference)",
#         "More complex than standard multiplication for modern processors",
#         "Step count equals bit length of the multiplier",
#         "Not practical for modern computing (historical interest only)"
#     ])
    
#     return {'order': order_results, 'bits': bit_results}

# def print_overall_summary(all_results):
#     """Print an overall summary of all algorithm limitations."""
#     print_header("OVERALL ALGORITHM LIMITATIONS SUMMARY", 1)
    
#     print("🎯 KEY FINDINGS:")
    
#     print("\n1️⃣  INSERTION SORT:")
#     print("   ❌ Becomes extremely slow for large datasets (O(n²))")
#     print("   ❌ Performance unpredictable - depends heavily on input order")
#     print("   ✅ Good for small, nearly-sorted datasets only")
    
#     print("\n2️⃣  BINARY SEARCH:")
#     print("   ❌ Completely useless without sorted data")
#     print("   ❌ Sorting overhead makes it expensive for unsorted data")
#     print("   ❌ Not always better than linear search for small datasets")
#     print("   ✅ Excellent for large, pre-sorted datasets")
    
#     print("\n3️⃣  JOSEPHUS PROBLEM:")
#     print("   ❌ No efficient solution for arbitrary parameters")
#     print("   ❌ Memory usage grows with problem size")
#     print("   ❌ Performance varies significantly with step interval")
#     print("   ✅ Interesting theoretical problem with limited practical use")
    
#     print("\n4️⃣  RUSSIAN PEASANT MULTIPLICATION:")
#     print("   ❌ Performance depends on which number you choose as multiplier")
#     print("   ❌ Efficiency varies wildly based on binary patterns")
#     print("   ❌ More complex than needed for modern processors")
#     print("   ✅ Historical algorithm with educational value only")
    
#     print("\n🏆 PRACTICAL RECOMMENDATIONS:")
#     print("   • Use Insertion Sort only for small datasets (<100 elements)")
#     print("   • Use Binary Search only on pre-sorted data")
#     print("   • Avoid Josephus Problem algorithms in production code")
#     print("   • Use standard multiplication instead of Russian Peasant method")

# def main():
#     """Main function to execute all tests with clear, understandable output."""
#     print("🔍 DECREASE-AND-CONQUER ALGORITHM LIMITATIONS ANALYSIS")
#     print("📝 Research by Ken Audie Lucero and Izabelle Oja")
#     print("=" * 80)
    
#     all_results = {}
    
#     try:
#         # Run all analyses
#         print("⏳ Running comprehensive algorithm limitation analysis...\n")
        
#         all_results['insertion_sort'] = run_insertion_sort_analysis()
#         all_results['binary_search'] = run_binary_search_analysis()
#         all_results['josephus_problem'] = run_josephus_problem_analysis()
#         all_results['russian_peasant'] = run_russian_peasant_analysis()
        
#         # Print overall summary
#         print_overall_summary(all_results)
        
#         # Save results
#         timestamp = time.strftime('%Y%m%d_%H%M%S')
#         filename = f'algorithm_limitations_report_{timestamp}.json'
#         with open(filename, 'w') as f:
#             json.dump(all_results, f, indent=2, default=str)
        
#         print(f"\n💾 Detailed results saved to: {filename}")
#         print("✅ Analysis complete!")
        
#     except Exception as e:
#         print(f"❌ Error during analysis: {str(e)}")
#         import traceback
#         traceback.print_exc()

# if __name__ == "__main__":
#     # Note: To run this script, you need to import the test classes first:
#     # from your_module import (
#     #     clsInsertionSortLimitationAnalyzer,
#     #     clsBinarySearchLimitationAnalyzer,
#     #     clsJosephusProblemLimitationAnalyzer,
#     #     clsRussianPeasantMultiplicationLimitationAnalyzer
#     # )
    
#     # print("📋 TO RUN THIS ANALYSIS:")
#     # print("1. Import the required classes from your main module")
#     # print("2. Uncomment the import statements above")
#     # print("3. Run main()")
#     # print("\nExample:")
#     # print(">>> from algorithm_limitations_testing import *")
#     # print(">>> main()")
    
#     # Uncomment the line below after importing the classes
#      main()