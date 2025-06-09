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

interface AlgorithmOptions {
    [key: string]: string[];
}

interface InputField {
    name: string;
    label: string;
    type: 'text' | 'number' | 'array';
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

    // Algorithm options based on strategy
    const algorithmOptions: AlgorithmOptions = {
        'brute-force': [
            'Selection Sort',
            'Bubble Sort',
            'Sequential Search',
            'Travelling Salesman Problem',
            'Knapsack Problem'
        ],
        'decrease-conquer': [
            'Insertion Sort',
            'Binary Search',
            'Russian Multiplication Method',
            'Josephus Problem'
        ],
        'greedy': [
            'Dijkstra\'s Algorithm',
            'Strassen\'s Matrix Multiplication'
        ],
        'divide-conquer': [
            'Merge Sort',
            'Quick Sort',
            'Binary Search Tree',
        ]
    };

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
                    { name: 'ascending', label: 'Sort Order (true=asc, false=desc)', type: 'text', placeholder: 'true' }
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

    const handleInputChange = (fieldName: string, value: string) => {
        setInputValues(prev => ({
            ...prev,
            [fieldName]: value
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
            await apiHook.execute(transformedData);
        } catch (error) {
            console.error('Simulation error:', error);
        }
    };

    const renderResults = () => {
        if (currentResult.loading) {
            return (
                <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
                        <p className="text-white">Running simulation...</p>
                    </div>
                </div>
            );
        }

        if (currentResult.error) {
            return (
                <div className="bg-red-500 bg-opacity-20 border border-red-400 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-red-200 mb-2">Error</h3>
                    <p className="text-red-100">{currentResult.error}</p>
                </div>
            );
        }

        if (!currentResult.data) {
            return (
                <div className="text-white">
                    <h3 className="text-lg font-semibold mb-3">{selectedAlgorithm}</h3>
                    <div className="space-y-2 text-sm">
                        <p><strong>Strategy:</strong> {selectedStrategy.replace('-', ' ').toUpperCase()}</p>
                        <p><strong>Algorithm:</strong> {selectedAlgorithm}</p>
                        <p className="mt-4 text-gray-200">Configure inputs and click "Start Simulation" to see results.</p>
                    </div>
                </div>
            );
        }

        const data = currentResult.data;

        return (
            <div className="text-white space-y-4">
                <div className="border-b border-white border-opacity-20 pb-3">
                    <h3 className="text-lg font-semibold text-teal-200">{selectedAlgorithm} - Results</h3>
                    <p className="text-sm text-gray-300">Execution Time: {data.execution_time?.toFixed(2)}ms</p>
                </div>

                {/* Algorithm-specific result rendering */}
                {selectedAlgorithm.includes('Sort') && (
                    <div>
                        <h4 className="font-semibold mb-2">Sorted Array:</h4>
                        <div className="flex flex-wrap gap-2 mb-3">
                            {data.result?.map((num: any, index: number) => (
                                <span key={index} className="bg-teal-500 px-2 py-1 rounded text-sm">
                                    {num}
                                </span>
                            ))}
                        </div>
                        {data.steps && (
                            <div>
                                <h4 className="font-semibold mb-2">Steps: {data.steps.length}</h4>
                                <div className="max-h-32 overflow-y-auto text-xs space-y-1">
                                    {data.steps.slice(0, 5).map((step: any, index: number) => (
                                        <div key={index} className="text-gray-300">
                                            Step {index + 1}: [{step.join(', ')}]
                                        </div>
                                    ))}
                                    {data.steps.length > 5 && (
                                        <div className="text-gray-400">... and {data.steps.length - 5} more steps</div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {selectedAlgorithm.includes('Search') && (
                    <div>
                        <h4 className="font-semibold mb-2">Search Result:</h4>
                        <p className={`text-lg ${data.found ? 'text-green-300' : 'text-red-300'}`}>
                            {data.found ? `Found at index ${data.index}` : 'Not found'}
                        </p>
                        {data.comparisons && (
                            <p className="text-sm text-gray-300">Comparisons: {data.comparisons}</p>
                        )}
                    </div>
                )}

                {selectedAlgorithm === 'Travelling Salesman Problem' && (
                    <div>
                        <h4 className="font-semibold mb-2">Optimal Tour:</h4>
                        <p className="text-green-300 mb-2">Distance: {data.min_distance}</p>
                        <div className="flex flex-wrap gap-1 mb-3">
                            {data.optimal_path?.map((city: number, index: number) => (
                                <span key={index} className="bg-blue-500 px-2 py-1 rounded text-sm">
                                    {city}
                                </span>
                            ))}
                        </div>
                        <p className="text-xs text-gray-300">
                            Evaluated {data.total_permutations} permutations
                        </p>
                    </div>
                )}

                {selectedAlgorithm === 'Knapsack Problem' && (
                    <div>
                        <h4 className="font-semibold mb-2">Best Selection:</h4>
                        <p className="text-green-300 mb-2">Value: {data.best_value} | Weight: {data.total_weight}</p>
                        <div className="space-y-1">
                            {data.best_items?.map((item: string, index: number) => (
                                <div key={index} className="bg-purple-500 px-2 py-1 rounded text-sm inline-block mr-2">
                                    {item}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {selectedAlgorithm === 'Josephus Problem' && (
                    <div>
                        <h4 className="font-semibold mb-2">Survivor:</h4>
                        <p className="text-green-300 text-lg mb-3">Person #{data.survivor}</p>
                        <h4 className="font-semibold mb-2">Elimination Order:</h4>
                        <div className="text-xs text-gray-300 max-h-20 overflow-y-auto">
                            {data.elimination_order?.join(' → ')}
                        </div>
                    </div>
                )}

                {selectedAlgorithm === 'Russian Multiplication Method' && (
                    <div>
                        <h4 className="font-semibold mb-2">Result:</h4>
                        <p className="text-green-300 text-lg mb-3">{data.product}</p>
                        <div className="grid grid-cols-2 gap-4 text-xs">
                            <div>
                                <h5 className="font-semibold mb-1">Halving:</h5>
                                <div className="text-gray-300">{data.halving_sequence?.join(' → ')}</div>
                            </div>
                            <div>
                                <h5 className="font-semibold mb-1">Doubling:</h5>
                                <div className="text-gray-300">{data.doubling_sequence?.join(' → ')}</div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Metadata */}
                {data.metadata && (
                    <div className="border-t border-white border-opacity-20 pt-3">
                        <h4 className="font-semibold mb-2 text-sm">Additional Info:</h4>
                        <div className="text-xs text-gray-300 space-y-1">
                            {Object.entries(data.metadata).map(([key, value]: [string, any]) => (
                                <div key={key}>
                                    <strong>{key.replace('_', ' ')}:</strong> {String(value)}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="bg-slate-800 text-white min-h-screen">
            <div className="container mx-auto px-4 py-8">
                <div className="grid lg:grid-cols-12 gap-6 h-full">
                    {/* Left Section - Strategy and Algorithm Selection */}
                    <div className="lg:col-span-3">
                        <div className="bg-slate-700 rounded-lg p-6 space-y-6">
                            <h2 className="text-xl font-semibold text-teal-300 mb-4">Configuration</h2>

                            {/* Strategy selection */}
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">
                                    Strategy
                                </label>
                                <select
                                    value={selectedStrategy}
                                    onChange={(e) => setSelectedStrategy(e.target.value)}
                                    disabled={currentResult.loading}
                                    className={`w-full px-3 py-2 bg-slate-600 border border-slate-500 rounded-md focus:outline-none 
                                    focus:ring-2 focus:ring-teal-400 ${selectedStrategy === '' ? 'text-gray-400' : 'text-white'} disabled:opacity-50`}
                                >
                                    <option value="" disabled hidden>
                                        -- Select a Strategy --
                                    </option>
                                    <option value="brute-force">Brute Force</option>
                                    <option value="decrease-conquer">Decrease and Conquer</option>
                                    <option value="greedy">Greedy</option>
                                    <option value="divide-conquer">Divide and Conquer</option>
                                </select>
                            </div>

                            {/* Algorithm selection */}
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">
                                    Algorithm
                                </label>
                                <select
                                    value={selectedAlgorithm}
                                    onChange={(e) => setSelectedAlgorithm(e.target.value)}
                                    disabled={!selectedStrategy || currentResult.loading}
                                    className={`w-full px-3 py-2 bg-slate-600 border border-slate-500 rounded-md focus:outline-none 
                                    focus:ring-2 focus:ring-teal-400 ${selectedAlgorithm === '' ? 'text-gray-400' : 'text-white'} disabled:opacity-50`}
                                >
                                    <option value="" disabled hidden>
                                        -- Select an Algorithm --
                                    </option>
                                    {selectedStrategy && algorithmOptions[selectedStrategy]?.map((algorithm: string) => (
                                        <option key={algorithm} value={algorithm}>
                                            {algorithm}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Middle section - input fields */}
                    <div className="lg:col-span-4">
                        <div className="bg-slate-700 rounded-lg p-6 h-full">
                            <h2 className="text-xl font-semibold text-teal-300 mb-4">Input Configuration</h2>

                            {inputFields.length > 0 ? (
                                <div className="space-y-4">
                                    {inputFields.map((field: InputField) => (
                                        <div key={field.name}>
                                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                                {field.label}
                                            </label>
                                            {field.type === 'array' ? (
                                                <textarea
                                                    value={inputValues[field.name] || ''}
                                                    onChange={(e) => handleInputChange(field.name, e.target.value)}
                                                    placeholder={field.placeholder}
                                                    disabled={currentResult.loading}
                                                    className="w-full px-3 py-2 bg-slate-600 border border-slate-500 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-teal-400 resize-none disabled:opacity-50"
                                                    rows={3}
                                                />
                                            ) : (
                                                <input
                                                    type={field.type}
                                                    value={inputValues[field.name] || ''}
                                                    onChange={(e) => handleInputChange(field.name, e.target.value)}
                                                    placeholder={field.placeholder}
                                                    disabled={currentResult.loading}
                                                    className="w-full px-3 py-2 bg-slate-600 border border-slate-500 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-teal-400 disabled:opacity-50"
                                                />
                                            )}
                                        </div>
                                    ))}

                                    <button
                                        onClick={handleSimulate}
                                        disabled={currentResult.loading}
                                        className="w-full bg-teal-600 hover:bg-teal-700 disabled:bg-gray-500 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-md transition-colors duration-200 mt-6"
                                    >
                                        {currentResult.loading ? 'Running...' : 'Start Simulation'}
                                    </button>
                                </div>
                            ) : (
                                <div className="flex items-center justify-center h-64 text-slate-400">
                                    <div className="text-center">
                                        <svg className="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                        <p>Select a strategy and algorithm to configure inputs</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right section - Results/Visualization */}
                    <div className="lg:col-span-5">
                        <div className="bg-teal-600 rounded-lg p-6 h-full">
                            <div className="flex items-center mb-4">
                                <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                                <h2 className="text-xl font-semibold text-white">RESULTS & VISUALIZATION</h2>
                            </div>

                            <div className="bg-white bg-opacity-10 rounded-lg p-4 h-96 overflow-auto">
                                {selectedAlgorithm ? (
                                    renderResults()
                                ) : (
                                    <div className="flex items-center justify-center h-full text-white opacity-75">
                                        <div className="text-center">
                                            <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                            </svg>
                                            <p>Algorithm results and visualization will appear here</p>
                                            <p className="text-sm mt-2">Select an algorithm to get started</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SimulationPage;