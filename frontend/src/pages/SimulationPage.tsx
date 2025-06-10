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
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    // Track mouse position for dynamic background effects
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };
        
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

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
            let enhancedData = apiHook.data;
            
            // For search algorithms, enhance the data with original input array and target
            if (apiHook.data && (selectedAlgorithm === 'Binary Search' || selectedAlgorithm === 'Sequential Search')) {
                try {
                    const transformedData = transformInputData(selectedAlgorithm, inputValues);
                    enhancedData = {
                        ...apiHook.data,
                        array: Array.isArray(transformedData.array) ? transformedData.array : [],
                        target: transformedData.target,
                        algorithm: selectedAlgorithm
                    };
                } catch (error) {
                    console.error('Error enhancing search data:', error);
                    enhancedData = apiHook.data;
                }
            }
            
            setCurrentResult({
                data: enhancedData,
                loading: apiHook.loading,
                error: apiHook.error
            });
        }
    }, [
        selectedAlgorithm,
        inputValues, // Add inputValues as dependency to re-enhance when inputs change
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
        <div className="min-h-screen bg-slate-900 text-white overflow-hidden relative">
            {/* Dynamic Background */}
            <div className="fixed inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"></div>
                <div 
                    className="absolute inset-0 opacity-20"
                    style={{
                        background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(14, 165, 233, 0.1), transparent 40%)`
                    }}
                ></div>
                <div className="absolute inset-0 opacity-30">
                    <div className="absolute inset-0" style={{
                        backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(51, 65, 85, 0.1) 1px, transparent 1px)',
                        backgroundSize: '40px 40px'
                    }}></div>
                </div>
                {/* Floating shapes */}
                <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-teal-400/10 to-cyan-500/10 rounded-full blur-2xl animate-pulse"></div>
                <div className="absolute bottom-20 right-10 w-48 h-48 bg-gradient-to-br from-purple-400/10 to-blue-500/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
            </div>

            {/* Header Section */}
            <div className="relative z-10 pt-24 pb-8">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-teal-500/20 to-cyan-500/20 border border-teal-500/30 backdrop-blur-sm mb-6">
                            <span className="w-2 h-2 bg-teal-400 rounded-full mr-2 animate-pulse"></span>
                            <span className="text-teal-300 font-medium text-sm">Algorithm Simulator</span>
                        </div>
                        
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                            <span className="bg-gradient-to-r from-white via-cyan-100 to-teal-300 bg-clip-text text-transparent">
                                Interactive
                            </span>
                            <br />
                            <span className="bg-gradient-to-r from-teal-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
                                Algorithm Playground
                            </span>
                        </h1>
                        
                        <p className="text-slate-300 text-lg max-w-2xl mx-auto">
                            Configure, execute, and visualize algorithms in real-time
                        </p>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="relative z-10 container mx-auto px-4 pb-12">
                <div className="grid lg:grid-cols-12 gap-8 items-start">
                    {/* Left Section - Configuration */}
                    <div className="lg:col-span-5 space-y-6">
                        {/* Strategy & Algorithm Selection */}
                        <div className="group relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-teal-500/20 to-cyan-500/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300 opacity-0 group-hover:opacity-100 -z-10"></div>
                            <div className="relative bg-slate-800/50 backdrop-blur-sm rounded-3xl border border-slate-700/50 hover:border-teal-500/50 transition-all duration-300 p-6 z-10">
                                <div className="flex items-center mb-6">
                                    <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg mr-4">
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-semibold text-white">Configuration</h2>
                                        <p className="text-slate-400 text-sm">Select strategy and algorithm</p>
                                    </div>
                                </div>
                                
                                <ConfigurationSection
                                    selectedStrategy={selectedStrategy}
                                    setSelectedStrategy={setSelectedStrategy}
                                    selectedAlgorithm={selectedAlgorithm}
                                    setSelectedAlgorithm={setSelectedAlgorithm}
                                    isLoading={currentResult.loading}
                                />
                            </div>
                        </div>

                        {/* Input Configuration */}
                        <div className="group relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300 opacity-0 group-hover:opacity-100 -z-10"></div>
                            <div className="relative bg-slate-800/50 backdrop-blur-sm rounded-3xl border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-300 p-6 z-10">
                                <div className="flex items-center mb-6">
                                    <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg mr-4">
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-semibold text-white">Input Data</h2>
                                        <p className="text-slate-400 text-sm">Configure algorithm parameters</p>
                                    </div>
                                </div>

                                <InputConfiguration
                                    selectedAlgorithm={selectedAlgorithm}
                                    inputFields={inputFields}
                                    inputValues={inputValues}
                                    handleInputChange={handleInputChange}
                                    handleSimulate={handleSimulate}
                                    isLoading={currentResult.loading}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Right Section - Visualization */}
                    <div className="lg:col-span-7">
                        <div className="group relative min-h-[700px] lg:min-h-[800px]">
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-blue-500/20 to-teal-500/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300 -z-10"></div>
                            <div className="relative bg-slate-800/40 backdrop-blur-md rounded-3xl border border-slate-700/50 hover:border-purple-500/50 transition-all duration-300 p-6 h-full z-10 flex flex-col">
                                {/* Header */}
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center">
                                        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg mr-4">
                                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h2 className="text-xl font-semibold text-white">Visualization</h2>
                                            <p className="text-slate-400 text-sm">Real-time algorithm execution</p>
                                        </div>
                                    </div>
                                    
                                    {currentResult.data && (
                                        <div className="flex items-center space-x-3">
                                            <div className="flex items-center text-green-300 text-sm bg-green-400/10 px-3 py-1 rounded-full border border-green-400/20">
                                                <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                                                Live Data
                                            </div>
                                            {!isAnimating && (
                                                <button
                                                    onClick={startAnimation}
                                                    className="px-4 py-2 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white rounded-xl font-medium transition-all duration-300 transform hover:scale-105 shadow-lg"
                                                >
                                                    ▶ Animate
                                                </button>
                                            )}
                                            {isAnimating && (
                                                <button
                                                    onClick={resetAnimation}
                                                    className="px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white rounded-xl font-medium transition-all duration-300 transform hover:scale-105 shadow-lg"
                                                >
                                                    ⏸ Reset
                                                </button>
                                            )}
                                        </div>
                                    )}
                                </div>

                                {/* Content Area */}
                                <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-slate-700/30 p-6 flex-1 overflow-auto">
                                    {!selectedAlgorithm && (
                                        <div className="flex flex-col items-center justify-center h-full text-center">
                                            <div className="w-24 h-24 bg-gradient-to-br from-slate-600 to-slate-700 rounded-2xl flex items-center justify-center mb-6">
                                                <svg className="w-12 h-12 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                                </svg>
                                            </div>
                                            <h3 className="text-xl font-semibold text-slate-300 mb-2">Ready to Simulate</h3>
                                            <p className="text-slate-500">Select an algorithm to begin visualization</p>
                                        </div>
                                    )}
                                    
                                    {selectedAlgorithm && (
                                        <ResultsSection
                                            selectedAlgorithm={selectedAlgorithm}
                                            currentResult={currentResult}
                                            stepIndex={stepIndex}
                                            isAnimating={isAnimating}
                                            startAnimation={startAnimation}
                                            resetAnimation={resetAnimation}
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SimulationPage;