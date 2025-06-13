**SECTION IV: ALGORITHMS COMPARISON**

Task Requirements:
4.1 Algorithm Selection
Choose ONE Greedy algorithm (recommend: Dijkstra's)
Choose ONE Divide & Conquer algorithm (recommend: Strassen Multiplication)
Justify selection for comparison
4.2 Comparison Table Creation

*Comparison how each approach works (greedy vs divide and conquer)*
Divide-and-conquer approach that breaks matrices into smaller submatrices, uses 7 strategic 
multiplications instead of 8, then combines results through mathematical formulas.

*Time Complexity* 
Divide-and-conquer
Best case: O(n^2.807)
Average case: O(n^2.807)
Worst case: O(n^2.807)

*Space Complexity*
O(n²) - requires significant additional memory for storing intermediate matrices (M1-M7), 
submatrices, and recursive call stack.

*Implementation Complexity*
High complexity - requires multiple helper functions, recursive structure, and careful 
handling of non-power-of-2 matrices.

*Problem Type Solved*
Matrix multiplication - multiplies two square matrices to produce a result matrix. 
Takes two n×n matrices as input and outputs one n×n matrix.

*Practical Applications*
Machine learning and neural networks
Computer graphics and 3D rendering
Image processing algorithms

*Strengths and Weakness*
Strengths: Faster than standard O(n³) multiplication for large matrices, significant performance gains for n > 1000
Weakness: Memory intensive, numerical stability issues, complex implementation, only beneficial for very large matrices

*Scalability*
Good scalability for very large matrices 

*Optimization Guarantee*
Always produces correct result - mathematically equivalent to standard matrix multiplication.

*Constraints*
Works best with square matrices
Requires padding for non-power-of-2 sizes
Needs sufficient memory for intermediate storage
Most effective when n > 1000


Strassen Multiplication References
https://codecrucks.com/matrix-multiplication-using-divide-and-conquer/
https://www.geeksforgeeks.org/strassens-matrix-multiplication/

