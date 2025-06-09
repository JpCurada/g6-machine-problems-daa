import React from 'react';

interface ToggleProps {
    value: boolean;
    onChange: (value: boolean) => void;
    disabled?: boolean;
    label?: string;
}

const Toggle: React.FC<ToggleProps> = ({ value, onChange, disabled = false, label }) => {
    return (
        <div className="flex items-center">
            <button
                type="button"
                onClick={() => !disabled && onChange(!value)}
                className={`
                    relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full 
                    border-2 border-transparent transition-colors duration-200 ease-in-out 
                    focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2
                    ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
                    ${value ? 'bg-teal-500' : 'bg-slate-600'}
                `}
                disabled={disabled}
                role="switch"
                aria-checked={value}
            >
                <span
                    aria-hidden="true"
                    className={`
                        pointer-events-none inline-block h-5 w-5 transform rounded-full 
                        bg-white shadow ring-0 transition duration-200 ease-in-out
                        ${value ? 'translate-x-5' : 'translate-x-0'}
                    `}
                />
            </button>
            {label && (
                <span className="ml-3 text-sm text-slate-300">
                    {label}
                </span>
            )}
        </div>
    );
};

export default Toggle; 