## I. Assigned Algorithm

**A. Name of Algorithm:**  
*Comb Sort (optimized of bubble sort)*

**B. Pseudocode:**  
```plaintext
    FUNCTION comb_sort(intArray, ascending):
    
        DEFINE gap to len(intArray) / 1.3

        WHILE gap > 0:
            SEARCH through array in range(length - gap)
                IF ascending AND array[i] > array[i + gap]:
                    SWAP array[i] and array[i + gap] 
                IF descending AND array[i] < array[i + gap]:
                    SWAP array[i] and array[i + gap]
            
            UPDATE gap = gap/1.3
            ADD array in steps

        RETURN the sorted array and steps showing the array update per cycle
```

**C. Brief Description:**  
*Comb Sort is an improvement over Bubble Sort that eliminates small values near the end of the list, known as "turtles," by comparing and swapping elements at a certain gap apart. The gap starts large and shrinks by a shrink factor (commonly 1.3) each pass, allowing faster movement of elements towards their correct positions. This approach significantly improves performance over Bubble Sort, especially for larger lists, while maintaining simplicity and ease of implementation.*

---

## II. Python Implementation

**A. Function Code:**  
```python
def comb_sort(intArr, ascending):
    """
        This algorithm use the known bubble sort algorithm, but instead of comparing the adjacent pairs it repeatedly sort pairs of element that are a certain gap apart. This gap starts as the length of the list and is continuously reduced by diving it to 1.3 at each cycle. 

    Reference:
        https://www.tutorchase.com/answers/a-level/computer-science/how-does-the-comb-sort-algorithm-work
        https://www.geeksforgeeks.org/comb-sort/

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
    intLength = len(intArr)
    intGap = int(len(intArr) / 1.3)
    steps = []

    #loop through array
    while intGap > 0:
        for i in range(intLength - intGap):
            if(ascending):
                if(intArr[i] > intArr[i + intGap]):
                    intTemporaryContainer = intArr[i]
                    intArr[i] = intArr[i + intGap]
                    intArr[i + intGap] = intTemporaryContainer
            else:
                if(intArr[i] < intArr[i + intGap]):
                    intTemporaryContainer = intArr[i]
                    intArr[i] = intArr[i + intGap]
                    intArr[i + intGap] = intTemporaryContainer

        intGap = int(intGap/1.3)
        steps.append(intArr[:])


    return intArr, steps
```

---

## III. Simulation / Step-by-Step Example

**A. Sample Input:**  
*[64, 34, 25, 12, 22, 11, 90]*

**B. Step-by-Step Process:**  
1. DEFINE the gap = length/1.3    (5)

2. LOOP through array in range(length - gap):
        IF array[i] > array[i + gap]:
            SWAP array[i] to array[i + gap]
            
        [11, 34, 25, 12, 22, 64, 90]

3. UPDATE gap = gap/1.3

4. ADD array to steps

4. CONTINUE until gap < 0
        
**C. Final Output:**  
Sorted array: [11, 12, 22, 25, 34, 64, 90]
Steps: [[11, 34, 25, 12, 22, 64, 90], [11, 22, 25, 12, 34, 64, 90], [11, 12, 25, 22, 34, 64, 90], [11, 12, 22, 25, 34, 64, 90]]
---

## IV. Discussion

**A. Implementation Logic:**  
- The main logic of the implementation is to improve upon Bubble Sort by introducing a gap between compared elements, allowing the algorithm to move small values ("turtles") towards the beginning of the list more efficiently.
- The gap starts as the length of the array divided by a shrink factor (commonly 1.3) and is reduced in each iteration, gradually approaching a standard Bubble Sort as the gap reaches 1.
- During each pass, elements that are a "gap" apart are compared and swapped if they are out of order, depending on the desired sorting direction.
- This approach significantly reduces the total number of comparisons and swaps needed, especially for lists with small values near the end, resulting in better performance than Bubble Sort while maintaining a simple and easy-to-understand structure.

**B. References:**  
*https://www.tutorchase.com/answers/a-level/computer-science/how-does-the-comb-sort-algorithm-work
https://www.geeksforgeeks.org/comb-sort/*

**C. Possible Improvements / Future Work:**  
Optimize shrinking: implement the best shrink factor depending the input data to achieve better performance

Sort Checker: Add functions that allows early termination if array is sorted
---
