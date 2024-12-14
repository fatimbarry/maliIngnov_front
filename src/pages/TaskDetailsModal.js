import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TaskDetailsModal = ({ taskId, isOpen, onClose }) => {
    const [taskDetails, setTaskDetails] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTaskDetails = async () => {
            if (isOpen && taskId) {
                setIsLoading(true);
                try {
                    const response = await axios.get(`http://localhost:8000/api/taches/show/${taskId}`,{
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${localStorage.getItem('token')}` // Si nécessaire
                        },
                    });
                    setTaskDetails(response.data);
                    console.log('Task details fetched:', response.data);
                    setError(null);
                } catch (err) {
                    setError('Impossible de charger les détails de la tâche');
                    console.error(err);
                } finally {
                    setIsLoading(false);
                }
            }
        };

        fetchTaskDetails();
    }, [taskId, isOpen]);

    if (!isOpen) return null;

    const StatusBadge = ({ status }) => {
        const statusColors = {
            'en cours': 'bg-yellow-100 text-yellow-800',
            'validé': 'bg-green-100 text-green-800',
            'terminé': 'bg-gray-100 text-gray-800',
            'A faire': 'bg-red-100 text-red-800'
        };

        return (
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[status] || 'bg-gray-100 text-gray-800'}`}>
        {status}
      </span>
        );
    };

    if (isLoading) {
        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-white"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded-lg shadow-xl text-center">
                    <p className="text-red-500">{error}</p>
                    <button
                        onClick={onClose}
                        className="mt-4 px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                    >
                        Fermer
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-2xl w-11/12 max-w-2xl max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="bg-gray-100 px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                    <h2 className="text-2xl font-semibold text-gray-800">{taskDetails?.titre || 'Aucun titre'}</h2>
                    <StatusBadge status={taskDetails?.status} />
                </div>

                {/* Body */}
                <div className="p-6 space-y-4">
                    <div>
                        <h3 className="text-lg font-medium text-gray-700 mb-2">Description</h3>
                        <p className="text-gray-600">{taskDetails?.description || 'Aucune description'}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <h4 className="text-sm font-medium text-gray-500">Temps Prévu</h4>
                            <p className="text-gray-700">{taskDetails?.temps_previs || 'N/A'}</p>
                        </div>
                        <div>
                            <h4 className="text-sm font-medium text-gray-500">Date d'échéance</h4>
                            <p className="text-gray-700">
                                {taskDetails?.due_date
                                    ? new Date(taskDetails?.due_date).toLocaleDateString()
                                    : 'Aucune date'}
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <h4 className="text-sm font-medium text-gray-500">Assigné à</h4>
                            <p className="text-gray-700">{taskDetails?.assigned_to || 'Fatima Barry'}</p>
                        </div>
                        <div>
                            <h4 className="text-sm font-medium text-gray-500">Assigné par</h4>
                            <p className="text-gray-700">{taskDetails?.assigned_by || 'Danis Dicko'}</p>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="bg-gray-100 px-6 py-4 border-t border-gray-200 flex justify-end">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors"
                    >
                        Fermer
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TaskDetailsModal;