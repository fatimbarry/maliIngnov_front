import React, { useState, useEffect } from 'react';
import { UserPlus } from 'lucide-react';
import axios from 'axios';
import Swal from 'sweetalert2';

const UpdateClientModal = ({ client, onClose, onClientUpdated }) => {
    const [clientData, setClientData] = useState({
        nom: '',
        prenom: '',
        telephone: '',
        email: ''
    });

    // Populate form with existing client data when modal opens
    useEffect(() => {
        if (client) {
            setClientData({
                nom: client.nom || '',
                prenom: client.prenom || '',
                telephone: client.telephone || '',
                email: client.email || ''
            });
        }
    }, [client]);

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

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setClientData(prevState => ({
            ...prevState,
            [id]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.put(`http://localhost:8000/api/clients/update/${client.id}`, clientData);

            showToast('Le client a été mis à jour avec succès!', 'success');

            // Call callback to update client list
            if (onClientUpdated) {
                onClientUpdated(response.data);
            }

            // Close the modal
            onClose();

        } catch (error) {
            showToast("Une erreur est survenue lors de la mise à jour du client", 'error');
            console.error('Erreur:', error);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-md max-w-md w-full">
                <div className="bg-gray-800 text-white p-4 rounded-t-lg flex items-center justify-between">
                    <div className="flex items-center">
                        <UserPlus className="mr-2" />
                        <h2 className="text-xl font-semibold">Modification du Client</h2>
                    </div>
                    <button onClick={onClose} className="text-white hover:text-gray-400">
                        ✕
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div>
                        <label htmlFor="nom" className="block text-sm font-medium text-gray-700 mb-1">
                            Nom du Client
                        </label>
                        <input
                            type="text"
                            id="nom"
                            value={clientData.nom}
                            onChange={handleInputChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="prenom" className="block text-sm font-medium text-gray-700 mb-1">
                            Prénom du Client
                        </label>
                        <input
                            type="text"
                            id="prenom"
                            value={clientData.prenom}
                            onChange={handleInputChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Adresse Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={clientData.email}
                            onChange={handleInputChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="telephone" className="block text-sm font-medium text-gray-700 mb-1">
                            Téléphone
                        </label>
                        <input
                            type="text"
                            id="telephone"
                            value={clientData.telephone}
                            onChange={handleInputChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="flex justify-end space-x-4 pt-4">
                        <button
                            type="reset"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition-colors"
                        >
                            Annuler
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
                        >
                            Mettre à jour
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateClientModal;