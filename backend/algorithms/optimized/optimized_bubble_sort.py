def fnBubbleSortOptimized(arrInput: list, boolAscending: bool = True) -> tuple[list, list]:
    """
    Description:
        Optimized Bubble Sort Algorithm (Cocktail Shaker Sort) that traverses 
        through the array in both directions alternatively, reducing the number 
        of comparisons needed.

    Parameters:
        arrInput (list): The array to be sorted, can contain numbers or strings
        boolAscending (bool): Sort in ascending order if True, descending if False

    Returns: 
        tuple: A tuple containing:
            - list: The sorted array
            - list: List of steps showing the array state after each iteration

    References:
        https://www.geeksforgeeks.org/cocktail-sort/
    """
    intSize: int = len(arrInput)
    intStart: int = 0
    intEnd: int = intSize - 1
    boolSwapped: bool = True
    arrResult: list = arrInput.copy()
    arrSteps: list = []

    while boolSwapped:
        boolSwapped = False

        # Forward pass
        for i in range(intStart, intEnd):
            if arrResult[i] > arrResult[i + 1]:
                arrResult[i], arrResult[i + 1] = arrResult[i + 1], arrResult[i]
                boolSwapped = True
                arrSteps.append(arrResult.copy())
        
        if not boolSwapped:
            break

        boolSwapped = False
        intEnd -= 1

        # Backward pass
        for i in range(intEnd - 1, intStart - 1, -1):
            if arrResult[i] > arrResult[i + 1]:
                arrResult[i], arrResult[i + 1] = arrResult[i + 1], arrResult[i]
                boolSwapped = True
                arrSteps.append(arrResult.copy())
        
        intStart += 1

    if not boolAscending:
        arrResult.reverse()
        arrSteps.append(arrResult.copy())

    return arrResult, arrSteps