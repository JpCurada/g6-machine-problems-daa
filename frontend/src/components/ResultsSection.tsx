import React from 'react';
import MetricCard from './common/MetricCard';
import SortingVisualization from './visualizations/SortingVisualization';
import InsertionSortVisualization from './visualizations/InsertionSortVisualization';
import SearchVisualization from './visualizations/SearchVisualization';
import JosephusVisualization from './visualizations/JosephusVisualization';
import RussianMultiplicationVisualization from './visualizations/RussianMultiplicationVisualization';

interface ResultsSectionProps {
    selectedAlgorithm: string;
    currentResult: {
        data: any;
        loading: boolean;
        error: string | null;
    };
    stepIndex: number;
    isAnimating: boolean;
    startAnimation: () => void;
    resetAnimation: () => void;
}

const ResultsSection: React.FC<ResultsSectionProps> = ({
    selectedAlgorithm,
    currentResult,
    stepIndex,
    isAnimating,
    startAnimation,
    resetAnimation
}) => {
    if (currentResult.loading) {
        return (
            <div className="flex items-center justify-center h-full">
                <div className="text-center">
                    <div className="relative">
                        <div className="animate-spin rounded-full h-16 w-16 border-4 border-teal-200 border-t-white mx-auto"></div>
                        <div className="absolute inset-0 rounded-full h-16 w-16 border-4 border-transparent border-t-teal-400 animate-spin animation-delay-75 mx-auto"></div>
                    </div>
                    <p className="text-white mt-4 animate-pulse">Running {selectedAlgorithm}...</p>
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
                <div className="mt-4 text-sm text-red-200">
                    <p>💡 Tips:</p>
                    <ul className="list-disc list-inside mt-2 space-y-1">
                        <li>Check your input format</li>
                        <li>Ensure all required fields are filled</li>
                        <li>Verify data types match expected format</li>
                    </ul>
                </div>
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
                        {selectedAlgorithm || 'Algorithm Visualization'}
                    </h3>
                    <p className="text-gray-300">Configure your inputs and click simulate to see the magic happen!</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-slate-700 bg-opacity-50 rounded-lg p-4 border border-teal-400/30">
                        <h4 className="text-teal-300 font-semibold mb-2">🚀 Ready to Simulate</h4>
                        <p className="text-sm text-gray-300">Configure inputs and start the simulation</p>
                    </div>
                    <div className="bg-slate-700 bg-opacity-50 rounded-lg p-4 border border-blue-400/30">
                        <h4 className="text-blue-300 font-semibold mb-2">📊 Detailed Analysis</h4>
                        <p className="text-sm text-gray-300">Get step-by-step breakdowns and performance metrics</p>
                    </div>
                </div>
            </div>
        );
    }

    const data = currentResult.data;

    return (
        <div className="text-white space-y-6 animate-fadeIn">
            {/* Header with algorithm info and metrics */}
            <div className="bg-gradient-to-r from-slate-700 to-slate-600 rounded-lg p-6 border border-teal-400/50 shadow-xl">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-2xl font-bold text-teal-200 flex items-center">
                        <div className="w-3 h-3 bg-green-400 rounded-full mr-3 animate-pulse"></div>
                        {selectedAlgorithm}
                    </h3>
                    <div className="flex items-center text-sm text-green-300 bg-green-900/30 px-3 py-1 rounded-full">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Execution Complete
                    </div>
                </div>
                
                {/* Primary Metrics */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <MetricCard
                        title="Execution Time"
                        value={data.execution_time ? `${data.execution_time.toFixed(3)}ms` : 'N/A'}
                        icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
                        color="blue"
                    />
                    
                    {(data.steps || data.comparisons) && (
                        <MetricCard
                            title={data.steps ? "Total Steps" : "Comparisons"}
                            value={data.steps ? data.steps.length : data.comparisons}
                            icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>}
                            color="purple"
                        />
                    )}
                    
                    {(data.metadata?.input_size || data.length || data.people_count) && (
                        <MetricCard
                            title="Input Size"
                            value={data.metadata?.input_size || data.length || data.people_count || 'N/A'}
                            icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" /></svg>}
                            color="green"
                        />
                    )}
                    
                    {(data.result !== undefined || data.found !== undefined || data.product !== undefined || data.survivor !== undefined) && (
                        <MetricCard
                            title="Result"
                            value={
                                data.found !== undefined ? (data.found ? `Found at ${data.index}` : 'Not Found') :
                                data.product !== undefined ? data.product :
                                data.survivor !== undefined ? `Survivor: ${data.survivor}` :
                                data.result ? 'Success' : 'N/A'
                            }
                            icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
                            color="teal"
                        />
                    )}
                </div>
            </div>

            {/* Algorithm-specific visualizations */}
            {selectedAlgorithm === 'Insertion Sort' && (
                <div className="space-y-4">
                    <InsertionSortVisualization
                        data={data}
                        stepIndex={stepIndex}
                        isAnimating={isAnimating}
                        startAnimation={startAnimation}
                        resetAnimation={resetAnimation}
                    />
                </div>
            )}

            {(selectedAlgorithm === 'Bubble Sort' || selectedAlgorithm === 'Selection Sort' || selectedAlgorithm === 'Quick Sort') && (
                <div className="space-y-4">
                    <SortingVisualization
                        data={data}
                        stepIndex={stepIndex}
                        isAnimating={isAnimating}
                        startAnimation={startAnimation}
                        resetAnimation={resetAnimation}
                    />
                    
                    {/* Sorting-specific metrics */}
                    <div className="bg-slate-700 bg-opacity-30 rounded-lg p-4">
                        <h4 className="text-lg font-semibold text-teal-300 mb-3">📈 Sorting Metrics</h4>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {data.swaps && (
                                <MetricCard
                                    title="Swaps"
                                    value={data.swaps}
                                    icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>}
                                    color="orange"
                                />
                            )}
                            {data.comparisons && (
                                <MetricCard
                                    title="Comparisons"
                                    value={data.comparisons}
                                    icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>}
                                    color="red"
                                />
                            )}
                            <MetricCard
                                title="Time Complexity"
                                value={
                                    selectedAlgorithm === 'Bubble Sort' ? 'O(n²)' :
                                    selectedAlgorithm === 'Selection Sort' ? 'O(n²)' :
                                    selectedAlgorithm === 'Quick Sort' ? 'O(n log n)' : 'O(n²)'
                                }
                                icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>}
                                color="cyan"
                            />
                            <MetricCard
                                title="Space Complexity"
                                value={selectedAlgorithm === 'Quick Sort' ? 'O(log n)' : 'O(1)'}
                                icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>}
                                color="indigo"
                            />
                        </div>
                    </div>

                    {/* Enhanced Step-by-Step Display for Sorting */}
                    {data.steps && data.steps.length > 0 && (
                        <div className="bg-slate-700 bg-opacity-30 rounded-lg p-4">
                            <h4 className="text-lg font-semibold text-teal-300 mb-3 flex items-center">
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                                Step-by-Step Execution
                            </h4>
                            <div className="space-y-2 max-h-64 overflow-y-auto">
                                {data.steps.slice(0, stepIndex + 1).map((step: any, index: number) => (
                                    <div
                                        key={index}
                                        className={`flex items-center p-3 rounded-lg transition-all duration-500 ${
                                            index === stepIndex ? 
                                            'bg-teal-500 bg-opacity-20 border border-teal-400 animate-pulse' : 
                                            'bg-slate-600 bg-opacity-30'
                                        }`}
                                    >
                                        <div className="flex-shrink-0 w-8 h-8 bg-teal-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                                            {index + 1}
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-white text-sm">{step.description || step}</p>
                                            {step.array && (
                                                <div className="flex space-x-1 mt-2">
                                                    {step.array.map((value: number, idx: number) => (
                                                        <div
                                                            key={idx}
                                                            className={`w-8 h-8 flex items-center justify-center rounded text-xs font-bold transition-colors duration-300 ${
                                                                step.comparing && step.comparing.includes(idx) ? 
                                                                'bg-yellow-500 text-black' :
                                                                step.swapping && step.swapping.includes(idx) ?
                                                                'bg-red-500 text-white' :
                                                                'bg-slate-500 text-white'
                                                            }`}
                                                        >
                                                            {value}
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* Dijkstra's Algorithm Visualization */}
            {selectedAlgorithm === 'Dijkstra\'s Algorithm' && (
                <div className="space-y-4">
                    <div className="bg-slate-700 bg-opacity-30 rounded-lg p-6">
                        <h4 className="text-lg font-semibold text-teal-300 mb-4 flex items-center">
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 4m0 13V4m0 0L9 7" />
                            </svg>
                            🗺️ Shortest Path Results
                        </h4>

                        {/* Distance Results */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                            <div className="bg-green-500 bg-opacity-20 rounded-lg p-4 border border-green-400">
                                <h5 className="font-semibold text-green-300 mb-3">📍 Shortest Distances</h5>
                                <div className="space-y-2">
                                    {data.distances && Object.entries(data.distances).map(([vertex, distance]: [string, any]) => (
                                        <div key={vertex} className="flex justify-between items-center bg-slate-600 bg-opacity-50 rounded px-3 py-2">
                                            <span className="font-medium text-white">To {vertex}:</span>
                                            <span className="font-bold text-green-300">
                                                {distance === Infinity ? '∞' : distance}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-blue-500 bg-opacity-20 rounded-lg p-4 border border-blue-400">
                                <h5 className="font-semibold text-blue-300 mb-3">🛤️ Optimal Paths</h5>
                                <div className="space-y-2">
                                    {data.paths && Object.entries(data.paths).map(([vertex, path]: [string, any]) => (
                                        <div key={vertex} className="bg-slate-600 bg-opacity-50 rounded p-2">
                                            <span className="text-sm text-gray-300">To {vertex}:</span>
                                            <p className="font-mono text-blue-300 text-sm">
                                                {Array.isArray(path) ? path.join(' → ') : 'No path'}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Algorithm Metrics */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <MetricCard
                                title="Start Vertex"
                                value={data.start_vertex || 'N/A'}
                                icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>}
                                color="green"
                            />
                            <MetricCard
                                title="Vertices"
                                value={data.vertices_count || Object.keys(data.distances || {}).length}
                                icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>}
                                color="blue"
                            />
                            <MetricCard
                                title="Algorithm Steps"
                                value={data.steps?.length || 0}
                                icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>}
                                color="purple"
                            />
                            <MetricCard
                                title="Time Complexity"
                                value="O((V+E)log V)"
                                icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>}
                                color="cyan"
                            />
                        </div>

                        {/* Step-by-Step Execution */}
                        {data.steps && data.steps.length > 0 && (
                            <div className="mt-6">
                                <h5 className="text-lg font-semibold text-teal-300 mb-3 flex items-center">
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                    Algorithm Steps
                                </h5>
                                <div className="space-y-2 max-h-64 overflow-y-auto">
                                    {data.steps.slice(0, stepIndex + 1).map((step: any, index: number) => (
                                        <div
                                            key={index}
                                            className={`flex items-center p-3 rounded-lg transition-all duration-500 ${
                                                index === stepIndex ? 
                                                'bg-teal-500 bg-opacity-20 border border-teal-400 animate-pulse' : 
                                                'bg-slate-600 bg-opacity-30'
                                            }`}
                                        >
                                            <div className="flex-shrink-0 w-8 h-8 bg-teal-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                                                {index + 1}
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-white text-sm">{step.description || step}</p>
                                                {step.distances && (
                                                    <div className="mt-2 text-xs text-gray-300">
                                                        Current distances: {JSON.stringify(step.distances)}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Huffman Coding Visualization */}
            {selectedAlgorithm === 'Huffman Coding' && (
                <div className="space-y-4">
                    <div className="bg-slate-700 bg-opacity-30 rounded-lg p-6">
                        <h4 className="text-lg font-semibold text-teal-300 mb-4 flex items-center">
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            🗜️ Huffman Encoding Results
                        </h4>

                        {/* Encoding Results */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                            <div className="bg-green-500 bg-opacity-20 rounded-lg p-4 border border-green-400">
                                <h5 className="font-semibold text-green-300 mb-3">📝 Character Codes</h5>
                                <div className="space-y-2 max-h-32 overflow-y-auto">
                                    {data.codes && Object.entries(data.codes).map(([char, code]: [string, any]) => (
                                        <div key={char} className="flex justify-between items-center bg-slate-600 bg-opacity-50 rounded px-3 py-2">
                                            <span className="font-bold text-white">'{char}':</span>
                                            <span className="font-mono text-green-300">{code}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-blue-500 bg-opacity-20 rounded-lg p-4 border border-blue-400">
                                <h5 className="font-semibold text-blue-300 mb-3">📊 Character Frequencies</h5>
                                <div className="space-y-2 max-h-32 overflow-y-auto">
                                    {data.character_frequencies && Object.entries(data.character_frequencies).map(([char, freq]: [string, any]) => (
                                        <div key={char} className="flex justify-between items-center bg-slate-600 bg-opacity-50 rounded px-3 py-2">
                                            <span className="font-bold text-white">'{char}':</span>
                                            <span className="text-blue-300">{freq}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Encoded Message */}
                        <div className="bg-purple-500 bg-opacity-20 rounded-lg p-4 border border-purple-400 mb-6">
                            <h5 className="font-semibold text-purple-300 mb-3">🔐 Encoded Message</h5>
                            <div className="bg-slate-800 rounded p-3 font-mono text-sm text-white break-all">
                                {data.encoded_message || 'N/A'}
                            </div>
                        </div>

                        {/* Compression Metrics */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <MetricCard
                                title="Original Size"
                                value={`${data.original_length || 0} bits`}
                                icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>}
                                color="red"
                            />
                            <MetricCard
                                title="Compressed Size"
                                value={`${data.encoded_length || 0} bits`}
                                icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>}
                                color="green"
                            />
                            <MetricCard
                                title="Compression Ratio"
                                value={`${data.compression_ratio?.toFixed(1) || 0}%`}
                                icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>}
                                color="purple"
                            />
                            <MetricCard
                                title="Time Complexity"
                                value="O(n log n)"
                                icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>}
                                color="cyan"
                            />
                        </div>

                        {/* Step-by-Step Tree Building */}
                        {data.steps && data.steps.length > 0 && (
                            <div className="mt-6">
                                <h5 className="text-lg font-semibold text-teal-300 mb-3 flex items-center">
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                                    </svg>
                                    Tree Building Steps
                                </h5>
                                <div className="space-y-2 max-h-64 overflow-y-auto">
                                    {data.steps.slice(0, stepIndex + 1).map((step: any, index: number) => (
                                        <div
                                            key={index}
                                            className={`flex items-center p-3 rounded-lg transition-all duration-500 ${
                                                index === stepIndex ? 
                                                'bg-teal-500 bg-opacity-20 border border-teal-400 animate-pulse' : 
                                                'bg-slate-600 bg-opacity-30'
                                            }`}
                                        >
                                            <div className="flex-shrink-0 w-8 h-8 bg-teal-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                                                {index + 1}
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-white text-sm">{step.description || step}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Strassen Matrix Multiplication Visualization */}
            {selectedAlgorithm === 'Strassen Matrix Multiplication' && (
                <div className="space-y-4">
                    <div className="bg-slate-700 bg-opacity-30 rounded-lg p-6">
                        <h4 className="text-lg font-semibold text-teal-300 mb-4 flex items-center">
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
                            </svg>
                            ⚡ Matrix Multiplication Results
                        </h4>

                        {/* Result Matrix Display */}
                        <div className="bg-green-500 bg-opacity-20 rounded-lg p-4 border border-green-400 mb-6">
                            <h5 className="font-semibold text-green-300 mb-3">📊 Result Matrix</h5>
                            <div className="overflow-x-auto">
                                <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${data.result_matrix?.[0]?.length || 1}, minmax(0, 1fr))` }}>
                                    {data.result_matrix?.flat().map((value: number, index: number) => (
                                        <div
                                            key={index}
                                            className="w-12 h-12 bg-slate-600 flex items-center justify-center rounded font-bold text-white border border-green-400"
                                        >
                                            {value}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Algorithm Metrics */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <MetricCard
                                title="Method Used"
                                value={data.method || 'Strassen'}
                                icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /></svg>}
                                color="blue"
                            />
                            <MetricCard
                                title="Matrix Size"
                                value={`${data.matrix_size || 0}×${data.matrix_size || 0}`}
                                icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" /></svg>}
                                color="green"
                            />
                            <MetricCard
                                title="Operations"
                                value={data.operations_count || 0}
                                icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>}
                                color="purple"
                            />
                            <MetricCard
                                title="Time Complexity"
                                value="O(n^2.807)"
                                icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>}
                                color="cyan"
                            />
                        </div>

                        {/* Step-by-Step Execution */}
                        {data.steps && data.steps.length > 0 && (
                            <div className="mt-6">
                                <h5 className="text-lg font-semibold text-teal-300 mb-3 flex items-center">
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                    Multiplication Steps
                                </h5>
                                <div className="space-y-2 max-h-64 overflow-y-auto">
                                    {data.steps.slice(0, stepIndex + 1).map((step: any, index: number) => (
                                        <div
                                            key={index}
                                            className={`flex items-center p-3 rounded-lg transition-all duration-500 ${
                                                index === stepIndex ? 
                                                'bg-teal-500 bg-opacity-20 border border-teal-400 animate-pulse' : 
                                                'bg-slate-600 bg-opacity-30'
                                            }`}
                                        >
                                            <div className="flex-shrink-0 w-8 h-8 bg-teal-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                                                {index + 1}
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-white text-sm">{step.description || step}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Algorithm metadata and complexity analysis */}
            {data.metadata && (
                <div className="bg-slate-700 bg-opacity-30 rounded-lg p-6">
                    <h4 className="text-lg font-semibold text-teal-300 mb-4 flex items-center">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                        Algorithm Metadata
                    </h4>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {Object.entries(data.metadata).map(([key, value]: [string, any], index: number) => (
                            <div 
                                key={key}
                                className="bg-slate-600 bg-opacity-50 rounded-lg p-4 animate-fadeIn border border-slate-500/30"
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                <p className="text-xs text-gray-300 uppercase tracking-wide font-semibold mb-1">
                                    {key.replace(/_/g, ' ')}
                                </p>
                                <p className="text-lg font-bold text-white">
                                    {typeof value === 'boolean' ? (value ? '✅' : '❌') : String(value)}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Performance summary */}
            <div className="bg-gradient-to-r from-teal-600 to-blue-600 rounded-lg p-6 text-center shadow-xl">
                <h4 className="text-2xl font-bold text-white mb-3 flex items-center justify-center">
                    tapos na ^_^
                </h4>
                <p className="text-teal-100 text-lg">
                    {selectedAlgorithm} executed successfully in <span className="font-bold">{data.execution_time?.toFixed(3)}ms</span>
                </p>
                {data.steps && (
                    <p className="text-teal-100 text-sm mt-2">
                        Processed through <span className="font-semibold">{data.steps.length}</span> computational steps
                    </p>
                )}

            </div>

            {(selectedAlgorithm === 'Sequential Search' || selectedAlgorithm === 'Binary Search') && (
                <div className="space-y-4">
                    <SearchVisualization 
                        data={data} 
                        stepIndex={stepIndex}
                        isAnimating={isAnimating}
                        startAnimation={startAnimation}
                        resetAnimation={resetAnimation}
                    />
                    
                    {/* Search-specific metrics */}
                    <div className="bg-slate-700 bg-opacity-30 rounded-lg p-4">
                        <h4 className="text-lg font-semibold text-teal-300 mb-3">🔍 Search Analysis</h4>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <MetricCard
                                title="Search Result"
                                value={data.found ? `Found at index ${data.index}` : 'Not Found'}
                                icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>}
                                color={data.found ? "green" : "red"}
                            />
                            {data.comparisons && (
                                <MetricCard
                                    title="Comparisons"
                                    value={data.comparisons}
                                    icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>}
                                    color="orange"
                                />
                            )}
                            <MetricCard
                                title="Time Complexity"
                                value={selectedAlgorithm === 'Binary Search' ? 'O(log n)' : 'O(n)'}
                                icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>}
                                color="purple"
                            />
                            <MetricCard
                                title="Space Complexity"
                                value="O(1)"
                                icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>}
                                color="blue"
                            />
                        </div>
                    </div>
                </div>
            )}

            {selectedAlgorithm === 'Josephus Problem' && (
                <div className="space-y-4">
                    <JosephusVisualization
                        peopleCount={data.people_count}
                        eliminationOrder={data.elimination_order}
                        currentStep={stepIndex}
                        isAnimating={isAnimating}
                        startAnimation={startAnimation}
                        resetAnimation={resetAnimation}
                    />
                    
                    {/* Josephus-specific details */}
                    <div className="bg-slate-700 bg-opacity-30 rounded-lg p-4">
                        <h4 className="text-lg font-semibold text-teal-300 mb-3">👥 Josephus Analysis</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div className="bg-slate-600 bg-opacity-50 rounded-lg p-3">
                                <p className="text-sm text-gray-300">Elimination Order:</p>
                                <p className="text-lg font-mono text-white">
                                    {data.elimination_order?.join(', ') || 'N/A'}
                                </p>
                            </div>
                            <div className="bg-slate-600 bg-opacity-50 rounded-lg p-3">
                                <p className="text-sm text-gray-300">Survivor:</p>
                                <p className="text-lg font-bold text-green-300">
                                    Person {data.survivor || 'N/A'}
                                </p>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <MetricCard
                                title="Total People"
                                value={data.people_count || 0}
                                icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" /></svg>}
                                color="blue"
                            />
                            <MetricCard
                                title="Elimination Interval"
                                value={data.interval || 0}
                                icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
                                color="orange"
                            />
                            <MetricCard
                                title="Eliminations"
                                value={data.elimination_order?.length || 0}
                                icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>}
                                color="red"
                            />
                            <MetricCard
                                title="Time Complexity"
                                value="O(n)"
                                icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>}
                                color="purple"
                            />
                        </div>
                    </div>
                </div>
            )}

            {selectedAlgorithm === 'Russian Multiplication Method' && (
                <div className="space-y-4">
                    <RussianMultiplicationVisualization data={data} />
                    
                    {/* Russian Multiplication details */}
                    <div className="bg-slate-700 bg-opacity-30 rounded-lg p-4">
                        <h4 className="text-lg font-semibold text-teal-300 mb-3">🔢 Multiplication Analysis</h4>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <MetricCard
                                title="First Number"
                                value={data.multiplier || 0}
                                icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" /></svg>}
                                color="blue"
                            />
                            <MetricCard
                                title="Second Number"
                                value={data.multiplicand || 0}
                                icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" /></svg>}
                                color="green"
                            />
                            <MetricCard
                                title="Final Product"
                                value={data.product || 0}
                                icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
                                color="teal"
                            />
                            <MetricCard
                                title="Steps Count"
                                value={data.steps_count || 0}
                                icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>}
                                color="purple"
                            />
                        </div>
                    </div>
                </div>
            )}

            {/* TSP and Knapsack specific displays */}
            {(selectedAlgorithm === 'Travelling Salesman Problem' || selectedAlgorithm === 'Knapsack Problem') && (
                <div className="space-y-4">
                    <div className="bg-slate-700 bg-opacity-30 rounded-lg p-6">
                        <h4 className="text-lg font-semibold text-teal-300 mb-4 flex items-center">
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {selectedAlgorithm} Results
                        </h4>
                        
                        {/* TSP Results */}
                        {selectedAlgorithm === 'Travelling Salesman Problem' && (
                            <div className="space-y-4">
                                <div className="bg-green-500 bg-opacity-20 rounded-lg p-4 border border-green-400">
                                    <h5 className="font-semibold text-green-300 mb-2">🗺️ Optimal Route</h5>
                                    <p className="text-xl font-mono text-white">
                                        {data.optimal_path?.join(' → ') || 'N/A'}
                                    </p>
                                    <p className="text-sm text-green-200 mt-2">
                                        Total Distance: <span className="font-bold">{data.min_distance || 'N/A'}</span>
                                    </p>
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <MetricCard
                                        title="Minimum Distance"
                                        value={data.min_distance || 0}
                                        icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" /></svg>}
                                        color="green"
                                    />
                                    <MetricCard
                                        title="Cities Visited"
                                        value={data.optimal_path?.length || 0}
                                        icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /></svg>}
                                        color="blue"
                                    />
                                    <MetricCard
                                        title="Time Complexity"
                                        value="O(n!)"
                                        icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>}
                                        color="red"
                                    />
                                </div>
                            </div>
                        )}

                        {/* Knapsack Results */}
                        {selectedAlgorithm === 'Knapsack Problem' && (
                            <div className="space-y-4">
                                <div className="bg-yellow-500 bg-opacity-20 rounded-lg p-4 border border-yellow-400">
                                    <h5 className="font-semibold text-yellow-300 mb-2">🎒 Optimal Selection</h5>
                                    <div className="space-y-2">
                                        {data.best_items?.map((item: any, index: number) => (
                                            <div key={index} className="bg-yellow-600 bg-opacity-30 rounded p-2">
                                                <span className="font-mono text-white">
                                                    {item} (Value: {data.best_value})
                                                </span>
                                            </div>
                                        )) || <p className="text-gray-300">No items selected</p>}
                                    </div>
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                    <MetricCard
                                        title="Maximum Value"
                                        value={data.best_value || 0}
                                        icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" /></svg>}
                                        color="yellow"
                                    />
                                    <MetricCard
                                        title="Total Weight"
                                        value={data.total_weight || 0}
                                        icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" /></svg>}
                                        color="orange"
                                    />
                                    <MetricCard
                                        title="Items Selected"
                                        value={data.best_items?.length || 0}
                                        icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>}
                                        color="green"
                                    />
                                    <MetricCard
                                        title="Items Count"
                                        value={data.items_count || 0}
                                        icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>}
                                        color="blue"
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ResultsSection; 