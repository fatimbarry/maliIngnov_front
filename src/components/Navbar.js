import React, { useState, useCallback } from 'react';
import { Bell, Search, Menu, User, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {UserCircle } from 'lucide-react';

const Navbar = ({ userName = "Fatoumata Boubacar Barry", email = "fatimbarry78130@gmail.com" }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Logique de déconnexion (déconnexion, suppression du token, etc.)
        localStorage.removeItem('token'); // Exemple de suppression du token
        // Redirection vers la page d'accueil
        navigate('/');
    };

    const handleProfileClick = () => {
        // Redirection vers la page de profil
        navigate('/MaliIngenovWorkInterface');
        setIsOpen(false); // Fermer le dropdown après la navigation
    };
    const [isOpen, setIsOpen] = useState(false);

    // Utilisation de useCallback pour mémoriser la fonction
    const handleClickOutside = useCallback((e) => {
        if (isOpen && !e.target.closest('.profile-dropdown')) {
            setIsOpen(false);
        }
    }, [isOpen]);

    // useEffect avec la dépendance handleClickOutside
    React.useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [handleClickOutside]);

    // const handleLogout = () => {
    //     // Logique de déconnexion
    //     console.log('Déconnexion');
    //     setIsOpen(false);
    // };

    return (
        <nav className="flex items-center justify-between px-4 py-2 bg-white shadow-md">
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
                        placeholder="Rechercher..."
                        className="w-full px-4 py-2 pl-10 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white transition-all duration-200"
                    />
                    <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
                </div>
            </div>

            {/* Right Side Icons */}
            <div className="flex items-center space-x-6">
                {/* Notifications */}
                <div className="relative">
                    <Bell className="w-6 h-6 text-gray-600 hover:text-gray-800 cursor-pointer transition-colors duration-200"/>
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
                        2
                    </span>
                </div>

                {/* Menu */}
                <Menu className="w-6 h-6 text-gray-600 hover:text-gray-800 cursor-pointer transition-colors duration-200"/>

                {/* User Profile Dropdown */}
                <div className="relative profile-dropdown">
                    <div
                        className="flex items-center space-x-2 cursor-pointer"
                        onClick={(e) => {
                            e.stopPropagation();
                            setIsOpen(!isOpen);
                        }}
                    >
                        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors duration-200">
                            <User className="w-5 h-5 text-gray-600"/>
                        </div>
                        <svg
                            className={`w-4 h-4 text-gray-600 transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
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

                    {/* Dropdown Menu */}
                    {isOpen && (
                        <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg py-2 border border-gray-100 z-50">
                            <div className="px-4 py-2">
                                <div className="text-sm font-medium text-gray-900">{userName}</div>
                                <div className="text-sm text-gray-500">{email}</div>
                            </div>
                            <div className="h-px bg-gray-100 my-1"/>

                            {/* Nouveau bouton Voir Profil */}
                            <button
                                onClick={handleProfileClick}
                                className="w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-50 flex items-center space-x-2 transition-colors duration-200"
                            >
                                <UserCircle className="w-4 h-4"/>
                                <span>Voir Profil</span>
                            </button>

                            <button
                                onClick={handleLogout}
                                className="w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-50 flex items-center space-x-2 transition-colors duration-200"
                            >
                                <LogOut className="w-4 h-4"/>
                                <span>Déconnexion</span>
                            </button>
                        </div>
                    )}

                </div>
            </div>
        </nav>
    );
};

export default Navbar;