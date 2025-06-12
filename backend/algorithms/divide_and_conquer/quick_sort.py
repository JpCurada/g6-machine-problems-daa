def fnQuickSort(arrListElements: list, boolAscending: bool = True) -> tuple[list, list]:
    """
    Description:
        Quick Sort is a highly efficient sorting algorithm that uses a divide-and-conquer approach.
        It works by selecting a 'pivot' element from the array and partitioning the other elements into two sub-arrays,

    Parameters:
        arrListElements (list): The array to be sorted.
        boolAscending (bool): True for ascending, False for descending order.

    Returns:
        tuple: A tuple containing:
            - list: The sorted array
            - list: List of steps showing the array state after each partitioning)
    """

    arrListResult = arrListElements.copy()
    arrListSteps = []

    def fnPartitionAsc(low, high):
        pivot = arrListResult[high]
        i = low - 1
        for j in range(low, high):
            if arrListResult[j] <= pivot:
                i += 1
                arrListResult[i], arrListResult[j] = arrListResult[j], arrListResult[i]
        arrListResult[i + 1], arrListResult[high] = arrListResult[high], arrListResult[i + 1]
        return i + 1

    def fnPartitionDesc(low, high):
        pivot = arrListResult[high]
        i = low - 1
        for j in range(low, high):
            if arrListResult[j] >= pivot:
                i += 1
                arrListResult[i], arrListResult[j] = arrListResult[j], arrListResult[i]
        arrListResult[i + 1], arrListResult[high] = arrListResult[high], arrListResult[i + 1]
        return i + 1

    def fnQuickSortHelper(low, high, partition_func):
        if low < high:
            partitionIndex = partition_func(low, high)
            arrListSteps.append(arrListResult.copy())
            fnQuickSortHelper(low, partitionIndex - 1, partition_func)
            fnQuickSortHelper(partitionIndex + 1, high, partition_func)

    start = 0
    end = len(arrListResult) - 1

    if boolAscending:
        fnQuickSortHelper(start, end, fnPartitionAsc)
    else:
        fnQuickSortHelper(start, end, fnPartitionDesc)

    return arrListResult, arrListSteps


