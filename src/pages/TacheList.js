import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from "../components/Navbar";
import {Link} from "react-router-dom";
import {Edit, Eye, Home, Star} from "lucide-react";
import AddTaskModal from './AddTaskModal ';

const Dashboard = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [ setTaches] = useState([]);
    // États pour les projets
    const [projets, setProjets] = useState([]);
    const [projetLoading, setProjetLoading] = useState(true);
    const [projetError, setProjetError] = useState(null);

    // Charger les projets
    useEffect(() => {
        const fetchProjets = async () => {
            try {
                // Réinitialiser l'état avant le chargement
                setProjetError(null);
                setProjetLoading(true);

                // Remplacez par votre endpoint réel de chargement des projets
                const response = await axios.get('http://localhost:8000/api/projets',{
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                    withCredentials: true,
                });

                // Vérifier si la réponse contient des données
                if (response.data && Array.isArray(response.data)) {
                    setProjets(response.data);
                } else {
                    throw new Error('Format de données invalide');
                }
            } catch (error) {
                console.error('Erreur lors du chargement des projets:', error);
                setProjetError({
                    message: error.response?.data?.message || error.message || 'Erreur de chargement des projets',
                    status: error.response?.status
                });
            } finally {
                setProjetLoading(false);
            }
        };

        // Charger les projets au montage du composant
        fetchProjets();
    }, []);



    useEffect(() => {
        fetchTasks();
    }, [])

    const fetchTasks = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/taches',{
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            });
            setTasks(response.data);
            setLoading(false);
        } catch (err) {
            setError('Erreur lors du chargement des tâches');
            setLoading(false);
        }
    };


    const handleTaskAdded = () => {
        // Recharger la liste des clients
        fetchTasks();
    };


    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <p className="text-gray-600">Chargement des tâches...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-100 text-red-800 p-4 rounded-md">
                {error}
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <div className="flex">
                <aside className="w-64 bg-gray-900 text-white h-[calc(100vh-4rem)] fixed top-14 left-0">
                    <div className="p-4">
                        <h2 className="text-xl font-bold mb-4">MALI INGÉNOV</h2>
                        <nav className="space-y-2">
                            <Link to="/ChefInterface" className="flex items-center py-2 px-4 hover:bg-gray-800 rounded"><Home
                                size={18}
                                className="mr-2"/> Accueil</Link>
                            <Link to="/TacheList" className="flex items-center py-2 px-4 hover:bg-gray-800 rounded"><Eye
                                size={18}
                                className="mr-2"/> Taches</Link>
                            <Link to="/ChefProject" className="flex items-center py-2 px-4 bg-blue-600 rounded"><Edit
                                size={18}
                                className="mr-2"/> Projets</Link>
                            <Link to="#" className="flex items-center py-2 px-4 hover:bg-gray-800 rounded"><Star
                                size={18}
                                className="mr-2"/> Heures
                                supplémentaires</Link>
                        </nav>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1 ml-64 p-8">
                    {/* Button to Add Task */}
                    <div>
                        {/* Remplacez l'ancien bouton par le composant AddTaskModal */}
                        <AddTaskModal
                            projets={projets}
                            onTaskAdded={handleTaskAdded}
                        />

                        {/* Reste de votre liste de tâches */}
                    </div>

                    {/* Task List */}
                    <div className="bg-white rounded-lg shadow-md p-4">
                        <div className="flex flex-col gap-4"> {/* Utilisation de `gap-4` pour espacer verticalement */}
                            {tasks.map((item, index) => (
                                <div
                                    key={item.id || index}
                                    className={`bg-white rounded-lg shadow-md p-4 ${
                                        item.type === 'accept'
                                            ? 'bg-green-100 text-green-800'
                                            : item.type === 'inProgress'
                                                ? 'bg-blue-100 text-blue-800'
                                                : item.type === 'review'
                                                    ? 'bg-yellow-100 text-yellow-800'
                                                    : 'bg-red-100 text-red-800'
                                    }`}
                                >
                                    <h1 className="text-lg font-medium mb-2">{item.titre}</h1>
                                    <p className="text-gray-600">Description: {item.description}</p>
                                    <p className="text-gray-600">Durée prévue: {item.temps_previs}</p>
                                    <div className="flex justify-between items-center">
                                        <p className="text-gray-600">À livrer avant le : Non défini</p>
                                        <div className="text-orange-500 font-bold">6.00 FCFA</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </main>
            </div>
        </div>

    );


};

export default Dashboard;