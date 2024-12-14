import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TaskManagementModal = ({ projectId }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [unassignedTasks, setUnassignedTasks] = useState([]);
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const [tasksResponse, usersResponse] = await Promise.all([
                axios.get(`/api/projects/${projectId}/unassigned-tasks`),
                axios.get('/api/users')
            ]);
            setUnassignedTasks(tasksResponse.data);
            setUsers(usersResponse.data);
        } catch (error) {
            console.error('Erreur de chargement des données', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (isModalOpen) {
            fetchData();
        }
    }, [isModalOpen, projectId]);

    const handleAssignTask = async (taskId, userId) => {
        try {
            await axios.post(`/api/tasks/${taskId}/assign`, { assigned_to: userId });
            setUnassignedTasks(unassignedTasks.filter(task => task.id !== taskId));
        } catch (error) {
            console.error('Erreur d\'assignation de tâche', error);
        }
    };

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <>
            <button
                onClick={openModal}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors flex items-center"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.768-.293-1.47-.764-2M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.768.293-1.47.764-2M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Tâches non assignées
            </button>

            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
                    <div
                        className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="flex justify-between items-center p-6 border-b">
                            <h2 className="text-2xl font-semibold text-gray-800 flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                                </svg>
                                Tâches non assignées
                            </h2>
                            <button
                                onClick={closeModal}
                                className="text-gray-500 hover:text-gray-700 transition-colors"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Content */}
                        <div className="p-6 overflow-y-auto flex-grow">
                            {isLoading ? (
                                <div className="flex justify-center items-center h-full">
                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                                </div>
                            ) : unassignedTasks.length === 0 ? (
                                <div className="text-center text-gray-500 py-8">
                                    Aucune tâche non assignée
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {unassignedTasks.map(task => (
                                        <div
                                            key={task.id}
                                            className="bg-gray-50 border border-gray-200 rounded-lg p-4 flex items-center justify-between hover:bg-gray-100 transition-colors"
                                        >
                                            <div className="flex-grow mr-4">
                                                <h3 className="font-semibold text-lg text-gray-800">{task.title}</h3>
                                                <p className="text-gray-600 text-sm">{task.description}</p>
                                            </div>
                                            <select
                                                onChange={(e) => handleAssignTask(task.id, e.target.value)}
                                                className="border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            >
                                                <option value="">Assigner à</option>
                                                {users.map(user => (
                                                    <option key={user.id} value={user.id}>
                                                        {user.prenom} {user.nom}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default TaskManagementModal;