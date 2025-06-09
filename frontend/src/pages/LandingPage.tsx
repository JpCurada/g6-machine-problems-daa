import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const LandingPage: React.FC = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
        
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };
        
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div className="bg-slate-900 text-white overflow-hidden">
            {/* Animated Background */}
            <div className="fixed inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"></div>
                <div 
                    className="absolute inset-0 opacity-30"
                    style={{
                        background: `radial-gradient(800px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(14, 165, 233, 0.15), transparent 40%)`
                    }}
                ></div>
                <div className="absolute inset-0 opacity-40">
                    <div className="absolute inset-0" style={{
                        backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(51, 65, 85, 0.1) 1px, transparent 1px)',
                        backgroundSize: '40px 40px'
                    }}></div>
                </div>
            </div>

            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center justify-center pt-20 pb-10">
                {/* Floating geometric shapes */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-br from-teal-400/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-gradient-to-br from-purple-400/20 to-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-cyan-400/10 to-blue-600/10 rounded-full blur-3xl animate-pulse delay-500"></div>
                </div>
                
                <div className={`relative container mx-auto px-4 text-center transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                    {/* Badge */}
                    <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-teal-500/20 to-cyan-500/20 border border-teal-500/30 backdrop-blur-sm mb-8">
                        <span className="w-2 h-2 bg-teal-400 rounded-full mr-2 animate-pulse"></span>
                        <span className="text-teal-300 font-medium text-sm">Advanced Algorithm Visualizations</span>
                    </div>

                    <h1 className="text-6xl md:text-8xl font-black mb-8 leading-tight">
                        <span className="bg-gradient-to-r from-white via-cyan-100 to-teal-300 bg-clip-text text-transparent">
                            Algorithm
                        </span>
                        <br />
                        <span className="bg-gradient-to-r from-teal-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent animate-pulse">
                            Visualizations
                        </span>
                        <br />
                        <span className="text-slate-300 text-4xl md:text-5xl font-normal">
                            Reimagined
                        </span>
                    </h1>
                    
                    <p className="text-slate-300 text-xl md:text-2xl mb-12 max-w-4xl mx-auto leading-relaxed font-light">
                        Experience the beauty of computational thinking through 
                        <span className="text-transparent bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text font-semibold"> stunning visualizations</span> and 
                        <span className="text-transparent bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text font-semibold"> interactive simulations</span>. 
                        Created by passionate Computer Science students.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
                        <Link
                            to="/simulation"
                            className="group relative px-10 py-4 bg-gradient-to-r from-teal-500 via-cyan-500 to-blue-500 hover:from-teal-600 hover:via-cyan-600 hover:to-blue-600 text-white font-bold rounded-2xl shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300 transform hover:scale-105 text-lg"
                        >
                            <span className="relative z-10">Launch Simulator</span>
                            <div className="absolute inset-0 bg-gradient-to-r from-teal-400 via-cyan-400 to-blue-400 rounded-2xl blur-lg opacity-0 group-hover:opacity-70 transition-opacity duration-300"></div>
                        </Link>
                        <a
                            href="#about"
                            className="px-10 py-4 border-2 border-slate-600 hover:border-teal-400 text-slate-300 hover:text-white font-semibold rounded-2xl transition-all duration-300 backdrop-blur-sm hover:bg-slate-800/50 text-lg"
                        >
                            Explore Features
                        </a>
                    </div>

                    {/* Statistics */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
                        <div className="text-center">
                            <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent mb-2">4+</div>
                            <div className="text-slate-400 text-sm">Algorithm Types</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-2">15+</div>
                            <div className="text-slate-400 text-sm">Visualizations</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">9</div>
                            <div className="text-slate-400 text-sm">Team Members</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">100%</div>
                            <div className="text-slate-400 text-sm">Academic</div>
                        </div>
                    </div>
                </div>

                {/* Scroll indicator */}
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
                    <div className="flex flex-col items-center animate-bounce">
                        <span className="text-slate-400 text-sm mb-2">Scroll to explore</span>
                        <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section id="about" className="relative py-32 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-20">
                        <h2 className="text-5xl md:text-6xl font-bold mb-6">
                            <span className="bg-gradient-to-r from-teal-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
                                About the Project
                            </span>
                        </h2>
                        <p className="text-slate-400 text-xl max-w-3xl mx-auto">
                            Where academic excellence meets cutting-edge visualization technology
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
                        <div className="group relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-teal-500/20 to-cyan-500/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                            <div className="relative bg-slate-800/50 backdrop-blur-sm p-8 rounded-3xl border border-slate-700/50 hover:border-teal-500/50 transition-all duration-300">
                                <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-semibold mb-4 text-white">Our Mission</h3>
                                <p className="text-slate-300 leading-relaxed">
                                    To revolutionize algorithm education through immersive, interactive visualizations that transform 
                                    abstract computational concepts into intuitive, beautiful experiences that inspire and educate.
                                </p>
                            </div>
                        </div>

                        <div className="group relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                            <div className="relative bg-slate-800/50 backdrop-blur-sm p-8 rounded-3xl border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-300">
                                <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.832 18.477 19.246 18 17.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-semibold mb-4 text-white">Academic Excellence</h3>
                                <p className="text-slate-300 leading-relaxed">
                                    Each simulation represents rigorous academic work completed as part of our Computer Science curriculum, 
                                    demonstrating mastery of algorithmic thinking and implementation excellence.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Algorithm Categories */}
            <section className="relative py-32 bg-slate-900">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-20">
                        <h2 className="text-5xl md:text-6xl font-bold mb-6">
                            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                                Algorithm Paradigms
                            </span>
                        </h2>
                        <p className="text-slate-400 text-xl max-w-3xl mx-auto">
                            Explore different algorithmic approaches through interactive visualizations
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
                        {[
                            {
                                title: "Brute Force",
                                subtitle: "Exhaustive Search",
                                description: "Comprehensive solutions exploring all possibilities to guarantee optimal results through systematic enumeration.",
                                icon: "💪",
                                gradient: "from-red-500 to-orange-500",
                                bgGradient: "from-red-500/20 to-orange-500/20"
                            },
                            {
                                title: "Divide & Conquer",
                                subtitle: "Recursive Decomposition", 
                                description: "Elegant problem-solving by recursively breaking complex challenges into manageable subproblems.",
                                icon: "⚡",
                                gradient: "from-yellow-500 to-orange-500",
                                bgGradient: "from-yellow-500/20 to-orange-500/20"
                            },
                            {
                                title: "Greedy Algorithms",
                                subtitle: "Local Optimization",
                                description: "Strategic decision-making by choosing the locally optimal solution at each step of the process.",
                                icon: "🎯",
                                gradient: "from-green-500 to-teal-500",
                                bgGradient: "from-green-500/20 to-teal-500/20"
                            }
                        ].map((paradigm, index) => (
                            <div key={index} className="group relative">
                                <div className={`absolute inset-0 bg-gradient-to-br ${paradigm.bgGradient} rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100`}></div>
                                <div className="relative bg-slate-800/80 backdrop-blur-sm p-8 rounded-3xl border border-slate-700/50 hover:border-slate-600 transition-all duration-500 transform hover:scale-105 h-full">
                                    <div className={`w-16 h-16 bg-gradient-to-br ${paradigm.gradient} rounded-2xl flex items-center justify-center mb-6 shadow-xl text-2xl`}>
                                        {paradigm.icon}
                                    </div>
                                    <h3 className="text-2xl font-bold mb-2 text-white">{paradigm.title}</h3>
                                    <p className={`text-transparent bg-gradient-to-r ${paradigm.gradient} bg-clip-text font-semibold mb-4`}>
                                        {paradigm.subtitle}
                                    </p>
                                    <p className="text-slate-300 leading-relaxed">{paradigm.description}</p>
                                    
                                    {/* Hover effect indicator */}
                                    <div className="mt-6 opacity-0 group-hover:opacity-100 transition-all duration-300">
                                        <div className={`h-1 bg-gradient-to-r ${paradigm.gradient} rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500`}></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="relative py-32 bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-20">
                        <h2 className="text-5xl md:text-6xl font-bold mb-6">
                            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent">
                                Advanced Features
                            </span>
                        </h2>
                        <p className="text-slate-400 text-xl max-w-3xl mx-auto">
                            State-of-the-art visualization technology meets educational excellence
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                        {[
                            {
                                title: "Real-Time Visualization",
                                description: "Watch algorithms execute step-by-step with smooth, animated transitions",
                                icon: (
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                    </svg>
                                ),
                                gradient: "from-blue-500 to-cyan-500"
                            },
                            {
                                title: "Interactive Learning",
                                description: "Hands-on exploration with detailed explanations for each algorithm step",
                                icon: (
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.832 18.477 19.246 18 17.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                    </svg>
                                ),
                                gradient: "from-purple-500 to-pink-500"
                            },
                            {
                                title: "Dynamic Configuration",
                                description: "Customize inputs and parameters to see how algorithms adapt and respond",
                                icon: (
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                ),
                                gradient: "from-teal-500 to-green-500"
                            },
                            {
                                title: "Performance Analytics",
                                description: "Comprehensive metrics including time complexity and space usage analysis",
                                icon: (
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                ),
                                gradient: "from-orange-500 to-red-500"
                            },
                            {
                                title: "Educational Focus",
                                description: "Designed specifically for computer science education with academic rigor",
                                icon: (
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                                    </svg>
                                ),
                                gradient: "from-indigo-500 to-purple-500"
                            },
                            {
                                title: "Responsive Design",
                                description: "Beautiful, fluid interface that works perfectly on any device or screen size",
                                icon: (
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                    </svg>
                                ),
                                gradient: "from-pink-500 to-rose-500"
                            }
                        ].map((feature, index) => (
                            <div key={index} className="group text-center">
                                <div className={`w-20 h-20 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:shadow-2xl transition-all duration-300 transform group-hover:scale-110 text-white`}>
                                    {feature.icon}
                                </div>
                                <h3 className={`text-xl font-semibold mb-3 text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text transition-all duration-300 group-hover:${feature.gradient}`}>
                                    {feature.title}
                                </h3>
                                <p className="text-slate-400 leading-relaxed">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section id="team" className="relative py-32 bg-slate-900">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-20">
                        <h2 className="text-5xl md:text-6xl font-bold mb-6">
                            <span className="bg-gradient-to-r from-teal-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                                Meet the Team
                            </span>
                        </h2>
                        <p className="text-slate-400 text-xl max-w-3xl mx-auto">
                            Passionate Computer Science students dedicated to excellence in algorithmic education
                        </p>
                    </div>

                    <div className="max-w-4xl mx-auto">
                        <div className="bg-slate-800/50 backdrop-blur-sm rounded-3xl border border-slate-700/50 p-8 md:p-12">
                            <h3 className="text-2xl font-semibold mb-8 text-center text-white">Group 6 - Design and Analysis of Algorithms</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-slate-300">
                                {[
                                    "CURADA, John Paul M.",
                                    "ZARAGOZA, Marie Criz",
                                    "LUCERO, Ken Audie S.",
                                    "FAELDONIA, Elias Von Isaac R.",
                                    "OJA, Ma. Izabelle L.",
                                    "RACELIS, Michael Richmond V.",
                                    "CANSINO, Florence Lee F.",
                                    "RAMILO, Gian G.",
                                    "MAGTANONG, Gabriel Andre E."
                                ].map((member, index) => (
                                    <div key={index} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-slate-700/30 transition-colors duration-200">
                                        <div className="w-10 h-10 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-full flex items-center justify-center shadow-lg">
                                            <span className="text-white font-bold text-sm">{member.split(',')[0].charAt(0)}</span>
                                        </div>
                                        <span className="font-medium">{member}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="relative py-32 bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800">
                <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 via-transparent to-blue-500/10"></div>
                <div className="relative container mx-auto px-4 text-center">
                    <h2 className="text-5xl md:text-6xl font-bold mb-8">
                        <span className="bg-gradient-to-r from-white via-teal-100 to-cyan-300 bg-clip-text text-transparent">
                            Ready to Explore?
                        </span>
                    </h2>
                    <p className="text-slate-300 text-xl md:text-2xl mb-12 max-w-3xl mx-auto">
                        Dive into the fascinating world of algorithms and discover the beauty of computational thinking
                    </p>
                    <Link
                        to="/simulation"
                        className="group relative inline-flex items-center px-12 py-5 bg-gradient-to-r from-teal-500 via-cyan-500 to-blue-500 hover:from-teal-600 hover:via-cyan-600 hover:to-blue-600 text-white font-bold rounded-2xl shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300 transform hover:scale-105 text-xl"
                    >
                        <span className="relative z-10 mr-3">Start Your Journey</span>
                        <svg className="w-6 h-6 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                        <div className="absolute inset-0 bg-gradient-to-r from-teal-400 via-cyan-400 to-blue-400 rounded-2xl blur-lg opacity-0 group-hover:opacity-70 transition-opacity duration-300"></div>
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default LandingPage;