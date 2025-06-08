from pydantic import BaseModel, Field, field_validator
from typing import List, Union, Optional, Any, Dict


class SortRequest(BaseModel):
    array: List[Union[int, float]] = Field(..., description="Array to be sorted")
    ascending: bool = Field(True, description="Sort in ascending order")
    
    @field_validator('array')
    def validate_array(cls, v):
        if len(v) == 0:
            raise ValueError("Array cannot be empty")
        if len(v) > 1000:
            raise ValueError("Array too large (max 1000 elements)")
        return v

class SearchRequest(BaseModel):
    array: List[Union[int, float, str]] = Field(..., description="Array to search in")
    target: Union[int, float, str] = Field(..., description="Element to search for")
    
    @field_validator('array')
    def validate_array(cls, v):
        if len(v) == 0:
            raise ValueError("Array cannot be empty")
        return v

class BinarySearchRequest(BaseModel):
    array: List[Union[int, float]] = Field(..., description="Sorted array to search in")
    target: Union[int, float] = Field(..., description="Element to search for")
    
    @field_validator('array')
    def validate_sorted_array(cls, v):
        if len(v) == 0:
            raise ValueError("Array cannot be empty")
        # Check if array is sorted
        if v != sorted(v):
            raise ValueError("Array must be sorted for binary search")
        return v

class TSPRequest(BaseModel):
    distance_matrix: List[List[Union[int, float]]] = Field(..., description="Distance matrix between cities")
    start_city: int = Field(0, description="Starting city index")
    
    @field_validator('distance_matrix')
    def validate_matrix(cls, v):
        if len(v) > 10:
            raise ValueError("Too many cities (max 10 for demo)")
        
        n = len(v)
        for i, row in enumerate(v):
            if len(row) != n:
                raise ValueError("Distance matrix must be square")
            if v[i][i] != 0:
                raise ValueError("Distance from city to itself must be 0")
        return v

class KnapsackRequest(BaseModel):
    items: List[tuple] = Field(..., description="List of (name, weight, value) tuples")
    capacity: int = Field(..., description="Knapsack capacity", gt=0)
    
    @field_validator('items')
    def validate_items(cls, v):
        if len(v) > 20:
            raise ValueError("Too many items (max 20 for demo)")
        
        for item in v:
            if len(item) != 3:
                raise ValueError("Each item must be (name, weight, value)")
            name, weight, value = item
            if not isinstance(name, str):
                raise ValueError("Item name must be string")
            if not isinstance(weight, (int, float)) or weight <= 0:
                raise ValueError("Item weight must be positive")
            if not isinstance(value, (int, float)) or value <= 0:
                raise ValueError("Item value must be positive")
        return v

class JosephusRequest(BaseModel):
    length: int = Field(..., description="Number of people", gt=0, le=1000)
    interval: int = Field(..., description="Elimination interval", gt=0)

class RussianMultiplyRequest(BaseModel):
    multiplier: int = Field(..., description="First number to multiply")
    multiplicand: int = Field(..., description="Second number to multiply")
    
    @field_validator('multiplier', 'multiplicand')
    def validate_numbers(cls, v):
        if abs(v) > 1000000:
            raise ValueError("Numbers too large for demonstration")
        return v

class LimitationAnalysisRequest(BaseModel):
    algorithm: str = Field(..., description="Algorithm to analyze")
    input_sizes: List[int] = Field(default=[10, 50, 100, 500, 1000], description="Input sizes to test")
    test_type: str = Field(default="performance", description="Type of analysis")

# ===== RESPONSE SCHEMAS =====

class AlgorithmResponse(BaseModel):
    result: Union[List, int, Any]
    steps: Optional[List] = None
    execution_time: float
    algorithm: str
    success: bool = True
    error: Optional[str] = None
    metadata: Optional[Dict] = None

class SearchResponse(BaseModel):
    index: int
    found: bool
    steps: Optional[List] = None
    execution_time: float
    algorithm: str
    comparisons: Optional[int] = None

class TSPResponse(BaseModel):
    optimal_path: List[int]
    min_distance: Union[int, float]
    all_paths: List[tuple]
    execution_time: float
    algorithm: str
    cities_count: int
    total_permutations: int

class KnapsackResponse(BaseModel):
    best_items: List[str]
    best_value: Union[int, float]
    total_weight: Union[int, float]
    all_subsets: List[tuple]
    execution_time: float
    algorithm: str
    items_count: int

class JosephusResponse(BaseModel):
    survivor: int
    elimination_order: List[int]
    execution_time: float
    algorithm: str
    people_count: int

class RussianMultiplyResponse(BaseModel):
    product: int
    halving_sequence: List[int]
    doubling_sequence: List[int]
    execution_time: float
    algorithm: str
    steps_count: int

class LimitationAnalysisResponse(BaseModel):
    algorithm: str
    analysis_type: str
    results: List[Dict]
    summary: Dict
    recommendations: List[str]

class HealthResponse(BaseModel):
    status: str
    message: str
    algorithms_available: int
    timestamp: str

class AlgorithmListResponse(BaseModel):
    brute_force: List[str]
    decrease_and_conquer: List[str]
    optimization: List[str]
    total: int