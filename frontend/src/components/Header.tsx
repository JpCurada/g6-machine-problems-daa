import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className={`fixed w-full z-50 transition-all duration-300 ${
            isScrolled 
                ? 'bg-slate-900/95 backdrop-blur-md border-b border-slate-700/50 shadow-lg' 
                : 'bg-gradient-to-r from-slate-900/80 to-slate-800/80 backdrop-blur-sm'
        }`}>
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    {/* Enhanced Logo */}
                    <Link to="/" className="flex items-center group">
                        <div className="relative">
                            <div className="w-10 h-10 bg-gradient-to-br from-teal-400 via-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-all duration-300">
                                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2L2 7V10C2 16 6 21.5 12 23C18 21.5 22 16 22 10V7L12 2Z" />
                                </svg>
                                {/* Glow effect */}
                                <div className="absolute inset-0 bg-gradient-to-br from-teal-400 via-cyan-500 to-blue-600 rounded-xl blur-sm opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
                            </div>
                        </div>
                        <div className="ml-3">
                            <h1 className="text-white text-2xl font-bold bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
                                HexeCute
                            </h1>
                            <p className="text-xs text-slate-400 -mt-1">Algorithm Visualizer</p>
                        </div>
                    </Link>

                    {/* Enhanced Navigation */}
                    <nav className="hidden md:flex items-center space-x-8">
                        <a
                            href="#about"
                            className="relative text-slate-300 hover:text-white transition-all duration-300 group py-2"
                        >
                            About
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-teal-400 to-cyan-500 group-hover:w-full transition-all duration-300"></span>
                        </a>
                        <a
                            href="#features"
                            className="relative text-slate-300 hover:text-white transition-all duration-300 group py-2"
                        >
                            Features
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-teal-400 to-cyan-500 group-hover:w-full transition-all duration-300"></span>
                        </a>
                        <a
                            href="#team"
                            className="relative text-slate-300 hover:text-white transition-all duration-300 group py-2"
                        >
                            Team
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-teal-400 to-cyan-500 group-hover:w-full transition-all duration-300"></span>
                        </a>
                        <Link
                            to="/simulation"
                            className="bg-gradient-to-r from-teal-500 via-cyan-500 to-blue-500 hover:from-teal-600 hover:via-cyan-600 hover:to-blue-600 text-white px-6 py-2.5 rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                        >
                            Launch Simulator
                        </Link>
                    </nav>

                    {/* Enhanced Mobile menu button */}
                    <button 
                        className="md:hidden text-slate-300 hover:text-white transition-colors duration-200 relative"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        <svg className={`w-6 h-6 transition-transform duration-300 ${isMobileMenuOpen ? 'rotate-90' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>

                {/* Mobile Menu */}
                <div className={`md:hidden overflow-hidden transition-all duration-300 ${isMobileMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <nav className="pt-4 pb-2 space-y-2">
                        <a href="#about" className="block text-slate-300 hover:text-white hover:bg-slate-800/50 px-4 py-3 rounded-lg transition-colors">About</a>
                        <a href="#features" className="block text-slate-300 hover:text-white hover:bg-slate-800/50 px-4 py-3 rounded-lg transition-colors">Features</a>
                        <a href="#team" className="block text-slate-300 hover:text-white hover:bg-slate-800/50 px-4 py-3 rounded-lg transition-colors">Team</a>
                        <Link to="/simulation" className="block bg-gradient-to-r from-teal-500 to-cyan-500 text-white px-4 py-3 rounded-lg font-semibold text-center">Launch Simulator</Link>
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Header;