def comb_sort(intArr, ascending):
    """
        This algorithm use the known bubble sort algorithm, but instead of comparing the adjacent pairs it repeatedly sort pairs of element that are a certain gap apart. This gap starts as the length of the list and is continuously reduced by diving it to 1.3 at each cycle. 

    Reference:
        https://www.tutorchase.com/answers/a-level/computer-science/how-does-the-comb-sort-algorithm-work
        https://www.geeksforgeeks.org/comb-sort/

    Arguments:
        intArray (list): The list of integers to be sorted
        ascending (boolean): The list is ascending if True

    Return:
        list: The sorted list in ascending order
        list of lists: The order of array in each step

    Example:
        >>>bidirectional_enhanced_selection_sort([64, 34, 25, 12, 22, 11, 90])
        [11, 12, 22, 25, 34, 64, 90]
    """

    #variables
    intLength = len(intArr)
    intGap = int(len(intArr) / 1.3)
    steps = []

    #loop through array
    while intGap > 0:
        for i in range(intLength - intGap):
            if(ascending):
                if(intArr[i] > intArr[i + intGap]):
                    intTemporaryContainer = intArr[i]
                    intArr[i] = intArr[i + intGap]
                    intArr[i + intGap] = intTemporaryContainer
            else:
                if(intArr[i] < intArr[i + intGap]):
                    intTemporaryContainer = intArr[i]
                    intArr[i] = intArr[i + intGap]
                    intArr[i + intGap] = intTemporaryContainer

        intGap = int(intGap/1.3)
        steps.append(intArr[:])


    return intArr, steps
