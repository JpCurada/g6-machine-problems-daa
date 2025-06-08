import random
from functools import wraps
import time

def timeit(func):
    @wraps(func)
    def timeit_wrapper(*args, **kwargs):
        start_time = time.perf_counter()
        result = func(*args, **kwargs)
        end_time = time.perf_counter()
        total_time = end_time - start_time
        # first item in the args, ie `args[0]` is `self`
        print(f'Function {func.__name__}{args} {kwargs} Took {total_time:.4f} seconds')
        return result
    return timeit_wrapper

def create_array(self, size, array_type):
    """
    Helper to generate arrays of a given type and size.
    Args:
        size (int): Size of the array.
        array_type (str): 'sorted', 'reverse', or 'random'.
    Returns:
        list: Generated array.
    """
    if array_type == "sorted":
        return list(range(1, size + 1))
    elif array_type == "reverse":
        return list(range(size, 0, -1))
    elif array_type == "random":
        return [random.randint(1, 1000) for _ in range(size)]
    else:
        raise ValueError("array_type must be 'sorted', 'reverse', or 'random'")