def russian_multiply(intMultiplier, intMultiplicand):
    """
        Multiplies two integers but uses only addition, halving, and doubling operations.

        The algorithm repeatedly halves the multiplier and doubles the multiplicand, adding the multiplicand to
        the result whenever the multiplier is odd.

    Parameters:
        intMultiplier (int): The first number to multiply (will be repeatedly halved)
        intMultiplicand (int): The second number to multiply (will be repeatedly doubled)

    Returns:
        tuple: A tuple containing three elements:
            - intProduct (int): The final multiplication result
            - arrHalving (list): Array showing the halving sequence of the multiplier
            - arrDoubling (list): Array showing the doubling sequence of the multiplicand
    """

    intProduct = 0
    arrHalving = []
    arrDoubling = []

    while intMultiplier > 0:
        # Store current values in arrays
        arrHalving.append(intMultiplier)
        arrDoubling.append(intMultiplicand)

        # If intMultiplier is odd, add intMultiplicand to result
        if intMultiplier % 2 == 1:
            intProduct += intMultiplicand

        intMultiplier >>= 1  #divide by 2
        intMultiplicand <<= 1  #multiply by 2

    return intProduct, arrHalving, arrDoubling