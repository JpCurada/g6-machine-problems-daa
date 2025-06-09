import React from 'react';
import ArrayVisualization from '../common/ArrayVisualization';
import ProgressBar from '../common/ProgressBar';

interface InsertionSortVisualizationProps {
    data: any;
    stepIndex: number;
    isAnimating: boolean;
    startAnimation: () => void;
    resetAnimation: () => void;
}

const InsertionSortVisualization: React.FC<InsertionSortVisualizationProps> = ({
    data,
    stepIndex,
    isAnimating,
    startAnimation,
    resetAnimation
}) => {
    const currentArray = data.steps ? data.steps[stepIndex] : data.result;
    // In insertion sort: at step i, we're sorting element at index i+1, so first i+2 elements are sorted
    // But if we're at the last step or beyond, everything should be sorted
    const sortedPortion = stepIndex >= data.steps?.length - 1 ? currentArray.length : stepIndex + 2;

    return (
        <div className="bg-slate-700 bg-opacity-30 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-semibold text-teal-300">Insertion Sort Visualization</h4>
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
                    label="Sorting Progress"
                />
            )}

            {/* Current step visualization */}
            <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                    <p className="text-sm text-gray-300">
                        {data.steps ? `Step ${stepIndex + 1} of ${data.steps.length}` : 'Final Result'}
                    </p>
                    {data.steps && (
                        <div className="flex space-x-4 text-xs">
                            <div className="flex items-center">
                                <div className="w-3 h-3 bg-green-400 rounded mr-1"></div>
                                <span>Sorted</span>
                            </div>
                            <div className="flex items-center">
                                <div className="w-3 h-3 bg-orange-400 rounded mr-1"></div>
                                <span>Unsorted</span>
                            </div>
                            <div className="flex items-center">
                                <div className="w-3 h-3 bg-yellow-400 rounded mr-1"></div>
                                <span>Current</span>
                            </div>
                        </div>
                    )}
                </div>
                
                {/* Enhanced array visualization for insertion sort */}
                <div className="flex flex-wrap gap-4 justify-center items-center p-8 min-h-[120px]">
                    {currentArray.map((value: number, index: number) => {
                        const isSorted = index < sortedPortion;
                        // In insertion sort, at step i, we're working with element at index i+1
                        const isCurrent = stepIndex < data.steps?.length - 1 ? index === stepIndex + 1 : false;
                        
                        return (
                            <div
                                key={`${index}-${value}`}
                                className={`
                                    relative px-6 py-5 rounded-xl text-center font-mono font-bold text-xl
                                    transition-all duration-500 transform-gpu min-w-[70px] min-h-[70px]
                                    flex items-center justify-center shadow-lg border-2 border-white border-opacity-20
                                    ${isCurrent 
                                        ? 'bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-400 text-black scale-110 shadow-2xl z-10 animate-pulse' 
                                        : isSorted
                                            ? 'bg-gradient-to-r from-green-400 via-emerald-500 to-green-400 text-white shadow-green-500/50'
                                            : 'bg-gradient-to-r from-orange-400 via-red-500 to-orange-400 text-white shadow-orange-500/50'}
                                    hover:scale-105 hover:z-20 animate-slideInUp
                                `}
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <div className="relative z-10 font-extrabold">{value}</div>
                                <div className="absolute -top-4 -left-4 text-xs bg-slate-800 text-white rounded-full w-8 h-8 flex items-center justify-center shadow-lg border border-slate-600">
                                    {index}
                                </div>
                                {isCurrent && (
                                    <>
                                        <div className="absolute inset-0 bg-white opacity-20 rounded-xl animate-ping"></div>
                                        <div className="absolute -inset-2 bg-gradient-to-r from-yellow-400/30 via-amber-500/30 to-yellow-400/30 rounded-xl blur-md"></div>
                                    </>
                                )}
                                {isSorted && !isCurrent && (
                                    <div className="absolute -inset-1 bg-gradient-to-r from-green-400/20 via-emerald-500/20 to-green-400/20 rounded-xl blur-sm"></div>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* Progress indicator */}
                {data.steps && (
                    <div className="bg-slate-600 bg-opacity-50 rounded-lg p-3 mb-4">
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-green-300">Sorted elements: {sortedPortion}</span>
                            <span className="text-orange-300">Remaining: {currentArray.length - sortedPortion}</span>
                        </div>
                        <div className="w-full bg-slate-500 rounded-full h-2 mt-2">
                            <div 
                                className="bg-gradient-to-r from-green-400 to-teal-400 h-2 rounded-full transition-all duration-500"
                                style={{ width: `${(sortedPortion / currentArray.length) * 100}%` }}
                            ></div>
                        </div>
                    </div>
                )}
            </div>

            {/* Algorithm explanation */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="bg-blue-500 bg-opacity-20 rounded-lg p-4 border border-blue-400">
                    <h5 className="font-semibold text-blue-300 mb-2 flex items-center">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        How it works
                    </h5>
                    <p className="text-sm text-blue-100">
                        Insertion sort builds the sorted array one element at a time by repeatedly taking an element 
                        from the unsorted portion and inserting it at the correct position in the sorted portion.
                    </p>
                </div>
                
                <div className="bg-purple-500 bg-opacity-20 rounded-lg p-4 border border-purple-400">
                    <h5 className="font-semibold text-purple-300 mb-2 flex items-center">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                        Current Step
                    </h5>
                    <p className="text-sm text-purple-100">
                        {data.steps && stepIndex < data.steps.length - 1
                            ? `Inserting element at position ${stepIndex + 1} (value: ${currentArray[stepIndex + 1]}) into its correct position in the sorted portion.`
                            : 'Sorting complete! All elements are now in order.'
                        }
                    </p>
                </div>
            </div>

            {/* Final result */}
            <div className="bg-green-500 bg-opacity-20 rounded-lg p-6 border border-green-400 shadow-lg">
                <h5 className="font-semibold text-green-300 mb-4 flex items-center text-lg">
                    <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Final Sorted Array
                </h5>
                <div className="bg-green-900 bg-opacity-30 rounded-lg p-4 border border-green-600">
                    <ArrayVisualization array={data.result} showIndices={false} />
                </div>
            </div>
        </div>
    );
};

export default InsertionSortVisualization; 