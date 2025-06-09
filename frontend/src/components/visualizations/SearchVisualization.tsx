import React, { useState, useEffect } from 'react';
import MetricCard from '../common/MetricCard';

interface SearchVisualizationProps {
    data: any;
    stepIndex?: number;
    isAnimating?: boolean;
    startAnimation?: () => void;
    resetAnimation?: () => void;
}

const SearchVisualization: React.FC<SearchVisualizationProps> = ({ 
    data, 
    stepIndex = 0, 
    isAnimating = false, 
    startAnimation, 
    resetAnimation 
}) => {
    const [currentStep, setCurrentStep] = useState(0);

    // Update current step when external stepIndex changes
    useEffect(() => {
        setCurrentStep(stepIndex);
    }, [stepIndex]);

    // Handle internal animation for binary search
    const handleInternalAnimation = () => {
        if (!data.steps || data.steps.length === 0) return;
        
        setCurrentStep(0);
        const interval = setInterval(() => {
            setCurrentStep(prev => {
                if (prev >= data.steps.length - 1) {
                    clearInterval(interval);
                    return prev;
                }
                return prev + 1;
            });
        }, 1500); // 1.5 seconds per step

        return () => clearInterval(interval);
    };

    const renderBinarySearchVisualization = () => {
        if (!data.steps || data.steps.length === 0) {
            return renderSimpleResult();
        }

        // Get the original array from the search context (try multiple possible locations)
        const array = data.array || data.original_array || data.input_array || [];
        const target = data.target || data.search_target;
        const steps = data.steps || [];
        const currentStepData = steps[currentStep] || steps[0];
        
        if (!currentStepData || currentStepData.length < 3) {
            return renderSimpleResult();
        }

        const [left, mid, right] = currentStepData;

        return (
            <div className="space-y-6">
                {/* Step Counter */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <h4 className="text-lg font-semibold text-teal-300">
                            🔍 Binary Search Animation
                        </h4>
                        <div className="bg-slate-600/50 px-3 py-1 rounded-full">
                            <span className="text-sm text-slate-300">
                                Step {currentStep + 1} of {steps.length}
                            </span>
                        </div>
                    </div>
                    <div className="flex space-x-2">
                        {!isAnimating && (
                            <button
                                onClick={startAnimation || handleInternalAnimation}
                                className="px-4 py-2 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white rounded-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-lg text-sm"
                            >
                                ▶ Animate
                            </button>
                        )}
                        <button
                            onClick={() => setCurrentStep(0)}
                            className="px-4 py-2 bg-gradient-to-r from-slate-500 to-slate-600 hover:from-slate-600 hover:to-slate-700 text-white rounded-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-lg text-sm"
                        >
                            ↺ Reset
                        </button>
                    </div>
                </div>

                {/* Search Info */}
                <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                        <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3">
                            <p className="text-blue-300 text-sm font-medium">Searching for</p>
                            <p className="text-white text-xl font-bold">{target}</p>
                        </div>
                        <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-3">
                            <p className="text-purple-300 text-sm font-medium">Array Size</p>
                            <p className="text-white text-xl font-bold">{array.length}</p>
                        </div>
                        <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-3">
                            <p className="text-orange-300 text-sm font-medium">Current Range</p>
                            <p className="text-white text-xl font-bold">{right - left + 1}</p>
                        </div>
                    </div>
                </div>

                {/* Array Visualization */}
                <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6">
                    <div className="flex justify-center">
                        <div className="grid gap-2" style={{ 
                            gridTemplateColumns: `repeat(${Math.min(array.length, 12)}, 1fr)`,
                            maxWidth: '100%',
                            overflowX: 'auto'
                        }}>
                            {array.slice(0, 12).map((value: any, index: number) => {
                                let cellStyle = "w-12 h-12 border-2 border-slate-600 rounded-lg flex items-center justify-center transition-all duration-500 text-white font-semibold text-sm";
                                
                                // Apply different styles based on the current search state
                                if (index < left || index > right) {
                                    // Outside search range - dimmed
                                    cellStyle += " bg-slate-700 opacity-40 scale-95";
                                } else if (index === mid) {
                                    // Current middle element being checked
                                    if (value === target) {
                                        cellStyle += " bg-gradient-to-br from-green-500 to-green-600 border-green-400 shadow-lg shadow-green-500/50 scale-110 animate-pulse";
                                    } else if (value < target) {
                                        cellStyle += " bg-gradient-to-br from-orange-500 to-orange-600 border-orange-400 shadow-lg shadow-orange-500/50 scale-105";
                                    } else {
                                        cellStyle += " bg-gradient-to-br from-blue-500 to-blue-600 border-blue-400 shadow-lg shadow-blue-500/50 scale-105";
                                    }
                                } else if (index === left) {
                                    // Left boundary
                                    cellStyle += " bg-gradient-to-br from-purple-500 to-purple-600 border-purple-400 shadow-lg shadow-purple-500/30";
                                } else if (index === right) {
                                    // Right boundary
                                    cellStyle += " bg-gradient-to-br from-cyan-500 to-cyan-600 border-cyan-400 shadow-lg shadow-cyan-500/30";
                                } else {
                                    // In search range but not current focus
                                    cellStyle += " bg-gradient-to-br from-slate-500 to-slate-600 border-slate-400";
                                }

                                return (
                                    <div key={index} className={cellStyle}>
                                        {value}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    
                    {array.length > 12 && (
                        <p className="text-center text-slate-400 text-sm mt-4">
                            Showing first 12 elements of {array.length} total
                        </p>
                    )}
                </div>

                {/* Legend */}
                <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-4">
                    <h5 className="text-sm font-semibold text-slate-300 mb-3">Legend</h5>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-3 text-xs">
                        <div className="flex items-center space-x-2">
                            <div className="w-4 h-4 bg-gradient-to-br from-purple-500 to-purple-600 rounded border border-purple-400"></div>
                            <span className="text-slate-300">Left Bound</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <div className="w-4 h-4 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded border border-cyan-400"></div>
                            <span className="text-slate-300">Right Bound</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <div className="w-4 h-4 bg-gradient-to-br from-green-500 to-green-600 rounded border border-green-400"></div>
                            <span className="text-slate-300">Found Target</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <div className="w-4 h-4 bg-gradient-to-br from-orange-500 to-orange-600 rounded border border-orange-400"></div>
                            <span className="text-slate-300">Mid {'<'} Target</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <div className="w-4 h-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded border border-blue-400"></div>
                            <span className="text-slate-300">Mid {'>'} Target</span>
                        </div>
                    </div>
                </div>

                {/* Step Details */}
                <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-4">
                    <h5 className="text-sm font-semibold text-slate-300 mb-3">Step Details</h5>
                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                            <span className="text-slate-400">Left Index:</span>
                            <span className="text-purple-300 font-mono">{left}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-slate-400">Right Index:</span>
                            <span className="text-cyan-300 font-mono">{right}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-slate-400">Mid Index:</span>
                            <span className="text-white font-mono font-bold">{mid}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-slate-400">Mid Value:</span>
                            <span className="text-white font-mono font-bold">{array[mid]}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-slate-400">Target:</span>
                            <span className="text-blue-300 font-mono font-bold">{target}</span>
                        </div>
                        {currentStep === steps.length - 1 && (
                            <div className="flex justify-between pt-2 border-t border-slate-600">
                                <span className="text-slate-400">Result:</span>
                                <span className={`font-mono font-bold ${data.found ? 'text-green-300' : 'text-red-300'}`}>
                                    {data.found ? `Found at index ${data.index}` : 'Not Found'}
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    };

    const renderLinearSearchVisualization = () => {
        return (
            <div className="space-y-4 h-full flex flex-col">
                <h4 className="text-lg font-semibold text-teal-300 mb-4">🔍 Linear Search Results</h4>
                <div className="flex-1 flex items-center">
                    {renderSimpleResult()}
                </div>
            </div>
        );
    };

    const renderSimpleResult = () => {
        return (
            <div className={`text-center p-8 md:p-12 rounded-xl mb-4 border-2 transition-all duration-300 flex flex-col justify-center min-h-[400px] ${
                data.found 
                    ? 'bg-green-500/10 border-green-400/50 backdrop-blur-sm' 
                    : 'bg-red-500/10 border-red-400/50 backdrop-blur-sm'
            }`}>
                <div className="text-8xl md:text-9xl mb-6 animate-scaleIn">
                    {data.found ? '🎯' : '❌'}
                </div>
                <p className={`text-4xl md:text-5xl font-bold mb-4 ${data.found ? 'text-green-300' : 'text-red-300'}`}>
                    {data.found ? `Found at index ${data.index}` : 'Not found'}
                </p>
                <p className="text-slate-400 text-lg md:text-xl">
                    {data.found 
                        ? `Target found after ${data.comparisons || 'N/A'} comparison(s)`
                        : `Target not found after searching ${data.comparisons || 'N/A'} element(s)`
                    }
                </p>
            </div>
        );
    };

    return (
        <div className="bg-slate-700/30 backdrop-blur-sm rounded-xl border border-slate-600/50 p-6 space-y-6 h-full">
            {/* Algorithm Detection and Rendering */}
            {data.algorithm === 'Binary Search' ? renderBinarySearchVisualization() : renderLinearSearchVisualization()}

            {/* Metrics Section */}
            {data.comparisons && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <MetricCard
                        title="Comparisons Made"
                        value={data.comparisons}
                        icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>}
                        color="orange"
                    />
                    <MetricCard
                        title="Execution Time"
                        value={data.execution_time ? `${data.execution_time.toFixed(3)}ms` : 'N/A'}
                        icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>}
                        color="blue"
                    />
                </div>
            )}
        </div>
    );
};

export default SearchVisualization; 