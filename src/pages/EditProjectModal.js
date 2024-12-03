import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { X } from "lucide-react";
import Swal from "sweetalert2";

const EditProjectModal = ({ isOpen, onClose, project, onProjectUpdated }) => {
    // State for form data
    const [formData, setFormData] = useState({
        statut: 'en cours',
        libelle: '',
        description: '',
        client_id: '',
        user_id: '',
        delai: '',
    });

    // State for dropdown options
    const [clients, setClients] = useState([]);
    const [users, setUsers] = useState([]);

    // Utility function for toast notifications
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

    // Populate form data when project prop changes
    useEffect(() => {
        if (project) {
            setFormData({
                statut: project.statut || 'en cours',
                libelle: project.libelle || '',
                description: project.description || '',
                client_id: project.client_id || '',
                user_id: project.user_id || '',
                delai: project.delai || '',
            });
        }
    }, [project]);

    // Fetch clients and users on component mount
    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                const [clientResponse, userResponse] = await Promise.all([
                    axios.get('http://127.0.0.1:8000/api/clients', {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${localStorage.getItem('token')}`
                        }
                    }),
                    axios.get('http://127.0.0.1:8000/api/users')
                ]);

                setClients(Array.isArray(clientResponse.data) ? clientResponse.data : []);
                const users = userResponse.data?.data?.data || [];
                setUsers(users);

            } catch (error) {
                console.error('Error fetching initial data:', error);
                showToast('Erreur lors du chargement des données', 'error');
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
            const response = await axios.put(
                `http://127.0.0.1:8000/api/projets/update/${project.id}`,
                {
                    statut: formData.statut,
                    libelle: formData.libelle,
                    description: formData.description,
                    delai: formData.delai,
                    client_id: formData.client_id,
                    user_id: formData.user_id,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                }
            );

            showToast('Projet mis à jour avec succès !', 'success');

            // Call callback to update project list
            if (onProjectUpdated) {
                onProjectUpdated(response.data);
            }

            onClose();
        } catch (error) {
            if (error.response && error.response.data.errors) {
                showToast(`Erreur : ${Object.values(error.response.data.errors).join(', ')}`, 'error');
            } else {
                showToast('Erreur lors de la mise à jour du projet. Veuillez réessayer.', 'error');
            }
            console.error('Error updating project:', error);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg w-96">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Modification du Projet</h2>
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
                    <InputField
                        label="Délai"
                        name="delai"
                        type="date"
                        value={formData.delai}
                        onChange={handleChange}
                    />
                    <SelectField
                        label="Statut"
                        name="statut"
                        value={formData.statut}
                        onChange={handleChange}
                        options={[
                            { value: 'en cours', label: 'En Cours' },
                            { value: 'terminé', label: 'Terminé' },
                            { value: 'en attente', label: 'En Attente' }
                        ]}
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
                            Mettre à jour
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

export default EditProjectModal;