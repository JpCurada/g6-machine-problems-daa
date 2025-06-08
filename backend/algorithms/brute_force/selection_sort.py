def fnSelectionSort(arrInput: list, boolAscending: bool = True) -> tuple[list, list]:
    """
    Description:
        Selection Sort algorithm that finds the minimum/maximum element 
        in the unsorted portion and places it at the beginning.

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
        for j in range(i + 1, intSize):
            varCurrent = arrResult[j].lower() if isinstance(arrResult[j], str) else arrResult[j]
            varMin = arrResult[intMinIndex].lower() if isinstance(arrResult[intMinIndex], str) else arrResult[intMinIndex]

            if (varCurrent < varMin and boolAscending) or (varCurrent > varMin and not boolAscending):
                intMinIndex = j

        if intMinIndex != i:
            arrResult[i], arrResult[intMinIndex] = arrResult[intMinIndex], arrResult[i]
            arrSteps.append(arrResult.copy())

    return arrResult, arrSteps


