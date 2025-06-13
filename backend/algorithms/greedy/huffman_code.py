"""
Huffman Coding Algorithm Implementation

This module provides implementation of Huffman coding algorithm for data compression.
Uses a greedy approach to build optimal prefix codes based on character frequencies.
"""

import heapq
from typing import Dict, Tuple, Optional, List


class clsNode:
    """
    Description:
        Node class representing a node in the Huffman Tree.
        Contains character data, frequency, and references to child nodes.

    Attributes:
        strCharacter (str): The character or combined characters stored in the node
        intFrequency (int): The frequency of the character(s)
        objLeft (clsNode, optional): Reference to the left child node
        objRight (clsNode, optional): Reference to the right child node
    """

    def __init__(self, strChar: str, intFreq: int, 
                 objLeft: Optional['clsNode'] = None, 
                 objRight: Optional['clsNode'] = None) -> None:
        """
        Initialize a Huffman tree node.

        Parameters:
            strChar (str): Character or combined characters for this node
            intFreq (int): Frequency of the character(s)
            objLeft (clsNode, optional): Left child node (default: None)
            objRight (clsNode, optional): Right child node (default: None)

        Returns:
            None
        """
        self.strCharacter: str = strChar
        self.intFrequency: int = intFreq
        self.objLeft: Optional['clsNode'] = objLeft
        self.objRight: Optional['clsNode'] = objRight
    
    def __lt__(self, objOther: 'clsNode') -> bool:
        """
        Compare nodes based on frequency for use in priority queue (min-heap).

        Parameters:
            objOther (clsNode): Another node to compare with

        Returns:
            bool: True if this node's frequency is less than the other's
        """
        return self.intFrequency < objOther.intFrequency


def fnGenerateCodesFromTree(objRoot: Optional[clsNode], dictCodeMap: Dict[str, str], 
                           strCurrentCode: str) -> None:
    """
    Generate Huffman codes by traversing the tree.

    Description:
        Recursively traverses the Huffman tree to generate binary codes for each character.
        Left traversal adds '0' to the code, right traversal adds '1'.

    Parameters:
        objRoot (clsNode): The root of the Huffman Tree or current node
        dictCodeMap (Dict[str, str]): Dictionary to store character-to-code mappings
        strCurrentCode (str): The current binary code being built

    Returns:
        None: Modifies dictCodeMap in-place

    References:
        https://en.wikipedia.org/wiki/Huffman_coding
    """
    if objRoot is None:
        return
    
    # If it's a leaf node (no children), store the code
    if objRoot.objLeft is None and objRoot.objRight is None:
        # Handle single character case (assign '0' if tree has only one node)
        dictCodeMap[objRoot.strCharacter] = strCurrentCode if strCurrentCode else '0'
        return
    
    # Recursively traverse left and right subtrees
    fnGenerateCodesFromTree(objRoot.objLeft, dictCodeMap, strCurrentCode + '0')
    fnGenerateCodesFromTree(objRoot.objRight, dictCodeMap, strCurrentCode + '1')


def fnHuffmanCoding(strMessage: str) -> Tuple[Dict[str, str], str, List[str], Dict[str, int]]:
    """
    Perform Huffman coding on input message.

    Description:
        The Huffman Coding algorithm is a lossless data compression algorithm that assigns 
        variable-length codes to input characters based on their frequencies. More frequent 
        characters get shorter codes, resulting in optimal compression.

    Parameters:
        strMessage (str): The message to be encoded using Huffman coding

    Returns:
        tuple: A tuple containing:
            - Dict[str, str]: Character-to-binary-code mapping
            - str: The encoded message as binary string
            - List[str]: List of steps showing algorithm execution
            - Dict[str, int]: Character frequency information

    Raises:
        ValueError: If input message is empty

    Example:
        message = "hello world"
        codes, encoded, steps, frequencies = fnHuffmanCoding(message)

    References:
        https://en.wikipedia.org/wiki/Huffman_coding
        https://www.geeksforgeeks.org/huffman-coding-greedy-algorithm/
    """
    if not strMessage:
        raise ValueError("Input message cannot be empty")

    arrMinHeap: List[clsNode] = []
    dictCharacterFrequency: Dict[str, int] = {}
    arrSteps: List[str] = []
    
    arrSteps.append("Starting Huffman Coding algorithm")
    arrSteps.append(f"Input message: '{strMessage}' (length: {len(strMessage)})")

    # STEP 1: Calculate frequencies of each character
    arrSteps.append("Step 1: Calculating character frequencies")
    for strChar in strMessage:
        if strChar in dictCharacterFrequency:
            dictCharacterFrequency[strChar] += 1
        else:
            dictCharacterFrequency[strChar] = 1

    arrSteps.append(f"Character frequencies: {dictCharacterFrequency}")

    # Handle single character case
    if len(dictCharacterFrequency) == 1:
        strSingleChar = list(dictCharacterFrequency.keys())[0]
        dictCodeMap = {strSingleChar: '0'}
        strEncoded = '0' * len(strMessage)
        arrSteps.append("Single character detected - assigning code '0'")
        return dictCodeMap, strEncoded, arrSteps, dictCharacterFrequency

    # STEP 2: Create leaf node for each character and insert in min-heap
    arrSteps.append("Step 2: Creating leaf nodes and building min-heap")
    for strCharacter, intFreq in dictCharacterFrequency.items():
        objNode = clsNode(strCharacter, intFreq)
        heapq.heappush(arrMinHeap, objNode)
        arrSteps.append(f"Added node for '{strCharacter}' with frequency {intFreq}")

    # STEP 3: Build Huffman Tree
    arrSteps.append("Step 3: Building Huffman Tree")
    intNodeCounter: int = 0
    
    while len(arrMinHeap) > 1:
        # Extract two nodes with minimum frequency
        objLeft: clsNode = heapq.heappop(arrMinHeap)
        objRight: clsNode = heapq.heappop(arrMinHeap)

        # Create new internal node
        strMergedCharacter: str = objLeft.strCharacter + objRight.strCharacter
        intMergedFrequency: int = objLeft.intFrequency + objRight.intFrequency

        objNewNode: clsNode = clsNode(strMergedCharacter, intMergedFrequency, objLeft, objRight)
        
        heapq.heappush(arrMinHeap, objNewNode)
        intNodeCounter += 1
        
        arrSteps.append(f"Merged nodes '{objLeft.strCharacter}' (freq: {objLeft.intFrequency}) "
                       f"and '{objRight.strCharacter}' (freq: {objRight.intFrequency}) "
                       f"-> new node with frequency {intMergedFrequency}")

    # STEP 4: Assign Binary Codes
    arrSteps.append("Step 4: Generating binary codes from Huffman tree")
    objRoot: clsNode = heapq.heappop(arrMinHeap)
    dictCodeMap: Dict[str, str] = {}
    fnGenerateCodesFromTree(objRoot, dictCodeMap, "")
    
    for strChar, strCode in dictCodeMap.items():
        arrSteps.append(f"Character '{strChar}': code '{strCode}'")

    # STEP 5: Encode the message
    arrSteps.append("Step 5: Encoding the message")
    strEncoded: str = ""
    for strChar in strMessage:
        strEncoded += dictCodeMap[strChar]
        
    arrSteps.append(f"Original message length: {len(strMessage) * 8} bits (ASCII)")
    arrSteps.append(f"Encoded message length: {len(strEncoded)} bits")
    fltCompressionRatio: float = len(strEncoded) / (len(strMessage) * 8) * 100
    arrSteps.append(f"Compression ratio: {fltCompressionRatio:.2f}%")
    arrSteps.append(f"Encoded message: {strEncoded}")
        
    return dictCodeMap, strEncoded, arrSteps, dictCharacterFrequency


def fnHuffmanDecoding(strEncodedMessage: str, dictCodeMap: Dict[str, str]) -> Tuple[str, List[str]]:
    """
    Decode a Huffman-encoded message.

    Description:
        Decodes a binary string using the provided Huffman code mapping.
        Reconstructs the original message by matching binary codes to characters.

    Parameters:
        strEncodedMessage (str): Binary string to decode
        dictCodeMap (Dict[str, str]): Character-to-code mapping from encoding

    Returns:
        tuple: A tuple containing:
            - str: Decoded original message
            - List[str]: List of decoding steps

    Raises:
        ValueError: If encoded message contains invalid codes

    Example:
        encoded = "1010110"
        code_map = {'a': '10', 'b': '01', 'c': '0'}
        decoded, steps = fnHuffmanDecoding(encoded, code_map)
    """
    # Create reverse mapping (code to character)
    dictReverseCodeMap: Dict[str, str] = {strCode: strChar for strChar, strCode in dictCodeMap.items()}
    
    arrSteps: List[str] = []
    arrSteps.append("Starting Huffman decoding")
    arrSteps.append(f"Encoded message: {strEncodedMessage}")
    arrSteps.append(f"Code mapping: {dictCodeMap}")
    
    strDecodedMessage: str = ""
    strCurrentCode: str = ""
    intPosition: int = 0
    
    for strBit in strEncodedMessage:
        strCurrentCode += strBit
        intPosition += 1
        
        if strCurrentCode in dictReverseCodeMap:
            strFoundChar: str = dictReverseCodeMap[strCurrentCode]
            strDecodedMessage += strFoundChar
            arrSteps.append(f"Position {intPosition}: Found code '{strCurrentCode}' -> '{strFoundChar}'")
            strCurrentCode = ""
    
    if strCurrentCode:
        raise ValueError(f"Invalid encoded message: remaining bits '{strCurrentCode}' don't match any code")
    
    arrSteps.append(f"Decoded message: '{strDecodedMessage}'")
    
    return strDecodedMessage, arrSteps
