import React from 'react';

interface ArrayVisualizationProps {
    array: (number | string)[];
    highlightIndices?: number[];
    stepIndex?: number;
    showIndices?: boolean;
}

interface ArrayItemStyle extends React.CSSProperties {
    '--delay': string;
}

const ArrayVisualization: React.FC<ArrayVisualizationProps> = ({ 
    array, 
    highlightIndices = [], 
    stepIndex = 0,
    showIndices = true
}) => (
    <div className="flex flex-wrap gap-4 justify-center items-center p-8 min-h-[120px]">
        {array.map((value, index) => {
            const style: ArrayItemStyle = {
                '--delay': `${(index * 100) / array.length}ms`,
            };

            const isHighlighted = highlightIndices.includes(index);
            
            return (
                <div
                    key={`${index}-${value}`}
                    className={`
                        relative px-6 py-5 rounded-xl text-center font-mono font-bold text-lg
                        transition-all duration-500 transform-gpu min-w-[60px] min-h-[60px]
                        flex items-center justify-center shadow-lg
                        ${isHighlighted 
                            ? 'bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-400 text-black scale-110 shadow-2xl z-10 animate-pulse' 
                            : 'bg-gradient-to-r from-teal-400 via-cyan-500 to-teal-400 text-white hover:shadow-2xl'}
                        hover:scale-105 hover:z-20 animate-fadeIn
                        border-2 border-white border-opacity-20
                    `}
                    style={style}
                >
                    <div className="card-content relative">
                        <div className="relative z-10 text-xl font-extrabold">{value}</div>
                        {showIndices && (
                            <div className="absolute -top-4 -left-4 text-xs bg-slate-800 text-white rounded-full w-8 h-8 flex items-center justify-center shadow-lg transform transition-transform hover:scale-110 border border-slate-600">
                                {index}
                            </div>
                        )}
                        {isHighlighted && (
                            <>
                                <div className="absolute inset-0 bg-white opacity-20 rounded-xl animate-ping"></div>
                                <div className="absolute -inset-2 bg-gradient-to-r from-yellow-400/30 via-orange-500/30 to-yellow-400/30 rounded-xl blur-md"></div>
                            </>
                        )}
                    </div>
                </div>
            );
        })}
    </div>
);

export default ArrayVisualization; 