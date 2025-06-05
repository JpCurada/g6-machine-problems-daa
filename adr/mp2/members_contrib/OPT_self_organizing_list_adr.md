## I. Assigned Algorithm

**A. Name of Algorithm:**  
*Self Organizing List (optimized of sequencial search)*

**B. Pseudocode:**  
```plaintext
    CLASS self_organizing_list:
        DEFINE list with frequency = 0
        DEFINE length
    
        FUNCTION print(self):
            PRINT the updated array

        FUNCTION search(self, key):
            DEFINE index = -1

            LOOP through self.length
                IF self.list[i][0] == key:
                    GET index = i
                    UPDATE frequency
                    BREAK
                
            IF index == -1:
                RETURN "no key found"
                
            WHILE index > 0 and self.list[index][1] > self.list[index - 1][1]:
                SWAP self.list[index] and self.list[index - 1]
                index--

            RETURN  index
```

**C. Brief Description:**  
*A self-organizing list is a data structure that reorders its elements based on access frequency, moving frequently accessed items closer to the front to improve search efficiency. Each time an element is searched, its access count is increased, and the list is reorganized so that elements with higher frequencies appear earlier. This adaptive approach optimizes sequential search performance, especially when certain elements are accessed more often than others.*

---

## II. Python Implementation

**A. Function Code:**  
```python
class self_organizing_list:
    """
    This class enables the self organization list when searching as it position the most frequent search infront of the array to improve the performance of sequential search

    Reference:
        https://www.geeksforgeeks.org/self-organizing-list-count-method/
        
    Functions:
        print(): print the self organization list
        search(key): search and update the location of the list by descending order of frequency in each item
    """
    
    #insert the array to the self organizing list
    def __init__(self, intArray):
        self.list = [[x, 0] for x in intArray]
        self.length = len(intArray)

    #print the list
    def print(self):
        """
        This function print the organized list
        
        Argument:
            self (obj): Object of self_organizing_list
        
        Return:
            string: the string format of organized list

        Example:
            >>>obj.print()
            32, 12, 33, 55, 22
        """
        return print(", ".join(str(item[0]) for item in self.list))
    
    def search(self, key):
        """
        This function search the key and update the location in response to its frequency
        
        Argument:
            self (obj): Object of self_organizing_list
            key (int): The item to be search
        
        Return:
            integer: The index of the key to the current organized list

        Example:
            >>>obj.search(55)      [32, 12, 33, 55, 22] -> [55, 32, 12, 33, 22]
            0
        """
        
        intIndex = -1

        #get the index of the key
        for i in range(self.length):
            if(self.list[i][0] == key):
                intIndex = i
                self.list[i][1] += 1
                break

        if(intIndex == -1):
            return print("no key found")
        
        #change position base on the frequency in descending order
        while (intIndex > 0 and self.list[intIndex][1] > self.list[intIndex - 1][1]):
            self.list[intIndex], self.list[intIndex - 1] = self.list[intIndex - 1], self.list[intIndex]
            intIndex -= 1

        return intIndex
```

---

## III. Simulation / Step-by-Step Example

**A. Sample Input:**  
*[64, 34, 25, 12, 22, 11, 90]*

**B. Step-by-Step Process:**  
1. Initialize the self-organizing list:
    List with frequencies: `[[64, 0], [34, 0], [25, 0], [12, 0], [22, 0], [11, 0], [90, 0]]`

2. SEARCH 22:
        Find 22 at index 4, increment its frequency: `[[64, 0], [34, 0], [25, 0], [12, 0], [22, 1], [11, 0], [90, 0]]`
        Move 22 forward, list update: `[22, 64, 34, 25, 12, 11, 90]`

3. SEARCH 22:
        Find 22 at index 0, increment its frequency: `[[22, 2], [64, 0], [34, 0], [25, 0], [12, 0], [11, 0], [90, 0]]`
        Move 22 forward, list update: `[22, 64, 34, 25, 12, 11, 90]`

4. SEARCH 90:
        FIND 90 at index 6, increment its frequency:  `[[22, 2], [64, 0], [34, 0], [25, 0], [12, 0], [11, 0], [90, 1]]`
        Move 90 forward, list update: `[22, 90, 64, 34, 25, 12, 11]`
        
**C. Final Output:**  
The index of the 22 is:  0
22, 64, 34, 25, 12, 11, 90

The index of the 22 is:  0
22, 64, 34, 25, 12, 11, 90

The index of the 90 is:  1
22, 90, 64, 34, 25, 12, 11
---

## IV. Discussion

**A. Implementation Logic:**  
- The main logic of the self-organizing list implementation is to improve sequential search efficiency by dynamically reordering the list based on search frequency.
- Each element in the list is paired with a frequency counter, which is incremented every time the element is searched.
- After each search, the element is moved forward in the list until it is ahead of all elements with lower or equal frequency, ensuring that frequently accessed items are positioned closer to the front.
- This adaptive approach reduces the average search time for commonly accessed elements, making the structure more efficient for non-uniform access patterns.

**B. References:**  
*https://www.geeksforgeeks.org/self-organizing-list-count-method/*

**C. Possible Improvements / Future Work:**  
Optimize reordering process: When every element have the same frequency, there's unnecessary swap

---
