import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Footer: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // Function to handle navigation - works both within page and cross-page
    const handleNavClick = (href: string) => {
        // Check if we're on the landing page
        if (location.pathname === '/') {
            // We're on the landing page, scroll to section
            const element = document.querySelector(href);
            if (element) {
                element.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        } else {
            // We're on another page, navigate to landing page with hash
            navigate(`/${href}`);
        }
    };

    return (
        <footer className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-t border-slate-700/50 mt-auto overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at 25% 25%, #0891b2 0%, transparent 50%), 
                                     radial-gradient(circle at 75% 75%, #06b6d4 0%, transparent 50%)`
                }}></div>
            </div>
            
            <div className="relative container mx-auto px-4 py-12">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    {/* Brand Section */}
                    <div className="md:col-span-2 space-y-4">
                        <Link to="/" className="flex items-center group">
                            <div className="w-12 h-12 bg-gradient-to-br from-teal-400 via-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg mr-3">
                                <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2L2 7V10C2 16 6 21.5 12 23C18 21.5 22 16 22 10V7L12 2Z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-white text-2xl font-bold bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
                                    HexeCute
                                </h3>
                                <p className="text-slate-400 text-sm">Algorithm Visualizer</p>
                            </div>
                        </Link>
                        <p className="text-slate-400 leading-relaxed max-w-md">
                            Interactive algorithm simulations designed to make complex computational concepts 
                            accessible through stunning visualizations and step-by-step learning.
                        </p>
                        {/* Social Links */}
                        <div className="flex space-x-4">
                            <a href="https://github.com/JpCurada/g6-machine-problems-daa" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-slate-800/50 hover:bg-gradient-to-br hover:from-teal-500 hover:to-cyan-500 rounded-lg flex items-center justify-center transition-all duration-300 group">
                                <svg className="w-5 h-5 text-slate-400 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                                </svg>
                            </a>
                            <a href="https://github.com/JpCurada" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-slate-800/50 hover:bg-gradient-to-br hover:from-teal-500 hover:to-cyan-500 rounded-lg flex items-center justify-center transition-all duration-300 group">
                                <svg className="w-5 h-5 text-slate-400 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Navigation Links */}
                    <div className="space-y-4">
                        <h4 className="text-white font-semibold text-lg mb-4">Navigation</h4>
                        <ul className="space-y-3">
                            <li><a 
                                href="#about" 
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleNavClick('#about');
                                }}
                                className="text-slate-400 hover:text-teal-400 transition-colors duration-200 flex items-center group cursor-pointer"
                            >
                                <span className="w-0 group-hover:w-2 h-px bg-teal-400 mr-0 group-hover:mr-2 transition-all duration-200"></span>
                                About Project
                            </a></li>
                            <li><a 
                                href="#features" 
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleNavClick('#features');
                                }}
                                className="text-slate-400 hover:text-teal-400 transition-colors duration-200 flex items-center group cursor-pointer"
                            >
                                <span className="w-0 group-hover:w-2 h-px bg-teal-400 mr-0 group-hover:mr-2 transition-all duration-200"></span>
                                Features
                            </a></li>
                            <li><a 
                                href="#team" 
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleNavClick('#team');
                                }}
                                className="text-slate-400 hover:text-teal-400 transition-colors duration-200 flex items-center group cursor-pointer"
                            >
                                <span className="w-0 group-hover:w-2 h-px bg-teal-400 mr-0 group-hover:mr-2 transition-all duration-200"></span>
                                Meet the Team
                            </a></li>
                            <li><Link to="/simulation" className="text-slate-400 hover:text-teal-400 transition-colors duration-200 flex items-center group">
                                <span className="w-0 group-hover:w-2 h-px bg-teal-400 mr-0 group-hover:mr-2 transition-all duration-200"></span>
                                Launch Simulator
                            </Link></li>
                        </ul>
                    </div>

                    {/* Academic Info */}
                    <div className="space-y-4">
                        <h4 className="text-white font-semibold text-lg mb-4">Academic</h4>
                        <ul className="space-y-3">
                            <li><span className="text-slate-400">Design & Analysis</span></li>
                            <li><span className="text-slate-400">of Algorithms</span></li>
                            <li><span className="text-slate-400">Group 6 CS 2-5</span></li>
                            <li><span className="text-slate-400">CS Students</span></li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-slate-700/50 pt-8 flex flex-col md:flex-row items-center justify-between">
                    <div className="text-slate-400 text-sm mb-4 md:mb-0">
                        <p>&copy; 2025 HexeCute Algorithm Simulations. we ❤️ Sir Chris Piamonte.</p>
                    </div>
                    <div className="flex items-center space-x-3 text-slate-400 text-sm flex-wrap">
                        <span>Made with</span>
                        <div className="flex items-center space-x-2">
                            <div className="w-5 h-5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded flex items-center justify-center">
                                <span className="text-white text-xs font-bold">R</span>
                            </div>
                            <span>React</span>
                        </div>
                        <span>+</span>
                        <div className="flex items-center space-x-2">
                            <div className="w-5 h-5 bg-gradient-to-r from-purple-500 to-pink-500 rounded flex items-center justify-center">
                                <span className="text-white text-xs font-bold">T</span>
                            </div>
                            <span>TypeScript</span>
                        </div>
                        <span>+</span>
                        <div className="flex items-center space-x-2">
                            <div className="w-5 h-5 bg-gradient-to-r from-green-500 to-emerald-500 rounded flex items-center justify-center">
                                <span className="text-white text-xs font-bold">F</span>
                            </div>
                            <span>FastAPI</span>
                        </div>
                        <span>+</span>
                        <div className="flex items-center space-x-2">
                            <div className="w-5 h-5 bg-gradient-to-r from-yellow-500 to-amber-500 rounded flex items-center justify-center">
                                <span className="text-white text-xs font-bold">P</span>
                            </div>
                            <span>Python</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Decorative Gradient */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-400 via-cyan-500 to-blue-500"></div>
        </footer>
    );
};

export default Footer;