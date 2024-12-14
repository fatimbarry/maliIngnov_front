import Navbar from "../components/Navbar";
import {Link} from "react-router-dom";
import {Edit, Eye, Home, Plus, Star} from "lucide-react";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddTaskModal from "./AddTaskModal ";
import ProjectDetailsModal from "./ProjectDetailsModal";

const ChefProject = () => {
    // États pour gérer les données et la pagination
    const [projets, setProjets] = useState([]);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedProjetForTask, setSelectedProjetForTask] = useState(null);
    const [selectedProjetForDetails, setSelectedProjetForDetails] = useState(null);
    // Fonctions pour gérer les modals
    const handleOpenTaskModal = (projetId) => {
        setSelectedProjetForTask(projetId);
    };

    const handleCloseTaskModal = () => {
        setSelectedProjetForTask(null);
    };

    const handleOpenDetailsModal = (projetId) => {
        setSelectedProjetForDetails(projetId);
    };

    const handleCloseDetailsModal = () => {
        setSelectedProjetForDetails(null);
    };
    // Récupération des données depuis l'API
    useEffect(() => {
        const fetchProjets = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/projets',{
                    headers: {
                    'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}` // Si nécessaire
                },
            });
                setProjets(response.data);
            } catch (error) {
                console.error('Erreur lors de la récupération des projets:', error);
            }
        };

        fetchProjets();
    }, []);

    // Pagination des projets
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentProjets = projets.slice(indexOfFirstItem, indexOfLastItem);

    // Changement du nombre d'éléments par page
    const handleItemsPerPageChange = (number) => {
        setItemsPerPage(number);
        setCurrentPage(1);
    };


    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar className="h-16"/>
            {/* Sidebar */}
            <div className="flex">
                <aside className="w-64 bg-gray-900 text-white h-[calc(100vh-4rem)] fixed top-14 left-0">
                    <div className="p-4">
                        <h2 className="text-xl font-bold mb-4">MALI INGÉNOV</h2>
                        <nav className="space-y-2">
                            <Link to="/ChefInterface" className="flex items-center py-2 px-4 hover:bg-gray-800 rounded"><Home size={18}
                                                                                                                                  className="mr-2"/> Accueil</Link>
                            <Link to="/TacheList" className="flex items-center py-2 px-4 hover:bg-gray-800 rounded"><Eye size={18}
                                                                                                                            className="mr-2"/> Taches</Link>
                            <Link to="/ChefProject" className="flex items-center py-2 px-4 bg-blue-600 rounded"><Edit size={18}
                                                                                                           className="mr-2"/> Projets</Link>
                            <Link to="#" className="flex items-center py-2 px-4 hover:bg-gray-800 rounded"><Star size={18}
                                                                                                                 className="mr-2"/> Heures
                                supplémentaires</Link>
                        </nav>
                    </div>
                </aside>
                {/* Main content */}
                <main className="flex-1 ml-64 p-8">

                    <div className="w-full bg-white shadow-md rounded-lg overflow-hidden">
                        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                            <h2 className="text-xl font-semibold text-gray-800">Liste des Projets</h2>
                        </div>

                        {/* Options de pagination */}
                        <div className="px-6 py-4 flex items-center space-x-3">
                            <span className="text-gray-600">Afficher</span>
                            {[10, 20, 50].map((number) => (
                                <button
                                    key={number}
                                    onClick={() => handleItemsPerPageChange(number)}
                                    className={`px-3 py-1 rounded text-sm transition-colors duration-200 ${
                                        itemsPerPage === number
                                            ? 'bg-blue-500 text-white'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                                >
                                    {number}
                                </button>
                            ))}
                        </div>

                        {/* Tableau des projets */}
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-100 border-b">
                                <tr>
                                    {['Libellé', 'Date Service', 'Client', 'État', 'Date Achèvement','Action'].map((header) => (
                                        <th
                                            key={header}
                                            className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            {header}
                                        </th>
                                    ))}
                                </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                {currentProjets.map((projet, index) => (
                                    <tr key={projet.id || index} className="hover:bg-gray-50">
                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{projet.libelle || 'Non défini'}</td>
                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{projet.date_service || 'Non spécifiée'}</td>
                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                                            {projet.client ? `${projet.client.prenom || ''} ${projet.client.nom || ''}`.trim() || 'Non renseigné' : 'Non renseigné'}
                                        </td>
                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{projet.statut || 'Inconnu'}</td>
                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{projet.date_fin || 'Non terminé'}</td>
                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                                            {/* Bouton pour ajouter une tâche */}
                                            <button
                                                className="text-green-500 hover:text-green-700 ml-2"
                                                onClick={() => handleOpenTaskModal(projet.id)}
                                            >
                                                <Plus className="h-5 w-5"/>
                                            </button>

                                            {/* Modal pour ajouter une tâche */}
                                            {selectedProjetForTask === projet.id && (
                                                <AddTaskModal
                                                    projetId={selectedProjetForTask}
                                                    onTaskAdded={handleCloseTaskModal}
                                                />
                                            )}

                                            {/* Bouton pour voir les détails du projet */}
                                            <button
                                                className="text-gray-500 hover:text-gray-700"
                                                onClick={() => handleOpenDetailsModal(projet.id)}
                                            >
                                                <Eye className="h-4 w-4"/>
                                            </button>

                                            {/* Modal pour voir les détails du projet */}
                                            {selectedProjetForDetails === projet.id && (
                                                <ProjectDetailsModal
                                                    projectId={selectedProjetForDetails}
                                                    isOpen={true}
                                                    onClose={handleCloseDetailsModal}
                                                />
                                            )}
                                        </td>

                                    </tr>
                                ))}
                                </tbody>
                            </table>

                        </div>

                        {/* Pagination */}
                        <div className="px-6 py-4 flex justify-between items-center border-t">
                            <span className="text-sm text-gray-700">
                              Page {currentPage} sur {Math.ceil(projets.length / itemsPerPage)}
                            </span>
                            <div className="space-x-2">
                                <button
                                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                    disabled={currentPage === 1}
                                    className="px-4 py-2 text-sm bg-white text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Précédent
                                </button>
                                <button
                                    onClick={() => setCurrentPage(prev =>
                                        prev < Math.ceil(projets.length / itemsPerPage) ? prev + 1 : prev
                                    )}
                                    disabled={currentPage >= Math.ceil(projets.length / itemsPerPage)}
                                    className="px-4 py-2 text-sm bg-white text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Suivant
                                </button>
                            </div>
                        </div>
                    </div>
                </main>
            </div>

        </div>
    );
};

export default ChefProject;