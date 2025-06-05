def fnInsertionSort(arrElements: list, boolAscending: bool = True) -> tuple[list, list]:
    """
    Sorts an array using the insertion sort algorithm.

    Insertion sort works by iteratively taking one element from the unsorted portion
    of the array and inserting it into its correct position in the sorted portion.

    Parameters:
        arrElements (list): The array to be sorted.
        boolAscending (bool, optional): If True (default), sorts in ascending order.
                                        If False, sorts in descending order.

    Returns:
        tuple: A tuple containing:
            - list: The sorted array.
            - list: A list of array states after each iteration where a change occurred.

    References:
        https://www.geeksforgeeks.org/insertion-sort/
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