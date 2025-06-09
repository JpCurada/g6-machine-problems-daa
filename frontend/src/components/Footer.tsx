import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-slate-900 border-t border-slate-700 mt-auto">
            <div className="container mx-auto px-4 py-6">
                <div className="flex flex-col md:flex-row items-center justify-between">
                    {/* Group Name with Icon */}
                    <div className="flex items-center space-x-2 mb-4 md:mb-0">
                        <div className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center">
                            <svg className="w-4 h-4 text-slate-300" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2L2 7V10C2 16 6 21.5 12 23C18 21.5 22 16 22 10V7L12 2Z" />
                            </svg>
                        </div>
                        <span className="text-slate-300 text-sm font-medium">GroupName</span>
                    </div>

                    {/* Links and Copyright */}
                    <div className="text-slate-400 text-sm text-center md:text-right">
                        <div className="flex flex-wrap justify-center md:justify-end gap-4 mb-2">
                            <a href="#" className="hover:text-teal-400 transition-colors">Project</a>
                            <a href="#" className="hover:text-teal-400 transition-colors">ADR</a>
                            <a href="#" className="hover:text-teal-400 transition-colors">Team</a>
                            <a href="/simulation" className="hover:text-teal-400 transition-colors">Simulation</a>
                        </div>
                        <p>&copy; 2024 Algorithm Simulations. All rights reserved.</p>
                        <p className="mt-1">Created by Students</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;