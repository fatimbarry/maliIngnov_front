import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import axios from 'axios';
import Swal from "sweetalert2";

const ContractModal = ({ projetId, onContractAdded }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({
        titre: '',
        description: '',
        type_contrat: '',
        statut: 'En attente',
        montant: '',
        date: ''
    });

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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                'http://localhost:8000/api/contracts-store',
                {
                    ...formData, // Les données du formulaire
                    projet_id: projetId,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`, // Si nécessaire
                    },
                    withCredentials: true,
                }
            );

            // Notification de succès
            showToast('Contrat ajouté avec succès !', 'success');

            // Fermer le modal
            setIsOpen(false);

            // Réinitialiser le formulaire
            setFormData({
                titre: '',
                description: '',
                type_contrat: '',
                statut: 'En attente',
                montant: '',
                date: '',
            });

            // Appeler le callback pour mettre à jour la liste
            if (onContractAdded) {
                onContractAdded();
            }
        } catch (error) {
            // Gestion des erreurs
            const errorMessage =
                error.response?.data?.message || 'Erreur lors de l\'ajout du contrat';
            showToast(errorMessage, 'error');
            console.error(error);
        }
    };


    return (
        <>
            {/* Bouton déclencheur */}
            <button
                onClick={() => setIsOpen(true)}
                className="text-green-500 hover:text-green-700 transition-colors duration-200"
            >
                <Plus className="h-5 w-5"/>
            </button>

            {/* Modal */}
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
                        {/* En-tête du modal */}
                        <div className="flex justify-between items-center p-6 border-b">
                            <h2 className="text-xl font-semibold text-gray-800">
                                Ajouter un Nouveau Contrat
                            </h2>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-gray-500 hover:text-gray-700 transition-colors"
                            >
                                <X className="h-6 w-6" />
                            </button>
                        </div>

                        {/* Formulaire */}
                        <form onSubmit={handleSubmit} className="p-6 space-y-6">
                            {/* Titre */}
                            <div>
                                <label htmlFor="titre" className="block text-sm font-medium text-gray-700 mb-2">
                                    Titre du Contrat
                                </label>
                                <input
                                    type="text"
                                    id="titre"
                                    name="titre"
                                    value={formData.titre}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                                    placeholder="Saisissez le titre du contrat"
                                />
                            </div>

                            {/* Description */}
                            <div>
                                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                                    Description (Optionnel)
                                </label>
                                <textarea
                                    id="description"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    rows={4}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                                    placeholder="Détails supplémentaires du contrat"
                                />
                            </div>

                            {/* Type de Contrat */}
                            <div>
                                <label htmlFor="type_contrat" className="block text-sm font-medium text-gray-700 mb-2">
                                    Type de Contrat
                                </label>
                                <select
                                    id="type_contrat"
                                    name="type_contrat"
                                    value={formData.type_contrat}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                                >
                                    <option value="">Sélectionnez un type</option>
                                    <option value="Service">Service</option>
                                    <option value="Maintenance">Maintenance</option>
                                    <option value="Consultation">Consultation</option>
                                    <option value="Développement">Développement</option>
                                </select>
                            </div>

                            {/* Statut */}
                            <div>
                                <label htmlFor="statut" className="block text-sm font-medium text-gray-700 mb-2">
                                    Statut du Contrat
                                </label>
                                <select
                                    id="statut"
                                    name="statut"
                                    value={formData.statut}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                                >
                                    <option value="En attente">En attente</option>
                                    <option value="Actif">Actif</option>
                                    <option value="Terminé">Terminé</option>
                                    <option value="Annulé">Annulé</option>
                                </select>
                            </div>

                            {/* Montant */}
                            <div>
                                <label htmlFor="montant" className="block text-sm font-medium text-gray-700 mb-2">
                                    Montant du Contrat
                                </label>
                                <input
                                    type="number"
                                    id="montant"
                                    name="montant"
                                    step="0.01"
                                    value={formData.montant}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                                    placeholder="Montant du contrat"
                                />
                            </div>

                            {/* Date */}
                            <div>
                                <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
                                    Date du Contrat
                                </label>
                                <input
                                    type="date"
                                    id="date"
                                    name="date"
                                    value={formData.date}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                                />
                            </div>

                            {/* Boutons d'action */}
                            <div className="flex justify-end space-x-4 pt-4 border-t">
                                <button
                                    type="button"
                                    onClick={() => setIsOpen(false)}
                                    className="px-4 py-2 text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                                >
                                    Annuler
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                                >
                                    Ajouter le Contrat
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default ContractModal;