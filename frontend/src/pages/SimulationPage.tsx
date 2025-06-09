import React, { useState, useEffect, CSSProperties } from 'react';
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
import Toggle from '../components/Toggle';

interface AlgorithmOptions {
    [key: string]: string[];
}

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

interface ArrayItemStyle extends CSSProperties {
    '--delay': string;
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
        if (!currentResult.data?.steps) return;
        setIsAnimating(true);
        setStepIndex(0);
        
        const interval = setInterval(() => {
            setStepIndex(prev => {
                if (prev >= currentResult.data.steps.length - 1) {
                    clearInterval(interval);
                    setIsAnimating(false);
                    return prev;
                }
                return prev + 1;
            });
        }, 800);
    };

    const resetAnimation = () => {
        setStepIndex(0);
        setIsAnimating(false);
    };

    // Update the getAnimationClass function
    const getAnimationClass = (index: number, total: number): string => {
        return `animate-fadeIn transition-all duration-300 ease-in-out transform hover:scale-110
                ${index % 2 === 0 ? 'hover:rotate-2' : 'hover:-rotate-2'}`;
    };

    // Add new animation keyframes and utility classes
    const animationStyles = `
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slideInLeft {
            from { opacity: 0; transform: translateX(-20px); }
            to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes slideInRight {
            from { opacity: 0; transform: translateX(20px); }
            to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes scaleIn {
            from { transform: scale(0.8); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
        }
        
        @keyframes rotateIn {
            from { transform: rotate(-180deg) scale(0.3); opacity: 0; }
            to { transform: rotate(0) scale(1); opacity: 1; }
        }
        
        @keyframes shimmer {
            0% { background-position: -200% center; }
            100% { background-position: 200% center; }
        }
        
        @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
        }

        .animate-fadeIn {
            animation: fadeIn 0.6s ease-out forwards;
            animation-delay: var(--delay);
        }
        
        .animate-scaleIn {
            animation: scaleIn 0.5s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
            animation-delay: var(--delay);
        }
        
        .animate-rotateIn {
            animation: rotateIn 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
            animation-delay: var(--delay);
        }
        
        .animate-float {
            animation: float 3s ease-in-out infinite;
        }
        
        .shimmer-bg {
            background: linear-gradient(
                90deg,
                rgba(255,255,255,0) 0%,
                rgba(255,255,255,0.1) 50%,
                rgba(255,255,255,0) 100%
            );
            background-size: 200% 100%;
            animation: shimmer 2s infinite;
        }

        .perspective-card {
            transform-style: preserve-3d;
            perspective: 1000px;
        }
        
        .card-content {
            transform: translateZ(20px);
            transition: transform 0.3s ease-out;
        }
        
        .card-content:hover {
            transform: translateZ(40px);
        }

        /* Enhanced scrollbar styles */
        .custom-scrollbar::-webkit-scrollbar {
            width: 8px;
            height: 8px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
            background: rgba(255, 255, 255, 0.05);
            border-radius: 4px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
            background: linear-gradient(to bottom, rgba(var(--color-teal-400), 0.5), rgba(var(--color-cyan-500), 0.5));
            border-radius: 4px;
            transition: all 0.3s ease;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: linear-gradient(to bottom, rgba(var(--color-teal-500), 0.8), rgba(var(--color-cyan-600), 0.8));
        }
        
        .custom-scrollbar {
            scrollbar-width: thin;
            scrollbar-color: var(--color-teal-400) transparent;
        }

        /* Add smooth scroll behavior */
        .smooth-scroll {
            scroll-behavior: smooth;
        }
    `;

    // Add the style element to the component
    const StyleBlock = () => (
        <style>{animationStyles}</style>
    );

    // Enhanced ArrayVisualization component with new animations
    const ArrayVisualization = ({ array, highlightIndices = [], stepIndex = 0 }: { 
        array: (number | string)[], 
        highlightIndices?: number[], 
        stepIndex?: number 
    }) => (
        <div className="flex flex-wrap gap-3 justify-center mb-4 perspective-1000 p-6">
            {array.map((value, index) => {
                const style: ArrayItemStyle = {
                    '--delay': `${(index * 100) / array.length}ms`,
                };

                const isHighlighted = highlightIndices.includes(index);
                
                return (
                    <div
                        key={index}
                        className={`
                            perspective-card relative px-5 py-4 rounded-xl text-center font-mono font-bold text-base
                            transition-all duration-500 transform-gpu
                            ${isHighlighted 
                                ? 'bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-400 text-black scale-110 shadow-xl z-10 animate-float shimmer-bg' 
                                : 'bg-gradient-to-r from-teal-400 via-cyan-500 to-teal-400 text-white hover:shadow-2xl'}
                            hover:scale-105 hover:z-20 animate-scaleIn
                        `}
                        style={style}
                    >
                        <div className="card-content">
                            <div className="relative z-10 text-lg">{value}</div>
                            <div className="absolute -top-3 -left-3 text-xs bg-slate-800 text-white rounded-full w-7 h-7 flex items-center justify-center shadow-lg transform transition-transform hover:scale-110">
                                {index}
                            </div>
                            {isHighlighted && (
                                <>
                                    <div className="absolute inset-0 bg-white opacity-20 rounded-xl animate-ping"></div>
                                    <div className="absolute -inset-1 bg-white/20 rounded-xl blur-sm"></div>
                                </>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );

    // Enhanced MetricCard component with new animations
    const MetricCard = ({ title, value, icon, color = "teal" }: {
        title: string;
        value: string | number;
        icon: React.ReactNode;
        color?: string;
    }) => (
        <div className={`
            perspective-card bg-gradient-to-r from-${color}-500 via-${color}-600 to-${color}-500 
            rounded-xl p-5 transform hover:scale-105 transition-all duration-300 shadow-lg
            animate-scaleIn shimmer-bg
        `}>
            <div className="card-content flex items-center justify-between">
                <div>
                    <p className="text-white/80 text-sm mb-1">{title}</p>
                    <p className="text-white text-xl font-bold animate-float">{value}</p>
                </div>
                <div className="text-white/90 transform transition-transform hover:scale-110 hover:rotate-12">
                    {icon}
                </div>
            </div>
        </div>
    );

    // Enhanced ProgressBar component with new animations
    const ProgressBar = ({ current, total, label }: { current: number; total: number; label: string }) => (
        <div className="mb-4 animate-scaleIn">
            <div className="flex justify-between text-sm text-white mb-2">
                <span className="font-medium">{label}</span>
                <span className="font-mono">{current}/{total}</span>
            </div>
            <div className="relative w-full h-3 bg-slate-600/50 rounded-full overflow-hidden">
                <div 
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-teal-400 via-cyan-500 to-teal-400 rounded-full shimmer-bg"
                    style={{ 
                        width: `${(current / total) * 100}%`,
                        transition: 'width 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
                    }}
                />
            </div>
        </div>
    );

    // Update the input fields rendering to use Toggle for boolean types
    const renderInputField = (field: InputField) => {
        switch (field.type) {
            case 'boolean':
                return (
                    <Toggle
                        value={inputValues[field.name] === 'true'}
                        onChange={(newValue: boolean) => handleInputChange(field.name, newValue)}
                        disabled={currentResult.loading}
                        label={field.label}
                    />
                );
            case 'array':
                return (
                    <textarea
                        value={inputValues[field.name] || ''}
                        onChange={(e) => handleInputChange(field.name, e.target.value)}
                        placeholder={field.placeholder}
                        disabled={currentResult.loading}
                        className="w-full px-3 py-2 bg-slate-600 border border-slate-500 rounded-md text-white 
                                 focus:outline-none focus:ring-2 focus:ring-teal-400 resize-none disabled:opacity-50
                                 transition-all duration-300 ease-in-out hover:bg-slate-500"
                        rows={3}
                    />
                );
            default:
                return (
                    <input
                        type={field.type}
                        value={inputValues[field.name] || ''}
                        onChange={(e) => handleInputChange(field.name, e.target.value)}
                        placeholder={field.placeholder}
                        disabled={currentResult.loading}
                        className="w-full px-3 py-2 bg-slate-600 border border-slate-500 rounded-md text-white 
                                 focus:outline-none focus:ring-2 focus:ring-teal-400 disabled:opacity-50
                                 transition-all duration-300 ease-in-out hover:bg-slate-500"
                    />
                );
        }
    };

    const renderResults = () => {
        if (currentResult.loading) {
            return (
                <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                        <div className="relative">
                            <div className="animate-spin rounded-full h-16 w-16 border-4 border-teal-200 border-t-white mx-auto"></div>
                            <div className="absolute inset-0 rounded-full h-16 w-16 border-4 border-transparent border-t-teal-400 animate-spin animation-delay-75 mx-auto"></div>
                        </div>
                        <p className="text-white mt-4 animate-pulse">Running simulation...</p>
                        <div className="flex justify-center mt-2">
                            <div className="flex space-x-1">
                                {[0, 1, 2].map((i) => (
                                    <div
                                        key={i}
                                        className="w-2 h-2 bg-white rounded-full animate-bounce"
                                        style={{ animationDelay: `${i * 0.1}s` }}
                                    ></div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        if (currentResult.error) {
            return (
                <div className="bg-red-500 bg-opacity-20 border-2 border-red-400 rounded-lg p-6 animate-fadeIn">
                    <div className="flex items-center mb-3">
                        <svg className="w-8 h-8 text-red-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <h3 className="text-lg font-semibold text-red-200">Execution Error</h3>
                    </div>
                    <p className="text-red-100 bg-red-600 bg-opacity-30 rounded p-3">{currentResult.error}</p>
                </div>
            );
        }

        if (!currentResult.data) {
            return (
                <div className="text-white animate-fadeIn">
                    <div className="text-center mb-6">
                        <div className="bg-gradient-to-r from-teal-400 to-blue-500 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 animate-pulse">
                            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold mb-2 bg-gradient-to-r from-teal-300 to-blue-300 bg-clip-text text-transparent">
                            {selectedAlgorithm}
                        </h3>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div className="bg-slate-700 bg-opacity-50 rounded-lg p-4">
                            <p className="text-sm text-teal-300 font-semibold">Strategy</p>
                            <p className="text-lg">{selectedStrategy.replace('-', ' ').toUpperCase()}</p>
                        </div>
                        <div className="bg-slate-700 bg-opacity-50 rounded-lg p-4">
                            <p className="text-sm text-teal-300 font-semibold">Algorithm</p>
                            <p className="text-lg">{selectedAlgorithm}</p>
                        </div>
                    </div>
                    
                    <div className="text-center">
                        <p className="text-gray-300 mb-4">Configure inputs and start simulation to see magic happen!</p>
                        <div className="animate-bounce">
                            <svg className="w-8 h-8 mx-auto text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                            </svg>
                        </div>
                    </div>
                </div>
            );
        }

        const data = currentResult.data;

        return (
            <div className="text-white space-y-6 animate-fadeIn">
                {/* Header with metrics */}
                <div className="bg-gradient-to-r from-slate-700 to-slate-600 rounded-lg p-4 border border-teal-400">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-bold text-teal-200 flex items-center">
                            <div className="w-3 h-3 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                            {selectedAlgorithm} - Results
                        </h3>
                        <div className="flex items-center text-sm text-green-300">
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            Completed
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4">
                        <MetricCard
                            title="Execution Time"
                            value={`${data.execution_time?.toFixed(2)}ms`}
                            icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
                            color="blue"
                        />
                        {data.steps && (
                            <MetricCard
                                title="Steps"
                                value={data.steps.length}
                                icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>}
                                color="purple"
                            />
                        )}
                        {data.metadata?.input_size && (
                            <MetricCard
                                title="Input Size"
                                value={data.metadata.input_size}
                                icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" /></svg>}
                                color="green"
                            />
                        )}
                    </div>
                </div>

                {/* Algorithm-specific visualizations */}
                {selectedAlgorithm.includes('Sort') && (
                    <div className="bg-slate-700 bg-opacity-30 rounded-lg p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h4 className="text-lg font-semibold text-teal-300">Sorting Visualization</h4>
                            {data.steps && (
                                <div className="flex space-x-2">
                                    <button
                                        onClick={startAnimation}
                                        disabled={isAnimating}
                                        className="px-3 py-1 bg-teal-600 hover:bg-teal-700 disabled:bg-gray-500 rounded text-sm transition-colors"
                                    >
                                        {isAnimating ? 'Playing...' : 'Animate'}
                                    </button>
                                    <button
                                        onClick={resetAnimation}
                                        className="px-3 py-1 bg-gray-600 hover:bg-gray-700 rounded text-sm transition-colors"
                                    >
                                        Reset
                                    </button>
                                </div>
                            )}
                        </div>

                        {data.steps && stepIndex < data.steps.length && (
                            <ProgressBar
                                current={stepIndex + 1}
                                total={data.steps.length}
                                label="Animation Progress"
                            />
                        )}

                        <div className="mb-4">
                            <p className="text-sm text-gray-300 mb-2">
                                {data.steps ? `Step ${stepIndex + 1} of ${data.steps.length}` : 'Final Result'}
                            </p>
                            <ArrayVisualization 
                                array={data.steps ? data.steps[stepIndex] : data.result} 
                            />
                        </div>

                        <div className="bg-green-500 bg-opacity-20 rounded-lg p-4 border border-green-400">
                            <h5 className="font-semibold text-green-300 mb-2 flex items-center">
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                Final Sorted Array
                            </h5>
                            <ArrayVisualization array={data.result} />
                        </div>
                    </div>
                )}

                {selectedAlgorithm.includes('Search') && (
                    <div className="bg-slate-700 bg-opacity-30 rounded-lg p-6">
                        <h4 className="text-lg font-semibold text-teal-300 mb-4">Search Results</h4>
                        
                        <div className={`text-center p-6 rounded-lg mb-4 ${
                            data.found 
                                ? 'bg-green-500 bg-opacity-20 border border-green-400' 
                                : 'bg-red-500 bg-opacity-20 border border-red-400'
                        }`}>
                            <div className="text-4xl mb-2">
                                {data.found ? '🎯' : '❌'}
                            </div>
                            <p className={`text-2xl font-bold ${data.found ? 'text-green-300' : 'text-red-300'}`}>
                                {data.found ? `Found at index ${data.index}` : 'Not found'}
                            </p>
                        </div>

                        {data.comparisons && (
                            <MetricCard
                                title="Comparisons Made"
                                value={data.comparisons}
                                icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>}
                                color="orange"
                            />
                        )}
                    </div>
                )}

                {selectedAlgorithm === 'Travelling Salesman Problem' && (
                    <div className="bg-slate-700 bg-opacity-30 rounded-lg p-6">
                        <h4 className="text-lg font-semibold text-teal-300 mb-4">Optimal Tour Visualization</h4>
                        
                        <div className="text-center mb-6">
                            <div className="text-3xl mb-2">🗺️</div>
                            <p className="text-2xl font-bold text-green-300 mb-2">Distance: {data.min_distance}</p>
                            <p className="text-sm text-gray-300">Evaluated {data.total_permutations} permutations</p>
                        </div>

                        <div className="bg-blue-500 bg-opacity-20 rounded-lg p-4 border border-blue-400">
                            <h5 className="font-semibold text-blue-300 mb-3">Optimal Path</h5>
                            <div className="flex flex-wrap items-center justify-center gap-2">
                                {data.optimal_path?.map((city: number, index: number) => (
                                    <React.Fragment key={index}>
                                        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-3 py-2 rounded-full font-bold animate-fadeIn">
                                            City {city}
                                        </div>
                                        {index < data.optimal_path.length - 1 && (
                                            <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                            </svg>
                                        )}
                                    </React.Fragment>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {selectedAlgorithm === 'Knapsack Problem' && (
                    <div className="bg-slate-700 bg-opacity-30 rounded-lg p-6">
                        <h4 className="text-lg font-semibold text-teal-300 mb-4">Knapsack Optimization</h4>
                        
                        <div className="grid grid-cols-2 gap-4 mb-6">
                            <MetricCard
                                title="Total Value"
                                value={data.best_value}
                                icon={<span className="text-2xl">💎</span>}
                                color="yellow"
                            />
                            <MetricCard
                                title="Total Weight"
                                value={data.total_weight}
                                icon={<span className="text-2xl">⚖️</span>}
                                color="indigo"
                            />
                        </div>

                        <div className="bg-purple-500 bg-opacity-20 rounded-lg p-4 border border-purple-400">
                            <h5 className="font-semibold text-purple-300 mb-3">Selected Items</h5>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                {data.best_items?.map((item: string, index: number) => (
                                    <div 
                                        key={index} 
                                        className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-3 py-2 rounded-lg text-sm font-semibold text-center animate-fadeIn transform hover:scale-105 transition-all"
                                        style={{ animationDelay: `${index * 0.1}s` }}
                                    >
                                        {item}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {selectedAlgorithm === 'Josephus Problem' && (
                    <div className="bg-slate-700 bg-opacity-30 rounded-lg p-6">
                        <h4 className="text-lg font-semibold text-teal-300 mb-4">Josephus Problem Simulation</h4>
                        
                        <div className="text-center mb-6">
                            <div className="text-4xl mb-2">👑</div>
                            <p className="text-2xl font-bold text-green-300 mb-2">Survivor: Person #{data.survivor}</p>
                            <p className="text-sm text-gray-300">Out of {data.people_count} people</p>
                        </div>

                        <div className="bg-orange-500 bg-opacity-20 rounded-lg p-4 border border-orange-400">
                            <h5 className="font-semibold text-orange-300 mb-3">Elimination Sequence</h5>
                            <div className="bg-slate-800 rounded p-3 max-h-32 overflow-y-auto">
                                <div className="flex flex-wrap gap-1 text-sm font-mono">
                                    {data.elimination_order?.slice(0, -1).map((person: number, index: number) => (
                                        <React.Fragment key={index}>
                                            <span 
                                                className={`px-2 py-1 rounded ${
                                                    index === data.elimination_order.length - 2 
                                                        ? 'bg-green-600 text-white' 
                                                        : 'bg-red-600 text-white'
                                                } animate-fadeIn`}
                                                style={{ animationDelay: `${index * 0.05}s` }}
                                            >
                                                {person}
                                            </span>
                                            {index < data.elimination_order.length - 2 && (
                                                <span className="text-orange-300 px-1">→</span>
                                            )}
                                        </React.Fragment>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {selectedAlgorithm === 'Russian Multiplication Method' && (
                    <div className="bg-slate-700 bg-opacity-30 rounded-lg p-6">
                        <h4 className="text-lg font-semibold text-teal-300 mb-4">Russian Multiplication Steps</h4>
                        
                        <div className="text-center mb-6">
                            <div className="text-3xl mb-2">🔢</div>
                            <p className="text-2xl font-bold text-green-300 mb-2">Result: {data.product}</p>
                            <p className="text-sm text-gray-300">{data.steps_count} steps completed</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-blue-500 bg-opacity-20 rounded-lg p-4 border border-blue-400">
                                <h5 className="font-semibold text-blue-300 mb-3 flex items-center">
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    Halving Sequence
                                </h5>
                                <div className="space-y-2">
                                    {data.halving_sequence?.map((num: number, index: number) => (
                                        <div 
                                            key={index}
                                            className="bg-blue-600 text-white px-3 py-2 rounded text-center font-mono animate-slideInLeft"
                                            style={{ animationDelay: `${index * 0.1}s` }}
                                        >
                                            {num}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-green-500 bg-opacity-20 rounded-lg p-4 border border-green-400">
                                <h5 className="font-semibold text-green-300 mb-3 flex items-center">
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                    Doubling Sequence
                                </h5>
                                <div className="space-y-2">
                                    {data.doubling_sequence?.map((num: number, index: number) => (
                                        <div 
                                            key={index}
                                            className="bg-green-600 text-white px-3 py-2 rounded text-center font-mono animate-slideInRight"
                                            style={{ animationDelay: `${index * 0.1}s` }}
                                        >
                                            {num}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Algorithm complexity and metadata */}
                {data.metadata && (
                    <div className="bg-slate-700 bg-opacity-30 rounded-lg p-6">
                        <h4 className="text-lg font-semibold text-teal-300 mb-4 flex items-center">
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                            </svg>
                            Algorithm Analysis
                        </h4>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {Object.entries(data.metadata).map(([key, value]: [string, any], index: number) => (
                                <div 
                                    key={key}
                                    className="bg-slate-600 bg-opacity-50 rounded-lg p-3 animate-fadeIn"
                                    style={{ animationDelay: `${index * 0.1}s` }}
                                >
                                    <p className="text-xs text-gray-300 uppercase tracking-wide">
                                        {key.replace('_', ' ')}
                                    </p>
                                    <p className="text-lg font-semibold text-white">
                                        {typeof value === 'boolean' ? (value ? '✓' : '✗') : String(value)}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Performance summary */}
                <div className="bg-gradient-to-r from-teal-600 to-blue-600 rounded-lg p-6 text-center">
                    <h4 className="text-xl font-bold text-white mb-2">🎉 Simulation Complete!</h4>
                    <p className="text-teal-100">
                        Algorithm executed successfully in {data.execution_time?.toFixed(2)}ms
                    </p>
                    {data.steps && (
                        <p className="text-teal-100 text-sm mt-1">
                            Processed through {data.steps.length} computational steps
                        </p>
                    )}
                </div>
            </div>
        );
    };

    return (
        <div className="bg-slate-800 text-white min-h-screen">
            <StyleBlock />
            <div className="container mx-auto px-4 py-8">
                <div className="grid lg:grid-cols-8 gap-6 h-full">
                    {/* Left Section - Strategy and Algorithm Selection */}
                    <div className="lg:col-span-3">
                        <div className="bg-slate-700 rounded-lg p-6 space-y-6 mb-6">
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

                        {/* Input Configuration - Now below the Configuration section */}
                        <div className="bg-slate-700 rounded-lg p-6">
                            <h2 className="text-xl font-semibold text-teal-300 mb-4">Input Configuration</h2>

                            {inputFields.length > 0 ? (
                                <div className="space-y-4">
                                    {inputFields.map((field: InputField) => (
                                        <div key={field.name} className="animate-fadeIn">
                                            {field.type !== 'boolean' && (
                                                <label className="block text-sm font-medium text-slate-300 mb-2">
                                                    {field.label}
                                                </label>
                                            )}
                                            {renderInputField(field)}
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

                    {/* Right section - Results/Visualization - Now spans 5 columns */}
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

                            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6 h-96 overflow-auto custom-scrollbar">
                                {selectedAlgorithm ? (
                                    renderResults()
                                ) : (
                                    <div className="flex items-center justify-center h-full text-white opacity-75">
                                        <div className="text-center animate-fadeIn">
                                            <div className="relative mb-6">
                                                <div className="w-20 h-20 mx-auto bg-gradient-to-r from-teal-400 to-blue-500 rounded-full flex items-center justify-center animate-pulse">
                                                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                                    </svg>
                                                </div>
                                                <div className="absolute inset-0 w-20 h-20 mx-auto border-4 border-white border-opacity-30 rounded-full animate-ping"></div>
                                            </div>
                                            <p className="text-lg font-semibold mb-2">Ready for Algorithm Magic!</p>
                                            <p className="text-sm opacity-75">Select an algorithm and configure inputs to see beautiful visualizations</p>
                                            <div className="mt-4 animate-bounce">
                                                <svg className="w-6 h-6 mx-auto text-teal-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                                                </svg>
                                            </div>
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