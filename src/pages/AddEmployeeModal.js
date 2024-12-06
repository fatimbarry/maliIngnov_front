import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import axios from 'axios';
import Swal from "sweetalert2";
import dayjs from 'dayjs';

const AddEmployeeModal = ({ onClose, onEmployeeAdded }) => {
    const [formData, setFormData] = useState({
        sexe: '',
        prenom: '',
        nom: '',
        date_Emb: '',
        email: '',
        photo: null,
        role: '',
        post: '',
        department_id: ''
    });

    const [departments, setDepartments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isLoadingDepartments, setIsLoadingDepartments] = useState(true);
    const [roles, setRoles] = useState([]);
    const [isLoadingRoles, setIsLoadingRoles] = useState(true);


    // Fetch departments when component mounts
    useEffect(() => {
        const fetchDepartments = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/departements/index', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    },
                    withCredentials: true // Nécessaire pour Sanctum
                });

                if (Array.isArray(response.data)) {
                    setDepartments(
                        response.data.map(dept => ({
                            value: dept.id,
                            label: dept.nom,
                        }))
                    );
                } else {
                    console.error('Les données retournées ne sont pas un tableau :', response.data);
                    setError('Les départements ne peuvent pas être chargés.');
                }
            } catch (err) {
                console.error('Erreur lors du chargement des départements :', err);
                setError('Impossible de charger les départements.');
            } finally {
                setIsLoadingDepartments(false);
            }
        };



        const fetchRoles = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/roles',{
                headers: {
                    'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}` // Si nécessaire
                },
                withCredentials: true // Si vous utilisez Sanctum
            });
                const data = await response.json();
                setRoles(
                    data.map(role => ({
                        value: role,
                        label: role,
                    }))
                );
            } catch (error) {
                console.error('Erreur lors du chargement des rôles :', error);
                setError('Impossible de charger les rôles');
            } finally {
                setIsLoadingRoles(false);
            }
        };

        fetchDepartments();
        fetchRoles();
    }, []);

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
        const { name, value, type, files } = e.target;

        // Handle file input separately
        if (type === 'file') {
            setFormData(prev => ({
                ...prev,
                photo: files[0]
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        // Create FormData for file upload
        const formSubmitData = new FormData();
        Object.keys(formData).forEach(key => {
            if (formData[key] !== null && formData[key] !== '') {
                formSubmitData.append(key, formData[key]);
            }
        });

        try {
            const formDataToSend = new FormData();
            const formattedDate = dayjs(formData.date_Emb, 'DD/MM/YYYY').format('YYYY-MM-DD');
            formDataToSend.append('sexe', formData.sexe);
            formDataToSend.append('prenom', formData.prenom);
            formDataToSend.append('nom', formData.nom);
            formDataToSend.append('date_Emb', formattedDate);
            formDataToSend.append('email', formData.email);
            formDataToSend.append('role', formData.role);
            formDataToSend.append('post', formData.post);
            formDataToSend.append('department_id', formData.department_id);
            console.log('sexe:', formData.sexe);

            // Gestion de la photo si elle existe
            if (formData.photo) {
                formDataToSend.append('photo', formData.photo);
            }

            const response = await axios.post('http://127.0.0.1:8000/api/users/store', formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                withCredentials: true,
            });

            // Afficher un toast de succès
            showToast('Employé ajouté avec succès !', 'success');

            // Réinitialiser le formulaire
            setFormData({
                sexe: '',
                prenom: '',
                nom: '',
                date_Emb: '',
                email: '',
                photo: null,
                role: '',
                post: '',
                department_id: ''
            });

            // Appeler le callback pour mettre à jour la liste des employés
            if (onEmployeeAdded) {
                onEmployeeAdded(response.data);
            }

            // Fermer le modal
            onClose();

        } catch (error) {
            // Gestion des erreurs avec affichage de toast
            if (error.response && error.response.data.errors) {
                showToast(`Erreur : ${Object.values(error.response.data.errors).join(', ')}`, 'error');
            } else {
                showToast('Erreur lors de l\'ajout de l\'employé. Veuillez réessayer.', 'error');
            }

            // Log de l'erreur
            console.error('Error adding employee:', error);

            // Mettre à jour l'état de chargement si nécessaire
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" onClick={onClose} />

            <div className="relative bg-white rounded-xl shadow-2xl w-3/4 max-h-[90vh] overflow-y-auto p-8">
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
                >
                    <X className="h-5 w-5 text-gray-500" />
                </button>

                <h2 className="text-2xl font-medium mb-8 text-gray-900">
                    Ajout d'un nouvel employé
                </h2>

                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded mb-4">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                       <div className="space-y-6">
                            <div className="pb-4 border-b border-gray-100">
                                <h3 className="text-lg font-medium text-gray-900 mb-6">
                                    Informations Personnelles
                                </h3>
                                <div className="space-y-4">
                                    <InputField
                                        label="Nom"
                                        name="nom"
                                        value={formData.nom}
                                        onChange={handleInputChange}
                                    />
                                    <InputField
                                        label="Prénom"
                                        name="prenom"
                                        value={formData.prenom}
                                        onChange={handleInputChange}
                                    />
                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-gray-700">Sexe</label>
                                        <div className="flex space-x-6">
                                            <label className="inline-flex items-center">
                                                <input
                                                    type="radio"
                                                    className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                                                    name="sexe"
                                                    value="Homme"
                                                    checked={formData.sexe === 'Homme'}
                                                    onChange={handleInputChange}
                                                />
                                                <span className="ml-2 text-gray-700">Homme</span>
                                            </label>
                                            <label className="inline-flex items-center">
                                                <input
                                                    type="radio"
                                                    className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                                                    name="sexe"
                                                    value="Femme"
                                                    checked={formData.sexe === 'Femme'}
                                                    onChange={handleInputChange}
                                                />
                                                <span className="ml-2 text-gray-700">Femme</span>
                                            </label>
                                        </div>
                                    </div>
                                    <InputField
                                        label="Adresse Email"
                                        name="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                    />

                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-gray-700">Photo</label>
                                        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-gray-400 transition-colors">
                                            <div className="space-y-1 text-center">
                                                <div className="flex text-sm text-gray-600">
                                                    <label className="relative cursor-pointer rounded-md font-                                                           medium text-blue-600 hover:text-blue-500 focus-                                                          within:outline-none focus-within:ring-2 focus-within:ring-                                                          offset-2 focus-within:ring-blue-500">
                                                        <span>Télécharger un fichier</span>
                                                        <input
                                                            type="file"
                                                            name="photo"
                                                            className="sr-only"
                                                            onChange={handleInputChange}
                                                            accept=".png,.jpg,.jpeg"
                                                        />
                                                    </label>
                                                    <p className="pl-1">ou glisser-déposer</p>
                                                </div>
                                                <p className="text-xs text-gray-500">PNG, JPG jusqu'à 10MB</p>
                                                {formData.photo && (
                                                    <p className="text-xs text-gray-700">
                                                        {formData.photo.name}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="pb-4 border-b border-gray-100">
                                <h3 className="text-lg font-medium text-gray-900 mb-6">
                                    Informations Professionnelles
                                </h3>
                                <div className="space-y-4">
                                    <InputField
                                        label="Date d'embauche"
                                        type="date"
                                        name="date_Emb"
                                        value={formData.date_Emb}
                                        onChange={handleInputChange}
                                    />
                                    <SelectField
                                        label="Department"
                                        name="department_id"
                                        value={formData.department_id}
                                        onChange={handleInputChange}
                                        loading={isLoadingDepartments}
                                        options={!isLoadingDepartments ? departments : [{ value: '', label: 'Chargement...' }]}
                                    />


                                    <InputField
                                        label="Poste"
                                        name="post"
                                        value={formData.post}
                                        onChange={handleInputChange}
                                    />
                                    <SelectField
                                        label="Role"
                                        name="role"
                                        value={formData.role}
                                        onChange={handleInputChange}
                                        loading={isLoadingRoles}
                                        options={roles}
                                    />

                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 flex justify-end space-x-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-200"
                        >
                            Annuler
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Enregistrement...' : 'Enregistrer'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const InputField = ({label, type = "text", name, value, onChange, placeholder = ""}) => (
    <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">{label}</label>
        <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
        />
    </div>
);

const SelectField = ({label, name, value, onChange, options = [], loading = false}) => (
    <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">{label}</label>
        <select
            name={name}
            value={value}
            onChange={onChange}
            disabled={loading}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors disabled:opacity-50"
        >
            <option value="">
                {loading ? 'Chargement...' : 'Sélectionnez une option'}
            </option>
            {options.map((option) => (
                <option key={option.key} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    </div>
);

export default AddEmployeeModal;