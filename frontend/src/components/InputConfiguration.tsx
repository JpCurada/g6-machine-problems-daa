import { Trash2 } from 'lucide-react';
import React, { useEffect } from 'react';

interface InputField {
    name: string;
    label: string;
    type: 'text' | 'number' | 'array' | 'boolean' | 'toggle';
    placeholder?: string;
}

interface InputConfigurationProps {
    selectedAlgorithm: string;
    inputFields: InputField[];
    inputValues: {[key: string]: string | boolean};
    handleInputChange: (fieldName: string, value: string | boolean) => void;
    handleSimulate: () => void;
    isLoading: boolean;
}

// Toggle component definition
interface ToggleProps {
    value: boolean;
    onChange: (checked: boolean) => void;
    disabled?: boolean;
    label?: string;
}

const Toggle: React.FC<ToggleProps> = ({ value, onChange, disabled = false}) => {
    // FORCE the initial display to be true (Ascending Order)
    const displayValue = value !== undefined ? value : true;

    return (
        <div className="flex items-center">
            <button
                type="button"
                onClick={() => onChange(!displayValue)}
                disabled={disabled}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2 focus:ring-offset-slate-700 disabled:opacity-50 ${
                    displayValue ? 'bg-teal-600' : 'bg-slate-500'
                }`}
            >
                <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        displayValue ? 'translate-x-6' : 'translate-x-1'
                    }`}
                />
            </button>
            <span className="ml-3 text-sm font-medium text-slate-300">
                {displayValue ? 'Ascending Order' : 'Descending Order'}
            </span>
        </div>
    );
};

const InputConfiguration: React.FC<InputConfigurationProps> = ({
                                                                   selectedAlgorithm,
                                                                   inputFields,
                                                                   inputValues,
                                                                   handleInputChange,
                                                                   handleSimulate,
                                                                   isLoading
                                                               }) => {
    // Initialize toggle fields to true on mount
    useEffect(() => {
        const toggleFields = inputFields.filter(field => field.type === 'boolean' || field.type === 'toggle');
        toggleFields.forEach(field => {
            if (inputValues[field.name] === undefined) {
                handleInputChange(field.name, true);
            }
        });
    }, [inputFields]);

    // Suggested values for different algorithms
    const getSuggestedValues = (algorithm: string) => {
        switch (algorithm) {
            case 'Bubble Sort':
            case 'Selection Sort':
            case 'Insertion Sort':
                return [
                    { label: 'Small Array', values: { array: '64,34,25,12,22,11,90', isAscending: true } },
                    { label: 'Reverse Sorted', values: { array: '90,64,34,25,22,12,11', isAscending: true } },
                    { label: 'Nearly Sorted', values: { array: '11,12,22,25,90,34,64', isAscending: true } },
                    { label: 'Large Array', values: { array: '50,30,20,40,70,60,10,90,80,15,25,35,45,55,65,75,85,95', isAscending: true } }
                ];
            case 'Sequential Search':
                return [
                    { label: 'Find 7', values: { array: '1,3,5,7,9,11,13', target: '7' } },
                    { label: 'Find Missing', values: { array: '2,4,6,8,10,12', target: '5' } },
                    { label: 'Large Array', values: { array: '10,20,30,40,50,60,70,80,90,100', target: '60' } },
                    { label: 'Names Search', values: { array: 'Apple,Banana,Cherry,Date,Elderberry', target: 'Cherry' } }
                ];
            case 'Binary Search':
                return [
                    { label: 'Find 7', values: { array: '1,3,5,7,9,11,13', target: '7' } },
                    { label: 'Find 50', values: { array: '10,20,30,40,50,60,70,80,90', target: '50' } },
                    { label: 'Not Found', values: { array: '2,4,6,8,10,12,14', target: '5' } },
                    { label: 'Large Sorted', values: { array: '5,10,15,20,25,30,35,40,45,50,55,60,65,70,75,80', target: '45' } }
                ];
            case 'Josephus Problem':
                return [
                    { label: 'Classic (7,3)', values: { length: '7', interval: '3' } },
                    { label: 'Small Group', values: { length: '5', interval: '2' } },
                    { label: 'Medium Group', values: { length: '10', interval: '3' } },
                    { label: 'Large Group', values: { length: '15', interval: '4' } }
                ];
            case 'Russian Multiplication Method':
                return [
                    { label: 'Small Numbers', values: { multiplier: '17', multiplicand: '19' } },
                    { label: 'Medium Numbers', values: { multiplier: '25', multiplicand: '14' } },
                    { label: 'Large Numbers', values: { multiplier: '47', multiplicand: '63' } },
                    { label: 'Powers of 2', values: { multiplier: '32', multiplicand: '16' } }
                ];
            case 'Travelling Salesman Problem':
                return [
                    { label: '4 Cities', values: { distance_matrix: '0,10,15,20;10,0,35,25;15,35,0,30;20,25,30,0', start_city: '0' } },
                    { label: '5 Cities', values: { distance_matrix: '0,2,9,10,7;1,0,6,4,3;15,7,0,8,3;6,3,12,0,11;7,8,2,9,0', start_city: '0' } },
                    { label: 'Simple Triangle', values: { distance_matrix: '0,5,10;5,0,8;10,8,0', start_city: '0' } }
                ];
            case 'Knapsack Problem':
                return [
                    { label: 'Classic Items', values: { items: 'Gold:10:60,Silver:20:100,Bronze:30:120', capacity: '50' } },
                    { label: 'Electronics', values: { items: 'Phone:5:300,Laptop:15:500,Tablet:8:400,Watch:2:200', capacity: '20' } },
                    { label: 'Groceries', values: { items: 'Bread:2:3,Milk:3:4,Cheese:1:5,Meat:4:8,Fish:2:6', capacity: '8' } },
                    { label: 'Tools', values: { items: 'Hammer:3:15,Wrench:1:10,Drill:5:25,Saw:4:20', capacity: '10' } }
                ];
            default:
                return [];
        }
    };

    const applySuggestedValues = (suggestion: { label: string; values: { [key: string]: string | boolean } }) => {
        Object.entries(suggestion.values).forEach(([fieldName, value]) => {
            if (inputFields.some(field => field.name === fieldName)) {
                handleInputChange(fieldName, value);
            }
        });
    };

    const renderInputField = (field: InputField) => {
        switch (field.type) {
            case 'boolean':
            case 'toggle':
                // FORCE DEFAULT TO TRUE - This will always show "Ascending Order" initially
                const toggleValue = inputValues[field.name] !== undefined
                    ? (inputValues[field.name] === true || inputValues[field.name] === 'true')
                    : true; // This forces it to true when undefined

                return (
                    <Toggle
                        value={toggleValue}
                        onChange={(newValue: boolean) => handleInputChange(field.name, newValue)}
                        disabled={isLoading}
                        label={field.label}
                    />
                );
            case 'array':
                return (
                    <textarea
                        value={inputValues[field.name]?.toString() || ''}
                        onChange={(e) => handleInputChange(field.name, e.target.value)}
                        placeholder={field.placeholder}
                        disabled={isLoading}
                        className="w-full px-3 py-2 bg-slate-600 border border-slate-500 rounded-md text-white
                             focus:outline-none focus:ring-2 focus:ring-teal-400 resize-none disabled:opacity-50
                             transition-all duration-300 ease-in-out hover:bg-slate-500"
                        rows={3}
                    />
                );
            default:
                return (
                    <input
                        type={field.type}
                        value={inputValues[field.name]?.toString() || ''}
                        onChange={(e) => handleInputChange(field.name, e.target.value)}
                        placeholder={field.placeholder}
                        disabled={isLoading}
                        className="w-full px-3 py-2 bg-slate-600 border border-slate-500 rounded-md text-white
                             focus:outline-none focus:ring-2 focus:ring-teal-400 disabled:opacity-50
                             transition-all duration-300 ease-in-out hover:bg-slate-500"
                    />
                );
        }
    };

    const suggestions = getSuggestedValues(selectedAlgorithm);

    return (
        <div className="bg-slate-700 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-teal-300 mb-4">Input Configuration</h2>

            {inputFields.length > 0 ? (
                <div className="space-y-6">
                    {/* Suggested Values Section */}
                    {suggestions.length > 0 && (
                        <div className="bg-slate-600 bg-opacity-50 rounded-lg p-4 border border-slate-500">
                            <h3 className="text-sm font-semibold text-slate-200 mb-3 flex items-center">
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                                Quick Examples
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                {suggestions.map((suggestion, index) => (
                                    <button
                                        key={index}
                                        onClick={() => applySuggestedValues(suggestion)}
                                        disabled={isLoading}
                                        className="px-3 py-2 bg-teal-600 hover:bg-teal-700 disabled:bg-gray-500 disabled:cursor-not-allowed
                                                 text-white text-sm rounded-md transition-all duration-200 hover:scale-105 active:scale-95
                                                 border border-teal-500 hover:border-teal-400 shadow-md hover:shadow-lg"
                                    >
                                        <span className="font-medium">{suggestion.label}</span>
                                    </button>
                                ))}
                            </div>
                            <p className="text-xs text-slate-400 mt-2">
                                Click any example above to auto-fill the inputs
                            </p>
                        </div>
                    )}

                    {/* Input Fields */}
                    <div className="space-y-4">
                        {inputFields.map((field: InputField) => (
                            <div key={field.name} className="animate-fadeIn">
                                {field.type !== 'boolean' && field.type !== 'toggle' && (
                                    <label className="text-sm font-medium text-slate-300 mb-2 flex items-center">
                                        <span>{field.label}</span>
                                        {inputValues[field.name] && (
                                            <button
                                                onClick={() => handleInputChange(field.name, '')}
                                                className="ml-2 text-red-400 hover:text-red-300 text-xs size-5"
                                                title="Clear field"
                                            >
                                                <Trash2/>
                                            </button>
                                        )}
                                    </label>
                                )}
                                {field.type === 'toggle' && (
                                    <label className="block text-sm font-medium text-slate-300 mb-2">
                                        {field.label}
                                    </label>
                                )}
                                {renderInputField(field)}
                            </div>
                        ))}
                    </div>

                    <button
                        onClick={handleSimulate}
                        disabled={isLoading || !inputFields.every(field => {
                            const value = inputValues[field.name];
                            if (field.type === 'boolean' || field.type === 'toggle') {
                                return value !== undefined;
                            }
                            return value && value.toString().trim() !== '';
                        })}
                        className="w-full bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700
                                 disabled:from-gray-500 disabled:to-gray-600 disabled:cursor-not-allowed
                                 text-white font-semibold py-3 px-4 rounded-md transition-all duration-200 mt-6
                                 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
                    >
                        {isLoading ? (
                            <span className="flex items-center justify-center">
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Running...
                            </span>
                        ) : (
                            'Start Simulation'
                        )}
                    </button>
                </div>
            ) : (
                <div className="flex items-center justify-center h-64 text-slate-400">
                    <div className="text-center">
                        <svg className="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <p className="text-lg font-medium mb-2">Ready to Configure</p>
                        <p className="text-sm">Select a strategy and algorithm to begin</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default InputConfiguration;