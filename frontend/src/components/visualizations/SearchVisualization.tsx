import React, { useState, useEffect } from 'react';
import MetricCard from '../common/MetricCard';

// Add custom animations
const customStyles = `
@keyframes slideInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes scaleIn {
    from {
        opacity: 0;
        transform: scale(0.8);
    }
    to {
        opacity: 1;
        transform: scale(1);
    }
}

@keyframes glow {
    0%, 100% {
        box-shadow: 0 0 5px rgba(56, 178, 172, 0.5);
    }
    50% {
        box-shadow: 0 0 20px rgba(56, 178, 172, 0.8), 0 0 30px rgba(56, 178, 172, 0.6);
    }
}

.animate-slideInUp {
    animation: slideInUp 0.6s ease-out forwards;
}

.animate-scaleIn {
    animation: scaleIn 0.5s ease-out forwards;
}

.animate-glow {
    animation: glow 2s ease-in-out infinite;
}
`;

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
    const [internalAnimating, setInternalAnimating] = useState(false);

    // Update current step when external stepIndex changes
    useEffect(() => {
        setCurrentStep(stepIndex);
    }, [stepIndex]);

    // Handle internal animation for binary search
    const handleInternalAnimation = () => {
        if (!data.steps || data.steps.length === 0) {
            return;
        }
        
        setCurrentStep(0);
        setInternalAnimating(true);
        
        let step = 0;
        const interval = setInterval(() => {
            step++;
            if (step >= data.steps.length) {
                clearInterval(interval);
                setInternalAnimating(false);
                return;
            }
            setCurrentStep(step);
        }, 2000); // 2 seconds per step for better visibility

        return () => {
            clearInterval(interval);
            setInternalAnimating(false);
        };
    };

    const renderBinarySearchVisualization = () => {
        if (!data.steps || data.steps.length === 0) {
            return renderSimpleResult();
        }

        // Get the original array from the search context (try multiple possible locations)
        const array = data.array || data.original_array || data.input_array || [];
        const target = data.target || data.search_target;
        const steps = data.steps || [];
        
        if (steps.length === 0) {
            return renderSimpleResult();
        }
        
        const currentStepData = steps[currentStep] || steps[0];
        
        if (!currentStepData || currentStepData.length < 3) {
            return renderSimpleResult();
        }

        const [left, mid, right] = currentStepData;

        return (
            <div className="bg-slate-700/30 backdrop-blur-sm rounded-xl border border-slate-600/50 p-6 space-y-6">
                {/* Header with controls */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <h4 className="text-xl font-bold text-teal-300 flex items-center">
                            Binary Search Visualization
                        </h4>
                        <div className="bg-slate-600/50 px-4 py-2 rounded-full border border-slate-500/50">
                            <span className="text-sm text-slate-300 font-medium">
                                Step {currentStep + 1} of {steps.length}
                            </span>
                        </div>
                    </div>
                    <div className="flex space-x-3">
                        {!isAnimating && !internalAnimating && (
                            <button
                                onClick={startAnimation || handleInternalAnimation}
                                className="px-6 py-3 bg-gradient-to-r from-teal-500 via-cyan-500 to-teal-500 hover:from-teal-600 hover:via-cyan-600 hover:to-teal-600 text-white rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-xl text-sm flex items-center space-x-2"
                            >
                                <span>▶</span>
                                <span>Animate</span>
                            </button>
                        )}
                        {(isAnimating || internalAnimating) && (
                            <button
                                onClick={() => {
                                    setCurrentStep(0);
                                    setInternalAnimating(false);
                                    resetAnimation?.();
                                }}
                                className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-xl text-sm flex items-center space-x-2"
                            >
                                <span>⏹</span>
                                <span>Stop</span>
                            </button>
                        )}
                        <button
                            onClick={() => {
                                setCurrentStep(0);
                                setInternalAnimating(false);
                                resetAnimation?.();
                            }}
                            className="px-6 py-3 bg-gradient-to-r from-slate-500 to-slate-600 hover:from-slate-600 hover:to-slate-700 text-white rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-xl text-sm flex items-center space-x-2"
                        >
                            <span>↺</span>
                            <span>Reset</span>
                        </button>
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-slate-300 font-medium">Search Progress</span>
                        <span className="text-teal-300 font-mono text-sm">{Math.round(((currentStep + 1) / steps.length) * 100)}%</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-3 overflow-hidden">
                        <div 
                            className="bg-gradient-to-r from-teal-400 via-cyan-400 to-teal-400 h-3 rounded-full transition-all duration-500 shadow-lg"
                            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                        ></div>
                    </div>
                </div>

                {/* Search Info Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="bg-gradient-to-br from-blue-500/20 via-blue-600/20 to-blue-700/20 border border-blue-400/50 rounded-xl p-4 backdrop-blur-sm">
                        <div className="flex items-center space-x-2 mb-2">
                            <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
                            <p className="text-blue-300 text-sm font-semibold">Target</p>
                        </div>
                        <p className="text-white text-2xl font-bold">{target}</p>
                    </div>
                    <div className="bg-gradient-to-br from-purple-500/20 via-purple-600/20 to-purple-700/20 border border-purple-400/50 rounded-xl p-4 backdrop-blur-sm">
                        <div className="flex items-center space-x-2 mb-2">
                            <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
                            <p className="text-purple-300 text-sm font-semibold">Array Size</p>
                        </div>
                        <p className="text-white text-2xl font-bold">{array.length}</p>
                    </div>
                    <div className="bg-gradient-to-br from-orange-500/20 via-orange-600/20 to-orange-700/20 border border-orange-400/50 rounded-xl p-4 backdrop-blur-sm">
                        <div className="flex items-center space-x-2 mb-2">
                            <div className="w-3 h-3 bg-orange-400 rounded-full"></div>
                            <p className="text-orange-300 text-sm font-semibold">Search Range</p>
                        </div>
                        <p className="text-white text-2xl font-bold">{right - left + 1}</p>
                    </div>
                    <div className="bg-gradient-to-br from-cyan-500/20 via-cyan-600/20 to-cyan-700/20 border border-cyan-400/50 rounded-xl p-4 backdrop-blur-sm">
                        <div className="flex items-center space-x-2 mb-2">
                            <div className="w-3 h-3 bg-cyan-400 rounded-full"></div>
                            <p className="text-cyan-300 text-sm font-semibold">Mid Value</p>
                        </div>
                        <p className="text-white text-2xl font-bold">{array[mid]}</p>
                    </div>
                </div>

                {/* Enhanced Array Visualization */}
                <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-8">
                    <div className="flex items-center justify-between mb-6">
                        <h5 className="text-lg font-semibold text-slate-300">Array Elements</h5>
                        <div className="flex space-x-4 text-xs">
                            <div className="flex items-center space-x-1">
                                <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-purple-600 rounded"></div>
                                <span className="text-slate-300">Left</span>
                            </div>
                            <div className="flex items-center space-x-1">
                                <div className="w-3 h-3 bg-gradient-to-r from-cyan-500 to-cyan-600 rounded"></div>
                                <span className="text-slate-300">Right</span>
                            </div>
                            <div className="flex items-center space-x-1">
                                <div className="w-3 h-3 bg-gradient-to-r from-yellow-400 to-amber-500 rounded"></div>
                                <span className="text-slate-300">Mid</span>
                            </div>
                            <div className="flex items-center space-x-1">
                                <div className="w-3 h-3 bg-gradient-to-r from-green-500 to-green-600 rounded"></div>
                                <span className="text-slate-300">Found</span>
                            </div>
                        </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-4 justify-center items-center p-4 min-h-[140px]">
                        {array.map((value: any, index: number) => {
                            const isOutsideRange = index < left || index > right;
                            const isMid = index === mid;
                            const isLeft = index === left;
                            const isRight = index === right;
                            const isTarget = value === target && isMid;
                            const isInRange = !isOutsideRange;

                            let cellClass = "relative px-6 py-5 rounded-xl text-center font-mono font-bold text-xl transition-all duration-700 transform-gpu min-w-[80px] min-h-[80px] flex items-center justify-center shadow-xl border-2 ";

                            if (isOutsideRange) {
                                cellClass += "bg-gradient-to-r from-slate-600 to-slate-700 text-slate-400 border-slate-500/50 opacity-40 scale-90";
                            } else if (isTarget) {
                                cellClass += "bg-gradient-to-r from-green-400 via-emerald-500 to-green-400 text-white border-green-300 shadow-green-500/50 scale-115 z-20 animate-bounce";
                            } else if (isMid) {
                                if (value < target) {
                                    cellClass += "bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-400 text-black border-yellow-300 shadow-yellow-500/50 scale-110 z-10";
                                } else {
                                    cellClass += "bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-400 text-black border-yellow-300 shadow-yellow-500/50 scale-110 z-10";
                                }
                            } else if (isLeft) {
                                cellClass += "bg-gradient-to-r from-purple-500 via-violet-500 to-purple-500 text-white border-purple-300 shadow-purple-500/40 scale-105";
                            } else if (isRight) {
                                cellClass += "bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-500 text-white border-cyan-300 shadow-cyan-500/40 scale-105";
                            } else if (isInRange) {
                                cellClass += "bg-gradient-to-r from-slate-500 via-slate-400 to-slate-500 text-white border-slate-300 shadow-slate-500/30";
                            }

                            return (
                                <div
                                    key={`${index}-${value}`}
                                    className={cellClass}
                                    style={{ animationDelay: `${index * 50}ms` }}
                                >
                                    <div className="relative z-10 font-extrabold text-2xl">{value}</div>
                                    <div className="absolute -top-3 -left-3 text-xs bg-slate-900 text-white rounded-full w-7 h-7 flex items-center justify-center shadow-lg border border-slate-600 font-bold">
                                        {index}
                                    </div>
                                    
                                    {/* Special effects for mid element */}
                                    {isMid && !isTarget && (
                                        <div className="absolute inset-0 bg-white/20 rounded-xl animate-ping"></div>
                                    )}
                                    
                                    {/* Special effects for found target */}
                                    {isTarget && (
                                        <>
                                            <div className="absolute inset-0 bg-green-400/30 rounded-xl animate-ping"></div>
                                            <div className="absolute -inset-2 bg-gradient-to-r from-green-400/30 via-emerald-500/30 to-green-400/30 rounded-xl blur-lg"></div>
                                            <div className="absolute top-0 right-0 text-2xl animate-bounce">🎯</div>
                                        </>
                                    )}
                                    
                                    {/* Glow effects for boundaries */}
                                    {(isLeft || isRight || isMid) && !isOutsideRange && (
                                        <div className="absolute -inset-1 rounded-xl blur-sm opacity-50" style={{
                                            background: isLeft ? 'linear-gradient(to right, rgb(168, 85, 247), rgb(139, 92, 246))' :
                                                       isRight ? 'linear-gradient(to right, rgb(6, 182, 212), rgb(59, 130, 246))' :
                                                       'linear-gradient(to right, rgb(251, 191, 36), rgb(245, 158, 11))'
                                        }}></div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Algorithm explanation and current step */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-blue-500/10 border border-blue-400/50 rounded-xl p-6 backdrop-blur-sm">
                        <h5 className="font-bold text-blue-300 mb-4 flex items-center text-lg">
                            <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            How Binary Search Works
                        </h5>
                        <p className="text-blue-100 leading-relaxed">
                            Binary search divides the sorted array in half at each step, comparing the middle element 
                            with the target. If the middle element is smaller than the target, it searches the right half; 
                            if larger, it searches the left half. This continues until the target is found or the search space is exhausted.
                        </p>
                    </div>
                    
                    <div className="bg-purple-500/10 border border-purple-400/50 rounded-xl p-6 backdrop-blur-sm">
                        <h5 className="font-bold text-purple-300 mb-4 flex items-center text-lg">
                            <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                            </svg>
                            Current Step Analysis
                        </h5>
                        <div className="space-y-3 text-sm">
                            <div className="bg-purple-900/30 rounded-lg p-3 border border-purple-600/30">
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <span className="text-purple-200 font-medium">Left Index:</span>
                                        <span className="text-white font-mono ml-2 font-bold">{left}</span>
                                    </div>
                                    <div>
                                        <span className="text-purple-200 font-medium">Right Index:</span>
                                        <span className="text-white font-mono ml-2 font-bold">{right}</span>
                                    </div>
                                    <div>
                                        <span className="text-purple-200 font-medium">Mid Index:</span>
                                        <span className="text-yellow-300 font-mono ml-2 font-bold">{mid}</span>
                                    </div>
                                    <div>
                                        <span className="text-purple-200 font-medium">Mid Value:</span>
                                        <span className="text-yellow-300 font-mono ml-2 font-bold">{array[mid]}</span>
                                    </div>
                                </div>
                            </div>
                            <p className="text-purple-100 leading-relaxed">
                                {currentStep === steps.length - 1 ? (
                                    <span className={`font-bold ${data.found ? 'text-green-300' : 'text-red-300'}`}>
                                        {data.found ? `Target found at index ${data.index}!` : '❌ Target not found in the array.'}
                                    </span>
                                ) : (
                                    <>
                                        Comparing mid value <span className="font-bold text-yellow-300">{array[mid]}</span> with target <span className="font-bold text-blue-300">{target}</span>.
                                        {array[mid] === target ? (
                                            <span className="text-green-300 font-bold"> Found the target! 🎯</span>
                                        ) : array[mid] < target ? (
                                            <span className="text-orange-300"> Mid is smaller, searching right half. →</span>
                                        ) : (
                                            <span className="text-blue-300"> Mid is larger, searching left half. ←</span>
                                        )}
                                    </>
                                )}
                            </p>
                        </div>
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
        <div className="h-full">
            <style>{customStyles}</style>
            {/* Algorithm Detection and Rendering */}
            {data.algorithm === 'Binary Search' ? renderBinarySearchVisualization() : (
                <div className="bg-slate-700/30 backdrop-blur-sm rounded-xl border border-slate-600/50 p-6 space-y-6 h-full">
                    {renderLinearSearchVisualization()}
                    
                    {/* Metrics Section for Linear Search */}
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
            )}
        </div>
    );
};

export default SearchVisualization; 