#fn_bubble_sort is a function that takes a list as a parameter
def fnBubbleSort(arrInput: list, boolAscending: bool = True) -> tuple[list, list]:
    """
    Description:
        The simplest sorting algorithm that works by repeatedly 
        swapping the adjacent elements if they are in the wrong order.

    Parameters:
        arrInput (list): The array to be sorted, can contain numbers or strings
        boolAscending (bool): Sort in ascending order if True, descending if False

    Returns: 
        tuple: A tuple containing:
            - list: The sorted array
            - list: List of steps showing the array state after each iteration

    References:
        https://www.geeksforgeeks.org/bubble-sort-algorithm/
    """
    
    intSize: int = len(arrInput)
    arrSteps: list = []
    arrResult: list = arrInput.copy()

    if boolAscending:
        for i in range(intSize):
            boolSwapped: bool = False
            for j in range(0, intSize - i - 1):
                if arrResult[j] > arrResult[j + 1]:
                    arrResult[j], arrResult[j + 1] = arrResult[j + 1], arrResult[j]
                    boolSwapped = True
            
            if boolSwapped:
                arrSteps.append(arrResult.copy())
            
            if not boolSwapped:
                break
    else:
        for i in range(intSize):
            boolSwapped: bool = False
            for j in range(0, intSize - i - 1):
                if arrResult[j] < arrResult[j + 1]:
                    arrResult[j], arrResult[j + 1] = arrResult[j + 1], arrResult[j]
                    boolSwapped = True
            
            if boolSwapped:
                arrSteps.append(arrResult.copy())
            
            if not boolSwapped:
                break

    return arrResult, arrSteps

