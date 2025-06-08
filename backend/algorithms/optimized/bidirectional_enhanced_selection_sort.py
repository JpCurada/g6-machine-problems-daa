def bidirectional_enhanced_selection_sort(intArray, ascending):
    """
        This function use the advantage of applying the selection sort algorithm bidirectionally (from left to right & right to left in one iteration), swapping the previous maximum/minimum to the location before the new maximum/minimum, storing the new location of previous maximum/minimum to the stack, and once there's no new maximum/minimum, then the current maximum/minimum will be place to its correct position. To continue, the previous maximum/minimum in the stack will be use as the starting point for the next iteration and will repeat the process. And Finally, the sorting will stop when there is an empty stack or the stack pop of both are equal, or the front search is greater than the end search and the end search is less than the front search.
    
    Reference:
        https://papers.ssrn.com/sol3/papers.cfm?abstract_id=3828471
        
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
    stackMaxLocation = []
    stackMinLocation = []
    intEnd = len(intArray)
    intFront = 0
    intMaxBegin = 0
    intCurrentMax = 0
    intCurrentMin = intEnd - 2
    steps = []

    #loop through the array
    while intFront<intEnd and intEnd>intFront:

        #loop from left to right (sort the large value)
        for i in range(intCurrentMax, intEnd):

            if(ascending):
                if(intArray[intCurrentMax] < intArray[i]):
                    intTemporaryContainer = intArray[intCurrentMax]
                    intArray[intCurrentMax] = intArray[i - 1]
                    intArray[i - 1] = intTemporaryContainer

                    stackMaxLocation.append(i - 1)

                    intCurrentMax = i
            else:
                if(intArray[intCurrentMax] > intArray[i]):
                    intTemporaryContainer = intArray[intCurrentMax]
                    intArray[intCurrentMax] = intArray[i - 1]
                    intArray[i - 1] = intTemporaryContainer

                    stackMaxLocation.append(i - 1)

                    intCurrentMax = i

        
        intTemporaryContainer = intArray[intCurrentMax]
        intArray[intCurrentMax] = intArray[intEnd - 1]
        intArray[intEnd - 1] = intTemporaryContainer

        intEnd -= 1

        #loop from right to left (sort the small value)
        for j in range(intCurrentMin, intFront - 1, -1):
            if(ascending):
                if(intArray[intCurrentMin] > intArray[j]):
                    intTemporaryContainer = intArray[intCurrentMin]
                    intArray[intCurrentMin] = intArray[j + 1]
                    intArray[j + 1] = intTemporaryContainer

                    stackMinLocation.append(j + 1)

                    intCurrentMin = j
            else:
                if(intArray[intCurrentMin] < intArray[j]):
                    intTemporaryContainer = intArray[intCurrentMin]
                    intArray[intCurrentMin] = intArray[j + 1]
                    intArray[j + 1] = intTemporaryContainer

                    stackMinLocation.append(j + 1)

                    intCurrentMin = j


        intTemporaryContainer = intArray[intCurrentMin]
        intArray[intCurrentMin] = intArray[intFront]
        intArray[intFront] = intTemporaryContainer

        intFront += 1

        steps.append(intArray[:])

        try:
            intCurrentMax = stackMaxLocation.pop()
            intCurrentMin = stackMinLocation.pop()

            if(intCurrentMax == intCurrentMin):
                break

        except IndexError:
            intCurrentMax = intFront
            intCurrentMin = intEnd
            continue

    return intArray, steps

