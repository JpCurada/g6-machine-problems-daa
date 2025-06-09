import React from 'react';

const Header: React.FC = () => {
    return (
        <header className="bg-slate-900 border-b border-slate-700">
            <div className="container mx-auto px-4 py-3">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <div className="flex items-center">
                        <h1 className="text-white text-xl font-semibold">LogoHere</h1>
                    </div>

                    {/* Navigation */}
                    <nav className="hidden md:flex items-center space-x-6">
                        <a
                            href="#"
                            className="text-slate-300 hover:text-teal-400 transition-colors duration-200"
                        >
                            Meet the Team
                        </a>
                    </nav>

                    {/* Mobile menu button */}
                    <button className="md:hidden text-slate-300 hover:text-white">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;