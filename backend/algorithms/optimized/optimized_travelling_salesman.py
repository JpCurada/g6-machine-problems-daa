def fnTSPOptimized(arrDistanceMatrix: list, intStartCity: int) -> tuple[list, int, list]:
    """
    Description:
        Solves the Traveling Salesman Problem using dynamic programming with bit 
        manipulation (Held-Karp algorithm). This optimized version has a time 
        complexity of O(n²·2ⁿ) where n is the number of cities.

    Parameters:
        arrDistanceMatrix (list): Square matrix where element [i][j] represents 
                                 the distance from city i to city j
        intStartCity (int): Index of the starting city (0-indexed)

    Returns:
        tuple: A tuple containing:
            - list: The optimal path as city indices (starting and ending with intStartCity)
            - int: Total distance of the optimal path
            - list: List of tuples (path, distance) for all valid paths found

    References:
        https://www.geeksforgeeks.org/travelling-salesman-problem-implementation-using-dynamic-programming/
    """
    if not arrDistanceMatrix or not isinstance(arrDistanceMatrix, list):
        raise ValueError("arrDistanceMatrix must be a non-empty 2D list")

    intCityCount: int = len(arrDistanceMatrix)
    for arrRow in arrDistanceMatrix:
        if not isinstance(arrRow, list) or len(arrRow) != intCityCount:
            raise ValueError("arrDistanceMatrix must be a square matrix")

    if not isinstance(intStartCity, int) or intStartCity < 0 or intStartCity >= intCityCount:
        raise ValueError("intStartCity must be a valid index within the distance matrix")
    
    # Initialize DP arrays
    intTotalMasks: int = 1 << intCityCount
    arrDPCost: list = [[float('inf')] * intCityCount for _ in range(intTotalMasks)]
    arrDPPrev: list = [[None] * intCityCount for _ in range(intTotalMasks)]
    
    # Base case: starting position
    arrDPCost[1 << intStartCity][intStartCity] = 0
    
    # Fill DP table
    for intMask in range(1, intTotalMasks):
        if not (intMask & (1 << intStartCity)):
            continue
            
        for intCurrentCity in range(intCityCount):
            if not (intMask & (1 << intCurrentCity)):
                continue
                
            intPrevMask: int = intMask ^ (1 << intCurrentCity)
            if intPrevMask == 0:
                continue
                
            for intPrevCity in range(intCityCount):
                if not (intPrevMask & (1 << intPrevCity)) or intPrevCity == intCurrentCity:
                    continue
                    
                intNewCost: int = arrDPCost[intPrevMask][intPrevCity] + arrDistanceMatrix[intPrevCity][intCurrentCity]
                
                if intNewCost < arrDPCost[intMask][intCurrentCity]:
                    arrDPCost[intMask][intCurrentCity] = intNewCost
                    arrDPPrev[intMask][intCurrentCity] = intPrevCity
    
    # Find optimal last city
    intFinalMask: int = (1 << intCityCount) - 1
    intMinCost: int = float('inf')
    intLastCity: int = None
    all_paths = []
    
    for intCity in range(intCityCount):
        if intCity == intStartCity:
            continue
            
        intTotalCost: int = arrDPCost[intFinalMask][intCity] + arrDistanceMatrix[intCity][intStartCity]
        if intTotalCost < float('inf'):
            # Reconstruct this path
            path = [intStartCity]
            currentCity = intCity
            currentMask = intFinalMask
            
            while currentCity != intStartCity:
                path.insert(1, currentCity)
                tempCity = arrDPPrev[currentMask][currentCity]
                currentMask ^= (1 << currentCity)
                currentCity = tempCity
            
            path.append(intStartCity)  # Complete the cycle
            all_paths.append((path, intTotalCost))
            
            if intTotalCost < intMinCost:
                intMinCost = intTotalCost
                intLastCity = intCity
    
    # Handle single city case
    if intLastCity is None:
        return [intStartCity], 0, [([intStartCity], 0)]
    
    # Reconstruct optimal path
    arrPath: list = [intStartCity]
    intCurrentCity: int = intLastCity
    intCurrentMask: int = intFinalMask
    
    while intCurrentCity != intStartCity:
        arrPath.insert(1, intCurrentCity)
        intTempCity: int = arrDPPrev[intCurrentMask][intCurrentCity]
        intCurrentMask ^= (1 << intCurrentCity)
        intCurrentCity = intTempCity
    
    arrPath.append(intStartCity)  # Complete the cycle
    
    # Sort paths by total distance
    all_paths.sort(key=lambda x: x[1])
    
    return arrPath, intMinCost, all_paths