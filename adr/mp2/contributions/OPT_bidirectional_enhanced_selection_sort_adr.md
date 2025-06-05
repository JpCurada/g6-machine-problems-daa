## I. Assigned Algorithm

**A. Name of Algorithm:**  
*Bidirectional enhanced selection sort (optimized of selection sort)*

**B. Pseudocode:**  
```plaintext
    FUNCTION bidirectional_enhanced_selection_sort(intArray, ascending):
    
        WHILE intFront < intEnd:
            FIND high value(ascending)/low value(descending) element in the range [intFront, intEnd]
                IF new high value(ascending)/low value(descending) found
                    SWAP previous high value(ascending)/low value(descending) to the preceding new high value(ascending)/low value(descending)
                    PUT the location of previous high value(ascending)/low value(descending) to the stackMax/stackMin
            SWAP high value(ascending)/low value(descending) to the intEnd - 1
            
            UPDATE intEnd-- to norrow the range

            FIND low value(descending)/high value(descending) element in the range [intFront, intEnd]
                IF new low value found
                    SWAP previous low value(descending)/high value(descending) to the preceding new low value(descending)/high value(descending)
                    PUT the location of previous low value(descending)/high value(descending) to the stackMin/stackMax

            SWAP low value(descending)/high value(descending) to the intFront

            ADD updated array to steps
            
            UPDATE intFront++ to norrow the range

            IF stackMax.pop() and stackMin.pop() is TRUE
                UPDATE high value to stackMax.pop()
                UPDATE low value to stackMin.pop()

                IF stackMax.pop and stackMin.pop() is EQUAL
                    BREAK

            ELSE
                IF NO SWAP performed
                    BREAK
                
                UPDATE high value to intFront
                UPDATE low value to intEnd
                CONTINUE
        
        RETURN the sorted array and steps showing the array update per cycle
    

```

**C. Brief Description:**  
*The Bidirectional Enhanced Selection Sort algorithm improves upon traditional selection sort by simultaneously finding the minimum and maximum elements in each iteration, reducing the number of passes required to sort the array. It uses a bidirectional approach to sort the array from both ends, optimizing performance and minimizing redundant comparisons by moving the search base on the top of stacks. The algorithm is particularly useful for educational purposes and scenarios where simplicity and clarity are prioritized.*

---

## II. Python Implementation

**A. Function Code:**  
```python
def bidirectional_enhanced_selection_sort(intArray, ascending):
    """
    This function use the advantage of applying the selection sort algorithm bidirectionally (from left to right & right to left in one iteration), swapping the previous maximum/minimum to the location before the new maximum/minimum, storing the new location of previous maximum/minimum to the stack, and once there's no new maximum/minimum, then the current maximum/minimum will be place to its correct position. To continue, the previous maximum/minimum in the stack will be use as the starting point for the next iteration and will repeat the process until the array is sorted. And Finally, the sorting will stop when there is no swapped performed and empty stack or the stack pop of both are equal, or the front search is greater than the end search and the end search is less than the front search.
    
    Reference:
        https://papers.ssrn.com/sol3/papers.cfm?abstract_id=3828471
        
    Arguments:
        intArray (list): The list of integers to be sorted
        ascending (boolean): The list is ascending if True

    Return:
        list: The sorted list in ascending order
        list of lists: The order of array in each step

    Example:
        >>>bidirectional_enhanced_selection_sort([64, 34, 25, 12, 22, 11, 90])
        [11, 12, 22, 25, 34, 64, 90]
    """

    #variables
    stackMaxLocation = []
    stackMinLocation = []
    intEnd = len(intArray)
    intFront = 0
    intMaxBegin = 0
    intCurrentMax = 0
    intCurrentMin = intEnd - 2
    steps = []

    #loop through the array
    while intFront<intEnd and intEnd>intFront:

        #loop from left to right (sort the large value)
        for i in range(intCurrentMax, intEnd):

            if(ascending):
                if(intArray[intCurrentMax] < intArray[i]):
                    intTemporaryContainer = intArray[intCurrentMax]
                    intArray[intCurrentMax] = intArray[i - 1]
                    intArray[i - 1] = intTemporaryContainer

                    stackMaxLocation.append(i - 1)

                    intCurrentMax = i
            else:
                if(intArray[intCurrentMax] > intArray[i]):
                    intTemporaryContainer = intArray[intCurrentMax]
                    intArray[intCurrentMax] = intArray[i - 1]
                    intArray[i - 1] = intTemporaryContainer

                    stackMaxLocation.append(i - 1)

                    intCurrentMax = i

        
        intTemporaryContainer = intArray[intCurrentMax]
        intArray[intCurrentMax] = intArray[intEnd - 1]
        intArray[intEnd - 1] = intTemporaryContainer

        intEnd -= 1

        #loop from right to left (sort the small value)
        for j in range(intCurrentMin, intFront - 1, -1):
            if(ascending):
                if(intArray[intCurrentMin] > intArray[j]):
                    intTemporaryContainer = intArray[intCurrentMin]
                    intArray[intCurrentMin] = intArray[j + 1]
                    intArray[j + 1] = intTemporaryContainer

                    stackMinLocation.append(j + 1)

                    intCurrentMin = j
            else:
                if(intArray[intCurrentMin] < intArray[j]):
                    intTemporaryContainer = intArray[intCurrentMin]
                    intArray[intCurrentMin] = intArray[j + 1]
                    intArray[j + 1] = intTemporaryContainer

                    stackMinLocation.append(j + 1)

                    intCurrentMin = j


        intTemporaryContainer = intArray[intCurrentMin]
        intArray[intCurrentMin] = intArray[intFront]
        intArray[intFront] = intTemporaryContainer

        intFront += 1

        steps.append(intArray[:])

        try:
            intCurrentMax = stackMaxLocation.pop()
            intCurrentMin = stackMinLocation.pop()

            if(intCurrentMax == intCurrentMin):
                break

        except IndexError:
            intCurrentMax = intFront
            intCurrentMin = intEnd
            continue

    return intArray, steps
```

---

## III. Simulation / Step-by-Step Example

**A. Sample Input:**  
*[64, 34, 25, 12, 22, 11, 90]*

**B. Step-by-Step Process:**  
1. LOOP through the array from left to right and find highest value
        current highest value = 64      next highest value = 90        
                    11, 34, 25, 12, 22, 64, 90
        current highest value = 90      stackMax = 5 (location of the previous highest value)

2. SWAP current highest value to the intEnd of array
                    11, 34, 25, 12, 22, 64, 90
        
3. LOOP through the array from right to left and find the lowest value
        current lowest value = 64      next lowest value = 22        
                    11, 34, 25, 12, 22, 64, 90
        current lowest value = 22      stackMin = 5 (location of the previous lowest value)
                                       next lowest value = 12       
                    11, 34, 25, 12, 22, 64, 90
        current lowest value = 12      stackMin = 5, 4 (location of the previous lowest value)
                                       next lowest value = 11
                    11, 12, 25, 34, 22, 64, 90
    
4.  SWAP current lowest value to the intFront of array
                    11, 12, 25, 34, 22, 64, 90

5.  ADD the array to steps

6. UPDATE current highest value = stackMax.pop [5]
          current lowest value = stackMin.pop [4]

7. SHRINK the range of looping
        intFront++, intEnd--

8. REPEAT from step 1 with the updated range and begin at current highest value (from left to right) and current lowest value (from right to left)

**C. Final Output:**  
Sorted array: [11, 12, 22, 25, 34, 64, 90]
Steps: [[11, 12, 25, 34, 22, 64, 90], [11, 12, 25, 34, 22, 64, 90], [11, 12, 22, 25, 34, 64, 90], [11, 12, 22, 25, 34, 64, 90]]

---

## IV. Discussion

**A. Implementation Logic:**  
- The main logic of the implementation is to enhance the traditional selection sort by performing both minimum and maximum selection in each iteration, sorting from both ends of the array simultaneously.
- Moves previously high and low value to its close position
- Stacks are used to keep track of the positions of previously found minimum and maximum values, allowing the algorithm to efficiently resume searching from the correct positions in subsequent iterations.
- This structure reduces redundant comparisons and improves performance.

**B. References:**  
*(https://papers.ssrn.com/sol3/papers.cfm?abstract_id=3828471)*

**C. Possible Improvements / Future Work:**  
Unnecesarry swapping: there are times that the algorithm perform swapping when they are in the correct location and not move at all

Improve the implementation: the implementation of program is complex and need to be further simplified

---
