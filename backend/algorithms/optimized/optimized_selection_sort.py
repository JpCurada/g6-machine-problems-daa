def fnSelectionSortOptimized(arrInput: list, boolAscending: bool = True) -> tuple[list, list]:
    """
    Description:
        Optimized Selection Sort that reduces the number of swaps by only 
        performing a swap when a new minimum/maximum element is found in 
        the unsorted portion.

    Parameters:
        arrInput (list): The array to be sorted, can contain numbers or strings
        boolAscending (bool): Sort in ascending order if True, descending if False

    Returns:
        tuple: A tuple containing:
            - list: The sorted array
            - list: List of steps showing the array state after each iteration

    References:
        https://www.geeksforgeeks.org/selection-sort/
    """
    intSize: int = len(arrInput)
    arrResult: list = arrInput.copy()
    arrSteps: list = []

    for i in range(intSize):
        intMinIndex: int = i
        varCurrent = arrResult[intMinIndex].lower() if isinstance(arrResult[intMinIndex], str) else arrResult[intMinIndex]

        for j in range(i + 1, intSize):
            varComp = arrResult[j].lower() if isinstance(arrResult[j], str) else arrResult[j]

            if (varComp < varCurrent and boolAscending) or (varComp > varCurrent and not boolAscending):
                intMinIndex = j
                varCurrent = varComp

        if intMinIndex != i:
            arrResult[i], arrResult[intMinIndex] = arrResult[intMinIndex], arrResult[i]
            arrSteps.append(arrResult.copy())

    return arrResult, arrSteps