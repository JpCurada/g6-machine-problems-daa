def josephus_problem(intLength, intInterval):
    """
        The function is a theoretical problem related to a group of people standing in a circle and eliminating every k-th person until only one remains.
    Reference:
        https://www.geeksforgeeks.org/josephus-problem/
        
    Arguments:
        intLength (int): The size of the population
        intInterval (int): The step count to eliminate a person in each cycle (i.e., every k-th person).

    Return:
        list: The order of elimination
        int: The survivor
    Example:
        >>>josephusProblem(8, 4)

        intSurvivor: 6, intEliminationOrder: [4, 8, 5, 2, 1, 3, 7, 6]
    """

    intList = list(range(1, intLength + 1))
    intEliminationOrder = []
    index = 0

    while(len(intList) > 1):
        index = (index + intInterval - 1) % len(intList)
        intEliminationOrder.append(intList[index])
        intList.pop(index)

    intSurvivor = intList[0]

    intEliminationOrder.append(intList[0])    #If the last survivor is included in elimination order

    return intSurvivor, intEliminationOrder
