def fnSentinelLinearSearch(arrInput: list, varTarget: any) -> int:
    """
    Description:
        Performs an optimized sequential search using the sentinel technique.
        Temporarily places the target at the end of the array to eliminate 
        the need for bounds checking in each iteration.

    Parameters:
        arrInput (list): The array to search in, can contain any comparable type
        varTarget (any): The target element to search for

    Returns:
        int: Index of the first occurrence of varTarget if found, -1 otherwise

    References:
        https://www.geeksforgeeks.org/sentinel-linear-search/
    """
    intSize: int = len(arrInput)
    if intSize == 0:
        return -1

    # Store the last element and place target at the end
    varLastElement: any = arrInput[intSize - 1]
    arrInput[intSize - 1] = varTarget

    # Search without bounds checking
    intIndex: int = 0
    while arrInput[intIndex] != varTarget:
        intIndex += 1

    # Restore the last element
    arrInput[intSize - 1] = varLastElement

    # Check if element was found
    if intIndex < intSize - 1 or varLastElement == varTarget:
        return intIndex
    return -1

