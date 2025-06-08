def dynamic_programming_knapsack(arrItems: list, intMaxCapacity: int) -> tuple[list, int, list]:
    """
    Description:
        This function solves the Knapsack Problem using a dynamic programming approach. 
        It creates a 2d table where each cell represents the best value achievable 
        using a subset of items within a given capacity.

    Parameters:
        arrItems (list): List of tuples (name: str, weight: int, value: int)
        intMaxCapacity (int): Maximum weight capacity of knapsack

    Returns:
        tuple: A tuple containing:
            - list: Names of items in the best combination
            - int: Total value of the best combination
            - list: All valid combinations with their weights and values as (items, weight, value)

    References:
        https://www.geeksforgeeks.org/0-1-knapsack-problem-dp-10/
    """
    # Extract item properties
    length = len(arrItems)
    weights = [item[1] for item in arrItems]  # weight is second element
    values = [item[2] for item in arrItems]   # value is third element
    all_valid_subsets = []

    # Add empty subset first
    all_valid_subsets.append(([], 0, 0))

    # Generate all possible subsets using bit manipulation
    max_subsets = 1 << length
    subset_index = 1  # Start from 1 since we already added empty subset

    while subset_index < max_subsets:
        current_subset = []
        current_weight = 0
        current_value = 0
        item_index = 0

        # Check each bit position
        while item_index < length:
            if subset_index & (1 << item_index):
                current_subset.append(arrItems[item_index][0])  # Add item name
                current_weight += weights[item_index]
                current_value += values[item_index]
            item_index += 1

        # Add valid subsets to the list
        if current_weight <= intMaxCapacity:
            all_valid_subsets.append((current_subset, current_weight, current_value))

        subset_index += 1

    # Sort valid subsets by length first, then by value (descending) and weight (ascending)
    outer_index = 1  # Start from 1 to keep empty subset at the beginning
    while outer_index < len(all_valid_subsets):
        inner_index = 1
        while inner_index < len(all_valid_subsets) - outer_index:
            current = all_valid_subsets[inner_index]
            next_subset = all_valid_subsets[inner_index + 1]
            
            # Compare by length first
            if len(current[0]) > len(next_subset[0]) or (
                len(current[0]) == len(next_subset[0]) and (
                    # Then by value (descending)
                    current[2] < next_subset[2] or (
                        current[2] == next_subset[2] and 
                        # Then by weight (ascending)
                        current[1] > next_subset[1]
                    )
                )
            ):
                all_valid_subsets[inner_index], all_valid_subsets[inner_index + 1] = (
                    all_valid_subsets[inner_index + 1], all_valid_subsets[inner_index]
                )
            inner_index += 1
        outer_index += 1

    # Get the optimal solution (highest value subset)
    best_subset = []
    best_value = 0
    
    # Find the best non-empty subset
    for subset, weight, value in all_valid_subsets:
        if len(subset) > 0 and value > best_value:
            best_subset = subset
            best_value = value

    return best_subset, best_value, all_valid_subsets
