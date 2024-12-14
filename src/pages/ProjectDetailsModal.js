import React, { useState, useEffect } from 'react';
import { X, UserCircle } from 'lucide-react';
import axios from "axios";
import TaskDetailsModal from './TaskDetailsModal';

const ProjectDetailsModal = ({ projectId, isOpen, onClose }) => {
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedTaskId, setSelectedTaskId] = useState(null);


    // Simulated fetch function - replace with actual API call
    const fetchProjectDetails = async (id) => {
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:8000/api/projets/show/${id}`,{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}` // Si nécessaire
                },
            });
            setProject(response.data);
        } catch (error) {
            console.error('Erreur lors de la récupération des projets:', error);
        }
        finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (isOpen && projectId) {
            fetchProjectDetails(projectId);
        }
    }, [isOpen, projectId]);

    if (!isOpen) return null;

    if (loading) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-white"></div>
            </div>
        );
    }

    if (!project) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                <div className="bg-white p-6 rounded-xl shadow-2xl">
                    <p className="text-gray-600">Projet non trouvé</p>
                    <button
                        onClick={onClose}
                        className="mt-4 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600"
                    >
                        Fermer
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-white w-11/12 max-w-5xl rounded-xl shadow-2xl relative max-h-[90vh] overflow-y-auto">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 z-10"
                >
                    <X size={24} />
                </button>

                {/* Project Header */}
                <div className="relative">
                    <img
                        src={project.imageUrl || '/project1.jpg'}
                        alt={project.title}
                        className="w-full h-64 object-cover rounded-t-xl"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                        <h1 className="text-3xl font-bold text-white">{project.libelle}</h1>
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-6 p-6">
                    {/* Project Details Column */}
                    <div className="col-span-2 space-y-6">
                        <div>
                            <h3 className="text-xl font-semibold mb-3">Description du projet</h3>
                            <p className="text-gray-600">{project.description}</p>
                        </div>

                        <div>
                            <h3 className="text-xl font-semibold mb-3">Compétences requises</h3>
                            <div className="flex space-x-2">
                                <div className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full">
                                    Next.js
                                </div>
                                <div className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full">
                                    React.js
                                </div>
                                <div className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full">
                                    Node.js
                                </div>
                                <div className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full">
                                    Graph QL
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-between items-center">
                            <span className="bg-green-100 text-green-600 px-4 py-2 rounded-lg">
                                {project.statut || 'Ouvert'}
                            </span>
                            <p className="text-gray-500 text-sm">
                                Publié il y a 2 mois - Se termine
                                dans 5 jours
                            </p>
                        </div>
                    </div>

                    {/* Client and Tasks Column */}
                    <div className="col-span-1 space-y-6">
                        <div className="bg-gray-50 p-4 rounded-xl">
                            <div className="flex items-center mb-4">
                                <UserCircle className="w-10 h-10 text-gray-400 mr-3"/>
                                <div>
                                    <p className="text-gray-600">À propos du client</p>

                                    <p className="font-medium">{project.client ? `${project.client.prenom} ${project.client.nom}` : 'Aucun client'}</p>
                                </div>
                            </div>
                            <p className="text-gray-600 mb-2">Mode de paiement vérifié</p>
                            <p className="text-gray-600">
                                Membre depuis le 30 septembre 2024
                            </p>
                        </div>

                        <div>
                            <h3 className="text-xl font-semibold mb-3">Tâches associées</h3>
                            <div className="space-y-4">
                                {project.taches?.map((task, index) => (
                                    <div
                                        key={task.id}
                                        onClick={() => setSelectedTaskId(task.id)}
                                        className="bg-white rounded-xl shadow-md p-4 border border-gray-100 hover:shadow-lg transition-shadow"
                                    >
                                        <h4
                                            className="text-lg font-medium mb-2 truncate"
                                            title={task.titre} // Affiche le titre complet en tooltip au survol
                                        >
                                            {task.titre}
                                        </h4>
                                        <div className="flex justify-between items-center">
                                            <p className="text-gray-600">
                                                À livrer avant le : {task.due_date || 'Non défini'}
                                            </p>
                                            <div className="text-orange-500 font-bold">
                                                6.000 FCFA
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            {/* Modal de détails de la tâche */}
                            {selectedTaskId && (
                                <TaskDetailsModal
                                    taskId={selectedTaskId}
                                    isOpen={selectedTaskId !== null}
                                    onClose={() => setSelectedTaskId(null)}  // Fermer le modal de détails
                                />
                            )}
                        </div>
                        </div>


                        <button
                            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-lg transition-colors"
                            onClick={() => {/* Add join project logic */
                            }}
                        >
                            Rejoindre le projet
                        </button>
                    </div>
                </div>

        </div>
    );
};

export default ProjectDetailsModal;