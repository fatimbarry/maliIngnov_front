import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {User} from "lucide-react";
import Footer from "../components/Footer";
import axios from "axios";

const ChefInterface = () => {
    const [email, setEmail] = useState('');
    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem('token');
            console.log('Token utilisé :', token); // Debug : Vérifiez si un token est présent

            if (!token) {
                console.error('Token manquant. Assurez-vous que l\'utilisateur est connecté.');
                return;
            }

            try {
                const response = await axios.get('http://127.0.0.1:8000/api/users/getuser', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log('Réponse de l\'API :', response.data); // Debug : Affichez la réponse complète
                setEmail(response.data.email);
            } catch (error) {
                console.error('Erreur lors de la récupération des données utilisateur :', error.response?.data || error);
            }
        };

        fetchUserData();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100">
            <header className="bg-gray-800 text-white p-4">
                <div className="container mx-auto flex justify-between items-center">
                    <div className="flex items-center">
                        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mr-3">
                            <span className="text-gray-800 font-bold">MI</span>
                        </div>
                        <h1 className="text-xl font-bold">Mali INGENIOV</h1>
                    </div>

                    <div className="flex items-center">
                        <div className="flex items-center">
                            <User className="w-5 h-5 mr-2"/>
                            <span className="text-sm">{email || "Email indisponible"}</span>
                        </div>
                    </div>
                </div>
            </header>
            <main className="flex items-center justify-center min-h-screen bg-gray-100 p-8">
                <Link className="w-full max-w-4xl">
                    <Link className="grid grid-cols-2 gap-20 mb-20">
                        <Link to="/ChefProject"
                              className="bg-blue-500 p-8 rounded-lg flex items-center justify-between hover:bg-blue-600 transition-colors duration-300">
                            <div className="text-white font-medium text-lg">Gestion des Projets</div>
                            <div className="bg-white p-6 rounded-full">
                                <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor"
                                     viewBox="0 0 24 24"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                          d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                                </svg>
                            </div>
                        </Link>
                        <Link to="/ProjectsList"
                            className="bg-green-500 p-8 rounded-lg flex items-center justify-between hover:bg-green-600 transition-colors duration-300">
                            <div className="text-white font-medium text-lg">Contrôle du temps</div>
                            <div className="bg-white p-6 rounded-full">
                                <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor"
                                     viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                </svg>
                            </div>
                        </Link>
                        <Link to="/TacheList"
                            className="bg-gray-500 p-8 rounded-lg flex items-center justify-between hover:bg-gray-600 transition-colors duration-300">
                            <div className="text-white font-medium text-lg">Gestion Taches</div>
                            <div className="bg-white p-6 rounded-full">
                                <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor"
                                     viewBox="0 0 24 24"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                </svg>
                            </div>
                        </Link>
                        <Link to="/MaliIngenovWorkInterface"
                            className="bg-gray-800 p-8 rounded-lg flex items-center justify-between hover:bg-gray-700 transition-colors duration-300">
                            <div className="text-white font-medium text-lg">Profil</div>
                            <div className="bg-white p-6 rounded-full">
                                <User className="w-6 h-6 text-gray-800" />
                            </div>
                        </Link>
                    </Link>
                    <Footer/>
                </Link>
            </main>
        </div>
);
};

export default ChefInterface;