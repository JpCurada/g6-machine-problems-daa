## I. Assigned Algorithm

**A. Name of Algorithm:**  
*Insertion Sort Limitation*

**B. Pseudocode:**  
```plaintext
CLASS InsertionSortLimitationAnalyzer:
    FUNCTION __init__():
        arrTestSizes ← [100, 1000, 5000, 10000, 25000]

    FUNCTION _mCreateArray(size, type):
        RETURN create_array(self, size, type)

    FUNCTION mAnalyzeQuadraticScaling():
        Initialize results dictionary with metadata
        FOR each test size:
            Generate random array
            Start timer
            Run insertion sort and collect operation steps
            Stop timer
            Append to results:
                - Input size
                - Operations count
                - Execution time in ms
                - Operations / n² ratio
                - Theoretical max comparisons n(n-1)/2
        RETURN results

    FUNCTION mAnalyzeInputSensitivityExtremes():
        Set test size = 5000
        Define scenarios: sorted, reverse, random
        FOR each scenario:
            Generate array of specified type
            Start timer
            Run insertion sort and collect operation steps
            Stop timer
            Append to results:
                - Scenario type
                - Description
                - Operations count
                - Execution time in ms
                - Steps per item (efficiency ratio)
        RETURN results
```

**C. Brief Description:**  
The clsInsertionSortLimitationAnalyzer class provides a comprehensive experimental analysis of the limitations of the Insertion Sort algorithm. It evaluates how the algorithm behaves under different input conditions and input sizes, highlighting known issues such as:

- Poor scalability due to quadratic time complexity (O(n²))

- Input order sensitivity, which leads to dramatically different performance across best, average, and worst-case scenarios

The class is structured for automated testing with pre-defined dataset sizes and input distributions, making it ideal for educational use and empirical validation of theoretical complexity.

---

## II. Python Implementation

**A. Function Code:**  
```python
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
```

---

## III. Simulation / Step-by-Step Example

**A. Sample Input:**  
*self.arrTestSizes = [100, 1000, 5000, 10000, 25000]*

**B.1 Step-by-Step Process: mAnalyzeQuadraticScaling()**  
1. Loop through each test size in [100, 1000, 5000, 10000, 25000]

2. For each size:

    - Generate a random array

    - Run fnInsertionSort(arr) and measure:

    - Operation count (e.g., swap/comparison steps)

    - Execution time

    - Ratio: operations per n²

    - Theoretical max: n(n-1)/2

3. Append results into a list under arrData

        
**C.1 Final Output:**  
```python
{
    'strTestName': 'Quadratic Time Complexity Limitation',
    'arrData': [ {... per input size ...} ],
    ...
}
```

**B.2 Step-by-Step Process: mAnalyzeInputSensitivityExtremes()**  
1. Fixed intTestSize = 5000

2. Test each scenario:

    - "sorted" → Best case (minimal shifts)

    - "reverse" → Worst case (maximum shifts)

    - "random" → Average case

3. For each:

    - Generate input

    - Run fnInsertionSort()

    - Capture:

    - Operation count

    - Time

    - Efficiency ratio (steps per item)

        
**C.2 Final Output:**  
```python
{
    'strTestName': 'Input Sensitivity Limitation',
    'arrScenarios': [ {... sorted, reverse, random results ...} ],
    ...
}
```

---

## IV. Discussion

**A. Implementation Logic:**  
This analyzer is designed to empirically demonstrate the theoretical limitations of the Insertion Sort algorithm using two distinct tests:

1. Quadratic Scaling Analysis (mAnalyzeQuadraticScaling)
    - The core logic measures how the number of operations increases with input size.

    - It runs Insertion Sort on randomly generated arrays of increasing size.

    - The number of operations is directly compared to n² to validate the O(n²) growth pattern.

    - A ratio operations / n² provides insight into actual overhead relative to the theoretical maximum.

2. Input Sensitivity Analysis (mAnalyzeInputSensitivityExtremes)
    - The function benchmarks how different input arrangements affect performance:

        - Sorted input leads to O(n) operations (best case).

        - Reverse input causes maximum comparisons and shifts, demonstrating O(n²) behavior (worst case).

    - Random input falls in between, validating the average-case time complexity.

    - This highlights that Insertion Sort is highly input-sensitive, making it unreliable for large or unpredictable datasets.

The results are structured and stored in dictionaries, making them easy to visualize or export for reports, dashboards, or comparisons with other algorithms.

**B. References:**  
 Brilliant. (n.d.). Insertion. https://brilliant.org/wiki/insertion/
 
 GeeksforGeeks. (n.d.). Insertion sort algorithm. https://www.geeksforgeeks.org/insertion-sort-algorithm/
 
 W3Schools. (n.d.). DSA time complexity insertion sort. https://www.w3schools.com/dsa/dsa_timecomplexity_insertionsort.php
 
 Insertion sort. (2024, December 15). In Wikipedia. https://en.wikipedia.org/wiki/Insertion_sort


**C. Possible Improvements / Future Work:**  
Enhancements

- Visual Output: Add graphing tools (e.g., matplotlib) to plot operation counts vs input size

- Algorithm Comparisons: Add Bubble Sort, Merge Sort, Quick Sort to compare scalability

- Median Performance Testing: Test thousands of randomized arrays per size for statistical smoothing

Feature Extensions

- Memory Profiling: Measure auxiliary memory usage for a full complexity profile

- Step Categorization: Break down steps into swaps vs comparisons for deeper insight

- Interactive GUI: Allow users to select size, input type, and see live execution


---
