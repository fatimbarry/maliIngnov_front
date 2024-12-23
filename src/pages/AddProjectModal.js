import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { X } from "lucide-react";
import Swal from "sweetalert2";

const AddProjectModal = ({ isOpen, onClose, onProjectAdded }) => {
    // State for form data
    const [formData, setFormData] = useState({
        statut: 'en cours',
        libelle: '',
        description: '',
        client_id: '',
        user_id: '',
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

    // State for dropdown options
    const [clients, setClients] = useState([]);
    const [users, setUsers] = useState([]);

    // Fetch clients and users on component mount
    useEffect(() => {
        const fetchInitialData = async () => {
            console.log('Fetching initial data...');

            try {
                const [clientResponse, userResponse] = await Promise.all([
                    axios.get('http://127.0.0.1:8000/api/clients', {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${localStorage.getItem('token')}` // Si nécessaire
                        }
                    }),
                    axios.get('http://127.0.0.1:8000/api/users', {
                        // headers: {
                        //     'Content-Type': 'application/json',
                        //     'Authorization': `Bearer ${localStorage.getItem('token')}` // Si nécessaire
                        // }
                    })
                ]);

                // Vérifiez si userResponse.data et clientResponse.data sont des tableaux avant de les définir
                setClients(Array.isArray(clientResponse.data) ? clientResponse.data : []);
                // Gestion des utilisateurs
                const users = userResponse.data?.data?.data || []; // Double 'data' pour la pagination
                console.log("Liste des utilisateurs :", users);
                setUsers(users);

            } catch (error) {
                console.error('Error fetching initial data:', error);
            }
        };




        if (isOpen) {
            fetchInitialData();
        }
    }, [isOpen]);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                'http://127.0.0.1:8000/api/projets/store',
                {
                    statut: formData.statut,
                    libelle: formData.libelle,
                    description: formData.description,
                    date_debut: formData.date_debut || null,
                    date_fin: formData.date_fin || null,
                    delai: formData.delai,
                    client_id: formData.client_id,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}` // Si utilisé
                    }
                }
            );

            showToast('Projet ajouté avec succès !', 'success');

            // Reset form
            setFormData({
                statut: 'en cours',
                libelle: '',
                description: '',
                date_debut: '',
                date_fin: '',
                delai: '',
                client_id: '',
            });

            // Appeler le callback pour mettre à jour la liste des clients
            if (onProjectAdded) {
                onProjectAdded(response.data);
            }

            onClose();
        } catch (error) {
            if (error.response && error.response.data.errors) {
                showToast(`Erreur : ${Object.values(error.response.data.errors).join(', ')}`, 'error');
            } else {
                showToast('Erreur lors de l’ajout du projet. Veuillez réessayer.', 'error');
            }
            console.error('Error adding project:', error);
        }
    };



    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg w-96">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Ajout d'un nouveau Projet</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <X />
                    </button>
                </div>
                <form onSubmit={handleSubmit}>
                    <InputField
                        label="Nom du Projet"
                        name="libelle"
                        value={formData.libelle}
                        onChange={handleChange}
                    />
                    <InputField
                        label="Description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        type="textarea"
                    />
                    <SelectField
                        label="Client"
                        name="client_id"
                        value={formData.client_id}
                        onChange={handleChange}
                        options={clients.map(client => ({
                            value: client.id,
                            label: `${client.prenom} ${client.nom}`
                        }))}
                    />
                    <SelectField
                        label="Responsable"
                        name="user_id"
                        value={formData.user_id}
                        onChange={handleChange}
                        options={users.map(user => ({
                            value: user.id,
                            label: `${user.prenom} ${user.nom}`
                        }))}
                    />
                    {/* Nouveau champ pour le délai */}
                    <InputField
                        label="Délai"
                        name="delai"
                        type="date"
                        value={formData.delai}
                        onChange={handleChange}
                    />
                    <div className="flex justify-end space-x-2 mt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-200 text-gray-700 rounded"
                        >
                            Annuler
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 text-white rounded"
                        >
                            Enregistrer
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );

};

// Reusable Input Field Component
const InputField = ({ label, name, value, onChange, type = "text" }) => (
    <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
            {label}
        </label>
        {type === "textarea" ? (
            <textarea
                name={name}
                value={value}
                onChange={onChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
        ) : (
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
        )}
    </div>
);

// Reusable Select Field Component
const SelectField = ({ label, name, value, onChange, options }) => (
    <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
            {label}
        </label>
        <select
            name={name}
            value={value}
            onChange={onChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
            <option value="">Sélectionner</option>
            {options.map((option, index) => (
                <option key={index} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    </div>
);

export default AddProjectModal;