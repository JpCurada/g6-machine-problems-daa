const API_BASE_URL = import.meta.env.PROD 
  ? 'https://mp-prod-g6.railway.app/api'  
  : 'http://localhost:8000/api';

export interface SortRequest {
  array: number[];
  ascending: boolean;
}

export interface SearchRequest {
  array: (number | string)[];
  target: number | string;
}

export interface BinarySearchRequest {
  array: number[];
  target: number;
}

export interface TSPRequest {
  distance_matrix: number[][];
  start_city: number;
}

export interface KnapsackRequest {
  items: [string, number, number][]; // [name, weight, value]
  capacity: number;
}

export interface JosephusRequest {
  length: number;
  interval: number;
}

export interface RussianMultiplyRequest {
  multiplier: number;
  multiplicand: number;
}

// NEW REQUEST TYPES
export interface DijkstraRequest {
  graph_data: {
    vertices: string[];
    edges: [string, string, number][];
  };
  start_vertex: string;
}

export interface HuffmanRequest {
  message: string;
}

export interface MatrixMultiplicationRequest {
  matrix_a: number[][];
  matrix_b: number[][];
  method: string;
}

// Response types
export interface AlgorithmResponse {
  result: any;
  steps?: any[];
  execution_time: number;
  algorithm: string;
  success: boolean;
  error?: string;
  metadata?: any;
}

export interface SearchResponse {
  index: number;
  found: boolean;
  steps?: any[];
  execution_time: number;
  algorithm: string;
  comparisons?: number;
  array?: (number | string)[];
  target?: number | string;
}

export interface TSPResponse {
  optimal_path: number[];
  min_distance: number;
  all_paths: [number[], number][];
  execution_time: number;
  algorithm: string;
  cities_count: number;
  total_permutations: number;
}

export interface KnapsackResponse {
  best_items: string[];
  best_value: number;
  total_weight: number;
  all_subsets: [string[], number, number][];
  execution_time: number;
  algorithm: string;
  items_count: number;
}

export interface JosephusResponse {
  survivor: number;
  elimination_order: number[];
  execution_time: number;
  algorithm: string;
  people_count: number;
}

export interface RussianMultiplyResponse {
  product: number;
  halving_sequence: number[];
  doubling_sequence: number[];
  execution_time: number;
  algorithm: string;
  steps_count: number;
  multiplier: number;
  multiplicand: number;
}

// NEW RESPONSE TYPES
export interface DijkstraResponse {
  distances: Record<string, number>;
  paths: Record<string, string[]>;
  steps: string[];
  execution_time: number;
  algorithm: string;
  start_vertex: string;
  vertices_count: number;
}

export interface HuffmanResponse {
  codes: Record<string, string>;
  encoded_message: string;
  character_frequencies: Record<string, number>;
  steps: string[];
  execution_time: number;
  algorithm: string;
  original_length: number;
  encoded_length: number;
  compression_ratio: number;
}

export interface MatrixMultiplicationResponse {
  result_matrix: number[][];
  steps: string[];
  execution_time: number;
  algorithm: string;
  method: string;
  matrix_size: number;
  operations_count?: number;
}

// API Client class
class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ detail: 'Network error' }));
      throw new Error(error.detail || `HTTP ${response.status}: ${response.statusText}`);
    }

    return response.json();
  }

  // Brute Force Algorithms
  async bubbleSort(data: SortRequest): Promise<AlgorithmResponse> {
    return this.request<AlgorithmResponse>('/brute-force/bubble-sort', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async selectionSort(data: SortRequest): Promise<AlgorithmResponse> {
    return this.request<AlgorithmResponse>('/brute-force/selection-sort', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async linearSearch(data: SearchRequest): Promise<SearchResponse> {
    return this.request<SearchResponse>('/brute-force/linear-search', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async tspBruteForce(data: TSPRequest): Promise<TSPResponse> {
    return this.request<TSPResponse>('/brute-force/tsp', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async knapsackBruteForce(data: KnapsackRequest): Promise<KnapsackResponse> {
    return this.request<KnapsackResponse>('/brute-force/knapsack', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Decrease and Conquer Algorithms
  async binarySearch(data: BinarySearchRequest): Promise<SearchResponse> {
    return this.request<SearchResponse>('/decrease-conquer/binary-search', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async insertionSort(data: SortRequest): Promise<AlgorithmResponse> {
    return this.request<AlgorithmResponse>('/decrease-conquer/insertion-sort', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async josephusProblem(data: JosephusRequest): Promise<JosephusResponse> {
    return this.request<JosephusResponse>('/decrease-conquer/josephus', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async russianMultiply(data: RussianMultiplyRequest): Promise<RussianMultiplyResponse> {
    return this.request<RussianMultiplyResponse>('/decrease-conquer/russian-multiply', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Divide and Conquer Algorithms
  async quickSort(data: SortRequest): Promise<AlgorithmResponse> {
    return this.request<AlgorithmResponse>('/divide-conquer/quick-sort', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async strassenMultiplication(data: MatrixMultiplicationRequest): Promise<MatrixMultiplicationResponse> {
    return this.request<MatrixMultiplicationResponse>('/divide-conquer/strassen-multiplication', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Greedy Algorithms
  async dijkstra(data: DijkstraRequest): Promise<DijkstraResponse> {
    return this.request<DijkstraResponse>('/greedy/dijkstra', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async huffmanCoding(data: HuffmanRequest): Promise<HuffmanResponse> {
    return this.request<HuffmanResponse>('/greedy/huffman-coding', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Utility endpoints
  async getAlgorithms() {
    return this.request('/algorithms');
  }

  async getAlgorithmInfo(algorithm: string) {
    return this.request(`/algorithms/${algorithm}/info`);
  }

  async getHealth() {
    return this.request('/health');
  }
}

// Export singleton instance
export const apiClient = new ApiClient();
export default apiClient;