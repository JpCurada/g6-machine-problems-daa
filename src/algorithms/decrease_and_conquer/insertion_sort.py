def fnInsertionSort(arrElements: list, boolAscending: bool = True) -> tuple[list, list]:
    """
    Description:
        A very simple sorting algorithm that works by iteratively inserting an
        element from the unsorted list to the sorted list.

    Parameters:
        arrElements (list): The array to be sorted.
        boolAscending (bool): Default value is True, which sorts the array in ascending order.
                              Otherwise, it sorts in descending order.   

    Returns: 
        tuple: A tuple containing:
            - list: The sorted array
            - list: List of steps showing the array state after each iteration

    References:
        https://www.geeksforgeeks.org/bubble-sort-algorithm/
    """
    arrResult = arrElements.copy()
    intSize = len(arrElements)
    arrSteps = [arrElements.copy()]

    if boolAscending:
        for i in range(1, intSize):
            key = arrResult[i]
            j = i - 1
            swapped = False  # Reset swapped for this iteration
            while j >= 0 and arrResult[j] > key:
                arrResult[j + 1] = arrResult[j]
                j -= 1
                swapped = True  # A swap has happened
            arrResult[j + 1] = key
            if swapped:
                arrSteps.append(arrResult.copy())
    else:
        for i in range(1, intSize):
            key = arrResult[i]
            j = i - 1
            swapped = False
            while j >= 0 and arrResult[j] < key:
                arrResult[j + 1] = arrResult[j]
                j -= 1
                swapped = True
            arrResult[j + 1] = key
            if swapped:
                arrSteps.append(arrResult.copy())

    return arrResult, arrSteps