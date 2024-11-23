import React from 'react';
import { Bell, Search, Menu, User } from 'lucide-react';

const Navbar = () => {
    return (
        <nav className="flex items-center justify-between px-4 py-2 bg-white shadow-sm">
            {/* Logo and Brand */}
            <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-400 to-blue-400 flex items-center justify-center">
                    <div className="w-6 h-6 rounded-full border-2 border-white border-dashed animate-spin" />
                </div>
                <span className="text-xl font-semibold text-gray-800">MaliIngenov Work</span>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-2xl mx-8">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Rechercher"
                        className="w-full px-4 py-2 pl-10 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                    />
                    <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
                </div>
            </div>

            {/* Right Side Icons */}
            <div className="flex items-center space-x-4">
                {/* Notifications */}
                <div className="relative">
                    <Bell className="w-6 h-6 text-gray-600 hover:text-gray-800 cursor-pointer" />
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
            2
          </span>
                </div>

                {/* Menu */}
                <Menu className="w-6 h-6 text-gray-600 hover:text-gray-800 cursor-pointer" />

                {/* User Profile */}
                <div className="flex items-center space-x-2 cursor-pointer">
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                        <User className="w-5 h-5 text-gray-600" />
                    </div>
                    <svg
                        className="w-4 h-4 text-gray-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                        />
                    </svg>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;