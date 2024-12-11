import React, { useState } from 'react';
import axios from 'axios';
import { Clock, Plus, X } from 'lucide-react';
import Swal from "sweetalert2";

const AddTaskModal = ({ projets, onTaskAdded }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [task, setTask] = useState({
        titre: '',
        description: '',
        temps_previs: '',
        status: 'A faire',
        projet_id: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (name === 'temps_previs') {
            const formattedTime = `${value}:00`; // Ajoute les secondes si le champ est temps_previs
            setTask((prevTask) => ({
                ...prevTask,
                [name]: formattedTime,
            }));
        } else {
            setTask((prevTask) => ({
                ...prevTask,
                [name]: value,
            }));
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/taches-store', task, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                withCredentials: true,
            });

            if (response.data) {
                showToast('La tâche a été ajoutée avec succès!', 'success');

                // Réinitialiser le formulaire
                setTask({
                    titre: '',
                    description: '',
                    temps_previs: '',
                    status: 'A faire',
                    projet_id: ''
                });

                if (onTaskAdded) {
                    onTaskAdded(response.data);
                }
                // Fermer le modal
                setIsOpen(false);
            }
        } catch (error) {
            console.error('Erreur lors de l\'ajout de la tâche:', error);
            showToast('Erreur lors de l\'ajout de la tâche', 'error');
        }
    };


    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg mb-4 hover:bg-blue-600 float-end flex items-center"
            >
                <Plus className="mr-2 h-5 w-5" /> Ajouter une tâche
            </button>

            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
                    <div className="relative w-full max-w-2xl mx-auto my-6">
                        <div className="relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none">
                            {/* Header */}
                            <div className="flex items-start justify-between p-5 border-b border-solid rounded-t border-blueGray-200">
                                <h3 className="text-2xl font-semibold text-gray-800">
                                    Nouvelle Tâche
                                </h3>
                                <button
                                    className="float-right p-1 ml-auto bg-transparent border-0 text-black opacity-5 text-3xl leading-none font-semibold outline-none focus:outline-none"
                                    onClick={() => setIsOpen(false)}
                                >
                                    <X className="w-6 h-6 text-gray-500 hover:text-gray-700" />
                                </button>
                            </div>

                            {/* Contenu du formulaire */}
                            <form onSubmit={handleSubmit} className="relative p-6 flex-auto space-y-4">
                                <div>
                                    <label htmlFor="titre" className="block text-sm font-medium text-gray-700 mb-2">
                                        Titre de la tâche
                                    </label>
                                    <input
                                        type="text"
                                        name="titre"
                                        id="titre"
                                        required
                                        value={task.titre}
                                        onChange={handleInputChange}
                                        placeholder="Entrez le titre de la tâche"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                                        Description
                                    </label>
                                    <textarea
                                        name="description"
                                        id="description"
                                        value={task.description}
                                        onChange={handleInputChange}
                                        placeholder="Description détaillée (optionnel)"
                                        rows="3"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="temps_previs" className="block text-sm font-medium text-gray-700 mb-2">
                                            Temps prévu
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="time"
                                                name="temps_previs"
                                                id="temps_previs"
                                                value={task.temps_previs}
                                                onChange={handleInputChange}
                                                className="w-full px-3 py-2 pl-8 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                            <Clock className="absolute left-2 top-3 h-4 w-4 text-gray-400" />
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="projet_id" className="block text-sm font-medium text-gray-700 mb-2">
                                            Projet
                                        </label>
                                        <select
                                            name="projet_id"
                                            id="projet_id"
                                            value={task.projet_id}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        >
                                            <option value="">Sélectionnez un projet</option>
                                            {projets.map(projet => (
                                                <option key={projet.id} value={projet.id}>
                                                    {projet.libelle}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
                                        Statut
                                    </label>
                                    <select
                                        name="status"
                                        id="status"
                                        value={task.status}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="A faire">À faire</option>
                                        <option value="en cours">en cours</option>
                                        <option value="terminé">terminé</option>
                                        <option value="validé">validé</option>
                                    </select>
                                </div>

                                {/* Footer */}
                                <div className="flex items-center justify-end p-6 border-t border-solid rounded-b border-blueGray-200">
                                    <button
                                        type="button"
                                        className="px-6 py-2 mb-1 mr-2 text-sm font-bold text-gray-600 uppercase transition-all duration-150 ease-linear bg-white rounded-lg outline-none hover:bg-gray-100 focus:outline-none"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        Annuler
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-6 py-2 mb-1 mr-1 text-sm font-bold text-white uppercase transition-all duration-150 ease-linear bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none"
                                    >
                                        Créer la tâche
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {/* Overlay semi-transparent */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black opacity-25"
                    onClick={() => setIsOpen(false)}
                ></div>
            )}
        </>
    );
};

export default AddTaskModal;