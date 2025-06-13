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
