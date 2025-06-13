**5.5 Merge Sort Limitations**

## 1. Space Complexity
Merge Sort requires O(n) additional memory space for the temporary arrays used during the merging process. Unlike in-place algorithms like Quick Sort, this extra memory requirement can be problematic for large datasets or memory-constrained systems.

## 2. Not Adaptive
Merge Sort maintains O(n log n) time complexity regardless of input order. Even if the array is already sorted or nearly sorted, it still performs the same number of operations, unlike adaptive algorithms that can optimize for partially sorted data.

## 3. Cache Performance
The algorithm's divide-and-conquer approach can lead to poor cache locality, especially during the merge phase when accessing elements from different subarrays. This results in more cache misses compared to algorithms with better spatial locality.

## 4. Overhead for Small Arrays
For small datasets, Merge Sort's recursive overhead and merging operations can be less efficient than simpler algorithms like Insertion Sort, making hybrid approaches more practical in real-world implementations.