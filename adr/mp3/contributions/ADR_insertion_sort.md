# Algorithm Activity Documentation Report

---

## I. Assigned Algorithm

**A. Insertion Sort:**  


**B. Pseudocode:**  
```plaintext
Start
    - Accept array (arrInput) and boolean (boolAscending) to check if it will be sorted ascending or descending
    - Initialize the size of the array (intSize)
    - Initialize the variable to store the steps (arrSteps)
    - Initialize the variable for the result of the sorting by first copying the array that is passed (arrResult)
    - Append a copy of arrResult to arrSteps (to record initial state)

    - If boolAscending is true
        - For i from 1 to intSize - 1
            - Set key to arrResult[i]
            - Set j to i - 1
            - Set boolSwapped to false

            - While j >= 0 and arrResult[j] > key
                - Set arrResult[j + 1] to arrResult[j]
                - Decrease j by 1
                - Set boolSwapped to true

            - Set arrResult[j + 1] to key

            - If boolSwapped is true
                - Append a copy of arrResult to arrSteps

    - Else if boolAscending is false
        - For i from 1 to intSize - 1
            - Set key to arrResult[i]
            - Set j to i - 1
            - Set boolSwapped to false

            - While j >= 0 and arrResult[j] < key
                - Set arrResult[j + 1] to arrResult[j]
                - Decrease j by 1
                - Set boolSwapped to true

            - Set arrResult[j + 1] to key

            - If boolSwapped is true
                - Append a copy of arrResult to arrSteps

    - Return arrResult, arrSteps
End
```

**C. Brief Description:**  
Insertion sort is a simple sorting algorithm just like bubble sort and selection sort. Insertion sort works similarly as we sort cards in our hand in a card game (Programiz, n.d). It works by iteratively inserting each element of an unsorted list into its correct position in a sorted portion of the list (GeekForGeeks, 2025). This keeps going until the whole list / array is sorted. It is less efficient on large lists compared to more advanced algorithms like quicksort, heapsort, or merge sort. 

---

## II. Python Implementation

**Function Code:**  
```python
def fnInsertionSort(arrElements: list, boolAscending: bool = True) -> tuple[list, list]:
    """
    Description:
        A very simple sorting algorithm that works by iteratively inserting an
        element from the unsorted list to the sorted list.

    Parameters:
        arrElements (list): The array to be sorted.
        boolAscending (bool): Default value is True, which sorts the array in ascending order.
                              Otherwise, it sorts in descending order.   

    Returns: 
        tuple: A tuple containing:
            - list: The sorted array
            - list: List of steps showing the array state after each iteration

    References:
        https://www.geeksforgeeks.org/bubble-sort-algorithm/
    """
    arrResult = arrElements.copy()
    intSize = len(arrElements)
    arrSteps = [arrElements.copy()]

    if boolAscending:
        for i in range(1, intSize):
            key = arrResult[i]
            j = i - 1
            swapped = False  # Reset swapped for this iteration
            while j >= 0 and arrResult[j] > key:
                arrResult[j + 1] = arrResult[j]
                j -= 1
                swapped = True  # A swap has happened
            arrResult[j + 1] = key
            if swapped:
                arrSteps.append(arrResult.copy())
    else:
        for i in range(1, intSize):
            key = arrResult[i]
            j = i - 1
            swapped = False
            while j >= 0 and arrResult[j] < key:
                arrResult[j + 1] = arrResult[j]
                j -= 1
                swapped = True
            arrResult[j + 1] = key
            if swapped:
                arrSteps.append(arrResult.copy())

    return arrResult, arrSteps
```
---

## III. Simulation / Step-by-Step Example

**A. Sample Input:**  

arrInput: [37, 98, 5, 12, 9], boolAscending = true

**B. Step-by-Step Process:**  

1. Start First Iteration (i = 1)
    - Key = 98

2. Compare 98 and 37
    - 98 > 37, no shift needed
    - No changes made

3. End of First Iteration
    - (No step recorded since no swap/shift occurred)

4. Start Second Iteration (i = 2)
    - Key = 5

5. Compare 5 and 98
    - 5 < 98, shift 98 to the right

6. Compare 5 and 37
    - 5 < 37, shift 37 to the right

7. Insert 5 at position 0
    - New array: [5, 37, 98, 12, 9]

8. End of Second Iteration

9. Start Third Iteration (i = 3)
    - Key = 12

10. Compare 12 and 98
    - 12 < 98, shift 98

11. Compare 12 and 37
    - 12 < 37, shift 37

13. Compare 12 and 5
    - 12 > 5, insert at position 1
    - New array: [5, 12, 37, 98, 9]

14. End of Third Iteration

15. Start Fourth Iteration (i = 4)
    - Key = 9

16. Compare 9 and 98
    - 9 < 98, shift 98

17. Compare 9 and 37
    - 9 < 37, shift 37

18. Compare 9 and 12
    - 9 < 12, shift 12

19. Compare 9 and 5
    - 9 > 5, insert at position 1
    - New array: [5, 9, 12, 37, 98]

20. End of Fourth Iteration
    - Step 3: [5, 9, 12, 37, 98]

**C. Final Output:**  

- Step 1: [5, 37, 98, 12, 9]
- Step 2: [5, 12, 37, 98, 9]
- Step 3: [5, 9, 12, 37, 98]

- Sorted List: [5, 9, 12, 37, 98]

---

## IV. Discussion

**A. Implementation Logic:**  
The function takes a list and a boolean to decide ascending or descending order. It copies the list and loops through each element starting from the second one. For each element, it compares with elements before it and shifts them right if they are greater (or smaller for descending). Then it inserts the element in the correct position. After each shifts, it saves the current list state. This repeats until the whole list is sorted. Lastly, it returns the sorted list and all the steps.

**B. References:**  
- GeekForGeeks (2025, March 22). Insertion Sort Algorithm from https://www.geeksforgeeks.org/insertion-sort-algorithm/ 
- Programiz (n.d.).Insertion Sort Algorithm from https://www.programiz.com/dsa/insertion-sort 

**C. Possible Improvements / Future Work:**  
One possible improvement is that checking if the input is comparable to each other. For example if all the contents is string or integers. 

Another minor improvement would be displaying the process of ascending and descending side by side automatically for comparisons and to avoid asking for the user if it should be sorted in ascending or descending. 

---