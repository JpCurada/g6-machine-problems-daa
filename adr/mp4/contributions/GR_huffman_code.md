# Algorithm Activity Documentation Report

## I. Assigned Algorithm

**A. Huffman Code:**  

**B. Algorithm Definition and Problem Solved:**  
The Huffman Coding is a data compression algorithm that assigns variable-length codes to input characters based on their frequencies. The main idea is to assign shorter codes to more frequent characters and longer codes to less frequent ones, thereby reducing the overall size of the data. (Singh, A., 2024). This solves the problem of efficiently compressing data by minimizing the weighted average codeword length. It is particularly useful in scenarios where certain characters occur more frequently than others, allowing for significant reduction in the number of bits required to represent the data. (Boyini, K., 2022).

**C. Divide And Conquer Strategy:**
The process of creating an optimal prefix code uses a greedy algorithm, where the best choice is made at each step to eventually reach the most efficient overall solution. It works by building a binary tree from the bottom up, repeatedly combining the two nodes with the smallest frequencies into a new internal node. This greedy approach ensures that the least frequent characters are placed deeper in the tree, giving them longer codes, while the more common characters stay closer to the root, resulting in shorter codes. (GeeksforGeeks, 2025)

## II. Python Implementation

**Function Code:**  
```python

import heapq

"""
    Description:
        The Node class represents a node in the Huffman Tree.
    Parameters:
        char (str): The character or combined characters stored in the node.
        freq (int): The frequency of the character(s).
        left (Node, optional): Reference to the left child node. Defaults to None.
        right (Node, optional): Reference to the right child node. Defaults to None.

    Methods:
        __lt__(other): Compares nodes based on frequency for use in a priority queue (min-heap).

"""
class Node:
    def __init__(self, char, freq, left=None, right=None):
        self.character = char
        self.frequency = freq
        self.left = left
        self.right = right
    
    def __lt__(self, other):
        return self.frequency < other.frequency

"""
    Description:
        The getCodeByTraversing is a function that traversing to the tree.
        
    Parameters:
        root (Node): The root of the Huffman Tree
        codeMap (dict): The storage for of the unique character codes
        currentCode (String): The storage for the code on individual character

"""
def getCodeByTraversing(root, codeMap, currentCode):
    if root is None:
        return
    
    if root.left is None and root.right is None:
        codeMap[root.character] = currentCode
        return
    
    getCodeByTraversing(root.left, codeMap, currentCode + '0')
    getCodeByTraversing(root.right, codeMap, currentCode + '1')

"""
    Description:
        The Huffman Coding is a data compression algorithm that assigns variable-length codes to input characters based on their frequencies.
        
    Parameters:
        message (String): The message to be encoded

    Returns:
        codeMap (dict):
            The unique characters with its corresponding binary codes
        encoded (String):
            The encoded message
"""
def huffman_code(message):

    min_heap = []
    characterFrequency = {}


    #STEP 1: Calculate frequencies of each character
    for char in message:
        if char in characterFrequency:
            characterFrequency[char] += 1
        else:
            characterFrequency[char] = 1

    #STEP 2: Create leaf node for each character and insert in min-heap
    for character in characterFrequency:
        heapq.heappush(min_heap, Node(character, characterFrequency[character]))

    #STEP 3: Build Huffman Tree

    while len(min_heap) != 1:
        left = heapq.heappop(min_heap)
        right = heapq.heappop(min_heap)

        updateCharacter = left.character + right.character
        updateFrequency = left.frequency + right.frequency

        newNode = Node(updateCharacter, updateFrequency, left, right)

        heapq.heappush(min_heap, newNode)

    #STEP 4: Assign Binary Codes
    root = heapq.heappop(min_heap)
    codeMap = {}
    getCodeByTraversing(root, codeMap, "")

    #STEP 5: Replace each character with its binary code
    encoded = ""
    for char in message:
        encoded = encoded + codeMap[char] + " "
        
    return codeMap, encoded

```
---

## III. Simulation / Step-by-Step Example

**A. Step-by-Step Process:** 
huffman_code("PEPPER")

Step 1: Calculate the frequencies of each characters in the data
	Example: “PEPPER”
		P – 3, 
        E – 2,
        R – 1

	Step 2: Create Leaf Node for each character, storing the character and its frequency. And insert all nodes into a min-heap priority queue ordered by frequency.
	Example: R - 1, E - 2, P - 3

	Step 3: Build the Huffman Tree 
		-Extract the two nodes with the smallest frequencies.
		-Create new internal node whose frequency is the sum of the two nodes.
		-Make the two nodes the left and right children of the new node.
		-Insert the new node back into the min-heap
	Repeat step 3 until only one node left in the min-heap
	Example:
	Merge: R(1) and E(2) -> new node RE(3)
	Heap: P(3), RE(3)
	Merge: PRE(6)

	Step 4: Assign Binary Codes by traversing the Huffman Tree from root to each leaf:
		Assign 0 for every left branch and 1 for every right branch
	Example:
	R – 10
	E – 11
	P – 0 

	Step 5: Replace each character with its binary code:
	Original: PEPPER	Encoded: 0 11 0 0 11 10

	Step 6 (optional): Decode the data by moving from the root of the Huffman Tree for each bit and when you reach the leaf node, output the character and go back from the root
	Example:
	0 (left node) -> P (leaf node)
	1 (right node) 1 (right node) -> E (leaf node)
	0 (left node) -> P (leaf node)
	0 (left node) -> P (leaf node)
	1 (right node) 1(right node) -> E (leaf node)
	1 (right node) 0 (left node) -> R (leaf node)
	Output: PEPPER	


**B. Time Complexity Analysis**
	Frequency Calculation: O(n) where n is the length of input data

	Min-Heap Priority Queue: O(m log m) each insertion takes O(log m) where m is the number of unique characters

	Building the Huffman Tree: O(m log m) each extract min and insertion operation takes O(log m)

	Code Assignment via Tree Traversal: O(m) since the tree has m leaves and m – 1 internal nodes

	Encoding the Input: O(n) where n is the length of input data

	Overall Time Complexity:
		O(n + m log m) -> O(m log m)


## IV. Discussion

**A. Limitations:** 
    1. Requires knowledge of symbol frequencies beforehand
        - The algorithm needs the frequency distribution of symbols prior to encoding, making it unsuitable for real-time or streaming data where future symbols are unknown.

    2. Not suitable for streaming data
        - Since the entire dataset must be processed first to build the optimal tree, Huffman coding can't efficiently encode data that arrives sequentially without prior analysis.

    3. Overhead for small files
        - For small inputs, the storage of the Huffman tree or code table can outweigh the compression benefits, leading to inefficient compression.

    4. Non-adaptive to changing symbol frequencies
        - Once the tree is built, the encoding remains fixed, meaning it cannot adapt to shifts in symbol probabilities during encoding, reducing effectiveness in dynamic data scenarios.

**B. References:**  
    - Singh, A. (2024, February 9). Introduction to huffman coding. shiksha online. https://www.shiksha.com/online-courses/articles/introduction-to-huffman-coding/ 
    
    - Boyini, K. (2022, December 23). Huffman coding algorithm. Tutorialspoint. https://www.tutorialspoint.com/Huffman-Coding-Algorithm 
    
    - GeeksforGeeks (2025a, April 22). Huffman coding: Greedy Algo-3. GeeksforGeeks. https://www.geeksforgeeks.org/huffman-coding-greedy-algo-3/ 
