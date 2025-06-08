def fnKnapsackBruteForce(arrItems: list, intMaxCapacity: int) -> tuple[list, int, list]:
    """
    Description:
        Solves the 0/1 Knapsack problem using brute force approach by generating
        all possible combinations of items and finding the most valuable valid combination.

    Parameters:
        arrItems (list): List of tuples (name: str, weight: int, value: int)
        intMaxCapacity (int): Maximum weight capacity of knapsack

    Returns:
        tuple: A tuple containing:
            - list: Names of items in the best combination
            - int: Total value of the best combination
            - list: All valid combinations with their weights and values as (items, weight, value)

    References:
        https://www.geeksforgeeks.org/0-1-knapsack-problem-dp-10/
    """
    intItemCount: int = len(arrItems)
    intBestValue: int = 0
    arrBestSubset: list = []
    arrValidSubsets: list = []

    # Include empty subset
    arrValidSubsets.append(([], 0, 0))

    intSubsetIndex: int = 1
    while intSubsetIndex < 2 ** intItemCount:
        arrCurrentSubset: list = []
        intCurrentWeight: int = 0
        intCurrentValue: int = 0
        intItemIndex: int = 0

        while intItemIndex < intItemCount:
            if intSubsetIndex & (1 << intItemIndex):
                strItemName, intItemWeight, intItemValue = arrItems[intItemIndex]
                arrCurrentSubset.append(strItemName)
                intCurrentWeight += intItemWeight
                intCurrentValue += intItemValue
            intItemIndex += 1

        if intCurrentWeight <= intMaxCapacity:
            arrValidSubsets.append((arrCurrentSubset, intCurrentWeight, intCurrentValue))

            if intCurrentValue > intBestValue:
                intBestValue = intCurrentValue
                arrBestSubset = arrCurrentSubset

        intSubsetIndex += 1

    # Sort valid subsets by length and value
    intOuter: int = 0
    while intOuter < len(arrValidSubsets):
        intInner: int = 0
        while intInner < len(arrValidSubsets) - intOuter - 1:
            arrSubsetA, intWeightA, intValueA = arrValidSubsets[intInner]
            arrSubsetB, intWeightB, intValueB = arrValidSubsets[intInner + 1]

            if len(arrSubsetA) > len(arrSubsetB) or (
                len(arrSubsetA) == len(arrSubsetB) and intValueA > intValueB):
                arrValidSubsets[intInner], arrValidSubsets[intInner + 1] = arrValidSubsets[intInner + 1], arrValidSubsets[intInner]

            intInner += 1
        intOuter += 1

    return arrBestSubset, intBestValue, arrValidSubsets
