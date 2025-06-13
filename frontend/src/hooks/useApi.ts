// frontend-2/src/hooks/useApi.ts
import { useState, useCallback } from 'react';
import { apiClient } from '../services/api';
import type {
  SortRequest,
  SearchRequest,
  BinarySearchRequest,
  TSPRequest,
  KnapsackRequest,
  JosephusRequest,
  RussianMultiplyRequest,
  DijkstraRequest,
  HuffmanRequest,
  MatrixMultiplicationRequest,
  AlgorithmResponse,
  SearchResponse,
  TSPResponse,
  KnapsackResponse,
  JosephusResponse,
  RussianMultiplyResponse,
  DijkstraResponse,
  HuffmanResponse,
  MatrixMultiplicationResponse,
} from '../services/api';

interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

interface UseApiReturn<T> extends UseApiState<T> {
  execute: (...args: any[]) => Promise<T | null>;
  reset: () => void;
}

export function useApi<T>(
  apiFunction: (...args: any[]) => Promise<T>
): UseApiReturn<T> {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const execute = useCallback(
    async (...args: any[]): Promise<T | null> => {
      try {
        setState(prev => ({ ...prev, loading: true, error: null }));
        const result = await apiFunction(...args);
        setState({ data: result, loading: false, error: null });
        return result;
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An error occurred';
        setState({ data: null, loading: false, error: errorMessage });
        return null;
      }
    },
    [apiFunction]
  );

  const reset = useCallback(() => {
    setState({ data: null, loading: false, error: null });
  }, []);

  return { ...state, execute, reset };
}

// Specific hooks for each algorithm - using arrow functions to avoid binding
export const useBubbleSort = () => {
  return useApi<AlgorithmResponse>((data: SortRequest) => apiClient.bubbleSort(data));
};

export const useSelectionSort = () => {
  return useApi<AlgorithmResponse>((data: SortRequest) => apiClient.selectionSort(data));
};

export const useLinearSearch = () => {
  return useApi<SearchResponse>((data: SearchRequest) => apiClient.linearSearch(data));
};

export const useBinarySearch = () => {
  return useApi<SearchResponse>((data: BinarySearchRequest) => apiClient.binarySearch(data));
};

export const useTSPBruteForce = () => {
  return useApi<TSPResponse>((data: TSPRequest) => apiClient.tspBruteForce(data));
};

export const useKnapsackBruteForce = () => {
  return useApi<KnapsackResponse>((data: KnapsackRequest) => apiClient.knapsackBruteForce(data));
};

export const useInsertionSort = () => {
  return useApi<AlgorithmResponse>((data: SortRequest) => apiClient.insertionSort(data));
};

export const useJosephusProblem = () => {
  return useApi<JosephusResponse>((data: JosephusRequest) => apiClient.josephusProblem(data));
};

export const useRussianMultiply = () => {
  return useApi<RussianMultiplyResponse>((data: RussianMultiplyRequest) => apiClient.russianMultiply(data));
};

// NEW ALGORITHM HOOKS
export const useQuickSort = () => {
  return useApi<AlgorithmResponse>((data: SortRequest) => apiClient.quickSort(data));
};

export const useStrassenMultiplication = () => {
  return useApi<MatrixMultiplicationResponse>((data: MatrixMultiplicationRequest) => apiClient.strassenMultiplication(data));
};

export const useDijkstra = () => {
  return useApi<DijkstraResponse>((data: DijkstraRequest) => apiClient.dijkstra(data));
};

export const useHuffmanCoding = () => {
  return useApi<HuffmanResponse>((data: HuffmanRequest) => apiClient.huffmanCoding(data));
};

// Utility hooks
export const useAlgorithmList = () => {
  return useApi(() => apiClient.getAlgorithms());
};

export const useAlgorithmInfo = () => {
  return useApi((algorithm: string) => apiClient.getAlgorithmInfo(algorithm));
};

export const useHealthCheck = () => {
  return useApi(() => apiClient.getHealth());
};