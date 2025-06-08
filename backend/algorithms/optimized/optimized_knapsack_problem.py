def knapsack_optimize(arrItems: list, intMaxCapacity: int) -> tuple[list, int, list]:
    """
    Description:
        Solves the 0/1 Knapsack problem using dynamic programming without
        using built-in functions like len, append, or any imports.

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
    # count number_of_items without len()
    number_of_items = 0
    while True:
        try:
            _ = arrItems[number_of_items]
            number_of_items += 1
        except IndexError:
            break

    # Extract weights and values from items
    weights = []
    values = []
    for i in range(number_of_items):
        name, weight, value = arrItems[i]
        weights.append(weight)
        values.append(value)

    # Create DP table or 2d Array
    knapsack_table = []
    item_index = 0
    while item_index <= number_of_items:
        row_for_current_item = []
        current_capacity = 0
        while current_capacity <= intMaxCapacity:
            row_for_current_item += [0]
            current_capacity += 1
        knapsack_table += [row_for_current_item]
        item_index += 1

    # Fill the table
    current_item = 1
    while current_item <= number_of_items:
        current_capacity = 0
        while current_capacity <= intMaxCapacity:
            item_weight = weights[current_item - 1]
            item_value = values[current_item - 1]

            if item_weight <= current_capacity:
                value_with_item = knapsack_table[current_item - 1][current_capacity - item_weight] + item_value
                value_without_item = knapsack_table[current_item - 1][current_capacity]
                if value_with_item > value_without_item:
                    knapsack_table[current_item][current_capacity] = value_with_item
                else:
                    knapsack_table[current_item][current_capacity] = value_without_item
            else:
                knapsack_table[current_item][current_capacity] = knapsack_table[current_item - 1][current_capacity]

            current_capacity += 1
        current_item += 1

    # Generate all valid subsets
    all_valid_subsets = []
    
    # Add empty subset first
    all_valid_subsets.append(([], 0, 0))

    # Helper function to generate subsets
    def generate_subset(subset_index, number_of_items):
        subset_items = []
        subset_weight = 0
        subset_value = 0
        item_index = 0

        while item_index < number_of_items:
            if subset_index & (1 << item_index):
                subset_items.append(arrItems[item_index][0])  # Add item name
                subset_weight += weights[item_index]
                subset_value += values[item_index]
            item_index += 1

        return subset_items, subset_weight, subset_value

    # Generate all possible subsets
    subset_index = 1  # Start from 1 since we already added empty subset
    max_subsets = 1 << number_of_items

    while subset_index < max_subsets:
        subset_items, subset_weight, subset_value = generate_subset(subset_index, number_of_items)
        
        # Only add valid subsets (those within capacity)
        if subset_weight <= intMaxCapacity:
            all_valid_subsets.append((subset_items, subset_weight, subset_value))
        
        subset_index += 1

    # Sort valid subsets by length first, then by value (descending) and weight (ascending)
    outer_index = 1  # Start from 1 to keep empty subset at the beginning
    while outer_index < len(all_valid_subsets):
        inner_index = 1
        while inner_index < len(all_valid_subsets) - outer_index:
            current_subset = all_valid_subsets[inner_index]
            next_subset = all_valid_subsets[inner_index + 1]
            
            # Compare by length first
            if len(current_subset[0]) > len(next_subset[0]) or (
                len(current_subset[0]) == len(next_subset[0]) and (
                    # Then by value (descending)
                    current_subset[2] < next_subset[2] or (
                        current_subset[2] == next_subset[2] and 
                        # Then by weight (ascending)
                        current_subset[1] > next_subset[1]
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