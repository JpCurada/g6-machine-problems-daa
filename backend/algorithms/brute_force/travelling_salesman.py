def fnTSPBruteForce(arrDistanceMatrix: list, intStartCity: int = 0) -> tuple[list, int, list]:
    """
    Description:
        Solves the Traveling Salesman Problem using a recursive brute force approach
        to find the shortest possible route that visits each city exactly once and
        returns to the starting city.

    Parameters:
        arrDistanceMatrix (list): Square matrix where element [i][j] represents 
                                 the distance from city i to city j
        intStartCity (int, optional): Index of the starting city (0-indexed). Defaults to 0.

    Returns:
        tuple: A tuple containing:
            - list: The optimal path as city indices (starting and ending with intStartCity)
            - int: Total distance of the optimal path
            - list: List of tuples (path, distance) for all valid paths

    References:
        https://www.geeksforgeeks.org/traveling-salesman-problem-tsp-implementation/
    """
    def fnTSPHelper(arrVisited: list, intCurrentCity: int, intCityCount: int, 
                   intCurrentDist: int, arrDistanceMatrix: list, 
                   arrPath: list, arrAllPaths: list, intStartCity: int) -> tuple[list, int]:
        """
        Description:
            Recursive helper function to solve the TSP by exploring all possible paths.

        Parameters:
            arrVisited (list): Boolean array where arrVisited[i] is True if city i is visited
            intCurrentCity (int): Current city being visited
            intCityCount (int): Total number of cities
            intCurrentDist (int): Cumulative distance of the path so far
            arrDistanceMatrix (list): Distance matrix between cities
            arrPath (list): Path traversed so far
            arrAllPaths (list): List to store all valid paths and their distances
            intStartCity (int): Starting city index

        Returns:
            tuple: A tuple containing:
                - list: Best path found from current state
                - int: Total distance of that path
        """
        if all(arrVisited):
            final_path = arrPath + [intStartCity]
            final_dist = intCurrentDist + arrDistanceMatrix[intCurrentCity][intStartCity]
            arrAllPaths.append((final_path, final_dist))
            return final_path, final_dist
        
        intMinDist: int = float('inf')
        arrBestPath: list = []
        
        for intNextCity in range(intCityCount):
            if not arrVisited[intNextCity]:
                arrVisited[intNextCity] = True
                arrNewPath, intNewDist = fnTSPHelper(
                    arrVisited,
                    intNextCity,
                    intCityCount,
                    intCurrentDist + arrDistanceMatrix[intCurrentCity][intNextCity],
                    arrDistanceMatrix,
                    arrPath + [intNextCity],
                    arrAllPaths,
                    intStartCity
                )
                if intNewDist < intMinDist:
                    intMinDist = intNewDist
                    arrBestPath = arrNewPath
                arrVisited[intNextCity] = False
                
        return arrBestPath, intMinDist

    if not arrDistanceMatrix or not isinstance(arrDistanceMatrix, list):
        raise ValueError("arrDistanceMatrix must be a non-empty 2D list")

    intCityCount: int = len(arrDistanceMatrix)
    for arrRow in arrDistanceMatrix:
        if not isinstance(arrRow, list) or len(arrRow) != intCityCount:
            raise ValueError("arrDistanceMatrix must be a square matrix")

    if not isinstance(intStartCity, int) or intStartCity < 0 or intStartCity >= intCityCount:
        raise ValueError("intStartCity must be a valid index within the distance matrix")

    arrAllPaths: list = []
    arrVisited: list = [False] * intCityCount
    arrVisited[intStartCity] = True
    
    arrBestPath, intMinDist = fnTSPHelper(
        [True if i == intStartCity else False for i in range(intCityCount)],
        intStartCity,
        intCityCount,
        0,
        arrDistanceMatrix,
        [intStartCity],
        arrAllPaths,
        intStartCity
    )
    
    return arrBestPath, intMinDist, arrAllPaths