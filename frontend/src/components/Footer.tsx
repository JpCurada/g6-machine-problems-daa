import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
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
                            <a href="#" className="w-10 h-10 bg-slate-800/50 hover:bg-gradient-to-br hover:from-teal-500 hover:to-cyan-500 rounded-lg flex items-center justify-center transition-all duration-300 group">
                                <svg className="w-5 h-5 text-slate-400 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                                </svg>
                            </a>
                            <a href="#" className="w-10 h-10 bg-slate-800/50 hover:bg-gradient-to-br hover:from-teal-500 hover:to-cyan-500 rounded-lg flex items-center justify-center transition-all duration-300 group">
                                <svg className="w-5 h-5 text-slate-400 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                                </svg>
                            </a>
                            <a href="#" className="w-10 h-10 bg-slate-800/50 hover:bg-gradient-to-br hover:from-teal-500 hover:to-cyan-500 rounded-lg flex items-center justify-center transition-all duration-300 group">
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
                            <li><a href="#about" className="text-slate-400 hover:text-teal-400 transition-colors duration-200 flex items-center group">
                                <span className="w-0 group-hover:w-2 h-px bg-teal-400 mr-0 group-hover:mr-2 transition-all duration-200"></span>
                                About Project
                            </a></li>
                            <li><a href="#features" className="text-slate-400 hover:text-teal-400 transition-colors duration-200 flex items-center group">
                                <span className="w-0 group-hover:w-2 h-px bg-teal-400 mr-0 group-hover:mr-2 transition-all duration-200"></span>
                                Features
                            </a></li>
                            <li><a href="#team" className="text-slate-400 hover:text-teal-400 transition-colors duration-200 flex items-center group">
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
                            <li><span className="text-slate-400">Group 6 Project</span></li>
                            <li><span className="text-slate-400">CS Students</span></li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-slate-700/50 pt-8 flex flex-col md:flex-row items-center justify-between">
                    <div className="text-slate-400 text-sm mb-4 md:mb-0">
                        <p>&copy; 2024 HexeCute Algorithm Simulations. Crafted with ❤️ by CS Students.</p>
                    </div>
                    <div className="flex items-center space-x-4 text-slate-400 text-sm">
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
                    </div>
                </div>
            </div>

            {/* Decorative Gradient */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-400 via-cyan-500 to-blue-500"></div>
        </footer>
    );
};

export default Footer;