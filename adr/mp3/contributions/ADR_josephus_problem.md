# Algorithm Activity Documentation Report

---

## I. Assigned Algorithm

**A. Josephus Problem:**  


**B. Pseudocode:**  
```plaintext
Start
    FUNCTION josephus_problem(intLength,intInterval):
	MAKE LIST from 1 to intLength (included)
	DEFINE index = 0
	
	WHILE length of LIST > 1:
		GET the k-th in the LIST    {(index + intInterval - 1) % length of LIST}
		ADD k-th in the LIST to the intEliminationOrder
		REMOVE k-th to the LIST
		
	DEFINE intSurvivor = Remaining item in the LIST

	ADD the remaining item to the intEliminationOrder

	RETURN intSurvivor, intEliminationOrder

End
```

**C. Brief Description:**  
The Josephus Problem is a classic theoretical puzzle in which a group of people stand in a circle and are eliminated in a fixed sequence—typically every k-th person—until only one individual remains (GeeksforGeeks, 2025). The problem is named after the Jewish historian Flavius Josephus, who, according to his account, used this method to strategically position himself and avoid capture during a siege. This is mostly use as an exercise for understanding recursion and circular data structures such as linked list and queues (Lord T, 2018).

---

## II. Python Implementation

**Function Code:**  
```python
def josephus_problem(intLength, intInterval):
    """
    Description:
        The function is a theoretical problem related to a group of people standing in a circle and eliminating every k-th person until only one remains.

    Parameters:
        intLength (int): The size of the population
        intInterval (int): The step count to eliminate a person in each cycle (i.e., every k-th person).


    Returns: 
        list: The order of elimination
        int: The survivor


    References:
        https://www.geeksforgeeks.org/josephus-problem/
	    https://medium.com/carwow-product-engineering/the-josephus-problem-2ef02b77ada9
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

```
---

## III. Simulation / Step-by-Step Example

**A. Sample Input:**  

intLength = 8,  intInterval = 4


**B. Step-by-Step Process:**  

1. Initialize

    - intList = [1, 2, 3, 4, 5, 6, 7, 8]
    - intIndex = 0
    - intEliminationOrder = []

2. k-th Sequential Elimination begins
    get the k-th to the intList, store in intEliminationOrder, remove from the intList and continute until there's only 1 remaining to the intList

    - intList = [1, 2, 3, 5, 6, 7, 8]             intIndex = 3          intEliminationOrder = [4]
    - intList = [1, 2, 3, 5, 6, 7]                intIndex = 6          intEliminationOrder = [4, 8]
    - intList = [1, 2, 3, 6, 7]                   intIndex = 3          intEliminationOrder = [4, 8, 5]
    - intList = [1, 3, 6, 7]                      intIndex = 1          intEliminationOrder = [4, 8, 5, 2]
    - intList = [3, 6, 7]                         intIndex = 0          intEliminationOrder = [4, 8, 5, 2, 1]
    - intList = [6, 7]                            intIndex = 0          intEliminationOrder = [4, 8, 5, 2, 1, 3]
    - intList = [6]                               intIndex = 1          intEliminationOrder = [4, 8, 5, 2, 1, 3, 7]


3. Save the last survivor and add the remaining survivor to intEliminationOrder
	intSurvivor = 6
	intEliminationOrder = [4, 8, 5, 2, 1, 3, 7, 6]

**C. Final Output:** 

intSurvivor = 6
intEliminationOrder = [4, 8, 5, 2, 1, 3, 7, 6]


---

## IV. Discussion

**A. Implementation Logic:**  
The Josephus Problem was implemented using an iterative approach to simulate the elimination process in a circular fashion. A linear list represents the group of individuals, and arithmetic expression is used to wrap around the list and identify the next person to eliminate.

Key Decisions:
	Iterative Logic: A simple while-loop with index tracking.
	Modular Indexing: The expression (index + intInterval - 1) % len(list) ensures correct circular traversal of the list.
	Elimination Tracking: The eliminated individuals are recorded in intEliminationOrder to preserve the full sequence of eliminations.
	Survivor: After all eliminations, the remaining person is both returned as the survivor and appended to the elimination sequence for completeness



**B. References:**  
- GeeksforGeeks. (2025, February 20). Josephus problem. GeeksforGeeks. https://www.geeksforgeeks.org/josephus-problem/ 
- Lord, T. (2018, September 19). The Josephus problem. Medium. https://medium.com/carwow-product-engineering/the-josephus-problem-2ef02b77ada9 

**C. Possible Improvements / Future Work:**  
-Apply Recursive Solution:
	Do in recursive way for cleaner and simple implementation

-Use of Circular Linked List:
	A circular linked list naturally models the problem — when you reach the end of the list, you loop back to the start without manual index calculation.

---