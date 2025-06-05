## I. Assigned Algorithm

**A. Name of Algorithm:**  
*Dynamic Programming (optimized of Knapsack Problem)*

**B. Pseudocode:**  
```plaintext
    FUNCTION dynamic_programming_knapsack(items, capacity):
        length = number of items
        weights = list of item weights
        values = list of item values

        CREATE table of size (n + 1) * (capacity+1), initialized to 0

        FOR i from 1 to (length + 1):
            FOR w from 0 to capacity:
                IF weights[i - 1] <= w
                    table[i][w] = max(tablle[i - 1], table[i - 1][w - weights[i - 1]] + values[i - 1])
                
                ELSE:
                    table[i][w] = table[i - 1][w]

        //Trace back to find selecteditems
        DEFINE selected_items = empty list
        w = capacity

        FOR i from n down to 1:
            IF table[i][w] != table[i - 1][w]:
                ADD (i - 1) to selected_items
                w = w - weights[i-1]

        REVERSE selected_item

        RETURN selected_items, table[n][capacity], [selected_items, total weight, total value]

```

**C. Brief Description:**  
*The Dynamic Programming Knapsack algorithm efficiently solves the 0/1 Knapsack Problem by building a table that records the maximum value achievable for every possible number of items and capacity. It systematically considers each item and determines whether including it yields a better value than excluding it, filling out the table based on these choices. This approach guarantees an optimal solution and allows for easy reconstruction of the selected items that make up the maximum value.*

---

## II. Python Implementation

**A. Function Code:**  
```python
def dynamic_programming_knapsack(items, capacity):
    """
    This function solves the Knapsack Problem using a dynamic programming approach. It creates a 2d table where each cell represents the best value achievable using a subset of items within a given capacity. This then pick an item based on which option gives a higher value.

    Argument:
        weights (list): the weights of the items
        values (list): the values of the items
        capacity (integer): the maximum weight knapsack must only handle
        
    Return:
        tuple: (maximum value, list of selected item (values, weight))
    
    Example:

    """

    #Variables
    length = len(items)
    weights = [item["weight"] for item in items]
    values = [item["value"] for item in items]
    all_valid_subset = []


    #2d table
    table = [[0] * (capacity + 1) for _ in range(length + 1)]

    for i in range(1, length + 1):
        for w in range(capacity + 1):
            if weights[i - 1] <= w:
                table[i][w] = max(table[i - 1][w], table[i - 1][w - weights[i - 1]] + values[i - 1])
            else:
                table[i][w] = table[i - 1][w]

    #Trace back to find the selected item
    selected_items = []
    w = capacity
    for i in range(length, 0, -1):
        if table[i][w] != table[i - 1][w]:
            selected_items.append(i - 1)
            w -= weights[i - 1]

    #format data: (subset item name, total weight, total value)
    selected_items.reverse()

    selected_item_name = [f"Item {i+1}" for i in selected_items]
    value = table[length][capacity]
    weight = capacity - w

    all_valid_subset.extend([selected_item_name, f"Weight: {weight}", f"Value: {value}"])
    
    return selected_item_name, value, all_valid_subset

```

---

## III. Simulation / Step-by-Step Example

**A. Sample Input:**  
*[{"weight": 2, "value": 3}, {"weight": 3, "value": 4}, {"weight": 4, "value": 5}, {"weight": 5, "value": 8}]

capacity = 5*

**B. Step-by-Step Process:**  
1. Initialize 2d table:
    CREATE a table with 5 rows (length + 1) and 6 columns (capacity + 1)

2. Fill the blank:
    FOR each item (i from 1 to 4) and each capacity (w from 0 to 5), update the table:
        
    Example:
    For item 1 (weight = 2, value = 3):
        For w = 2 to 5, table[1][w] = 3
    For item 2 (weight = 3, value = 4):
        For w = 3, table[2][3] = max(3, 0 + 4) = 4
        For w = 3, table[2][5] = max(3, 3 + 4) = 7
    Continue for all items

    |   | 0 | 1 | 2 | 3 | 4 | 5 |
    |---|---|---|---|---|---|---|
    | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
    | 1 | 0 | 0 | 3 | 3 | 3 | 3 |
    | 2 | 0 | 0 | 3 | 4 | 4 | 7 |
    | 3 | 0 | 0 | 3 | 4 | 5 | 7 |
    | 4 | 0 | 0 | 3 | 4 | 5 | 8 |

3. Traceback to find selected items:
        Start from table[4][5] = 8
        Item 4 was included (since table[4][5] != table[3][5]), so add item 4, reduce w by 5 (w=0)
        Stop (w=0)

**C. Final Output:**  
Selected items: ['Item 4']
Maximum value: 8
All valid subset: [['Item 4'], 'Weight: 5', 'Value: 8']

---

## IV. Discussion

**A. Implementation Logic:**  
- The main logic of the dynamic programming knapsack implementation is to build a 2D table where each entry represents the maximum value achievable with a given number of items and a specific capacity.
- For each item and each possible capacity, the algorithm decides whether to include the current item by comparing the value of including it (if it fits) versus excluding it, and stores the maximum of these two options in the table.
- After filling the table, the algorithm traces back from the bottom-right cell to determine which items were included in the optimal solution by checking where the value changes, reconstructing the list of selected items.
- This approach ensures that all subproblems are solved and combined efficiently, guaranteeing an optimal solution for the 0/1 Knapsack Problem.

**B. References:**  
*https://www.youtube.com/watch?v=cJ21moQpofY
https://medium.com/@fabianterh/how-to-solve-the-knapsack-problem-with-dynamic-programming-eb88c706d3cf*

**C. Possible Improvements / Future Work:**  
Input Flexibility: Allow the function to handle fractional weights/values for solving the fractional knapsack problem.

Early Termination: Add checks to terminate early if the optimal solution is found before filling the entire table.

---

