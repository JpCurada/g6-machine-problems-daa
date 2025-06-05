# Algorithm Activity Documentation Report

---

## I. Assigned Algorithm

**A. Optimized Bubble Sort (Cocktail Shaker Sort):**  


**B. Pseudocode:**  
```plaintext
Start

    - Accept array (arrInput), boolean (boolAscending), and boolean (boolIsNumbers) to determine sorting order and data type.

        - Initialize the size of the array (intSize)
        - Initialize the variable to store the steps (listSteps)
        - Initialize intStart as 0 (starting index)
        - Initialize intEnd as intSize - 1 (last index)
        - Initialize a flag (swapped) as True to track if any swap occurred

        - If boolIsNumbers is false
            - Convert all elements in the array to string

        - If boolAscending is true
            - While boolSwapped is true

            - Set boolSwapped to false
            
                - Loop i from intStart to intEnd
                    - If element at index[i] is greater than element at index[i+1]
                        - Swap the two elements
                        - Set boolSwapped to true
                        - append a copy of listInput to listSteps
                - If boolSwapped is false then exit loop
                - Set boolSwapped to false
                - Decrease intEnd by 1

                - Loop i from intEnd - 1 to intStart (reverse order)
                    - If element at index i is greater than element at index i+1
                        - Swap the two elements
                        - Set boolSwapped to true
                        - append a copy of listInput to listSteps
                - Increase intStart by 1
        
        - else if boolAscending is false
            proceed to do the same process however instead of using index[i] is greater than index[i + 1], we will use index[i] is less than index[i + 1]. Then it will proceed to sort the list in descending order.

        Return variables listInput, listSteps

End
```

**C. Brief Description:**  
Cocktail Shaker Sort is an optimized version of Bubble Sort that traverses and sort the array in both directions alternatively. It does not go through the unnecessary iteration making it efficient for large arrays. This bidirectional approach helps detect sorted portions faster.

---

## II. Python Implementation

**A. Function Code:**  
```python
def optimizedBubbleSort(listInput, ascending=True, isNumbers=True):
    """

    Description:
        Optimized Bubble Sort Algorithm (Cocktail Shaker Sort) 
            A sorting algorithm that traverses through a given array in both 
            directions alternatively which is also known as Cocktail Shaker Sort.

    Parameters:
        listInput (list): The list to be sorted.
        ascending (bool): Sort in ascending as default, otherwise sort in descending.
        isNumbers (bool): Check if the list is of numbers or letters.

    Returns: 
        The sorted list (listInput).

    References:
        https://www.geeksforgeeks.org/cocktail-sort/
        
    """ 

    #listSteps is a variable that stores the steps of the sorting process
    listSteps = []

    #variable intSize is the length of the list
    intSize = len(listInput) 

    #variable start indicates the starting index of the list
    intStart = 0 

    #variable end indicates the last index of the list
    intEnd = intSize - 1

    #indicates whether a swap has occurred
    swapped = True 

    #check if the list is of numbers or letters
    if not isNumbers:
        for i in range(intSize):
            #convert the elements to string
            listInput[i] = str(listInput[i])
    
    # Conditional statement for ascending order
    if ascending:
        #iterate until no swaps occur
        while swapped:

            #set swapped to false
            swapped = False

            #loop through the list from start to end
            for i in range(intStart, intEnd):

                #compare adjacent elements from start to end
                if listInput[i] > listInput[i + 1]:

                    #swap if they are not in the correct order
                    listInput[i], listInput[i + 1] = listInput[i + 1], listInput[i]

                    #set swapped to true
                    swapped = True

                    #store the steps in the listSteps variable
                    listSteps.append(listInput.copy())
            
            #if no swaps occurred, break the loop
            if not swapped:
                break

            #set swapped to false
            swapped = False

            #loop through the list from end to start
            intEnd -= 1

            #compare adjacent elements from end to start
            for i in range(intEnd - 1, intStart - 1, -1):

                #compare adjacent elements from end to start
                if listInput[i] > listInput[i + 1]:

                    #swap if they are not in the correct order
                    listInput[i], listInput[i + 1] = listInput[i + 1], listInput[i]

                    #set swapped to true
                    swapped = True

                    #store the steps in the listSteps variable
                    listSteps.append(listInput.copy())
            
            #if no swaps occurred, break the loop
            intStart += 1
    
    # Conditional statement for descending order
    else:
        while swapped:
            swapped = False
            for i in range(intStart, intEnd):
                if listInput[i] < listInput[i + 1]:
                    listInput[i], listInput[i + 1] = listInput[i + 1], listInput[i]
                    swapped = True
                    listSteps.append(listInput.copy())
            if not swapped:
                break
            swapped = False
            intEnd -= 1
            for i in range(intEnd - 1, intStart - 1, -1):
                if listInput[i] < listInput[i + 1]:
                    listInput[i], listInput[i + 1] = listInput[i + 1], listInput[i]
                    swapped = True
                    listSteps.append(listInput.copy())
            intStart += 1

    #return the sorted list and the steps list
    return listInput, listSteps
```
---

## III. Simulation / Step-by-Step Example

**A. Sample Input:**  
arrInput[37, 98, 5, 12, 9,], boolAscending = true, isNumbers = true

**B. Step-by-Step Process:**  
1. Start First Forward Pass

2. Compare 3 and 50
    - 3 < 50, no swap needed

3. Compare 50 and 1
    - 50 > 1, swap their position
    - New array: [3, 1, 50, 40, 2]

4. Compare 50 and 40
    - 50 > 40, swap their position
    - New array: [3, 1, 40, 50, 2]

5. Compare 50 and 2
    - 50 > 2, swap their position
    - New array: [3, 1, 40, 2, 50]

6. End of Forward Pass

7. Start First Backward Pass

8. Compare 2 and 40
    - 2 < 40, swap their position
    - New array: [3, 1, 2, 40, 50]

9. Compare 2 and 1
    - 2 > 1, no swap needed

10. Compare 1 and 3
    - 1 < 3, swap their position
    - New array: [1, 3, 2, 40, 50]

11. End of Backward Pass

12. Start Second Forward Pass

13. Compare 3 and 2
    - 3 > 2, swap their position
    - New array: [1, 2, 3, 40, 50]

14. Compare 3 and 40
    - 3 < 40, no swap needed

15. Compare 40 and 50
    - 40 < 50, no swap needed

16. End of Forward Pass

17. Start Second Backward Pass

18. Compare 40 and 3
    - 40 > 3, no swap needed

19. Compare 3 and 2
    - 3 > 2, no swap needed

20. Compare 2 and 1
    - 2 > 1, no swap needed

21. End of Backward Pass

Final sorted array: [5, 9, 12, 37, 98]

**C. Final Output:**  

- Step 1: [3, 1, 50, 40, 2]
- Step 2: [3, 1, 40, 50, 2]
- Step 3: [3, 1, 40, 2, 50]
- Step 4: [3, 1, 2, 40, 50]
- Step 5: [1, 3, 2, 40, 50]
- Step 6: [1, 2, 3, 40, 50]

- Sorted List: [5, 9, 12, 37, 98]

---

## IV. Discussion

**A. Implementation Logic:**  
The function accepts a list from the user along with a setting to determine whether the output should be in ascending or descending order. A checker if the input is an integer or letter is also added in the function. While loop is used as the outer loop to keep the sorting going until it the list is sorted. Inside the while loop, contains two for loops. The first for loop is for the traditional style of bubble sort and the second for loop is the reverse. Reverse means the swapping starts at the end of the list and after that it will go back to the traditional style or the start. This approach continues until a full cycle goes by without any swaps.

**B. References:**  
- https://www.geeksforgeeks.org/cocktail-sort/

**C. Possible Improvements / Future Work:**  
A minor improvement would be displaying the process of ascending and descending side by side automatically for comparisons and to avoid asking for the user if it should be sorted in ascending or descending.

Another simple improvement is to add a description if the swap made is from the start or from the end to make it much more easier to debug and understand.

---
