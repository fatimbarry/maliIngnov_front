import React, { useState, useEffect } from 'react';
import {FileText, Calendar, Hand, Briefcase, User} from 'lucide-react';
import Footer from '../components/Footer';
import axios from 'axios';
import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom';

const EmployeeInterface = () => {
    // État pour le statut, le chargement, et les erreurs
    const [status, setStatus] = useState(''); // "present" ou "absent"
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [email, setEmail] = useState('');
    const navigate = useNavigate();
    const handleTileClick = (route?: string) => {
        if (route) {
            navigate(route);
        }
    };

    const showToast = (message, type = "success") => {
        Swal.fire({
            toast: true,
            position: "top-end",
            icon: type,
            title: message,
            showConfirmButton: false,
            timer: 4000,
            timerProgressBar: true,
        });
    };

    // Fonction pour récupérer l'ID utilisateur depuis le token
    const getUserIdFromToken = () => {
        const userId = localStorage.getItem('user_id');
        if (!userId) {
            setError("Utilisateur non authentifié");
            return null;
        }
        return userId;
    };


    // Charger le token CSRF une seule fois
    useEffect(() => {
        const fetchCSRFToken = async () => {
            try {
                await axios.get('http://127.0.0.1:8000/sanctum/csrf-cookie', { withCredentials: true });
            } catch {
                //setError('Erreur lors de la récupération du token CSRF.');
            }
        };


        fetchCSRFToken();
    }, []);

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



    // Charger le statut actuel de l'utilisateur
    useEffect(() => {
        const fetchStatus = async () => {
            const userId = getUserIdFromToken();
            if (!userId) return;

            try {
                setLoading(true);
                const token = localStorage.getItem('token');
                const response = await axios.get(`http://127.0.0.1:8000/api/pointages/${userId}/status`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true,
                });
                setStatus(response.data.status);
            } catch {
                setError('Erreur lors de la récupération du statut.');
            } finally {
                setLoading(false);
            }
        };

        fetchStatus();
    }, []);

    // Basculer le statut
    const toggleStatus = async () => {
        const userId = getUserIdFromToken();
        if (!userId) return;

        try {
            setLoading(true);

            const token = localStorage.getItem('token');
            console.log('Token:', token); // Vérifiez si le token est correct

            const response = await axios.put(
                `http://127.0.0.1:8000/api/pointages/${userId}/toggle-status`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true,
                }
            );

            console.log('Response:', response.data); // Affiche la réponse pour débogage
            setStatus(response.data.status);
            showToast(`Statut mis à jour : ${status === 'present' ? 'Absent' : 'Présent'}`);

        } catch (error) {
            console.error('Error:', error.response?.data || error.message);
            setError('Erreur lors de la mise à jour du statut.');
            showToast('Erreur lors de la mise à jour du statut');
        } finally {
            setLoading(false);
        }
    };




    const tiles = [
        {
            id: 1,
            title: 'Consultation',
            icon: FileText,
            color: 'bg-yellow-500',
            size: 'col-span-1',
            route: '/MaliIngenovWorkInterface' // Ajout de la route pour Consultation
        },
        {
            id: 2,
            title: 'Imputation',
            icon: Calendar,
            color: 'bg-blue-500',
            size: 'col-span-1',
            route: '/imputation' // Ajoutez une route si nécessaire
        },
        {
            id: 3,
            title: 'Pointage',
            icon: Hand,
            color: status === 'present' ? 'bg-green-500' : 'bg-red-500',
            size: 'col-span-1',
        },
        {
            id: 4,
            title: 'Projets',
            icon: Briefcase,
            color: 'bg-gray-700',
            size: 'col-span-1',
            route: '/ListProject' // Ajoutez une route si nécessaire
        },
    ];

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
                <div className="w-full max-w-4xl">
                    {error && (
                        <div className="bg-red-100 text-red-800 p-3 rounded mb-5">
                            {error}
                        </div>
                    )}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                        {tiles.map((tile) => (
                            <div
                                key={tile.id}
                                className={`${tile.color} ${tile.size} rounded-lg shadow-lg hover:shadow-xl transition-shadow`}
                            >
                                {tile.id === 3 ? (
                                    <button
                                        className="w-full h-full flex flex-col items-center justify-center text-white p-6"
                                        onClick={toggleStatus}
                                        disabled={loading}
                                    >
                                        <tile.icon className="w-16 h-16 mb-4"/>
                                        <span className="text-xl font-semibold">
                                        {loading ? 'Chargement...' : `Pointage (${status})`}
                                    </span>
                                    </button>
                                ) : (
                                    <button
                                        className="w-full h-full flex flex-col items-center justify-center text-white p-6"
                                        onClick={() => handleTileClick(tile.route)}
                                    >
                                        <tile.icon className="w-16 h-16 mb-4"/>
                                        <span className="text-xl font-semibold">{tile.title}</span>
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                    <Footer/>
                </div>
            </main>

        </div>
    );
};

export default EmployeeInterface;
