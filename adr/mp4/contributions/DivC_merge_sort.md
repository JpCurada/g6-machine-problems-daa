# Algorithm Activity Documentation Report

## I. Assigned Algorithm

**3.1 Name of Algorithm:**  
Merge Sort Algorithm

**3.1.1 Algorithm Definition and Problem Solved**  
Merge Sort is a divide-and-conquer sorting algorithm that divides an array into two halves, recursively sorts each half, and then merges the sorted halves to produce a fully sorted array. It achieves a consistent O(n log n) time complexity across all cases.

Merge Sort solves the problem of efficiently sorting large datasets by using a stable divide-and-conquer approach that guarantees predictable performance. Unlike algorithms such as Quick Sort which can degrade to O(n²) in worst cases, Merge Sort maintains O(n log n) performance regardless of input distribution. This makes it ideal for applications requiring consistent sorting speed, external sorting of large files that don't fit in memory, and situations where stability (maintaining relative order of equal elements) is crucial, such as sorting database records or multi-criteria sorting operations.

**3.1.2 Divide and Conquer Strategy**  
* **Divide:** Split array in half
  - Find the middle index of the array: mid = length // 2
  - Create two subarrays: left half (from start to mid) and right half (from mid to end)
  - This division continues recursively until each subarray contains only one element
  - Single elements are considered inherently sorted (base case)

* **Conquer:** Recursively sort halves
  - Apply merge sort algorithm to the left subarray
  - Apply merge sort algorithm to the right subarray  
  - Base case: If subarray has ≤ 1 element, it's already sorted, return as-is
  - Each recursive call reduces problem size by half

* **Combine:** Merge sorted halves
  - Take two sorted subarrays and merge them into one sorted array
  - Compare elements from both arrays, selecting the smaller element first
  - Continue until all elements from both subarrays are processed
  - The merged result maintains sorted order and contains all original elements

```python
"""
Merge Sort Algorithm

This implementation uses divide-and-conquer to sort arrays with guaranteed O(n log n) performance.

Divide and Conquer Strategy:
- Divide: Split the array into two halves recursively until single elements
- Conquer: Single elements are inherently sorted (base case)
- Combine: Merge the sorted halves back together in correct order

The algorithm achieves O(n log n) complexity in all cases.
It's a stable sort, maintaining relative order of equal elements.

Reference: Introduction to Algorithms (CLRS)
"""

def merge(arrLeft, arrRight):
    """Merge two sorted arrays into one sorted array"""
    arrResult = []
    intI = intJ = 0
    
    # Compare elements from both arrays and add smaller one to result
    while intI < len(arrLeft) and intJ < len(arrRight):
        if arrLeft[intI] <= arrRight[intJ]:
            arrResult.append(arrLeft[intI])
            intI += 1
        else:
            arrResult.append(arrRight[intJ])
            intJ += 1
    
    # Add remaining elements from left array
    while intI < len(arrLeft):
        arrResult.append(arrLeft[intI])
        intI += 1
    
    # Add remaining elements from right array
    while intJ < len(arrRight):
        arrResult.append(arrRight[intJ])
        intJ += 1
    
    return arrResult

def mergeSort(arrInput):
    """Main merge sort function implementing divide-and-conquer"""
    # Base case: arrays with 0 or 1 element are already sorted
    if len(arrInput) <= 1:
        return arrInput
    
    # Divide: Split array into two halves
    intMid = len(arrInput) // 2
    arrLeft = arrInput[:intMid]
    arrRight = arrInput[intMid:]
    
    # Conquer: Recursively sort both halves
    arrSortedLeft = mergeSort(arrLeft)
    arrSortedRight = mergeSort(arrRight)
    
    # Combine: Merge the sorted halves
    return merge(arrSortedLeft, arrSortedRight)

def mergeSortDetailed(arrInput, intLevel=0):
    """Detailed version showing divide-and-conquer steps"""
    strIndent = "  " * intLevel
    print(f"{strIndent}Level {intLevel}: Sorting {arrInput}")
    
    if len(arrInput) <= 1:
        print(f"{strIndent}Base case reached: {arrInput}")
        return arrInput
    
    # Divide
    intMid = len(arrInput) // 2
    arrLeft = arrInput[:intMid]
    arrRight = arrInput[intMid:]
    print(f"{strIndent}Divide: Left={arrLeft}, Right={arrRight}")
    
    # Conquer
    arrSortedLeft = mergeSortDetailed(arrLeft, intLevel + 1)
    arrSortedRight = mergeSortDetailed(arrRight, intLevel + 1)
    
    # Combine
    arrResult = merge(arrSortedLeft, arrSortedRight)
    print(f"{strIndent}Merge: {arrSortedLeft} + {arrSortedRight} = {arrResult}")
    
    return arrResult
```

**3.1.3 Step-by-Step Algorithm Process**  
*Sample Input:* [38, 27, 43, 3]
Goal: Sort array in ascending order using divide-and-conquer

1. **Initialize Algorithm**
   Input: [38, 27, 43, 3]
   Check: Length = 4 (> 1, proceed with division)

2. **Divide Phase**
   Split array at middle index (2):
   - Left half: [38, 27]
   - Right half: [43, 3]
   Recursively apply merge sort to each half

3. **Conquer Left Half: [38, 27]**
   Split at middle index (1):
   - Left: [38] (base case - single element)
   - Right: [27] (base case - single element)
   Merge: Compare 38 > 27, result = [27, 38]

4. **Conquer Right Half: [43, 3]**
   Split at middle index (1):
   - Left: [43] (base case - single element)
   - Right: [3] (base case - single element)
   Merge: Compare 43 > 3, result = [3, 43]

5. **Combine Phase**
   Merge sorted halves [27, 38] and [3, 43]:
   - Compare 27 vs 3: 3 smaller → [3]
   - Compare 27 vs 43: 27 smaller → [3, 27]
   - Compare 38 vs 43: 38 smaller → [3, 27, 38]
   - Remaining element 43 → [3, 27, 38, 43]

6. **Final Result**
   Sorted array: [3, 27, 38, 43]

**3.1.4 Time Complexity Analysis**  
**Recurrence:** T(n) = 2T(n/2) + O(n)  
**Solution:** O(n log n) for all cases

**Detailed Analysis:**
- **Divide:** O(1) - Finding middle point is constant time
- **Conquer:** 2T(n/2) - Two recursive calls on half-sized problems
- **Combine:** O(n) - Merging two sorted arrays requires linear time

**Master Theorem Application:**
- a = 2 (number of subproblems)
- b = 2 (subproblem size reduction factor)
- f(n) = O(n) (work done outside recursion)

Since f(n) = O(n) = O(n^log₂2), we have Case 2 of Master Theorem.
Therefore: T(n) = O(n log n)

**Space Complexity:** O(n) - Additional space for temporary arrays during merging

**All Cases Performance:**
- Best case: O(n log n)
- Average case: O(n log n)
- Worst case: O(n log n)

**3.1.5 Worked Example: [64, 34, 25, 12, 22, 11, 90]**  
*Sample Input:* [64, 34, 25, 12, 22, 11, 90]
Goal: Sort array using Merge Sort divide-and-conquer strategy

*Step-by-Step Process:*

1. **Initialize Algorithm**
   Input: [64, 34, 25, 12, 22, 11, 90]
   Length: 7 elements (> 1, proceed with division)

2. **Level 0 - Initial Division**
   Split at middle index (3):
   - Left half: [64, 34, 25]
   - Right half: [12, 22, 11, 90]

3. **Level 1 - Second Division**
   **Left branch [64, 34, 25]:**
   Split at index 1:
   - Left: [64]
   - Right: [34, 25]

   **Right branch [12, 22, 11, 90]:**
   Split at index 2:
   - Left: [12, 22]
   - Right: [11, 90]

4. **Level 2 - Third Division**
   **Process [64]:** Base case (single element)
   
   **Process [34, 25]:** Split at index 1:
   - Left: [34] (base case)
   - Right: [25] (base case)
   
   **Process [12, 22]:** Split at index 1:
   - Left: [12] (base case)
   - Right: [22] (base case)
   
   **Process [11, 90]:** Split at index 1:
   - Left: [11] (base case)
   - Right: [90] (base case)

5. **Combine Phase - Bottom-Up Merging**
   
   **Level 2 Merges:**
   - Merge [34] and [25] → [25, 34]
   - Merge [12] and [22] → [12, 22]
   - Merge [11] and [90] → [11, 90]

   **Level 1 Merges:**
   - Merge [64] and [25, 34]:
     Compare 64 vs 25 → 25 smaller → [25]
     Compare 64 vs 34 → 34 smaller → [25, 34]
     Add remaining 64 → [25, 34, 64]

   - Merge [12, 22] and [11, 90]:
     Compare 12 vs 11 → 11 smaller → [11]
     Compare 12 vs 90 → 12 smaller → [11, 12]
     Compare 22 vs 90 → 22 smaller → [11, 12, 22]
     Add remaining 90 → [11, 12, 22, 90]

6. **Final Merge - Level 0**
   Merge [25, 34, 64] and [11, 12, 22, 90]:
   - Compare 25 vs 11 → 11 smaller → [11]
   - Compare 25 vs 12 → 12 smaller → [11, 12]
   - Compare 25 vs 22 → 22 smaller → [11, 12, 22]
   - Compare 25 vs 90 → 25 smaller → [11, 12, 22, 25]
   - Compare 34 vs 90 → 34 smaller → [11, 12, 22, 25, 34]
   - Compare 64 vs 90 → 64 smaller → [11, 12, 22, 25, 34, 64]
   - Add remaining 90 → [11, 12, 22, 25, 34, 64, 90]

*Final Output:*

**Recursion Tree:**
```
                [64, 34, 25, 12, 22, 11, 90]
                /                           \
        [64, 34, 25]                    [12, 22, 11, 90]
        /         \                     /              \
    [64]       [34, 25]          [12, 22]         [11, 90]
              /      \            /      \         /      \
           [34]     [25]       [12]    [22]     [11]    [90]
```

**Merge Operations:**
- Level 2: 3 merges
- Level 1: 2 merges  
- Level 0: 1 merge
- Total: 6 merge operations

**Performance Metrics:**
- Total recursive calls: 13
- Total comparisons: ~17
- Memory usage: O(7) additional space
- Time complexity: O(7 log 7) ≈ O(20) operations

**Final Sorted Array:** [11, 12, 22, 25, 34, 64, 90]

**References:**
- Cormen, T. H., Leiserson, C. E., Rivest, R. L., & Stein, C. (2009). Introduction to Algorithms (3rd ed.). MIT Press.
- https://www.geeksforgeeks.org/merge-sort/