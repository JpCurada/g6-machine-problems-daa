import React from 'react';

interface AlgorithmOptions {
    [key: string]: string[];
}

interface ConfigurationSectionProps {
    selectedStrategy: string;
    setSelectedStrategy: (strategy: string) => void;
    selectedAlgorithm: string;
    setSelectedAlgorithm: (algorithm: string) => void;
    isLoading: boolean;
}

const ConfigurationSection: React.FC<ConfigurationSectionProps> = ({
    selectedStrategy,
    setSelectedStrategy,
    selectedAlgorithm,
    setSelectedAlgorithm,
    isLoading
}) => {
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
        'divide-conquer': [
            'Quick Sort',
            'Strassen Matrix Multiplication'
        ],
        'greedy': [
            'Dijkstra\'s Algorithm',
            'Huffman Coding'
        ]
    };

    return (
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
                    disabled={isLoading}
                    className={`w-full px-3 py-2 bg-slate-600 border border-slate-500 rounded-md focus:outline-none 
                    focus:ring-2 focus:ring-teal-400 ${selectedStrategy === '' ? 'text-gray-400' : 'text-white'} disabled:opacity-50`}
                >
                    <option value="" disabled hidden>
                        -- Select a Strategy --
                    </option>
                    <option value="brute-force">Brute Force</option>
                    <option value="decrease-conquer">Decrease and Conquer</option>
                    <option value="divide-conquer">Divide and Conquer</option>
                    <option value="greedy">Greedy</option>
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
                    disabled={!selectedStrategy || isLoading}
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
    );
};

export default ConfigurationSection; 