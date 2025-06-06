"""
Algorithm Limitations Testing Framework

This module demonstrates the limitations of common decrease-and-conquer algorithms 
through empirical testing and analysis. Each test class provides comprehensive 
insights into the practical constraints and inefficiencies of these algorithms.

Contributed by Ken Audie Lucero and Izabelle Oja
"""

from algorithms.decrease_and_conquer.insertion_sort import fnInsertionSort
from algorithms.decrease_and_conquer.binary_search import fnBinarySearch
from utils.helpers import create_array, timeit
from algorithms.decrease_and_conquer.josephus_problem import josephus_problem
from algorithms.decrease_and_conquer.russian_peasant_multiplication import russian_multiply
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


# # Example usage and demonstration
# if __name__ == "__main__":
#     # Generate comprehensive report
#     dictFullReport = mGenerateComprehensiveLimitationReport()
    
#     # Example of accessing specific analysis results
#     print("\n=== SAMPLE RESULTS ===")
    
#     # Insertion Sort Quadratic Scaling
#     dictInsertionScaling = dictFullReport['dictAnalysisResults']['insertion_sort']['dictQuadraticScaling']
#     print(f"\nInsertion Sort Scaling Analysis:")
#     for dictDataPoint in dictInsertionScaling['arrData'][:3]:  # Show first 3 results
#         print(f"  Size: {dictDataPoint['intInputSize']}, Operations: {dictDataPoint['intOperationsCount']}")
    
#     # Binary Search Sorted Data Dependency
#     dictBinaryDependency = dictFullReport['dictAnalysisResults']['binary_search']['dictSortedDataDependency']
#     print(f"\nBinary Search Data Dependency:")
#     for dictTestCase in dictBinaryDependency['arrTestCases']:
#         print(f"  {dictTestCase['strScenario']}: Works correctly = {dictTestCase['blnWorksCorrectly']}")
    
#     # Josephus Problem Scaling
#     dictJosephusScaling = dictFullReport['dictAnalysisResults']['josephus_problem']['dictComputationalScaling']
#     print(f"\nJosephus Problem Scaling:")
#     for dictTest in dictJosephusScaling['arrScalingTests'][:3]:
#         print(f"  Group size: {dictTest['intGroupSize']}, Time: {dictTest['dblExecutionTimeMs']:.2f}ms")
    
#     # Russian Peasant Order Dependency
#     dictRpmOrder = dictFullReport['dictAnalysisResults']['russian_peasant_multiplication']['dictOperandOrderDependency']
#     print(f"\nRussian Peasant Order Dependency:")
#     for dictTest in dictRpmOrder['arrOrderTests'][:3]:
#         print(f"  {dictTest['intOperandA']} × {dictTest['intOperandB']}: Optimal = {dictTest['strOptimalOrder']}")
    
#     print(f"\nFull report contains {len(dictFullReport['dictAnalysisResults'])} algorithm analyses.")
#     print("Each algorithm has 2 limitation tests with detailed metrics.")