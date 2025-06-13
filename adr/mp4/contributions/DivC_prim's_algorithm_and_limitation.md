# Prim's Algorithm

## Algorithm Definition and Problem Solved

Prim's Algorithm is a greedy algorithm used to find the Minimum Spanning Tree (MST) of a connected, undirected, weighted graph. A minimum spanning tree is a subgraph that connects all vertices with the minimum total edge weight possible, containing exactly V-1 (where V is the number of vertices) edges and produces no cycles.

**Key Characteristics**
- Works on undirected and weighted graphs
- Produces a tree with V-1 edges
- Guarantees the optimal solution (minimum total weight)
- Requires the graph to be connected
- Builds MST incrementally starting from a single vertex

## Greedy Strategy Explanation

Prim's algorithm follows a greedy approach by optimally selecting the minimum weight edge that connects a vertex in the current MST to a vertex not yet in the MST.

- Prim's algorithm always chooses the lightest edge crossing the cut between MST and non-MST vertices
- Any minimum-weight edge crossing a cut is safe for the MST
- The algorithm grows the MST one vertex at a time by adding the cheapest connection

Prim's algorithm works by starting with an arbitrary vertex and gradually expanding the MST by adding the minimum-weight edge that connects the current tree to a new vertex.

## Step-by-Step Algorithm Process

1. **Initialization:**
   - Choose an arbitrary starting vertex and add it to the MST
   - Initialize a priority queue (min-heap) with all edges from the starting vertex
   - Mark the starting vertex as visited

2. **Build MST Incrementally:**
   - While the priority queue is not empty and MST has fewer than V-1 edges:
   - Extract the minimum weight edge (u, v) from the priority queue
   - If vertex v is not yet in the MST, add edge (u, v) to the MST
   - Mark vertex v as visited and add all edges from v to unvisited vertices to the priority queue

3. **Process Adjacent Edges:**
   - For each newly added vertex, examine all its adjacent edges
   - Add edges to unvisited vertices to the priority queue
   - Skip edges that would connect two vertices already in the MST

4. **Termination:**
   - Stop when the MST contains V-1 edges or all vertices are included

## Time Complexity Analysis

**Best Case:** O(E + V log V) with Fibonacci heap  
**Average Case:** O(E log V) with binary heap  
**Worst Case:** O(E log V) with binary heap

The time complexity depends on the priority queue implementation. With a binary heap, all cases result in O(E log V). With a Fibonacci heap, the complexity can be reduced to O(E + V log V).

**Space Complexity:** O(V + E) for storing the graph and priority queue.

If computed, the time complexity of each function:

- **clsPrimMST**
  ```python
  def __init__(arrSelf, intVertices):
      arrSelf.vertices = intVertices
      arrSelf.graph = [[] for _ in range(intVertices)]
      arrSelf.visited = [False] * intVertices
  ```
  - Initializes adjacency list and visited array
  - Time complexity: O(V)

- **fnAddEdge**
  ```python
  def fnAddEdge(arrSelf, intU, intV, intWeight):
      arrSelf.graph[intU].append((intV, intWeight))
      arrSelf.graph[intV].append((intU, intWeight))
  ```
  - Adds edge to adjacency list representation
  - Time Complexity: O(1)

- **fnPrimAlgorithm**
  ```python
  def fnPrimAlgorithm(arrSelf, intStartVertex=0):
      import heapq
      arrMstEdges = []
      intTotalWeight = 0
      arrMinHeap = []
      
      arrSelf.visited[intStartVertex] = True
      
      for intVertex, intWeight in arrSelf.graph[intStartVertex]:
          heapq.heappush(arrMinHeap, (intWeight, intStartVertex, intVertex))
      
      while arrMinHeap and len(arrMstEdges) < arrSelf.vertices - 1:
          intWeight, intU, intV = heapq.heappop(arrMinHeap)
          
          if not arrSelf.visited[intV]:
              arrSelf.visited[intV] = True
              arrMstEdges.append((intU, intV, intWeight))
              intTotalWeight += intWeight
              
              for intNextVertex, intNextWeight in arrSelf.graph[intV]:
                  if not arrSelf.visited[intNextVertex]:
                      heapq.heappush(arrMinHeap, (intNextWeight, intV, intNextVertex))
      
      return arrMstEdges, intTotalWeight
  ```
  - Priority queue operations: O(log V) per operation
  - Each edge is processed at most once: O(E)
  - Total heap operations: O(E log V)
  - Time Complexity: O(E log V)

- **Total Time Complexity:** O(E log V)

## Worked Example

**Initial Input**  
Vertices: 6  
Edge List with Weights:
- (A,B): 2
- (A,D): 8
- (B,C): 3
- (B,D): 7
- (B,E): 5
- (C,F): 4
- (D,E): 1
- (E,F): 6

1. **Initial State:**
   - Start with vertex A
   - MST = {A}, Visited = {A}
   - Priority Queue: [(2,A,B), (8,A,D)]

2. **Process minimum edge (A,B) with weight 2**
   - Add B to MST, mark as visited
   - MST = {(A,B)}, Visited = {A,B}
   - Add edges from B: Priority Queue: [(3,B,C), (5,B,E), (7,B,D), (8,A,D)]

3. **Process minimum edge (B,C) with weight 3**
   - Add C to MST, mark as visited
   - MST = {(A,B), (B,C)}, Visited = {A,B,C}
   - Add edges from C: Priority Queue: [(4,C,F), (5,B,E), (7,B,D), (8,A,D)]

4. **Process minimum edge (C,F) with weight 4**
   - Add F to MST, mark as visited
   - MST = {(A,B), (B,C), (C,F)}, Visited = {A,B,C,F}
   - Add edges from F: Priority Queue: [(5,B,E), (6,E,F), (7,B,D), (8,A,D)]

5. **Process minimum edge (B,E) with weight 5**
   - Add E to MST, mark as visited
   - MST = {(A,B), (B,C), (C,F), (B,E)}, Visited = {A,B,C,E,F}
   - Add edges from E: Priority Queue: [(1,D,E), (6,E,F), (7,B,D), (8,A,D)]

6. **Process minimum edge (D,E) with weight 1**
   - Add D to MST, mark as visited
   - MST = {(A,B), (B,C), (C,F), (B,E), (D,E)}
   - All vertices visited

7. **Final MST**
   - Edges: (A,B), (B,C), (C,F), (B,E), (D,E)
   - Total Weight: 2 + 3 + 4 + 5 + 1 = 15
   - Tree has 5 edges for 6 vertices (V-1 = 6-1 = 5)

---

# Prim's Algorithm Limitations

## Requires Connected Graph

Prim's algorithm can only work on connected graphs. Unlike Kruskal's algorithm, which can handle disconnected graphs and produce a minimum spanning forest, Prim's algorithm requires all vertices to be reachable from the starting vertex. If the graph is disconnected, the algorithm will only produce the MST for the connected component containing the starting vertex.

## Choice of Starting Vertex

While the choice of starting vertex does not affect the total weight of the final MST, it can impact the algorithm's performance in practice. A poor choice of starting vertex might lead to exploring denser regions of the graph first, potentially affecting cache performance and the number of priority queue operations in real-world implementations.

## Priority Queue Implementation Dependency

Prim's algorithm performance is heavily dependent on the efficiency of the priority queue implementation. A naive implementation using a simple array can result in O(V²) time complexity, while advanced implementations like Fibonacci heaps can achieve O(E + V log V). The choice of data structure significantly impacts the algorithm's practical performance.

## Memory Usage for Dense Graphs

In dense graphs, Prim's algorithm may require storing a large number of edges in the priority queue simultaneously. This can lead to significant memory overhead, especially when the graph approaches complete connectivity (O(V²) edges). The priority queue size can grow substantially during execution, potentially causing memory issues for very large dense graphs.

## References

1. GeeksforGeeks. (2023). *Prim's Algorithm in Java*. Retrieved June 12, 2025, from https://www.geeksforgeeks.org/prims-algorithm-in-java/

2. GeeksforGeeks. (2022). *Difference between Prim's and Kruskal's algorithm for MST*. Retrieved June 12, 2025, from https://www.geeksforgeeks.org/difference-between-prims-and-kruskals-algorithm-for-mst/

3. GeeksforGeeks. (2021). *Prim's Minimum Spanning Tree Algorithm | Greedy Algo-5*. Retrieved June 12, 2025, from https://www.geeksforgeeks.org/prims-minimum-spanning-tree-mst-greedy-algo-5/

4. GeeksforGeeks. (2020). *Time and Space Complexity Analysis of Prim's Algorithm*. Retrieved June 12, 2025, from https://www.geeksforgeeks.org/time-and-space-complexity-analysis-of-prims-algorithm/