import React from 'react';
import MetricCard from '../common/MetricCard';

interface SearchVisualizationProps {
    data: any;
}

const SearchVisualization: React.FC<SearchVisualizationProps> = ({ data }) => {
    return (
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
                    icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>}
                    color="orange"
                />
            )}
        </div>
    );
};

export default SearchVisualization; 