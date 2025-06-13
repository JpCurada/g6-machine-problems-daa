"""
Strassen's Matrix Multiplication Algorithm Implementation

This module provides implementation of Strassen's algorithm for efficient
matrix multiplication using divide-and-conquer approach.
"""

from typing import List, Tuple


def fnAddMatrices(arrMatrixA: List[List[int]], arrMatrixB: List[List[int]], 
                  intSize: int, intSign: int = 1) -> List[List[int]]:
    """
    Add or subtract two matrices element-wise.

    Description:
        Performs element-wise addition or subtraction of two square matrices.
        Used as a helper function in Strassen's matrix multiplication algorithm.

    Parameters:
        arrMatrixA (List[List[int]]): First input matrix
        arrMatrixB (List[List[int]]): Second input matrix  
        intSize (int): Size of the square matrices (n x n)
        intSign (int): 1 for addition, -1 for subtraction (default: 1)

    Returns:
        List[List[int]]: Resulting matrix after addition/subtraction

    References:
        https://en.wikipedia.org/wiki/Matrix_addition
    """
    arrResult: List[List[int]] = [[0] * intSize for _ in range(intSize)]
    
    for intRow in range(intSize):
        for intCol in range(intSize):
            arrResult[intRow][intCol] = arrMatrixA[intRow][intCol] + intSign * arrMatrixB[intRow][intCol]
    
    return arrResult


def fnStrassenMultiplication(arrMatrixA: List[List[int]], 
                           arrMatrixB: List[List[int]]) -> Tuple[List[List[int]], List[str]]:
    """
    Multiply two matrices using Strassen's algorithm.

    Description:
        Strassen's algorithm is a divide-and-conquer algorithm for matrix multiplication
        that reduces the computational complexity from O(n³) to approximately O(n^2.807).
        It works by recursively dividing matrices into smaller submatrices and using
        seven multiplications instead of eight.

    Parameters:
        arrMatrixA (List[List[int]]): First input matrix (n x n)
        arrMatrixB (List[List[int]]): Second input matrix (n x n)

    Returns:
        tuple: A tuple containing:
            - List[List[int]]: Result matrix of multiplication
            - List[str]: List of steps showing algorithm execution

    Raises:
        ValueError: If matrices are not square or have different dimensions
        ValueError: If matrix size is not a power of 2

    References:
        https://en.wikipedia.org/wiki/Strassen_algorithm
        https://www.geeksforgeeks.org/strassens-matrix-multiplication/
    """
    intSize: int = len(arrMatrixA)
    arrSteps: List[str] = []
    
    # Validation
    if intSize != len(arrMatrixB) or intSize != len(arrMatrixA[0]) or intSize != len(arrMatrixB[0]):
        raise ValueError("Matrices must be square and of same dimensions")
    
    # Check if size is power of 2 (for simplicity in this implementation)
    if intSize & (intSize - 1) != 0:
        raise ValueError("Matrix size must be a power of 2 for this implementation")
    
    arrSteps.append(f"Starting Strassen multiplication for {intSize}x{intSize} matrices")
    
    def fnStrassenRecursive(arrA: List[List[int]], arrB: List[List[int]]) -> List[List[int]]:
        """Recursive helper function for Strassen multiplication."""
        intCurrentSize: int = len(arrA)
        arrResult: List[List[int]] = [[0] * intCurrentSize for _ in range(intCurrentSize)]

        # Base case: 1x1 matrix
        if intCurrentSize == 1:
            arrResult[0][0] = arrA[0][0] * arrB[0][0]
            arrSteps.append(f"Base case: {arrA[0][0]} * {arrB[0][0]} = {arrResult[0][0]}")
            return arrResult

        intHalfSize: int = intCurrentSize // 2
        arrSteps.append(f"Dividing {intCurrentSize}x{intCurrentSize} matrices into {intHalfSize}x{intHalfSize} submatrices")
        
        # Initialize submatrices
        arrA11: List[List[int]] = [[0] * intHalfSize for _ in range(intHalfSize)]
        arrA12: List[List[int]] = [[0] * intHalfSize for _ in range(intHalfSize)]
        arrA21: List[List[int]] = [[0] * intHalfSize for _ in range(intHalfSize)]
        arrA22: List[List[int]] = [[0] * intHalfSize for _ in range(intHalfSize)]
        arrB11: List[List[int]] = [[0] * intHalfSize for _ in range(intHalfSize)]
        arrB12: List[List[int]] = [[0] * intHalfSize for _ in range(intHalfSize)]
        arrB21: List[List[int]] = [[0] * intHalfSize for _ in range(intHalfSize)]
        arrB22: List[List[int]] = [[0] * intHalfSize for _ in range(intHalfSize)]

        # Split matrices into quadrants
        for intRow in range(intHalfSize):
            for intCol in range(intHalfSize):
                arrA11[intRow][intCol] = arrA[intRow][intCol]
                arrA12[intRow][intCol] = arrA[intRow][intCol + intHalfSize]
                arrA21[intRow][intCol] = arrA[intRow + intHalfSize][intCol]
                arrA22[intRow][intCol] = arrA[intRow + intHalfSize][intCol + intHalfSize]
                arrB11[intRow][intCol] = arrB[intRow][intCol]
                arrB12[intRow][intCol] = arrB[intRow][intCol + intHalfSize]
                arrB21[intRow][intCol] = arrB[intRow + intHalfSize][intCol]
                arrB22[intRow][intCol] = arrB[intRow + intHalfSize][intCol + intHalfSize]

        # Strassen's seven multiplications
        arrSteps.append("Computing Strassen's seven multiplications (M1-M7)")
        
        arrM1: List[List[int]] = fnStrassenRecursive(
            fnAddMatrices(arrA11, arrA22, intHalfSize), 
            fnAddMatrices(arrB11, arrB22, intHalfSize)
        )
        
        arrM2: List[List[int]] = fnStrassenRecursive(
            fnAddMatrices(arrA21, arrA22, intHalfSize), 
            arrB11
        )
        
        arrM3: List[List[int]] = fnStrassenRecursive(
            arrA11, 
            fnAddMatrices(arrB12, arrB22, intHalfSize, -1)
        )
        
        arrM4: List[List[int]] = fnStrassenRecursive(
            arrA22, 
            fnAddMatrices(arrB21, arrB11, intHalfSize, -1)
        )
        
        arrM5: List[List[int]] = fnStrassenRecursive(
            fnAddMatrices(arrA11, arrA12, intHalfSize), 
            arrB22
        )
        
        arrM6: List[List[int]] = fnStrassenRecursive(
            fnAddMatrices(arrA21, arrA11, intHalfSize, -1), 
            fnAddMatrices(arrB11, arrB12, intHalfSize)
        )
        
        arrM7: List[List[int]] = fnStrassenRecursive(
            fnAddMatrices(arrA12, arrA22, intHalfSize, -1), 
            fnAddMatrices(arrB21, arrB22, intHalfSize)
        )

        # Calculate result submatrices using Strassen's formulas
        arrSteps.append("Computing result submatrices (C11, C12, C21, C22)")
        
        arrC11: List[List[int]] = fnAddMatrices(
            fnAddMatrices(arrM1, arrM4, intHalfSize), 
            fnAddMatrices(arrM7, arrM5, intHalfSize, -1), 
            intHalfSize
        )
        
        arrC12: List[List[int]] = fnAddMatrices(arrM3, arrM5, intHalfSize)
        
        arrC21: List[List[int]] = fnAddMatrices(arrM2, arrM4, intHalfSize)
        
        arrC22: List[List[int]] = fnAddMatrices(
            fnAddMatrices(arrM1, arrM3, intHalfSize), 
            fnAddMatrices(arrM6, arrM2, intHalfSize, -1), 
            intHalfSize
        )

        # Combine result submatrices into final result
        for intRow in range(intHalfSize):
            for intCol in range(intHalfSize):
                arrResult[intRow][intCol] = arrC11[intRow][intCol]
                arrResult[intRow][intCol + intHalfSize] = arrC12[intRow][intCol]
                arrResult[intRow + intHalfSize][intCol] = arrC21[intRow][intCol]
                arrResult[intRow + intHalfSize][intCol + intHalfSize] = arrC22[intRow][intCol]

        return arrResult

    arrFinalResult: List[List[int]] = fnStrassenRecursive(arrMatrixA, arrMatrixB)
    arrSteps.append(f"Strassen multiplication completed. Result is {intSize}x{intSize} matrix")
    
    return arrFinalResult, arrSteps


def fnMatrixMultiplication(arrMatrixA: List[List[int]], 
                          arrMatrixB: List[List[int]], 
                          strMethod: str = "strassen") -> Tuple[List[List[int]], List[str]]:
    """
    Wrapper function for matrix multiplication with method selection.

    Description:
        A convenient wrapper function that provides matrix multiplication
        using different algorithms. Currently supports Strassen's algorithm.

    Parameters:
        arrMatrixA (List[List[int]]): First input matrix
        arrMatrixB (List[List[int]]): Second input matrix
        strMethod (str): Multiplication method - "strassen" (default)

    Returns:
        tuple: A tuple containing:
            - List[List[int]]: Result matrix
            - List[str]: List of algorithm execution steps

    Example:
        matrix_a = [[1, 2], [3, 4]]
        matrix_b = [[5, 6], [7, 8]]
        result, steps = fnMatrixMultiplication(matrix_a, matrix_b, "strassen")

    References:
        https://www.geeksforgeeks.org/strassen-algorithm/
    """
    if strMethod.lower() == "strassen":
        return fnStrassenMultiplication(arrMatrixA, arrMatrixB)
    else:
        raise ValueError(f"Unsupported multiplication method: {strMethod}")
