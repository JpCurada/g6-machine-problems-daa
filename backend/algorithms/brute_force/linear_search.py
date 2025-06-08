def fnLinearSearch(arrInput: list, varTarget: any) -> int:
    """
    Description:
        Performs a sequential search through the array to find the target element.
        Returns the index of the first occurrence of the target if found.

    Parameters:
        arrInput (list): The array to search in, can contain any comparable type
        varTarget (any): The target element to search for

    Returns:
        int: Index of the first occurrence of varTarget if found, -1 otherwise

    References:
        https://www.geeksforgeeks.org/linear-search/
    """
    for intIndex in range(len(arrInput)):
        if arrInput[intIndex] == varTarget:
            return intIndex
    return -1