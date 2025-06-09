import React from 'react';

interface RussianMultiplicationVisualizationProps {
    data: any;
}

const RussianMultiplicationVisualization: React.FC<RussianMultiplicationVisualizationProps> = ({ data }) => {
    return (
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

            {data.selected_values && data.selected_values.length > 0 && (
                <div className="mt-6 bg-yellow-500 bg-opacity-20 rounded-lg p-4 border border-yellow-400">
                    <h5 className="font-semibold text-yellow-300 mb-3 flex items-center">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Selected Values
                    </h5>
                    <div className="space-y-2">
                        {data.selected_values.map((num: number, index: number) => (
                            <div 
                                key={index}
                                className="bg-yellow-600 text-white px-3 py-2 rounded text-center font-mono animate-slideInUp"
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                {num}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default RussianMultiplicationVisualization; 