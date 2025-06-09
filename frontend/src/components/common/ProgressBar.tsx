import React from 'react';

interface ProgressBarProps {
    current: number;
    total: number;
    label: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ current, total, label }) => (
    <div className="mb-4 animate-scaleIn">
        <div className="flex justify-between text-sm text-white mb-2">
            <span className="font-medium">{label}</span>
            <span className="font-mono">{current}/{total}</span>
        </div>
        <div className="relative w-full h-3 bg-slate-600/50 rounded-full overflow-hidden">
            <div 
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-teal-400 via-cyan-500 to-teal-400 rounded-full shimmer-bg"
                style={{ 
                    width: `${(current / total) * 100}%`,
                    transition: 'width 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
            />
        </div>
    </div>
);

export default ProgressBar; 