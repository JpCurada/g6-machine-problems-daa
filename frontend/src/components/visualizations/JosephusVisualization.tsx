import React, { useEffect, useState } from 'react';

interface JosephusVisualizationProps {
    peopleCount: number;
    eliminationOrder: number[];
    currentStep: number;
    isAnimating?: boolean;
    startAnimation?: () => void;
    resetAnimation?: () => void;
}

const JosephusVisualization: React.FC<JosephusVisualizationProps> = ({
    peopleCount,
    eliminationOrder,
    currentStep,
    isAnimating,
    startAnimation,
    resetAnimation
}) => {
    const [scale, setScale] = useState(0.9);
    const radius = 160;
    const center = { x: 250, y: 250 };
    
    // Calculate positions for each person in a circle
    const calculatePosition = (index: number, total: number) => {
        const angle = (index * 2 * Math.PI) / total - Math.PI / 2;
        return {
            x: center.x + radius * Math.cos(angle),
            y: center.y + radius * Math.sin(angle)
        };
    };

    // Animate scale on mount
    useEffect(() => {
        setScale(0.4);
        const timer = setTimeout(() => setScale(0.9), 100);
        return () => clearTimeout(timer);
    }, []);

    // Generate positions for all people
    const positions = Array.from({ length: peopleCount }, (_, i) => {
        const personNumber = i + 1;
        const eliminationIndex = eliminationOrder.indexOf(personNumber);
        const isEliminated = eliminationIndex !== -1 && eliminationIndex <= currentStep;
        const isNext = eliminationIndex === currentStep + 1;
        const isCurrent = eliminationIndex === currentStep;
        const isSurvivor = !eliminationOrder.includes(personNumber);

        return {
            ...calculatePosition(i, peopleCount),
            number: personNumber,
            eliminated: isEliminated,
            isNext,
            isCurrent,
            isSurvivor: isSurvivor && !isEliminated
        };
    });

    return (
        <div className="bg-slate-700 bg-opacity-30 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-semibold text-teal-300">Josephus Problem Visualization</h4>
                {eliminationOrder && eliminationOrder.length > 0 && (
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

            <div className="w-full flex justify-center items-center p-4">
                <svg 
                    width="500" 
                    height="500" 
                    className="transition-transform duration-1000 ease-out"
                    style={{ transform: `scale(${scale})` }}
                >
                    {/* Background circles */}
                    <circle
                        cx={center.x}
                        cy={center.y}
                        r={radius + 40}
                        className="fill-slate-900/30"
                    />
                    <circle
                        cx={center.x}
                        cy={center.y}
                        r={radius + 20}
                        className="fill-none stroke-teal-500/20"
                        strokeWidth="0.5"
                        strokeDasharray="4 4"
                    />

                    {/* Draw connecting lines */}
                    <g>
                        {positions.map((pos, i) => {
                            const nextPos = positions[(i + 1) % peopleCount];
                            const isActiveLine = !pos.eliminated && !nextPos.eliminated;
                            const isNextLine = pos.isNext || nextPos.isNext || pos.isCurrent || nextPos.isCurrent;

                            return (
                                <line
                                    key={`line-${i}`}
                                    x1={pos.x}
                                    y1={pos.y}
                                    x2={nextPos.x}
                                    y2={nextPos.y}
                                    className={`
                                        transition-all duration-300
                                        ${isActiveLine 
                                            ? isNextLine
                                                ? 'stroke-teal-400/80 stroke-[2]'
                                                : 'stroke-teal-600/40 stroke-[1]'
                                            : 'stroke-slate-700/30 stroke-[0.5]'}
                                    `}
                                    strokeLinecap="round"
                                    strokeDasharray={isNextLine ? "4 4" : ""}
                                />
                            );
                        })}
                    </g>

                    {/* Draw nodes */}
                    {positions.map((pos, i) => (
                        <g 
                            key={`node-${i}`} 
                            className="transition-all duration-300 ease-in-out"
                        >
                            {/* Outer glow for current/next */}
                            {(pos.isNext || pos.isCurrent) && (
                                <circle
                                    cx={pos.x}
                                    cy={pos.y}
                                    r="28"
                                    className={`
                                        ${pos.isNext 
                                            ? 'fill-red-500/20 animate-pulse' 
                                            : 'fill-yellow-500/20'
                                        }
                                    `}
                                />
                            )}

                            {/* Node circle */}
                            <circle
                                cx={pos.x}
                                cy={pos.y}
                                r="20"
                                className={`
                                    transition-all duration-300 ease-in-out
                                    ${pos.eliminated 
                                        ? 'fill-slate-800/80 stroke-slate-700/50' 
                                        : pos.isNext
                                            ? 'fill-red-500/90 stroke-red-400/80'
                                            : pos.isCurrent
                                                ? 'fill-yellow-500/90 stroke-yellow-400/80'
                                                : pos.isSurvivor
                                                    ? 'fill-green-500/90 stroke-green-400/80'
                                                    : 'fill-teal-500/90 stroke-teal-400/80'
                                    }
                                    stroke-[1.5]
                                    ${pos.isCurrent ? 'scale-110' : ''}
                                `}
                            />
                            
                            {/* Number label */}
                            <text
                                x={pos.x}
                                y={pos.y}
                                textAnchor="middle"
                                dy="6"
                                className={`
                                    text-sm font-bold select-none
                                    ${pos.eliminated ? 'fill-gray-500/80' : 'fill-white'}
                                    transition-all duration-300
                                `}
                            >
                                {pos.number}
                            </text>

                            {/* Status indicator */}
                            {(pos.isNext || pos.isCurrent || pos.isSurvivor) && (
                                <text
                                    x={pos.x}
                                    y={pos.y - 32}
                                    textAnchor="middle"
                                    className={`
                                        text-[10px] font-medium tracking-wider uppercase
                                        ${pos.isNext 
                                            ? 'fill-red-300/90' 
                                            : pos.isCurrent 
                                                ? 'fill-yellow-300/90' 
                                                : 'fill-green-300/90'
                                        }
                                    `}
                                >
                                    {pos.isNext ? 'Next' : pos.isCurrent ? 'Current' : pos.isSurvivor ? 'Survivor' : ''}
                                </text>
                            )}
                        </g>
                    ))}

                    {/* Center decoration */}
                    <g className="animate-spin-slow">
                        <circle
                            cx={center.x}
                            cy={center.y}
                            r="12"
                            className="fill-slate-800/90 stroke-teal-500/30"
                            strokeWidth="1"
                        />
                        <circle
                            cx={center.x}
                            cy={center.y}
                            r="6"
                            className="fill-teal-500/50"
                        />
                    </g>
                </svg>
            </div>
        </div>
    );
};

export default JosephusVisualization; 