import React from 'react';
import { User, Lock } from 'lucide-react';

const LoginComponent = () => {
    return (
        <div className="bg-black min-h-screen flex items-center justify-center">
            <div className="bg-gray-900 p-8 rounded-lg shadow-lg w-80 relative">
                <div className="absolute -top-3 -right-3 bg-gray-800 rounded-full p-2">
                    <Lock className="text-white" size={16} />
                </div>
                <div className="mb-6 text-center">
                    <h1 className="text-white text-2xl font-bold">MAROC INGENOV</h1>
                    <p className="text-gray-400 text-sm">Gestion de projet</p>
                </div>
                <form>
                    <div className="mb-4 relative">
                        <User className="absolute left-3 top-3 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Nom d'utilisateur"
                            className="w-full py-2 pl-10 pr-3 bg-gray-800 text-white rounded-md border border-gray-700 focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <div className="mb-6 relative">
                        <Lock className="absolute left-3 top-3 text-gray-400" size={18} />
                        <input
                            type="password"
                            placeholder="Mot de passe"
                            className="w-full py-2 pl-10 pr-3 bg-gray-800 text-white rounded-md border border-gray-700 focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
                    >
                        Se Connecter
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginComponent;