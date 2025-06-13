"""
Dijkstra's Shortest Path Algorithm Implementation

This module provides implementation of Dijkstra's algorithm for finding
the shortest paths between nodes in a weighted graph.
"""

from typing import List, Tuple, Dict, Optional
import heapq


class clsGraph:
    """
    Description:
        Graph class for representing a weighted graph using adjacency matrix.
        Supports adding edges, vertices, and finding shortest paths using Dijkstra's algorithm.

    Attributes:
        arrAdjMatrix (List[List[int]]): 2D adjacency matrix representing the graph
        intSize (int): Number of vertices in the graph  
        arrVertexData (List[str]): List storing vertex labels/names
    """

    def __init__(self, intSize: int) -> None:
        """
        Initialize a graph with given number of vertices.

        Parameters:
            intSize (int): Number of vertices in the graph

        Returns:
            None
        """
        self.arrAdjMatrix: List[List[int]] = [[0] * intSize for _ in range(intSize)]
        self.intSize: int = intSize
        self.arrVertexData: List[str] = [''] * intSize

    def fnAddEdge(self, intVertexU: int, intVertexV: int, intWeight: int) -> None:
        """
        Add a weighted edge between two vertices.

        Parameters:
            intVertexU (int): Source vertex index
            intVertexV (int): Destination vertex index
            intWeight (int): Weight of the edge

        Returns:
            None
        """
        if 0 <= intVertexU < self.intSize and 0 <= intVertexV < self.intSize:
            self.arrAdjMatrix[intVertexU][intVertexV] = intWeight
            self.arrAdjMatrix[intVertexV][intVertexU] = intWeight  # For undirected graph

    def fnAddVertexData(self, intVertex: int, strData: str) -> None:
        """
        Add label/name to a vertex.

        Parameters:
            intVertex (int): Vertex index
            strData (str): Label or name for the vertex

        Returns:
            None
        """
        if 0 <= intVertex < self.intSize:
            self.arrVertexData[intVertex] = strData

    def fnDijkstra(self, strStartVertexData: str) -> Tuple[List[float], List[str], Dict[str, List[str]]]:
        """
        Find shortest paths from a starting vertex to all other vertices using Dijkstra's algorithm.

        Parameters:
            strStartVertexData (str): Label of the starting vertex

        Returns:
            tuple: A tuple containing:
                - List[float]: Shortest distances from start vertex to all vertices
                - List[str]: List of steps showing algorithm progress
                - Dict[str, List[str]]: Shortest paths from start to each vertex

        Raises:
            ValueError: If start vertex is not found in the graph

        References:
            https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm
        """
        try:
            intStartVertex: int = self.arrVertexData.index(strStartVertexData)
        except ValueError:
            raise ValueError(f"Start vertex '{strStartVertexData}' not found in graph")

        arrDistances: List[float] = [float('inf')] * self.intSize
        arrDistances[intStartVertex] = 0
        arrVisited: List[bool] = [False] * self.intSize
        arrSteps: List[str] = []
        dictPaths: Dict[str, List[str]] = {}
        arrPrevious: List[Optional[int]] = [None] * self.intSize

        # Initialize paths dictionary
        for i in range(self.intSize):
            dictPaths[self.arrVertexData[i]] = []

        arrSteps.append(f"Starting Dijkstra's algorithm from vertex '{strStartVertexData}'")
        arrSteps.append(f"Initial distances: {dict(zip(self.arrVertexData, arrDistances))}")

        for _ in range(self.intSize):
            # Find vertex with minimum distance among unvisited vertices
            fltMinDistance: float = float('inf')
            intCurrentVertex: Optional[int] = None
            
            for intVertex in range(self.intSize):
                if not arrVisited[intVertex] and arrDistances[intVertex] < fltMinDistance:
                    fltMinDistance = arrDistances[intVertex]
                    intCurrentVertex = intVertex

            if intCurrentVertex is None:
                break

            arrVisited[intCurrentVertex] = True
            strCurrentVertexData: str = self.arrVertexData[intCurrentVertex]
            
            arrSteps.append(f"Visiting vertex '{strCurrentVertexData}' with distance {arrDistances[intCurrentVertex]}")

            # Update distances of adjacent vertices
            for intNeighbor in range(self.intSize):
                if (self.arrAdjMatrix[intCurrentVertex][intNeighbor] != 0 and 
                    not arrVisited[intNeighbor]):
                    
                    fltNewDistance: float = (arrDistances[intCurrentVertex] + 
                                           self.arrAdjMatrix[intCurrentVertex][intNeighbor])
                    
                    if fltNewDistance < arrDistances[intNeighbor]:
                        arrDistances[intNeighbor] = fltNewDistance
                        arrPrevious[intNeighbor] = intCurrentVertex
                        strNeighborData: str = self.arrVertexData[intNeighbor]
                        
                        arrSteps.append(f"Updated distance to '{strNeighborData}': {fltNewDistance}")

        # Reconstruct paths
        for intVertex in range(self.intSize):
            if arrDistances[intVertex] != float('inf'):
                arrPath: List[str] = []
                intCurrent: Optional[int] = intVertex
                
                while intCurrent is not None:
                    arrPath.append(self.arrVertexData[intCurrent])
                    intCurrent = arrPrevious[intCurrent]
                
                arrPath.reverse()
                dictPaths[self.arrVertexData[intVertex]] = arrPath

        arrSteps.append(f"Final distances: {dict(zip(self.arrVertexData, arrDistances))}")
        
        return arrDistances, arrSteps, dictPaths


def fnDijkstra(dictGraphData: Dict, strStartVertex: str) -> Tuple[Dict[str, float], List[str], Dict[str, List[str]]]:
    """
    Wrapper function for Dijkstra's algorithm that accepts graph data as dictionary.

    Description:
        A convenient wrapper function that creates a graph from dictionary input
        and executes Dijkstra's shortest path algorithm.

    Parameters:
        dictGraphData (Dict): Graph data containing:
            - 'vertices': List of vertex names
            - 'edges': List of tuples (vertex1, vertex2, weight)
        strStartVertex (str): Starting vertex name

    Returns:
        tuple: A tuple containing:
            - Dict[str, float]: Shortest distances from start vertex to all vertices
            - List[str]: List of steps showing algorithm execution
            - Dict[str, List[str]]: Shortest paths from start to each vertex

    Example:
        graph_data = {
            'vertices': ['A', 'B', 'C', 'D'],
            'edges': [('A', 'B', 4), ('A', 'C', 2), ('B', 'D', 3), ('C', 'D', 1)]
        }
        distances, steps, paths = fnDijkstra(graph_data, 'A')

    References:
        https://www.geeksforgeeks.org/dijkstras-shortest-path-algorithm/
    """
    arrVertices: List[str] = dictGraphData['vertices']
    arrEdges: List[Tuple[str, str, int]] = dictGraphData['edges']
    
    # Create graph instance
    objGraph: clsGraph = clsGraph(len(arrVertices))
    
    # Add vertex data
    for intIndex, strVertex in enumerate(arrVertices):
        objGraph.fnAddVertexData(intIndex, strVertex)
    
    # Add edges
    for strVertex1, strVertex2, intWeight in arrEdges:
        intIndexVertex1: int = arrVertices.index(strVertex1)
        intIndexVertex2: int = arrVertices.index(strVertex2)
        objGraph.fnAddEdge(intIndexVertex1, intIndexVertex2, intWeight)
    
    # Execute Dijkstra's algorithm
    arrDistances, arrSteps, dictPaths = objGraph.fnDijkstra(strStartVertex)
    
    # Convert distances array to dictionary with vertex names
    dictDistances: Dict[str, float] = {}
    for intIndex, fltDistance in enumerate(arrDistances):
        dictDistances[arrVertices[intIndex]] = fltDistance
    
    return dictDistances, arrSteps, dictPaths 