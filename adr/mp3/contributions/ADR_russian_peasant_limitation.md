## I. Assigned Algorithm

**A. Name of Algorithm:**  
*Russian Peasant Multiplication Method Limitation*

**B. Pseudocode:**  
```plaintext
CLASS RussianPeasantMultiplicationLimitationAnalyzer:
    FUNCTION __init__():
        arrTestPairs ← [(13, 27), (85, 18), (147, 17), (255, 63), (1023, 511)]

    FUNCTION mAnalyzeOperandOrderDependency():
    Initialize result dictionary

    DEFINE testCases AS list of (a, b, description)

    FOR each (a, b, description) in testCases:
        Run russian_multiply(a, b)
        Measure steps and time
        Run russian_multiply(b, a)
        Measure steps and time

        Determine which operand order gives fewer steps
        Calculate efficiency ratio between the two orders
        Check bit lengths of a and b
        Confirm both products match expected value

        Append result with:
            - Operand details
            - Bit lengths
            - Step counts
            - Execution times
            - Optimal order
            - Products match
            - Efficiency ratio

    FUNCTION mAnalyzeBitPatternPerformance():
    Initialize result dictionary
    Set baseMultiplicand ← 127

    DEFINE testNumbers ← [
        (15, '1111'),
        (16, '10000'),
        (17, '10001'),
        (85, '1010101'),
        (255, '11111111'),
        (256, '100000000')
    ]

    FOR each number, description in testNumbers:
        Run russian_multiply(number, baseMultiplicand)
        Measure step count and execution time
        Analyze binary pattern:
            - Bit length
            - Number of 1s / 0s
            - Bit density
            - Steps per bit

        Confirm product is correct
        Append all metrics to result
```

**C. Brief Description:**  
The clsRussianPeasantMultiplicationLimitationAnalyzer class provides a performance-driven analysis of the Russian Peasant Multiplication algorithm, a method based on bit manipulation and binary halving/doubling.

This algorithm, although historically interesting and sometimes useful in low-level systems (e.g., microcontrollers lacking hardware multiplication), has notable limitations in terms of:

- Operand order dependency

- Binary bit pattern sensitivity

This class runs empirical tests to expose how such factors affect runtime and step count.

---

## II. Python Implementation

**A. Function Code:**  
```python
class clsRussianPeasantMultiplicationLimitationAnalyzer:
    """
    Comprehensive analysis of Russian Peasant Multiplication algorithm limitations.
    
    Algorithm Characteristics:
    - Time Complexity: O(log b) where b is the second operand
    - Space Complexity: O(1) for iterative, O(log b) for recursive implementation
    - Based on binary representation of numbers and bit manipulation
    
    Key Limitations Identified:
    1. Order Dependency: Performance depends on which number is used as multiplier
    2. Implementation Overhead: More complex than direct multiplication
    
    Historical Context:
    - Ancient algorithm with Egyptian and Ethiopian roots
    - Modern relevance mainly for embedded systems without multiplication units
    
    References:
    - GeeksforGeeks: https://www.geeksforgeeks.org/russian-peasant-multiply-two-numbers-using-bitwise-operators/
    - Stack Overflow Analysis: https://stackoverflow.com/questions/54801460/time-efficiency-of-the-russian-peasant-multiplication-algorithm
    - The Math Doctors: https://www.themathdoctors.org/russian-peasant-multiplication-how-and-why/
    - Math Stack Exchange: https://math.stackexchange.com/questions/2099095/proof-of-russian-peasant-multiplication
    """
    
    def __init__(self):
        self.arrTestPairs = [(13, 27), (85, 18), (147, 17), (255, 63), (1023, 511)]
    
    def mAnalyzeOperandOrderDependency(self) -> Dict[str, Any]:
        """
        Demonstrates how algorithm efficiency depends on operand order.
        
        Returns:
            Dict showing performance differences based on which number is the multiplier
        """
        dictResults = {
            'strTestName': 'Operand Order Dependency Analysis',
            'strDescription': 'Performance variation based on which operand is used as multiplier',
            'arrOrderTests': []
        }
        
        arrTestCases = [
            (13, 27, 'Small numbers'),
            (85, 453, 'Medium numbers'),
            (255, 1023, 'Power-of-2 related'),
            (1000, 7, 'Large vs small')
        ]
        
        for intA, intB, strDescription in arrTestCases:
            # Test a * b (a as multiplier)
            dblStartTime = time.time()
            intProduct1, arrHalving1, arrDoubling1 = russian_multiply(intA, intB)
            dblTime1 = time.time() - dblStartTime
            
            # Test b * a (b as multiplier)  
            dblStartTime = time.time()
            intProduct2, arrHalving2, arrDoubling2 = russian_multiply(intB, intA)
            dblTime2 = time.time() - dblStartTime
            
            # Analyze bit patterns
            intABits = intA.bit_length()
            intBBits = intB.bit_length()
            
            strOptimalOrder = 'a_first' if len(arrHalving1) <= len(arrHalving2) else 'b_first'
            dblEfficiencyRatio = max(len(arrHalving1), len(arrHalving2)) / min(len(arrHalving1), len(arrHalving2))
            
            dictResults['arrOrderTests'].append({
                'intOperandA': intA,
                'intOperandB': intB,
                'strDescription': strDescription,
                'intAFirstSteps': len(arrHalving1),
                'intBFirstSteps': len(arrHalving2),
                'dblAFirstTimeMs': dblTime1 * 1000,
                'dblBFirstTimeMs': dblTime2 * 1000,
                'strOptimalOrder': strOptimalOrder,
                'dblEfficiencyRatio': dblEfficiencyRatio,
                'intABitLength': intABits,
                'intBBitLength': intBBits,
                'blnProductsMatch': intProduct1 == intProduct2 == intA * intB
            })
            
        return dictResults
    
    def mAnalyzeBitPatternPerformance(self) -> Dict[str, Any]:
        """
        Analyzes how binary representation affects algorithm performance.
        
        Returns:
            Dict showing correlation between bit patterns and step count
        """
        dictResults = {
            'strTestName': 'Bit Pattern Performance Analysis',
            'strDescription': 'How binary representation affects algorithm efficiency',
            'arrBitPatternTests': []
        }
        
        # Test numbers with different bit patterns
        arrTestNumbers = [
            (15, 'Dense bits: 1111'),
            (16, 'Single bit: 10000'),
            (17, 'Sparse bits: 10001'),
            (85, 'Mixed pattern: 1010101'),
            (255, 'All ones: 11111111'),
            (256, 'Power of 2: 100000000')
        ]
        
        intBaseMultiplicand = 127  # Fixed second operand
        
        for intNum, strBitDescription in arrTestNumbers:
            dblStartTime = time.time()
            intProduct, arrHalving, arrDoubling = russian_multiply(intNum, intBaseMultiplicand)
            dblExecutionTime = time.time() - dblStartTime
            
            # Analyze bit characteristics
            strBinaryRepr = bin(intNum)[2:]  # Remove '0b' prefix
            intOnesCount = strBinaryRepr.count('1')
            intZerosCount = strBinaryRepr.count('0')
            dblBitDensity = intOnesCount / len(strBinaryRepr)
            
            dictResults['arrBitPatternTests'].append({
                'intNumber': intNum,
                'strBinaryRepresentation': strBinaryRepr,
                'strBitDescription': strBitDescription,
                'intTotalBits': len(strBinaryRepr),
                'intOnesCount': intOnesCount,
                'intZerosCount': intZerosCount,
                'dblBitDensity': dblBitDensity,
                'intAlgorithmSteps': len(arrHalving),
                'dblExecutionTimeMs': dblExecutionTime * 1000,
                'dblStepsPerBit': len(arrHalving) / len(strBinaryRepr),
                'blnProductCorrect': intProduct == intNum * intBaseMultiplicand
            })
            
        return dictResults
```

---

## III. Simulation / Step-by-Step Example

**A. Sample Input:**  
*[(13, 27), (85, 18), (147, 17), (255, 63), (1023, 511)]*

**B.1 Step-by-Step Process: mAnalyzeOperandOrderDependency()**  
Example Case: (13, 27)
1. Compute 13 * 27:

    - Halving steps: [13, 6, 3, 1] → 4 steps

2. Compute 27 * 13:

    - Halving steps: [27, 13, 6, 3, 1] → 5 steps

3. Compare:

    - a_first uses fewer steps → marked as optimal

    - Bit lengths: 13 → 4 bits, 27 → 5 bits

    - Products match: ✅

4. Store

        
**C.1 Final Output:**  
```python
{
    'strTestName': 'Operand Order Dependency Analysis',
    'strDescription': 'Performance variation based on which operand is used as multiplier',
    'arrOrderTests': [ {... per test case ...} ]
}

```

**B.2 Step-by-Step Process: mAnalyzeBitPatternPerformance()**  
Example Case: 85 (binary 1010101) × 127
1. Compute:

    - Halving path: [85, 42, 21, 10, 5, 2, 1] → 7 steps

2. Binary info:

    - Binary: '1010101'

    - Ones: 4, Zeros: 3

    - Bit density: 4 / 7 ≈ 0.571

3. Add to Metrics
        
**C.2 Final Output:**  
```python
{
    'strTestName': 'Bit Pattern Performance Analysis',
    'strDescription': 'How binary representation affects algorithm efficiency',
    'arrBitPatternTests': [ {... per test number ...} ]
}

```

---

## IV. Discussion

**A. Implementation Logic:**  
This analyzer investigates how algorithm performance varies based on:

1. Operand order (a × b vs b × a)

2. Bit patterns of input values

- mAnalyzeOperandOrderDependency()

    - The Russian Peasant algorithm halves one operand and doubles the other.

    - Efficiency depends on how quickly the halving operand reaches 1, which is directly tied to its bit length.

    - This function compares both a × b and b × a, measuring:

        - Step count (how many halving steps)

        - Time taken

    - The operand with the shorter bit length generally results in fewer steps when placed first (as the halved operand).

- mAnalyzeBitPatternPerformance()

    - Since the algorithm skips additions when the halved number is even, bit patterns affect how many additions are performed.

    - This function analyzes:

        - Total number of bits

        - Number of 1s vs 0s in the binary representation

        - Bit density (fraction of bits that are 1)

    - More 1s = more additions = potentially more steps.

    - Power-of-2 numbers (like 256) yield fast paths due to their sparse binary structure (100000000).

Together, these methods offer a complete profile of the operational complexity hidden behind the simplicity of the Russian Peasant algorithm.

**B. References:**  
GeeksforGeeks. (n.d.). Russian peasant multiply two numbers using bitwise operators. https://www.geeksforgeeks.org/russian-peasant-multiply-two-numbers-using-bitwise-operators/

Math Stack Exchange. (n.d.). Proof of Russian peasant multiplication. https://math.stackexchange.com/questions/2099095/proof-of-russian-peasant-multiplication

Stack Overflow. (n.d.). Time efficiency of the Russian peasant multiplication algorithm. https://stackoverflow.com/questions/54801460/time-efficiency-of-the-russian-peasant-multiplication-algorithm

The Math Doctors. (n.d.). Russian peasant multiplication: How and why? https://www.themathdoctors.org/russian-peasant-multiplication-how-and-why/


**C. Possible Improvements / Future Work:**  
Limitations

- Algorithm is only optimal in environments lacking native multiplication hardware (e.g., microcontrollers).

- Operand order must be chosen manually or benchmarked per use case.

- Bit-pattern sensitivity makes performance non-uniform, which is bad for predictability.

Suggested Improvements

- Auto-reorder operands based on bit length to minimize steps.

- Implement a visual binary trace showing the halving/doubling process step-by-step.

- Extend analysis to recursive implementations and compare memory overhead.

- Evaluate energy consumption or instruction count on real embedded hardware.


---
