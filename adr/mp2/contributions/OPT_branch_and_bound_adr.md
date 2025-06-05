## I. Assigned Algorithm

**A. Name of Algorithm:**  
*Branch and Bound (optimized of Travelling Salesman Problem)*

**B. Pseudocode:**  
```plaintext
    CLASS Node:
        DEFINE path
        DEFINE reduced_matrix
        DEFINE cost
        DEFINE vertex
        DEFINE level

    FUNCTION copy_matrix(matrix):
        RETURN copy of matrix
    
    FUNCTION reduce_matrix(matrix)
        FOR each row in matrix:
            FIND the minimum value in the row (excluding INFINITE)
            SUBTRACT the minimum from all elements in the row
            ADD the minimum to the reduction cost
        FOR each column in matrix:
            FIND the minimum value in the column (excluding INFINITE)
            SUBTRACT the minimum from all elements in the column
            ADD the minimum to the reduction cost
        RETURN the total reduction cost 

    FUNCTION calculate_path_cost(path, cost_matrix):
        SET total_cost = 0
        FOR i from 0 to length(path) - 2:
            total_cost += cost_matrix[path[i]][path[i+1]]
        RETURN total_cost

    FUNCTION branch_and_bound_tsp(cost_matrix, start_vertex):
        INITIALIZE priority queue with root Node (starting at start_vertex)
        SET min_cost to INFINITE
        SET best_path to None

        WHILE priority queue is not empty:
            POP node with lowest cost from priority queue
            IF node.level == number of cities - 1:
                COMPLETE the path by returning to start_vertex
                CALCULATE total cost of this path
                IF total cost < min_cost:
                    UPDATE min_cost and best_path
                CONTINUE

            FOR each city i not in node.path:
                IF edge from node.vertex to i exists:
                    CREATE new_path by appending i to node.path
                    CREATE new_matrix by copying and updating node.reduced_matrix:
                        - Set row of node.vertex and column of i to INFINITE
                        - Set [i][start_vertex] to INFINITE
                    CALCULATE cost_to_i as cost from node.vertex to i
                    CALCULATE new_cost as node.cost + cost_to_i + reduce_matrix(new_matrix)
                    CREATE child Node with new_path, new_matrix, new_cost, i, node.level + 1
                    ADD child Node to priority queue

    RETURN min_cost, best_path


```

**C. Brief Description:**  
*The Branch and Bound algorithm for the Traveling Salesman Problem (TSP) systematically explores all possible routes using a state-space tree, but prunes branches that cannot yield a better solution than the best one found so far. By maintaining lower bounds on the cost of partial solutions and expanding only the most promising nodes, it efficiently narrows down the search space to find the minimum-cost tour. This approach is particularly effective for solving combinatorial optimization problems like TSP where exhaustive search is impractical for larger instances.*

---

## II. Python Implementation

**A. Function Code:**  
```python
class Node:
    """
    This represents a node in the search tree for the branch and bound TSP algorithm. It stores the current path, reduced cost matrix, total cost, current vertex, and level in the tree.
    """
    def __init__(self, path, reduced_matrix, cost, vertex, level):
        self.path = path
        self.reduced_matrix = reduced_matrix
        self.cost = cost
        self.vertex = vertex
        self.level = level

def copy_matrix(matrix):
    """
    This creates and returns a copy of a 2D matrix. To ensures that modifications to the new matrix do not affect the original.
    
    Args:
        matrix (list of list of float): The matrix to copy.

    Returns:
        list of list of float: The copied matrix.
    """
    return [row[:] for row in matrix]

def reduce_matrix(matrix):
    """
    This reduces the given cost matrix by subtracting the minimum value from each row and column and returns the total reduction cost, which is used as a lower bound in the branch and bound algorithm.
    
    Args:
        matrix (list of list of float): The cost matrix to reduce.

    Returns:
        float: The sum of all reductions (lower bound cost).
    """

    length = len(matrix)
    INFINITE = float('inf')

    #decrease the row
    row_min = [min([matrix[i][j] if matrix[i][j] != INFINITE else INFINITE for j in range(length)]) for i in range(length)]

    for i in range(length):
        if(row_min[i] != INFINITE and row_min[i] > 0):
            for j in range(length):
                if (matrix[i][j] != INFINITE):
                    matrix[i][j] -= row_min[i]
    
    #decrease the column
    col_min = [min([matrix[j][i] if matrix[j][i] != INFINITE else INFINITE for j in range(length)]) for i in range(length)]

    for i in range(length):
        if(col_min[i] != INFINITE and col_min[i] > 0):
            for j in range(length):
                if (matrix[j][i] != INFINITE):
                    matrix[j][i] -= col_min[i]

    cost = sum([value for value in row_min if value != INFINITE]) + sum([value for value in col_min if value != INFINITE])
    return cost

def get_min_node(priority):
    """
    This finds and removes the node with the lowest cost from the priority list and this simulates a priority queue for the branch and bound algorithm.
    
    Args:
        priority (list of Node): The list of nodes to search.

    Returns:
        Node: The node with the minimum cost.
    """

    min_index = 0
    for i in range(1, len(priority)):
        if(priority[i].cost < priority[min_index].cost):
            min_index = i
    return priority.pop(min_index)

def calculate_path_cost(path, cost_matrix):
    """
    Calculates the total cost of a given path based on the provided cost matrix.

    Args:
        path (list of int): The sequence of vertices representing the path.
        cost_matrix (list of list of float): The cost matrix representing the graph.

    Returns:
        float: The total cost of traversing the given path.
    """
        
    total = 0
    for i in range(len(path) - 1):
        total += cost_matrix[path[i]][path[i + 1]]
    return total

def branch_and_bound_tsp(cost_matrix):
    """
    This is the main function that solves the Traveling Salesman Problem using the branch and bound method and returns the minimum cost and the best path found.
    
    References:
        https://www.youtube.com/watch?v=1FEP_sNb62k
        https://www.geeksforgeeks.org/traveling-salesman-problem-using-branch-and-bound-2/

    Args:
        cost_matrix (list of list of float): The cost matrix representing the graph.
        
    Returns:
        tuple: (minimum cost, best path as a list of vertices)
    """
    length = len(cost_matrix)
    INFINITE = float('inf')
    priority = []

    initial_matrix = copy_matrix(cost_matrix)
    cost = reduce_matrix(initial_matrix)
    root = Node(path = [0], reduced_matrix = initial_matrix, cost = cost, vertex = 0, level = 0)
    priority.append(root)
    min_cost = INFINITE
    best_path = []

    while priority:
        min_node = get_min_node(priority)
        if min_node.level == length - 1:
            last = min_node.vertex
            for i in range(length):
                if i not in min_node.path:
                    min_node.path.append(i)
                    min_node.cost += min_node.reduced_matrix[last][i]
                    last = i
            
            min_node.path.append(0)
            min_node.cost += cost_matrix[last][0]
            
            if min_node.cost < min_cost:
                min_cost = min_node.cost
                best_path = min_node.path[:]
            continue

        for i in range(length):
            if i not in min_node.path and min_node.reduced_matrix[min_node.vertex][i] != INFINITE:
                new_path = min_node.path + [i]
                new_matrix = copy_matrix(min_node.reduced_matrix)
                for k in range(length):
                    new_matrix[min_node.vertex][k] = INFINITE
                    new_matrix[k][i] = INFINITE
                new_matrix[i][0] = INFINITE
                cost_to_i = min_node.reduced_matrix[min_node.vertex][i]
                new_cost = min_node.cost + cost_to_i + reduce_matrix(new_matrix)
                
                child = Node(new_path, new_matrix, new_cost, i, min_node.level + 1)
                priority.append(child)

    if best_path:
        min_cost = calculate_path_cost(best_path, cost_matrix)

    return min_cost, best_path
```

---

## III. Simulation / Step-by-Step Example

**A. Sample Input:**  
*[float('inf'), 10, 15, 20],
[10, float('inf'), 35, 25],
[15, 35, float('inf'), 30],
[20, 25, 30, float('inf')]*

**B. Step-by-Step Process:**  
1. Initial Reduction
    Reduce each row and column by their minimum (excluding INF)

    [
        [INF, 0, 5, 10],
        [0, INF, 25, 15],
        [0, 20, INF, 15],
        [0, 5, 10, INF] 
    ]

    initial lower bound cost: 70

2. Start from city 0:
        Path: [0]
        Reduced matrix as above
        Cost: 70

3. Branching:
        For each possible next city (1, 2, 3), create a child node:

        To City 1:
            Update matrix: set row 0 and column 1 to INF, set [1][0] to INF
            Reduce matrix again

            [
                [INF, INF, INF, INF],
                [INF, INF, 25, 15],
                [0, INF, INF, 15],
                [0, INF, 10, INF]
            ]

            calculate new lower bound and total cost
            
            Repeat the process from city 2 to city 3

4. Select Node with minimum cost:
    Choose the node lowest total cost from the priority queue
    Expand this node by repeating the branching and reduction process

5. Continue until all cities visited:
        Each time every cities is visited, complete the path by returning to the start
        Calculate the total cost for the complete tour

6. Track Best Path
    If a complete path has a lower cost than the current minimum, update the best path and minimum cost


**C. Final Output:**  
Minimum cost: 80
Best path: [0, 2, 3, 1, 0]

---

## IV. Discussion

**A. Implementation Logic:**  
- The main logic of the Branch and Bound TSP implementation is to systematically explore all possible tours using a state-space tree, but prune branches that cannot yield a better solution than the current best.
- Each node in the search tree represents a partial path, a reduced cost matrix, the accumulated cost so far, the current city, and the level (number of cities visited).
- At each step, the algorithm selects the node with the lowest estimated cost (using a priority queue), expands it by considering all possible next cities, and updates the cost matrix and lower bound using row and column reductions.
- When a complete tour is found (all cities visited), the total cost is compared to the current minimum, and the best path is updated if a lower cost is found.
- This approach efficiently narrows the search space by prioritizing promising paths and discarding those that cannot improve the solution, making it suitable for solving TSP instances where exhaustive search is impractical.

**B. References:**  
*https://www.youtube.com/watch?v=1FEP_sNb62k
https://www.geeksforgeeks.org/traveling-salesman-problem-using-branch-and-bound-2/*

**C. Possible Improvements / Future Work:**  
Implementation Complexity: improve the implementation for better readability, maintainability and easy debugging

Optimize node expansion and pruning process: to reduce the number of unnecessary branches explored

---
