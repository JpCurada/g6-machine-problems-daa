import React, { useState, useEffect } from 'react';

interface AlgorithmOptions {
    [key: string]: string[];
}

interface InputField {
    name: string;
    label: string;
    type: 'text' | 'number' | 'array';
    placeholder?: string;
}

const SimulationPage: React.FC = () => {
    const [selectedStrategy, setSelectedStrategy] = useState<string>('');
    const [selectedAlgorithm, setSelectedAlgorithm] = useState<string>('');
    const [inputFields, setInputFields] = useState<InputField[]>([]);
    const [inputValues, setInputValues] = useState<{[key: string]: string}>({});

    //algorithm options based on strategy
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

    //input fields based on selected algorithm
    const getInputFields = (algorithm: string): InputField[] => {
        switch (algorithm) {
            case 'Knapsack Problem':
            case 'Fractional Knapsack':
                return [
                    { name: 'weights', label: 'Item Weights', type: 'array', placeholder: 'e.g., 10,20,30' },
                    { name: 'values', label: 'Item Values', type: 'array', placeholder: 'e.g., 60,100,120' },
                    { name: 'capacity', label: 'Knapsack Capacity', type: 'number', placeholder: 'e.g., 50' }
                ];
            case 'Traveling Salesman Problem':
                return [
                    { name: 'cities', label: 'Number of Cities', type: 'number', placeholder: 'e.g., 4' },
                    { name: 'distances', label: 'Distance Matrix', type: 'array', placeholder: 'e.g., 0,10,5,8;10,0,3,7;5,3,0,4;8,7,4,0' }
                ];
            case 'Binary Search':
                return [
                    { name: 'array', label: 'Sorted Array', type: 'array', placeholder: 'e.g., 1,3,5,7,9,11' },
                    { name: 'target', label: 'Target Value', type: 'number', placeholder: 'e.g., 7' }
                ];
            case 'Merge Sort':
            case 'Quick Sort':
                return [
                    { name: 'array', label: 'Array to Sort', type: 'array', placeholder: 'e.g., 64,34,25,12,22,11,90' }
                ];
            case 'Activity Selection':
                return [
                    { name: 'startTimes', label: 'Start Times', type: 'array', placeholder: 'e.g., 1,3,0,5,8,5' },
                    { name: 'endTimes', label: 'End Times', type: 'array', placeholder: 'e.g., 2,4,6,7,9,9' }
                ];
            case 'Dijkstra\'s Algorithm':
                return [
                    { name: 'vertices', label: 'Number of Vertices', type: 'number', placeholder: 'e.g., 5' },
                    { name: 'edges', label: 'Edges (source,destination,weight)', type: 'array', placeholder: 'e.g., 0,1,4;0,2,1;1,3,1' },
                    { name: 'source', label: 'Source Vertex', type: 'number', placeholder: 'e.g., 0' }
                ];
            default:
                return [
                    { name: 'input', label: 'Input Data', type: 'text', placeholder: 'Enter your input data' }
                ];
        }
    };

    //update algorithm options when strategy changes
    useEffect(() => {
        if (selectedStrategy) {
            setSelectedAlgorithm('');
            setInputFields([]);
            setInputValues({});
        }
    }, [selectedStrategy]);

    //update input fields when algorithm changes
    useEffect(() => {
        if (selectedAlgorithm) {
            const fields = getInputFields(selectedAlgorithm);
            setInputFields(fields);
            // Reset input values
            const newInputValues: {[key: string]: string} = {};
            fields.forEach(field => {
                newInputValues[field.name] = '';
            });
            setInputValues(newInputValues);
        }
    }, [selectedAlgorithm]);

    const handleInputChange = (fieldName: string, value: string) => {
        setInputValues(prev => ({
            ...prev,
            [fieldName]: value
        }));
    };

    const handleSimulate = () => {
        // TODO: Implement simulation logic
        console.log('Simulating:', { selectedStrategy, selectedAlgorithm, inputValues });
    };

    return (
        <div className="bg-slate-800 text-white min-h-screen">
            <div className="container mx-auto px-4 py-8">
                <div className="grid lg:grid-cols-12 gap-6 h-full">
                    {/* Left Section - Strategy and Algorithm Selection */}
                    <div className="lg:col-span-3">
                        <div className="bg-slate-700 rounded-lg p-6 space-y-6">
                            <h2 className="text-xl font-semibold text-teal-300 mb-4">Configuration</h2>

                            {/*strategy selection */}
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">
                                    Strategy
                                </label>
                                <select
                                    value={selectedStrategy}
                                    onChange={(e) => setSelectedStrategy(e.target.value)}
                                    className={`w-full px-3 py-2 bg-slate-600 border border-slate-500 rounded-md focus:outline-none 
                                    focus:ring-2 focus:ring-teal-400 ${selectedStrategy === '' ? 'text-gray-400' : 'text-white'}`}
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

                            {/*algorithm selection */}
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">
                                    Algorithm
                                </label>
                                <select
                                    value={selectedAlgorithm}
                                    onChange={(e) => setSelectedAlgorithm(e.target.value)}
                                    disabled={!selectedStrategy}
                                    className={`w-full px-3 py-2 bg-slate-600 border border-slate-500 rounded-md focus:outline-none 
                                    focus:ring-2 focus:ring-teal-400 ${selectedAlgorithm === '' ? 'text-gray-400' : 'text-white'}`}
                                >
                                    <option value="" disabled hidden>
                                        -- Select an Algorithm --
                                    </option>
                                    {selectedStrategy && algorithmOptions[selectedStrategy]?.map((algorithm) => (
                                        <option key={algorithm} value={algorithm}>
                                            {algorithm}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    {/*middle section - input fields */}
                    <div className="lg:col-span-4">
                        <div className="bg-slate-700 rounded-lg p-6 h-full">
                            <h2 className="text-xl font-semibold text-teal-300 mb-4">Input Based on Selections</h2>

                            {inputFields.length > 0 ? (
                                <div className="space-y-4">
                                    {inputFields.map((field) => (
                                        <div key={field.name}>
                                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                                {field.label}
                                            </label>
                                            {field.type === 'array' ? (
                                                <textarea
                                                    value={inputValues[field.name] || ''}
                                                    onChange={(e) => handleInputChange(field.name, e.target.value)}
                                                    placeholder={field.placeholder}
                                                    className="w-full px-3 py-2 bg-slate-600 border border-slate-500 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-teal-400 resize-none"
                                                    rows={3}
                                                />
                                            ) : (
                                                <input
                                                    type={field.type}
                                                    value={inputValues[field.name] || ''}
                                                    onChange={(e) => handleInputChange(field.name, e.target.value)}
                                                    placeholder={field.placeholder}
                                                    className="w-full px-3 py-2 bg-slate-600 border border-slate-500 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-teal-400"
                                                />
                                            )}
                                        </div>
                                    ))}

                                    <button
                                        onClick={handleSimulate}
                                        className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 px-4 rounded-md transition-colors duration-200 mt-6"
                                    >
                                        Start Simulation
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

                    {/*right section - instructions/visualization */}
                    <div className="lg:col-span-5">
                        <div className="bg-teal-600 rounded-lg p-6 h-full">
                            <div className="flex items-center mb-4">
                                <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <h2 className="text-xl font-semibold text-white">INSTRUCTIONS/VISUALIZATION</h2>
                            </div>

                            <div className="bg-white bg-opacity-10 rounded-lg p-4 h-96 overflow-auto">
                                {selectedAlgorithm ? (
                                    <div className="text-white">
                                        <h3 className="text-lg font-semibold mb-3">{selectedAlgorithm}</h3>
                                        <div className="space-y-2 text-sm">
                                            <p><strong>Strategy:</strong> {selectedStrategy.replace('-', ' ').toUpperCase()}</p>
                                            <p><strong>Algorithm:</strong> {selectedAlgorithm}</p>

                                            {selectedAlgorithm === 'Knapsack Problem' && (
                                                <div className="mt-4">
                                                    <p><strong>Description:</strong> The knapsack problem is a classic optimization problem where we need to select items with given weights and values to maximize value while staying within a weight capacity.</p>
                                                    <p className="mt-2"><strong>Steps:</strong></p>
                                                    <ol className="list-decimal list-inside space-y-1 mt-2">
                                                        <li>Examine all possible combinations of items</li>
                                                        <li>Calculate total weight and value for each combination</li>
                                                        <li>Select the combination with maximum value that fits in the knapsack</li>
                                                    </ol>
                                                </div>
                                            )}

                                            {selectedAlgorithm === 'Binary Search' && (
                                                <div className="mt-4">
                                                    <p><strong>Description:</strong> Binary search is an efficient algorithm for finding a target value in a sorted array by repeatedly dividing the search interval in half.</p>
                                                    <p className="mt-2"><strong>Steps:</strong></p>
                                                    <ol className="list-decimal list-inside space-y-1 mt-2">
                                                        <li>Compare target with middle element</li>
                                                        <li>If target equals middle, return position</li>
                                                        <li>If target is less than middle, search left half</li>
                                                        <li>If target is greater than middle, search right half</li>
                                                        <li>Repeat until target is found or search space is empty</li>
                                                    </ol>
                                                </div>
                                            )}

                                            {/*add more algorithm descriptions as needed */}
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex items-center justify-center h-full text-white opacity-75">
                                        <div className="text-center">
                                            <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                            </svg>
                                            <p>Algorithm instructions and visualization will appear here</p>
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