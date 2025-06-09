import React from 'react';

interface MetricCardProps {
    title: string;
    value: string | number;
    icon: React.ReactNode;
    color?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, icon, color = "teal" }) => (
    <div className={`
        perspective-card bg-gradient-to-r from-${color}-500 via-${color}-600 to-${color}-500 
        rounded-xl p-5 transform hover:scale-105 transition-all duration-300 shadow-lg
        animate-scaleIn shimmer-bg
    `}>
        <div className="card-content flex items-center justify-between">
            <div>
                <p className="text-white/80 text-sm mb-1">{title}</p>
                <p className="text-white text-xl font-bold animate-float">{value}</p>
            </div>
            <div className="text-white/90 transform transition-transform hover:scale-110 hover:rotate-12">
                {icon}
            </div>
        </div>
    </div>
);

export default MetricCard; 