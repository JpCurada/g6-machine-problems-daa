# Algorithm Activity Documentation Report

## I. Assigned Algorithm

**3.4 Name of Algorithm:**  
Strassen's Matrix Multiplication

**3.4.1 Algorithm Definition and Problem Solved**  
Strassen's algorithm is a divide-and-conquer matrix multiplication algorithm 
that reduces the number of scalar multiplications from O(n³) to O(n^2.807) by 
using 7 recursive multiplications instead of the standard 8.

Strassen's algorithm solves the problem of slow matrix multiplication by using a 
divide-and-conquer approach that breaks large matrices into smaller pieces and multiplies 
them more efficiently. Regular matrix multiplication takes O(n³) time, which becomes very 
slow for big matrices, but Strassen's method reduces this to O(n^2.807) by using 
only 7 multiplications instead of 8 when combining the smaller matrix pieces. This makes it 
much faster for large matrices used in scientific computing, machine learning, and graphics, 
allowing computers to handle bigger problems that would otherwise take too long to solve.

**3.4.2 Divide and Conquer Strategy**  
```python
"""
Strassen's Matrix Multiplication Algorithm

This implementation uses divide-and-conquer to multiply matrices faster than the standard O(n³) approach.

How it works:
1. Divide each matrix into 4 quadrants (submatrices)
2. Use 7 multiplications instead of 8 to compute the result
3. Recursively apply this to submatrices until they're small enough
4. For matrices not power-of-2 size, we pad with zeros

The algorithm achieves O(n^2.807) complexity instead of O(n³).
Base case switches to standard multiplication for small matrices to avoid overhead.

Reference: https://www.geeksforgeeks.org/strassens-matrix-multiplication/
"""

def matAdd(arrA, arrB):
    """Add two matrices"""
    intN = len(arrA)
    arrRes = [[0] * intN for _ in range(intN)]
    for intI in range(intN):
        for intJ in range(intN):
            arrRes[intI][intJ] = arrA[intI][intJ] + arrB[intI][intJ]
    return arrRes

def matSubtract(arrA, arrB):
    """Subtract two matrices"""
    intN = len(arrA)
    arrRes = [[0] * intN for _ in range(intN)]
    for intI in range(intN):
        for intJ in range(intN):
            arrRes[intI][intJ] = arrA[intI][intJ] - arrB[intI][intJ]
    return arrRes

def matPad(arrMatrix, intNewSize):
    """Pad matrix with zeros to make it intNewSize x intNewSize"""
    intCurrentSize = len(arrMatrix)
    arrPadded = [[0] * intNewSize for _ in range(intNewSize)]
    for intI in range(intCurrentSize):
        for intJ in range(intCurrentSize):
            arrPadded[intI][intJ] = arrMatrix[intI][intJ]
    return arrPadded

def matExtract(arrMatrix, intSize):
    """Extract top-left intSize x intSize portion of matrix"""
    arrExtracted = [[0] * intSize for _ in range(intSize)]
    for intI in range(intSize):
        for intJ in range(intSize):
            arrExtracted[intI][intJ] = arrMatrix[intI][intJ]
    return arrExtracted

def matMult(arrA, arrB):
    """Strassen matrix multiplication"""
    intN = len(arrA)
    arrRes = [[0] * intN for _ in range(intN)]
    
    # Handle non-power-of-2 sizes by padding
    if intN & (intN - 1) != 0:  # Not power of 2
        intPaddedSize = 1
        while intPaddedSize < intN:
            intPaddedSize <<= 1
        arrAPadded = matPad(arrA, intPaddedSize)
        arrBPadded = matPad(arrB, intPaddedSize)
        arrResPadded = matMult(arrAPadded, arrBPadded)
        return matExtract(arrResPadded, intN)
    
    # Base case: 1x1 matrix
    if intN == 1:
        arrRes[0][0] = arrA[0][0] * arrB[0][0]
        return arrRes
    
    # Base case: if small matrices use standard multiplication
    if intN <= 8:
        for intI in range(intN):
            for intJ in range(intN):
                for intK in range(intN):
                    arrRes[intI][intJ] += arrA[intI][intK] * arrB[intK][intJ]
        return arrRes
    
    # Split matrices into submatrices
    intHalf = intN // 2
    arrSubMat = [[[0] * intHalf for _ in range(intHalf)] for _ in range(8)]
    
    # Extract submatrices: A11, A12, A21, A22, B11, B12, B21, B22
    for intI in range(intHalf):
        for intJ in range(intHalf):
            arrSubMat[0][intI][intJ] = arrA[intI][intJ]                    # A11
            arrSubMat[1][intI][intJ] = arrA[intI][intJ + intHalf]          # A12
            arrSubMat[2][intI][intJ] = arrA[intI + intHalf][intJ]          # A21
            arrSubMat[3][intI][intJ] = arrA[intI + intHalf][intJ + intHalf] # A22
            arrSubMat[4][intI][intJ] = arrB[intI][intJ]                    # B11
            arrSubMat[5][intI][intJ] = arrB[intI][intJ + intHalf]          # B12
            arrSubMat[6][intI][intJ] = arrB[intI + intHalf][intJ]          # B21
            arrSubMat[7][intI][intJ] = arrB[intI + intHalf][intJ + intHalf] # B22
    
    # Compute 7 Strassen products
    arrM1 = matMult(matAdd(arrSubMat[0], arrSubMat[3]), matAdd(arrSubMat[4], arrSubMat[7]))
    arrM2 = matMult(matAdd(arrSubMat[2], arrSubMat[3]), arrSubMat[4])
    arrM3 = matMult(arrSubMat[0], matSubtract(arrSubMat[5], arrSubMat[7]))
    arrM4 = matMult(arrSubMat[3], matSubtract(arrSubMat[6], arrSubMat[4]))
    arrM5 = matMult(matAdd(arrSubMat[0], arrSubMat[1]), arrSubMat[7])
    arrM6 = matMult(matSubtract(arrSubMat[2], arrSubMat[0]), matAdd(arrSubMat[4], arrSubMat[5]))
    arrM7 = matMult(matSubtract(arrSubMat[1], arrSubMat[3]), matAdd(arrSubMat[6], arrSubMat[7]))
    
    # Compute result submatrices
    arrResMat = [[[0] * intHalf for _ in range(intHalf)] for _ in range(4)]
    arrResMat[0] = matAdd(matSubtract(matAdd(arrM1, arrM4), arrM5), arrM7)  # C11
    arrResMat[1] = matAdd(arrM3, arrM5)                                      # C12
    arrResMat[2] = matAdd(arrM2, arrM4)                                      # C21
    arrResMat[3] = matAdd(matSubtract(matAdd(arrM1, arrM3), arrM2), arrM6)   # C22
    
    # Combine result submatrices
    for intI in range(intHalf):
        for intJ in range(intHalf):
            arrRes[intI][intJ] = arrResMat[0][intI][intJ]                    # C11
            arrRes[intI][intJ + intHalf] = arrResMat[1][intI][intJ]          # C12
            arrRes[intI + intHalf][intJ] = arrResMat[2][intI][intJ]          # C21
            arrRes[intI + intHalf][intJ + intHalf] = arrResMat[3][intI][intJ] # C22
    
    return arrRes
```

**3.4.3 Step-by-Step Algorithm Process**  
*Sample Input:*
Matrix A = [1  2]    Matrix B = [5  6]
           [3  4]               [7  8]
Goal: Compute C = A × B

1. Initialize Algorithm
Input: Two 2×2 matrices A and B
Check: n = 2 (power of 2, no padding needed)

2. Check Base Case
n = 2 ≤ threshold, but proceeding with Strassen for demonstration
Split each matrix into 2×2 quadrants (1×1 submatrices)

3. Divide Matrices into Quadrants
A11 = [1], A12 = [2], A21 = [3], A22 = [4]
B11 = [5], B12 = [6], B21 = [7], B22 = [8]

4. Calculate Strassen Products (M1 - M7)
M1 = (A11 + A22) × (B11 + B22) = (1 + 4) × (5 + 8) = 5 × 13 = 65
M2 = (A21 + A22) × B11 = (3 + 4) × 5 = 7 × 5 = 35
M3 = A11 × (B12 - B22) = 1 × (6 - 8) = 1 × (-2) = -2
M4 = A22 × (B21 - B11) = 4 × (7 - 5) = 4 × 2 = 8
M5 = (A11 + A12) × B22 = (1 + 2) × 8 = 3 × 8 = 24
M6 = (A21 - A11) × (B11 + B12) = (3 - 1) × (5 + 6) = 2 × 11 = 22
M7 = (A12 - A22) × (B21 + B22) = (2 - 4) × (7 + 8) = (-2) × 15 = -30

5. Compute Result Quadrants
C11 = M1 + M4 - M5 + M7 = 65 + 8 - 24 + (-30) = 19
C12 = M3 + M5 = -2 + 24 = 22
C21 = M2 + M4 = 35 + 8 = 43
C22 = M1 - M2 + M3 + M6 = 65 - 35 + (-2) + 22 = 50

6. Assemble Final Matrix
Combine quadrants into result matrix C
No padding removal needed (original size maintained)

Final Matrix C:
C = [19  22]
    [43  50]

**3.4.4 Time Complexity Analysis**  
O(n^2.807)

**3.4.5 Worked Example: 4×4 matrix multiplication**  
*Sample Input:*
Matrix A = [1  2  3  4]    Matrix B = [5   6   7   8]
           [9 10 11 12]               [13 14 15 16]
           [17 18 19 20]              [21 22 23 24]
           [25 26 27 28]              [29 30 31 32]
Goal: Compute C = A × B using Strassen's algorithm

*Step-by-Step Process:*
1. Initialize Algorithm
Input: Two 4×4 matrices A and B
Check: n = 4 (power of 2, no padding needed)
Proceed with Strassen multiplication

2. Divide Matrices into 2×2 Quadrants
A11 = [1   2]    A12 = [3   4]    B11 = [5   6]    B12 = [7   8]
      [9  10]          [11 12]          [13 14]          [15 16]

A21 = [17 18]    A22 = [19 20]    B21 = [21 22]    B22 = [23 24]
      [25 26]          [27 28]          [29 30]          [31 32]

3. Calculate Matrix Sums and Differences for Strassen Products
(A11 + A22) = [20 22; 36 38]        (B11 + B22) = [28 30; 44 46]
(A21 + A22) = [36 38; 52 54]        (B12 - B22) = [-16 -16; -16 -16]
(B21 - B11) = [16 16; 16 16]        (A11 + A12) = [4 6; 20 22]
(A21 - A11) = [16 16; 16 16]        (B11 + B12) = [12 14; 28 30]
(A12 - A22) = [-16 -16; -16 -16]    (B21 + B22) = [44 46; 60 62]

4. Calculate Strassen Products (M1 - M7)
M1 = (A11 + A22) × (B11 + B22) = [20 22; 36 38] × [28 30; 44 46] = [1528 1612; 2680 2828]
M2 = (A21 + A22) × B11 = [36 38; 52 54] × [5 6; 13 14] = [674 748; 962 1068]
M3 = A11 × (B12 - B22) = [1 2; 9 10] × [-16 -16; -16 -16] = [-48 -48; -304 -304]
M4 = A22 × (B21 - B11) = [19 20; 27 28] × [16 16; 16 16] = [624 624; 880 880]
M5 = (A11 + A12) × B22 = [4 6; 20 22] × [23 24; 31 32] = [278 288; 1142 1184]
M6 = (A21 - A11) × (B11 + B12) = [16 16; 16 16] × [12 14; 28 30] = [640 704; 640 704]
M7 = (A12 - A22) × (B21 + B22) = [-16 -16; -16 -16] × [44 46; 60 62] = [-1664 -1728; -1664 -1728]

5. Compute Result Quadrants
C11 = M1 + M4 - M5 + M7 = [1528 1612; 2680 2828] + [624 624; 880 880] - [278 288; 1142 1184] + [-1664 -1728; -1664 -1728] = [210 220; 754 796]
C12 = M3 + M5 = [-48 -48; -304 -304] + [278 288; 1142 1184] = [230 240; 838 880]
C21 = M2 + M4 = [674 748; 962 1068] + [624 624; 880 880] = [1298 1372; 1842 1948]
C22 = M1 - M2 + M3 + M6 = [1528 1612; 2680 2828] - [674 748; 962 1068] + [-48 -48; -304 -304] + [640 704; 640 704] = [1446 1520; 2054 2164]

6. Assemble Final Matrix
Combine quadrants into 4×4 result matrix C

*Final Output:*
*Intermediate Products:*
M1 = [1528 1612; 2680 2828]
M2 = [674 748; 962 1068]
M3 = [-48 -48; -304 -304]
M4 = [624 624; 880 880]
M5 = [278 288; 1142 1184]
M6 = [640 704; 640 704]
M7 = [-1664 -1728; -1664 -1728]

*Result Quadrants:*
C11 = [210 220; 754 796]
C12 = [230 240; 838 880]
C21 = [1298 1372; 1842 1948]
C22 = [1446 1520; 2054 2164]

*Final Matrix C:*
C = [210   220   230   240]
    [754   796   838   880]
    [1298 1372  1446  1520]
    [1842 1948  2054  2164]


**References**
https://www.geeksforgeeks.org/strassens-matrix-multiplication/

https://www.tutorialspoint.com/data_structures_algorithms/strassens_matrix_multiplication_algorithm.htm