# Algorithm Activity Documentation Report

## I. Assigned Algorithm

**A. Russian Peasant Multiplication**  

**B. Pseudocode:**  
```plaintext

Start

- Accept two integers (intMultiplier and intMultiplicand) to multiply.
- Initialize intProduct to 0.
- Initialize empty arrays arrHalving and arrDoubling.

- While intMultiplier is greater than 0:
    - Add current intMultiplier to arrHalving array.
    - Add current intMultiplicand to arrDoubling array.
    - Display current multiplication: intMultiplier x intMultiplicand = result.
    
    - If intMultiplier is odd (intMultiplier % 2 == 1):
        - Add intMultiplicand to intProduct.
    
    - Divide intMultiplier by 2 (integer division).
    - Multiply intMultiplicand by 2.

- Return intProduct, arrHalving, and arrDoubling as a tuple.

End

```

**C. Brief Description:**  

Russian Peasant Multiplication multiplies two numbers using only addition, halving, and doubling. It repeatedly halves the first number and doubles the second number. When the first number is odd, it adds the second number to the result. This continues until the first number becomes zero. The algorithm has O(log n) time complexity and demonstrates how multiplication can be performed without direct multiplication operations.

---
    
## II. Python Implementation

**Function Code:**
``` python
def russian_multiply(intMultiplier, intMultiplicand):
    """
    Description:
        Implements the Russian peasant multiplication algorithm to multiply two integers.
        Uses only addition, halving, and doubling operations. The algorithm repeatedly
        halves the multiplier and doubles the multiplicand, adding the multiplicand to
        the result whenever the multiplier is odd.

    Parameters:
        intMultiplier (int): The first number to multiply (will be repeatedly halved)
        intMultiplicand (int): The second number to multiply (will be repeatedly doubled)

    Returns:
            - intProduct (int): The final multiplication result
            - arrHalving (list): Array showing the halving sequence of the multiplier
            - arrDoubling (list): Array showing the doubling sequence of the multiplicand
    """
    
    intProduct = 0
    arrHalving = []
    arrDoubling = []

    while intMultiplier > 0:
        #Store current values in arrays
        arrHalving.append(intMultiplier)
        arrDoubling.append(intMultiplicand)

        #If intMultiplier is odd, add intMultiplicand to result
        if intMultiplier % 2 == 1:
            intProduct += intMultiplicand

        #Halve intMultiplier (integer division) and double intMultiplicand
        intMultiplier >>= 1
        intMultiplicand <<= 1

    return intProduct, arrHalving, arrDoubling
```
---

## III. Simulation / Step-by-Step Example

**A. Sample Input:**  

intMultiplier = 17, intMultiplicand = 19

**B. Step-by-Step Process:**  

Step 1: 17 × 19 = 323
17 is odd, so add 19 to result: result = 0 + 19 = 19
Halve 17: 17 ÷ 2 = 8, Double 19: 19 × 2 = 38

Step 2: 8 × 38 = 304
8 is even, so don't add to result: result = 19
Halve 8: 8 ÷ 2 = 4, Double 38: 38 × 2 = 76

Step 3: 4 × 76 = 304
4 is even, so don't add to result: result = 19
Halve 4: 4 ÷ 2 = 2, Double 76: 76 × 2 = 152

Step 4: 2 × 152 = 304
2 is even, so don't add to result: result = 19
Halve 2: 2 ÷ 2 = 1, Double 152: 152 × 2 = 304

Step 5: 1 × 304 = 304
1 is odd, so add 304 to result: result = 19 + 304 = 323
Halve 1: 1 ÷ 2 = 0, algorithm stops

**C. Final Output:**  

Output: 323 (arrHalving: [17, 8, 4, 2, 1], arrDoubling: [19, 38, 76, 152, 304])

---

## IV. Discussion

**A. Implementation Logic:**  

The algorithm uses a while loop that continues until the multiplier becomes zero. In each iteration, it checks if the current multiplier is odd using the modulo operator. If odd, it adds the current multiplicand to the running total. The multiplier is then halved using integer division, and the multiplicand is doubled. This process leverages the binary representation of numbers, where each bit position represents a power of 2.


**B. References:**

GeeksforGeeks. (2025, March 24). Russian Peasant (Multiply two numbers using bitwise operators). https://www.geeksforgeeks.org/russian-peasant-multiply-two-numbers-using-bitwise-operators/

Peterson, D. (2024, February 2). Russian peasant multiplication: How and why. The Math Doctors. https://www.themathdoctors.org/russian-peasant-multiplication-how-and-why/
**C. Possible Improvements / Future Work:**  

One potential improvement would be to optimize the algorithm for negative numbers by handling signs separately. Additionally, the algorithm could be extended to handle floating-point numbers or adapted for modular arithmetic applications.