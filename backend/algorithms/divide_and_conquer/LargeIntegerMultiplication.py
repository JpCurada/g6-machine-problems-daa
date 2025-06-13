def get_string_length(s):
    """Manual string length calculation without len()"""
    count = 0
    for char in s:
        count = count + 1
    return count


def get_max_value(a, b):
    """Manual max function without max()"""
    if a > b:
        return a
    else:
        return b


def pad_string_with_zeros(s, target_length):
    """Manual string padding without zfill()"""
    current_length = get_string_length(s)
    if current_length >= target_length:
        return s
    
    zeros_needed = target_length - current_length
    result = ""
    
    # Add zeros at the beginning
    i = 0
    while i < zeros_needed:
        result = result + "0"
        i = i + 1
    
    # Add original string
    result = result + s
    return result


def string_to_integer(s):
    """Manual string to integer conversion without int()"""
    if s == "":
        return 0
    
    result = 0
    i = 0
    while i < get_string_length(s):
        digit_char = s[i]
        # Convert character to digit manually
        if digit_char == "0":
            digit = 0
        elif digit_char == "1":
            digit = 1
        elif digit_char == "2":
            digit = 2
        elif digit_char == "3":
            digit = 3
        elif digit_char == "4":
            digit = 4
        elif digit_char == "5":
            digit = 5
        elif digit_char == "6":
            digit = 6
        elif digit_char == "7":
            digit = 7
        elif digit_char == "8":
            digit = 8
        elif digit_char == "9":
            digit = 9
        else:
            digit = 0
        
        result = result * 10 + digit
        i = i + 1
    
    return result


def integer_to_string(num):
    """Manual integer to string conversion without str()"""
    if num == 0:
        return "0"
    
    if num < 0:
        is_negative = True
        num = -num
    else:
        is_negative = False
    
    result = ""
    while num > 0:
        digit = num % 10
        # Convert digit to character manually
        if digit == 0:
            char = "0"
        elif digit == 1:
            char = "1"
        elif digit == 2:
            char = "2"
        elif digit == 3:
            char = "3"
        elif digit == 4:
            char = "4"
        elif digit == 5:
            char = "5"
        elif digit == 6:
            char = "6"
        elif digit == 7:
            char = "7"
        elif digit == 8:
            char = "8"
        elif digit == 9:
            char = "9"
        
        result = char + result
        num = num // 10
    
    if is_negative:
        result = "-" + result
    
    return result


def get_substring(s, start, end):
    """Manual substring extraction without slice notation"""
    result = ""
    i = start
    while i < end and i < get_string_length(s):
        result = result + s[i]
        i = i + 1
    return result


def power_of_ten(exponent):
    """Manual power of 10 calculation without **"""
    result = 1
    i = 0
    while i < exponent:
        result = result * 10
        i = i + 1
    return result


def print_time_complexity_analysis():
    """Print detailed time complexity analysis"""
    print("")
    print("🔍 TIME COMPLEXITY ANALYSIS:")
    print("=" * 60)
    print("")
    print("MANUAL IMPLEMENTATIONS vs BUILT-IN FUNCTIONS:")
    print("")
    print("1. String Operations:")
    print("   • get_string_length(s): O(n) vs len(s): O(1)")
    print("   • pad_string_with_zeros(): O(n) vs s.zfill(): O(n)")
    print("   • get_substring(): O(n) vs s[i:j]: O(n)")
    print("")
    print("2. Type Conversions:")
    print("   • string_to_integer(): O(n) vs int(s): O(n)")
    print("   • integer_to_string(): O(log n) vs str(n): O(log n)")
    print("")
    print("3. Multiplication Algorithms:")
    print("   • Grade School Method: O(n²) where n = number of digits")
    print("   • Karatsuba Method: O(n^1.585) ≈ O(n^log₂3)")
    print("   • Python's built-in (*): O(n log n log log n) for very large numbers")
    print("                           O(n²) for smaller numbers (grade school)")
    print("")
    print("4. Power Calculation:")
    print("   • power_of_ten(): O(n) vs 10**n: O(log n)")
    print("")
    print("EFFICIENCY COMPARISON:")
    print("• Built-in functions are highly optimized C implementations")
    print("• Manual implementations have Python interpreter overhead")
    print("• For educational purposes: Manual shows algorithm clearly")
    print("• For production: Always use built-in functions")
    print("")


def karatsuba_step_by_step_solution(x, y):
    """
    Karatsuba multiplication with detailed mathematical formatting
    Time Complexity: O(n^log₂3) ≈ O(n^1.585)
    """
    print(integer_to_string(x) + " × " + integer_to_string(y))
    print("")
    
    # Convert to strings manually for splitting
    str_x = integer_to_string(x)
    str_y = integer_to_string(y)
    
    # Get lengths and pad to 2 digits for simple case
    len_x = get_string_length(str_x)
    len_y = get_string_length(str_y)
    
    if len_x <= 2 and len_y <= 2:
        # Pad both to 2 digits
        str_x = pad_string_with_zeros(str_x, 2)
        str_y = pad_string_with_zeros(str_y, 2)
        m = 1  # Single digit split
    else:
        # For larger numbers, use even split
        max_len = get_max_value(len_x, len_y)
        if max_len % 2 == 1:
            max_len = max_len + 1
        str_x = pad_string_with_zeros(str_x, max_len)
        str_y = pad_string_with_zeros(str_y, max_len)
        m = max_len // 2
    
    # Split the numbers
    if m == 1:
        A1 = string_to_integer(get_substring(str_x, 0, 1))  # First digit
        A0 = string_to_integer(get_substring(str_x, 1, 2))  # Second digit  
        B1 = string_to_integer(get_substring(str_y, 0, 1))  # First digit
        B0 = string_to_integer(get_substring(str_y, 1, 2))  # Second digit
    else:
        A1 = string_to_integer(get_substring(str_x, 0, m))
        A0 = string_to_integer(get_substring(str_x, m, get_string_length(str_x)))
        B1 = string_to_integer(get_substring(str_y, 0, m))
        B0 = string_to_integer(get_substring(str_y, m, get_string_length(str_y)))
    
    # Display the split like handwritten format
    print("n = " + integer_to_string(m) + " (# of digits)")
    print("A = " + integer_to_string(x))
    print("B = " + integer_to_string(y))
    print("")
    print("    A₁  A₀      B₁  B₀")
    print("    " + integer_to_string(A1) + "   " + integer_to_string(A0) + "      " + integer_to_string(B1) + "   " + integer_to_string(B0))
    print("")
    
    # Calculate C2, C0, C1 with detailed steps
    C2 = A1 * B1
    C0 = A0 * B0
    sum_A = A1 + A0
    sum_B = B1 + B0
    C1_product = sum_A * sum_B
    
    print("Get C₂, C₁, and C₀")
    print("")
    print("C₂ = A₁ × B₁ ——————→ " + integer_to_string(A1) + " × " + integer_to_string(B1) + " = " + integer_to_string(C2))
    print("C₀ = A₀ × B₀ ——————→ " + integer_to_string(A0) + " × " + integer_to_string(B0) + " = " + integer_to_string(C0))
    print("")
    print("For C₁:")
    print("C₁ = (A₁ + A₀) × (B₁ + B₀) - (C₂ + C₀)")
    print("   = (" + integer_to_string(A1) + " + " + integer_to_string(A0) + ") × (" + integer_to_string(B1) + " + " + integer_to_string(B0) + ") - (" + integer_to_string(C2) + " + " + integer_to_string(C0) + ")")
    print("   = " + integer_to_string(sum_A) + " × " + integer_to_string(sum_B) + " - " + integer_to_string(C2 + C0))
    print("   = " + integer_to_string(C1_product) + " - " + integer_to_string(C2 + C0))
    
    # Calculate C1 using the explicit formula
    C1 = C1_product - (C2 + C0)
    print("   = " + integer_to_string(C1))
    print("")
    
    # Final calculation with powers of 10
    power_2m = power_of_ten(2 * m)
    power_m = power_of_ten(m)
    
    term_C2 = C2 * power_2m
    term_C1 = C1 * power_m
    result = term_C2 + term_C1 + C0
    
    print("        C = C₂ × 10^" + integer_to_string(2*m) + " + C₁ × 10^" + integer_to_string(m) + " + C₀")
    print("          = " + integer_to_string(C2) + " × " + integer_to_string(power_2m) + " + " + integer_to_string(C1) + " × " + integer_to_string(power_m) + " + " + integer_to_string(C0))
    print("          = " + integer_to_string(term_C2) + " + " + integer_to_string(term_C1) + " + " + integer_to_string(C0))
    print("          = " + integer_to_string(result))
    
    # Box the final answer like in handwritten
    print("")
    print("┌" + "─" * (get_string_length(integer_to_string(result)) + 2) + "┐")
    print("│ " + integer_to_string(result) + " │")
    print("└" + "─" * (get_string_length(integer_to_string(result)) + 2) + "┘")
    
    # Show verification
    direct_result = x * y
    print("")
    print("Verification: " + integer_to_string(x) + " × " + integer_to_string(y) + " = " + integer_to_string(direct_result))
    
    if result == direct_result:
        print("✓ Correct!")
    else:
        print("✗ Error in calculation")
    
    return result

def karatsuba_step_by_step(x, y):
    """Wrapper to maintain compatibility with existing code"""
    return karatsuba_step_by_step_solution(x, y)


def grade_school_multiply_manual(x, y):
    """
    Manual grade school multiplication without built-in functions
    Time Complexity: O(n²) where n = number of digits
    """
    print("Grade School Algorithm Complexity: O(n²) where n = number of digits")
    
    if x == 0 or y == 0:
        return 0
    
    # Handle sign manually
    is_negative = False
    if x < 0 and y >= 0:
        is_negative = True
        x = -x
    elif x >= 0 and y < 0:
        is_negative = True
        y = -y
    elif x < 0 and y < 0:
        x = -x
        y = -y
    
    # Convert to strings and reverse for easier processing
    str_x = integer_to_string(x)
    str_y = integer_to_string(y)
    
    len_x = get_string_length(str_x)
    len_y = get_string_length(str_y)
    
    print("Multiplying " + integer_to_string(len_x) + "-digit × " + integer_to_string(len_y) + "-digit numbers")
    print("Expected operations: ~" + integer_to_string(len_x * len_y) + " digit multiplications")
    
    # Create result array manually
    result_size = len_x + len_y
    result = []
    i = 0
    while i < result_size:
        result = result + [0]
        i = i + 1
    
    # Multiply each digit manually
    i = len_x - 1  # Start from rightmost digit of x
    while i >= 0:
        j = len_y - 1  # Start from rightmost digit of y
        while j >= 0:
            # Get digits manually
            digit_x = string_to_integer(get_substring(str_x, i, i + 1))
            digit_y = string_to_integer(get_substring(str_y, j, j + 1))
            
            mul = digit_x * digit_y
            pos = (len_x - 1 - i) + (len_y - 1 - j)
            result[pos] = result[pos] + mul
            
            # Handle carry manually
            if result[pos] >= 10:
                carry = result[pos] // 10
                result[pos] = result[pos] % 10
                if pos + 1 < result_size:
                    result[pos + 1] = result[pos + 1] + carry
            
            j = j - 1
        i = i - 1
    
    # Convert result array back to integer manually
    final_result = 0
    i = result_size - 1
    while i >= 0:
        final_result = final_result * 10 + result[i]
        i = i - 1
    
    if is_negative:
        final_result = -final_result
    
    return final_result


def manual_operation_counter():
    """Simple operation counter for complexity demonstration"""
    print("")
    print("⚡ COMPLEXITY DEMONSTRATION:")
    print("=" * 40)
    print("For multiplication of n-digit numbers:")
    print("")
    print("Grade School Method:")
    print("• 2-digit × 2-digit: ~4 single-digit multiplications")
    print("• 3-digit × 3-digit: ~9 single-digit multiplications") 
    print("• 4-digit × 4-digit: ~16 single-digit multiplications")
    print("• Pattern: n² operations")
    print("")
    print("Karatsuba Method:")
    print("• 2-digit × 2-digit: 3 multiplications (instead of 4)")
    print("• 4-digit × 4-digit: 9 multiplications (instead of 16)")
    print("• 8-digit × 8-digit: 27 multiplications (instead of 64)")
    print("• Pattern: 3^(log₂n) = n^(log₂3) ≈ n^1.585 operations")
    print("")
    print("Built-in Python Multiplication:")
    print("• Uses optimized C implementations")
    print("• Switches algorithms based on number size")
    print("• No Python interpreter overhead per operation")
    print("• Hardware-level optimizations available")


def get_user_input():
    """Get valid integer input from user"""
    while True:
        try:
            user_input = input()
            # Manual validation - check if input contains only digits and optional minus sign
            if user_input == "":
                print("Please enter a number: ")
                continue
            
            is_valid = True
            start_index = 0
            
            # Check for negative sign
            if user_input[0] == "-":
                if get_string_length(user_input) == 1:
                    is_valid = False
                else:
                    start_index = 1
            
            # Check if remaining characters are digits
            if is_valid:
                i = start_index
                while i < get_string_length(user_input):
                    char = user_input[i]
                    if not (char >= "0" and char <= "9"):
                        is_valid = False
                        break
                    i = i + 1
            
            if is_valid:
                return string_to_integer(user_input)
            else:
                print("Invalid input. Please enter a valid integer: ")
        except:
            print("Invalid input. Please enter a valid integer: ")


def display_menu():
    """Display the main menu options"""
    print("")
    print("MULTIPLICATION ALGORITHM DEMONSTRATOR")
    print("=" * 50)
    print("1. Karatsuba Multiplication (Step-by-step)")
    print("2. Grade School Multiplication")
    print("3. Compare Both Methods")
    print("4. View Time Complexity Analysis")
    print("5. Exit")
    print("")
    print("Enter your choice (1-5): ")


def run_karatsuba_demo():
    """Run Karatsuba multiplication with user input"""
    print("")
    print("KARATSUBA MULTIPLICATION DEMO")
    print("=" * 40)
    print("Enter first number: ")
    x = get_user_input()
    print("Enter second number: ")
    y = get_user_input()
    
    print("")
    result = karatsuba_step_by_step(x, y)
    return result


def run_grade_school_demo():
    """Run grade school multiplication with user input"""
    print("")
    print("GRADE SCHOOL MULTIPLICATION DEMO")
    print("=" * 40)
    print("Enter first number: ")
    x = get_user_input()
    print("Enter second number: ")
    y = get_user_input()
    
    print("")
    result = grade_school_multiply_manual(x, y)
    print("Grade school result: " + integer_to_string(result))
    print("Built-in verification: " + integer_to_string(x * y))
    
    if result == x * y:
        print("Results match!")
    else:
        print("Results don't match!")
    
    return result


def run_comparison_demo():
    """Compare both methods with user input"""
    print("")
    print("ALGORITHM COMPARISON")
    print("=" * 40)
    print("Enter first number: ")
    x = get_user_input()
    print("Enter second number: ")
    y = get_user_input()
    
    # Calculate digits for complexity estimation
    digits_x = get_string_length(integer_to_string(abs(x)))
    digits_y = get_string_length(integer_to_string(abs(y)))
    max_digits = get_max_value(digits_x, digits_y)
    
    print("")
    print("COMPLEXITY ANALYSIS FOR YOUR NUMBERS:")
    print("First number has " + integer_to_string(digits_x) + " digits")
    print("Second number has " + integer_to_string(digits_y) + " digits")
    print("Expected operations:")
    print("• Grade School: ~" + integer_to_string(digits_x * digits_y) + " single-digit multiplications")
    
    # Rough estimate for Karatsuba
    karatsuba_ops = 1
    temp_digits = max_digits
    while temp_digits > 1:
        karatsuba_ops = karatsuba_ops * 3
        temp_digits = temp_digits // 2
    print("• Karatsuba: ~" + integer_to_string(karatsuba_ops) + " operations")
    
    print("")
    print("RUNNING BOTH ALGORITHMS:")
    print("")
    
    # Run Karatsuba
    print("1️ KARATSUBA METHOD:")
    karatsuba_result = karatsuba_step_by_step(x, y)
    
    print("")
    print("2️ GRADE SCHOOL METHOD:")
    grade_school_result = grade_school_multiply_manual(x, y)
    print("Grade school result: " + integer_to_string(grade_school_result))
    
    print("")
    print("COMPARISON SUMMARY:")
    print("Karatsuba result:    " + integer_to_string(karatsuba_result))
    print("Grade school result: " + integer_to_string(grade_school_result))
    print("Built-in result:     " + integer_to_string(x * y))
    
    if karatsuba_result == grade_school_result == x * y:
        print("All methods produce the same result!")
    else:
        print("Results differ - there may be an implementation error")


def main():
    """Main program loop"""
    print("Welcome to the Multiplication Algorithm Learning Tool!")
    print("This program demonstrates different multiplication algorithms without using built-in functions.")
    
    while True:
        display_menu()
        choice_input = input()
        
        if choice_input == "1":
            run_karatsuba_demo()
        elif choice_input == "2":
            run_grade_school_demo()
        elif choice_input == "3":
            run_comparison_demo()
        elif choice_input == "4":
            print_time_complexity_analysis()
            manual_operation_counter()
        elif choice_input == "5":
            print("")
            print("🎯 KEY TAKEAWAYS:")
            print("• Karatsuba reduces multiplications from n² to ~n^1.585")
            print("• Built-in functions use highly optimized algorithms")
            print("• Manual implementations are great for learning algorithms")
            print("• For production code, always prefer built-in functions")
            break
        else:
            print("Invalid choice. Please enter 1, 2, 3, 4, or 5.")
        
        print("")
        print("Press Enter a number to continue (1-5): ")
        input()


# Run the interactive program
if __name__ == "__main__":
    main()