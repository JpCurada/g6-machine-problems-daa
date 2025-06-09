import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage: React.FC = () => {
    return (
        <div className="bg-slate-800 text-white">
            {/* Hero Section */}
            <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                        A Collection of Algorithm<br />
                        Simulations Created By Students
                    </h1>
                    <p className="text-slate-300 text-lg md:text-xl mb-8 max-w-3xl mx-auto leading-relaxed">
                        This website was created by students of Computer Science, guided by our class Professor. It features
                        algorithm simulations completed as machine problems. We aim to make complex algorithms more
                        understandable through visualizations and step-by-step explanations.
                    </p>
                    <Link
                        to="/simulation"
                        className="inline-block bg-teal-600 hover:bg-teal-700 text-white font-semibold py-4 px-8 rounded-full transition-colors duration-300 transform hover:scale-105"
                    >
                        Get Started
                    </Link>
                </div>
            </section>

            {/* About Project Section */}
            <section className="py-16 bg-slate-900">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-4xl font-bold text-center mb-12 text-teal-400">About the Project</h2>
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
                                <h3 className="text-2xl font-semibold mb-4 text-teal-300">Our Mission</h3>
                                <p className="text-slate-300 leading-relaxed">
                                    To create interactive and educational algorithm simulations that help students and enthusiasts
                                    understand complex computational concepts through visual representation and hands-on experience.
                                </p>
                            </div>
                            <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
                                <h3 className="text-2xl font-semibold mb-4 text-teal-300">Academic Excellence</h3>
                                <p className="text-slate-300 leading-relaxed">
                                    Each simulation represents a machine problem completed as part of our Computer Science curriculum,
                                    demonstrating practical application of theoretical concepts learned in class.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Machine Problems Section */}
            <section className="py-16 bg-slate-800">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-bold text-center mb-12 text-teal-400">Machine Problems</h2>
                    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        <div className="bg-slate-900 p-6 rounded-lg border border-slate-700 hover:border-teal-500 transition-colors">
                            <div className="w-12 h-12 bg-teal-600 rounded-lg flex items-center justify-center mb-4">
                                <span className="text-white font-bold text-xl">1</span>
                            </div>
                            <h3 className="text-xl font-semibold mb-3 text-teal-300">Brute Force Algorithms</h3>
                            <p className="text-slate-300">Comprehensive solutions that explore all possible combinations to find optimal results.</p>
                        </div>
                        <div className="bg-slate-900 p-6 rounded-lg border border-slate-700 hover:border-teal-500 transition-colors">
                            <div className="w-12 h-12 bg-teal-600 rounded-lg flex items-center justify-center mb-4">
                                <span className="text-white font-bold text-xl">2</span>
                            </div>
                            <h3 className="text-xl font-semibold mb-3 text-teal-300">Divide & Conquer</h3>
                            <p className="text-slate-300">Efficient problem-solving by breaking complex problems into smaller subproblems.</p>
                        </div>
                        <div className="bg-slate-900 p-6 rounded-lg border border-slate-700 hover:border-teal-500 transition-colors">
                            <div className="w-12 h-12 bg-teal-600 rounded-lg flex items-center justify-center mb-4">
                                <span className="text-white font-bold text-xl">3</span>
                            </div>
                            <h3 className="text-xl font-semibold mb-3 text-teal-300">Greedy Algorithms</h3>
                            <p className="text-slate-300">Local optimization strategies that make the best choice at each step.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-16 bg-slate-900">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-bold text-center mb-12 text-teal-400">Features</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold mb-2 text-teal-300">Interactive Visualizations</h3>
                            <p className="text-slate-300">Real-time visual representations of algorithm execution</p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 bg-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.832 18.477 19.246 18 17.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold mb-2 text-teal-300">Step-by-Step Learning</h3>
                            <p className="text-slate-300">Detailed explanations for each algorithm step</p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 bg-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold mb-2 text-teal-300">Customizable Inputs</h3>
                            <p className="text-slate-300">Dynamic forms that adapt to selected algorithms</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* How to Use Section */}
            <section className="py-16 bg-slate-800">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-bold text-center mb-12 text-teal-400">How to Use</h2>
                    <div className="max-w-4xl mx-auto">
                        <div className="space-y-8">
                            <div className="flex items-start space-x-4">
                                <div className="w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                    <span className="text-white font-bold">1</span>
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold mb-2 text-teal-300">Select a Strategy</h3>
                                    <p className="text-slate-300">Choose from Brute Force, Decrease and Conquer, Greedy, or Divide and Conquer approaches.</p>
                                </div>
                            </div>
                            <div className="flex items-start space-x-4">
                                <div className="w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                    <span className="text-white font-bold">2</span>
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold mb-2 text-teal-300">Pick an Algorithm</h3>
                                    <p className="text-slate-300">Select a specific algorithm from the available options based on your chosen strategy.</p>
                                </div>
                            </div>
                            <div className="flex items-start space-x-4">
                                <div className="w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                    <span className="text-white font-bold">3</span>
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold mb-2 text-teal-300">Configure Inputs</h3>
                                    <p className="text-slate-300">Provide the required parameters specific to your selected algorithm (e.g., weights, values, capacity).</p>
                                </div>
                            </div>
                            <div className="flex items-start space-x-4">
                                <div className="w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                    <span className="text-white font-bold">4</span>
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold mb-2 text-teal-300">Watch the Simulation</h3>
                                    <p className="text-slate-300">Observe the step-by-step visualization and learn how the algorithm processes your input data.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default LandingPage;