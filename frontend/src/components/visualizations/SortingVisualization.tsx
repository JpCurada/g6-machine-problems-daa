import React from 'react';
import ArrayVisualization from '../common/ArrayVisualization';
import ProgressBar from '../common/ProgressBar';

interface SortingVisualizationProps {
    data: any;
    stepIndex: number;
    isAnimating: boolean;
    startAnimation: () => void;
    resetAnimation: () => void;
}

const SortingVisualization: React.FC<SortingVisualizationProps> = ({
    data,
    stepIndex,
    isAnimating,
    startAnimation,
    resetAnimation
}) => {
    return (
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

export default SortingVisualization; 