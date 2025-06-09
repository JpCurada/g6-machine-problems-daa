import React, { useState, useEffect } from 'react';
import {
    useBubbleSort,
    useSelectionSort,
    useLinearSearch,
    useBinarySearch,
    useTSPBruteForce,
    useKnapsackBruteForce,
    useInsertionSort,
    useJosephusProblem,
    useRussianMultiply
} from '../hooks/useApi';
import ConfigurationSection from '../components/ConfigurationSection';
import InputConfiguration from '../components/InputConfiguration';
import ResultsSection from '../components/ResultsSection';
import '../styles/animations.css';

interface InputField {
    name: string;
    label: string;
    type: 'text' | 'number' | 'array' | 'boolean';
    placeholder?: string;
}

interface ApiResult {
    data: any;
    loading: boolean;
    error: string | null;
}

const SimulationPage: React.FC = () => {
    const [selectedStrategy, setSelectedStrategy] = useState<string>('');
    const [selectedAlgorithm, setSelectedAlgorithm] = useState<string>('');
    const [inputFields, setInputFields] = useState<InputField[]>([]);
    const [inputValues, setInputValues] = useState<{[key: string]: string}>({});
    const [currentResult, setCurrentResult] = useState<ApiResult>({ data: null, loading: false, error: null });
    const [stepIndex, setStepIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    // Initialize all hooks
    const bubbleSort = useBubbleSort();
    const selectionSort = useSelectionSort();
    const linearSearch = useLinearSearch();
    const binarySearch = useBinarySearch();
    const tspBruteForce = useTSPBruteForce();
    const knapsackBruteForce = useKnapsackBruteForce();
    const insertionSort = useInsertionSort();
    const josephusProblem = useJosephusProblem();
    const russianMultiply = useRussianMultiply();

    // Map algorithm names to API hook functions
    const getApiHook = (algorithm: string) => {
        switch (algorithm) {
            case 'Bubble Sort': return bubbleSort;
            case 'Selection Sort': return selectionSort;
            case 'Sequential Search': return linearSearch;
            case 'Binary Search': return binarySearch;
            case 'Travelling Salesman Problem': return tspBruteForce;
            case 'Knapsack Problem': return knapsackBruteForce;
            case 'Insertion Sort': return insertionSort;
            case 'Josephus Problem': return josephusProblem;
            case 'Russian Multiplication Method': return russianMultiply;
            default: return null;
        }
    };

    // Input fields based on selected algorithm
    const getInputFields = (algorithm: string): InputField[] => {
        switch (algorithm) {
            case 'Knapsack Problem':
                return [
                    { name: 'items', label: 'Items (name:weight:value)', type: 'array', placeholder: 'e.g., Item1:10:60,Item2:20:100,Item3:30:120' },
                    { name: 'capacity', label: 'Knapsack Capacity', type: 'number', placeholder: 'e.g., 50' }
                ];
            case 'Travelling Salesman Problem':
                return [
                    { name: 'distance_matrix', label: 'Distance Matrix (semicolon separated rows)', type: 'array', placeholder: 'e.g., 0,10,15,20;10,0,35,25;15,35,0,30;20,25,30,0' },
                    { name: 'start_city', label: 'Starting City Index', type: 'number', placeholder: 'e.g., 0' }
                ];
            case 'Binary Search':
                return [
                    { name: 'array', label: 'Sorted Array', type: 'array', placeholder: 'e.g., 1,3,5,7,9,11' },
                    { name: 'target', label: 'Target Value', type: 'number', placeholder: 'e.g., 7' }
                ];
            case 'Sequential Search':
                return [
                    { name: 'array', label: 'Array to Search', type: 'array', placeholder: 'e.g., 1,3,5,7,9,11' },
                    { name: 'target', label: 'Target Value', type: 'number', placeholder: 'e.g., 7' }
                ];
            case 'Bubble Sort':
            case 'Selection Sort':
            case 'Insertion Sort':
                return [
                    { name: 'array', label: 'Array to Sort', type: 'array', placeholder: 'e.g., 64,34,25,12,22,11,90' },
                    { name: 'ascending', label: 'Sort Order (true=asc, false=desc)', type: 'boolean' }
                ];
            case 'Josephus Problem':
                return [
                    { name: 'length', label: 'Number of People', type: 'number', placeholder: 'e.g., 8' },
                    { name: 'interval', label: 'Elimination Interval', type: 'number', placeholder: 'e.g., 3' }
                ];
            case 'Russian Multiplication Method':
                return [
                    { name: 'multiplier', label: 'First Number', type: 'number', placeholder: 'e.g., 17' },
                    { name: 'multiplicand', label: 'Second Number', type: 'number', placeholder: 'e.g., 19' }
                ];
            default:
                return [
                    { name: 'input', label: 'Input Data', type: 'text', placeholder: 'Enter your input data' }
                ];
        }
    };

    // Transform input data for API
    const transformInputData = (algorithm: string, inputs: {[key: string]: string}) => {
        try {
            switch (algorithm) {
                case 'Bubble Sort':
                case 'Selection Sort':
                case 'Insertion Sort':
                    return {
                        array: inputs.array?.split(',').map((n: string) => parseFloat(n.trim())).filter((n: number) => !isNaN(n)) || [],
                        ascending: inputs.ascending?.toLowerCase() !== 'false'
                    };

                case 'Binary Search':
                    return {
                        array: inputs.array?.split(',').map((n: string) => parseFloat(n.trim())).filter((n: number) => !isNaN(n)) || [],
                        target: parseFloat(inputs.target || '0')
                    };

                case 'Sequential Search':
                    return {
                        array: inputs.array?.split(',').map((n: string) => n.trim()) || [],
                        target: inputs.target?.trim() || ''
                    };

                case 'Travelling Salesman Problem':
                    const matrix = inputs.distance_matrix?.split(';').map((row: string) => 
                        row.split(',').map((n: string) => parseFloat(n.trim())).filter((n: number) => !isNaN(n))
                    ) || [];
                    return {
                        distance_matrix: matrix,
                        start_city: parseInt(inputs.start_city || '0')
                    };

                case 'Knapsack Problem':
                    const items = inputs.items?.split(',').map((item: string) => {
                        const [name, weight, value] = item.split(':');
                        return [name?.trim() || '', parseFloat(weight || '0'), parseFloat(value || '0')] as [string, number, number];
                    }) || [];
                    return {
                        items: items,
                        capacity: parseInt(inputs.capacity || '0')
                    };

                case 'Josephus Problem':
                    return {
                        length: parseInt(inputs.length || '0'),
                        interval: parseInt(inputs.interval || '0')
                    };

                case 'Russian Multiplication Method':
                    return {
                        multiplier: parseInt(inputs.multiplier || '0'),
                        multiplicand: parseInt(inputs.multiplicand || '0')
                    };

                default:
                    return inputs;
            }
        } catch (error) {
            throw new Error('Invalid input format. Please check your data.');
        }
    };

    // Update algorithm options when strategy changes
    useEffect(() => {
        if (selectedStrategy) {
            setSelectedAlgorithm('');
            setInputFields([]);
            setInputValues({});
            setCurrentResult({ data: null, loading: false, error: null });
        }
    }, [selectedStrategy]);

    // Update input fields when algorithm changes
    useEffect(() => {
        if (selectedAlgorithm) {
            const fields = getInputFields(selectedAlgorithm);
            setInputFields(fields);
            const newInputValues: {[key: string]: string} = {};
            fields.forEach(field => {
                newInputValues[field.name] = '';
            });
            setInputValues(newInputValues);
            setCurrentResult({ data: null, loading: false, error: null });
            setStepIndex(0);
        }
    }, [selectedAlgorithm]);

    // Update current result based on active hook
    useEffect(() => {
        const apiHook = getApiHook(selectedAlgorithm);
        if (apiHook) {
            setCurrentResult({
                data: apiHook.data,
                loading: apiHook.loading,
                error: apiHook.error
            });
        }
    }, [
        selectedAlgorithm,
        bubbleSort.data, bubbleSort.loading, bubbleSort.error,
        selectionSort.data, selectionSort.loading, selectionSort.error,
        linearSearch.data, linearSearch.loading, linearSearch.error,
        binarySearch.data, binarySearch.loading, binarySearch.error,
        tspBruteForce.data, tspBruteForce.loading, tspBruteForce.error,
        knapsackBruteForce.data, knapsackBruteForce.loading, knapsackBruteForce.error,
        insertionSort.data, insertionSort.loading, insertionSort.error,
        josephusProblem.data, josephusProblem.loading, josephusProblem.error,
        russianMultiply.data, russianMultiply.loading, russianMultiply.error
    ]);

    const handleInputChange = (fieldName: string, value: string | boolean) => {
        setInputValues(prev => ({
            ...prev,
            [fieldName]: typeof value === 'boolean' ? value.toString() : value
        }));
    };

    const handleSimulate = async () => {
        const apiHook = getApiHook(selectedAlgorithm);
        if (!apiHook) {
            alert('Algorithm not implemented yet');
            return;
        }

        try {
            const transformedData = transformInputData(selectedAlgorithm, inputValues);
            setStepIndex(0);
            await apiHook.execute(transformedData);
        } catch (error) {
            console.error('Simulation error:', error);
        }
    };

    // Animation controls for step visualization
    const startAnimation = () => {
        // Handle different types of animations based on algorithm
        let maxSteps = 0;
        
        if (currentResult.data?.elimination_order) {
            // Josephus Problem
            maxSteps = currentResult.data.elimination_order.length - 1;
        } else if (currentResult.data?.steps) {
            // Sorting algorithms
            maxSteps = currentResult.data.steps.length - 1;
        } else {
            return; // No animation data available
        }
        
        setIsAnimating(true);
        setStepIndex(0);
        
        const interval = setInterval(() => {
            setStepIndex(prev => {
                if (prev >= maxSteps) {
                    clearInterval(interval);
                    setIsAnimating(false);
                    return prev;
                }
                return prev + 1;
            });
        }, 1000); // 1 second per step for better visibility

        // Cleanup interval on component unmount
        return () => clearInterval(interval);
    };

    const resetAnimation = () => {
        setStepIndex(0);
        setIsAnimating(false);
    };

    // Update step index when data changes
    useEffect(() => {
        if (currentResult.data) {
            setStepIndex(0);
            setIsAnimating(false);
        }
    }, [currentResult.data]);

    // Ensure animation stops when switching algorithms
    useEffect(() => {
        setIsAnimating(false);
        setStepIndex(0);
    }, [selectedAlgorithm]);

    return (
        <div className="bg-slate-800 text-white min-h-screen">
            <div className="container mx-auto px-4 py-8">
                <div className="grid lg:grid-cols-8 gap-6 h-full">
                    {/* Left Section - Strategy and Algorithm Selection */}
                    <div className="lg:col-span-3">
                        <ConfigurationSection
                            selectedStrategy={selectedStrategy}
                            setSelectedStrategy={setSelectedStrategy}
                            selectedAlgorithm={selectedAlgorithm}
                            setSelectedAlgorithm={setSelectedAlgorithm}
                            isLoading={currentResult.loading}
                        />

                        <InputConfiguration
                            selectedAlgorithm={selectedAlgorithm}
                            inputFields={inputFields}
                            inputValues={inputValues}
                            handleInputChange={handleInputChange}
                            handleSimulate={handleSimulate}
                            isLoading={currentResult.loading}
                        />
                    </div>

                    {/* Right section - Results/Visualization */}
                    <div className="lg:col-span-5">
                        <div className="bg-gradient-to-br from-teal-600 to-teal-700 rounded-lg p-6 h-full shadow-2xl">
                            <div className="flex items-center mb-6">
                                <div className="bg-white bg-opacity-20 rounded-full p-2 mr-3">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                    </svg>
                                </div>
                                <h2 className="text-xl font-semibold text-white">RESULTS & VISUALIZATION</h2>
                                {currentResult.data && (
                                    <div className="ml-auto">
                                        <div className="flex items-center text-green-300 text-sm">
                                            <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                                            Live
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6 overflow-auto custom-scrollbar">
                                <ResultsSection
                                    selectedAlgorithm={selectedAlgorithm}
                                    currentResult={currentResult}
                                    stepIndex={stepIndex}
                                    isAnimating={isAnimating}
                                    startAnimation={startAnimation}
                                    resetAnimation={resetAnimation}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SimulationPage;