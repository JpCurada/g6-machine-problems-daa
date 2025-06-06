from utils.helpers import timeit

@timeit
def fnBinarySearch(arrElements: list, varTarget) -> tuple[int, list]:
    """
    Searches for a target element in a sorted array using the binary search algorithm.

    Binary search works by repeatedly dividing the search interval in half. If the target
    value is less than the item in the middle of the interval, it narrows the interval
    to the lower half. Otherwise, it narrows it to the upper half. The search continues
    until the target value is found or the interval is empty.

    Parameters:
        arrElements (list): The sorted array to search in.
        varTarget: The element to search for.

    Returns:
        tuple: A tuple containing:
            - int: The index of the target element if found, -1 if not found.
            - list: A list of search steps showing the range being examined at each iteration.

    References:
        https://www.geeksforgeeks.org/binary-search/
    """
    intLeft = 0
    intRight = len(arrElements) - 1
    arrSteps = []

    while intLeft <= intRight:
        intMid = intLeft + (intRight - intLeft) // 2
        arrSteps.append([intLeft, intMid, intRight])

        if arrElements[intMid] == varTarget:
            return intMid, arrSteps
        elif arrElements[intMid] < varTarget:
            intLeft = intMid + 1
        else:
            intRight = intMid - 1

    return -1, arrSteps