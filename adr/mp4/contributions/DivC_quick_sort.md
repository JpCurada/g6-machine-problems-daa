# Algorithm Activity Documentation Report

## I. Assigned Algorithm

**A. Quick Sort:**  

**B. Algorithm Definition and Problem Solved:**  
QuickSort is a sorting algorithm based on the Divide and Conquer that picks an element as a pivot and partitions the given array around the picked pivot by placing the pivot in its correct position in the sorted part of the array (GeeksforGeeks, 2014). Quick sort is a highly efficient and practical choice for general purpose sorting in scenarios where large data sets is used, the input is unsorted or randomly distributed, and where sorting speed matters more than maintaining the original order of equal elements.

**C. Divide And Conquer Strategy:**
The Quick Sort Algorithm works under the principle / strategy divide and conquer, where the problem is systematically broken down into smaller sub-problems to eventually achieve a completely sorted array. The main logic behind this algorithm involves choosing one of the values as the pivot element, it can either be from the middle, front or end then moves the other values so that lower values are on the left of the pivot element, and higher values are on the right of it (W3Schools, n.d.). This recursive process will continue until all sub-arrays contain only one element or are empty, meaning that the4 list / array is already sorted.

## II. Python Implementation

**Function Code:**  
```python
def fnQuickSort(arrListElements: list, boolAscending: bool = True) -> tuple[list, list]:
    """
    Description:
        Quick Sort is a highly efficient sorting algorithm that uses a divide-and-conquer approach.
        It works by selecting a 'pivot' element from the array and partitioning the other elements into two sub-arrays,

    Parameters:
        arrListElements (list): The array to be sorted.
        boolAscending (bool): True for ascending, False for descending order.

    Returns:
        tuple: A tuple containing:
            - list: The sorted array
            - list: List of steps showing the array state after each partitioning)
    """

    arrListResult = arrListElements.copy()
    arrListSteps = []

    def fnPartitionAsc(low, high):
        pivot = arrListResult[high]
        i = low - 1
        for j in range(low, high):
            if arrListResult[j] <= pivot:
                i += 1
                arrListResult[i], arrListResult[j] = arrListResult[j], arrListResult[i]
        arrListResult[i + 1], arrListResult[high] = arrListResult[high], arrListResult[i + 1]
        return i + 1

    def fnPartitionDesc(low, high):
        pivot = arrListResult[high]
        i = low - 1
        for j in range(low, high):
            if arrListResult[j] >= pivot:
                i += 1
                arrListResult[i], arrListResult[j] = arrListResult[j], arrListResult[i]
        arrListResult[i + 1], arrListResult[high] = arrListResult[high], arrListResult[i + 1]
        return i + 1

    def fnQuickSortHelper(low, high, partition_func):
        if low < high:
            partitionIndex = partition_func(low, high)
            arrListSteps.append(arrListResult.copy())
            fnQuickSortHelper(low, partitionIndex - 1, partition_func)
            fnQuickSortHelper(partitionIndex + 1, high, partition_func)

    start = 0
    end = len(arrListResult) - 1

    if boolAscending:
        fnQuickSortHelper(start, end, fnPartitionAsc)
    else:
        fnQuickSortHelper(start, end, fnPartitionDesc)

    return arrListResult, arrListSteps
```
---

## III. Simulation / Step-by-Step Example

**A. Step-by-Step Process:** 
Example Array : [23, 45, 12, 67, 34, 10, 50]

Step 1: quick_sort(arr, 0, 6)
    - Pivot = 50
    - Rearranged: [23, 45, 12, 34, 10, 50, 67]
    - Partition index = 5
    - Recursive calls:
    - Left: arr[0:4] → [23, 45, 12, 34, 10]
    - Right: arr[6:6] → [67] (base case)

Step 2: quick_sort(arr, 0, 4)
    - Pivot = 10
    - Rearranged: [10, 45, 12, 34, 23]
    - Partition index = 0
    - Recursive calls:
    - Left: arr[0:-1] → skipped
    - Right: arr[1:4] → [45, 12, 34, 23]

Step 3: quick_sort(arr, 1, 4)
    - Pivot = 23
    - Rearranged: [10, 12, 23, 34, 45]
    - Partition index = 2
    - Recursive calls:
    - Left: arr[1:1] → [12] (base case)
    - Right: arr[3:4] → [34, 45]

Step 4: quick_sort(arr, 3, 4)
    - Pivot = 45
    - 34 < 45 → swap
    - Partition index = 4
    - Recursive calls:
    - Left: arr[3:3] → base case
    - Right: arr[5:4] → skipped

Final Sorted Array: [10, 12, 23, 34, 45, 50, 67]

**B. Time Complexity Analysis**
Code
    pivot = arrListResult[high]                                                         	Line 1
    i = low - 1                                  	                                        Line 2
    for j in range(low, high):                   	                                        Line 3
        if arrListResult[j] <= pivot:                                                       Line 4
            i += 1                               	                                        Line 5
            arrListResult[i], arrListResult[j] = arrListResult[j], arrListResult[i]      	Line 6
    arrListResult[i + 1], arrListResult[high] = arrListResult[high], arrListResult[i + 1]	Line 7
    return i + 1                                 	                                        Line 8

Computation
    Line 1		O(1)
    Line 2		O(1)
    Line 3		O(n)
    Line 4		O(1) (per iteration)
    Line 5		O(1) (per iteration)
    Line 6		O(1) (per iteration)
    Line 7		O(1)
    Line 8		O(1)

Partition
	1+1+n+1+1+1+1+1
    = n + 7
	= O(n)

Recursive Time + Partition Time

	Best Case: T(n) = 2T(n/2) + O(n)
        = O(n log n)
        
	Average Case: T(n) = 2T(n/2) + O(n)
        = O(n log n)

	Worst Case: T(n) = T(n−1) + O(n)
        = O(n²)

## IV. Discussion

**A. Limitations:** 
    1. Worst-Case Time Complexity (O(n²))
        - In the worst case, Quick Sort has a time complexity of O(n²), which occurs when the pivot selection consistently results in highly unbalanced partitions. This can happen with already sorted or reverse-sorted arrays if the first or last element is always chosen as the pivot (Youcademy, 2024). This represents the most significant limitation of the Quicksort algorithm. This degrades the algorithm's performance dramatically, making it comparable to inefficient sorting algorithms like bubble sort in some specific scenarios.

    2. Lack of Stability
        - Quick Sort is not a stable sorting algorithm by default. Quick Sort might change the relative order of these identical items (Youcademy, 2024). This limitation becomes problematic in applications where maintaining the original order of equal elements is crucial. If maintaining the original order of equal elements is important, Quick Sort might not be the best choice without modifications (Youcademy, 2024). For example, sorting a student record by age, but some of them have the same age. If the original order of those students matters, a stable sort will keep that original order.

    3. Recursive Overhead and Stack Space Requirements
        - A simple implementation of QuickSort makes two calls to itself and in worst case requires O(n) space on function call stack (GeeksforGeeks, 2014). Being a recursive algorithm, Quick Sort uses the system's call stack to manage the function calls for sorting sub-arrays. In the worst-case scenario this stack usage can become deep, potentially leading to a stack overflow error if the list is extremely large and partitioning is consistently unbalanced (Youcademy, 2024).

    4. Inefficiency with Small Datasets
        - The divide-and-conquer approach of Quick Sort introduces computational overhead that becomes very inappropriate when  working with small datasets / arrays making simpler algorithms such as insertion sort to be a better option (Youcademy, 2024). Additionally compared to simpler algorithms, quick qort is more complex to implement correctly, especially when considering optimizations like tail recursion elimination or median-of-three pivot selection (Youcademy, 2024). This complexity, combined with the partitioning overhead, makes quick sort inefficient for small arrays where the benefits of the divide and conquer strategy are not fully utilized.

**B. References:**  
    - https://www.geeksforgeeks.org/quick-sort-algorithm/
    - https://www.w3schools.com/dsa/dsa_algo_quicksort.php
    - https://youcademy.org/quick-sort-advantages-disadvantages/