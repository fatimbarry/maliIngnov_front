import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
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

        fetchTasks();
    }, []);

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
        <div className="flex flex-col items-center justify-start min-h-screen bg-gray-100 p-6">
            {/* Navbar */}
            <div className="w-full bg-white shadow-md py-4 mb-6">
                <h1 className="text-center text-2xl font-bold">Navbar</h1>
            </div>

            <div className="flex w-full">
                {/* Sidebar */}
                <div className="w-1/4 bg-white shadow-md p-4">
                    <h2 className="text-lg font-bold">Sidebar</h2>
                    {/* Add sidebar content here */}
                </div>

                {/* Main Content */}
                <div className="flex-1 flex flex-col items-center">
                    {/* Button to Add Task */}
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-lg mb-4 hover:bg-blue-600">
                        Ajouter une tâche
                    </button>

                    {/* Task List */}
                    <div className="flex flex-col gap-6">
                        {tasks.map((item, index) => (
                            <div
                                key={item.id || index}
                                className={`p-4 w-96 rounded-lg shadow-md ${
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
            </div>
        </div>
    );


};

export default Dashboard;