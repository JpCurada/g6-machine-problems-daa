def fnSelfOrganizingSearch(arrInput: list, varTarget: any) -> int:
    """
    Description:
        This function implements a self-organizing list search that positions the most 
        frequently searched items at the front of the array to improve sequential search 
        performance. It uses the count method where each element maintains a count of 
        how many times it has been accessed.

    Parameters:
        arrInput (list): The array to search in, can contain any comparable type
        varTarget (any): The target element to search for

    Returns:
        int: Index of the target element in the current state of the list, -1 if not found

    Reference:
        https://www.geeksforgeeks.org/self-organizing-list-count-method/
    """
    import streamlit as st
    
    if not arrInput:
        return -1

    # Get session key for this specific list
    list_id = id(arrInput)
    session_key = f"sol_counts_{list_id}"
    
    # Initialize or retrieve counts from session state
    if session_key not in st.session_state:
        st.session_state[session_key] = {val: 0 for val in arrInput}
    
    # Get the existing counts
    counts = st.session_state[session_key]
    intLength = len(arrInput)
    intIndex = -1

    # Search for the target and update its count
    for i in range(intLength):
        if arrInput[i] == varTarget:
            intIndex = i
            # Update count in session state
            counts[varTarget] = counts.get(varTarget, 0) + 1
            break

    if intIndex == -1:
        return -1

    # Create a list of [value, count] pairs for reorganization
    arrList = [[arrInput[i], counts.get(arrInput[i], 0)] for i in range(intLength)]
    
    # Reorganize list based on access frequency
    while (intIndex > 0 and arrList[intIndex][1] > arrList[intIndex - 1][1]):
        # Swap elements only (counts are already in session state)
        arrList[intIndex], arrList[intIndex - 1] = arrList[intIndex - 1], arrList[intIndex]
        intIndex -= 1

    # Update the original input array to reflect the new order
    for i in range(intLength):
        arrInput[i] = arrList[i][0]
    
    # Update counts in session state with any new values
    st.session_state[session_key] = {arrInput[i]: arrList[i][1] for i in range(intLength)}

    return intIndex

    