import React, { useState, useEffect } from 'react';
import { User, Lock } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const LoginComponent = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

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



    useEffect(() => {
        // CSRF cookie initialization
        const initializeCSRF = async () => {
            try {
                await axios.get('http://localhost:8000/sanctum/csrf-cookie', { withCredentials: true });
            } catch (error) {
                console.error('CSRF initialization failed:', error);
                setError('Erreur de connexion au serveur');
            }
        };

        initializeCSRF();
    }, []);



    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(
                'http://localhost:8000/api/login',
                { email, password },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true,
                }
            );

            if (response.data.token) {
                // Stocker le token dans localStorage
                localStorage.setItem('token', response.data.token);

                // Stocker l'ID de l'utilisateur
                const userId = response.data.user?.id; // Assurez-vous que 'id' est la bonne clé
                if (userId) {
                    localStorage.setItem('user_id', userId);
                }

                // Notification de succès
                showToast('Connexion réussie !', 'success');

                // Redirection basée sur le rôle
                const role = response.data.user?.role;
                switch (role) {
                    case 'Admin':
                        navigate('/DashboardComponent');
                        break;
                    case 'Comptable':
                        navigate('/comptable-dashboard');
                        break;
                    case 'Chef_de_projet':
                        navigate('/chef-projet-dashboard');
                        break;
                    case 'Employé':
                        navigate('/EmployeeInterface');
                        break;
                    default:
                        navigate('/');
                }
            } else {
                showToast('Connexion échouée. Veuillez vérifier vos identifiants.', 'error');
            }
        } catch (error) {
            console.error('Erreur de connexion:', error.response ? error.response.data : error.message);

            if (error.response) {
                switch (error.response.status) {
                    case 401:
                        showToast('Identifiants incorrects', 'error');
                        break;
                    case 422:
                        showToast('Veuillez vérifier vos informations', 'error');
                        break;
                    case 429:
                        showToast('Trop de tentatives. Veuillez réessayer plus tard', 'error');
                        break;
                    default:
                        showToast('Une erreur est survenue. Veuillez réessayer.', 'error');
                }
            } else {
                showToast('Une erreur de réseau est survenue', 'error');
            }
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <div className="bg-gray min-h-screen flex items-center justify-center">
            <div className="bg-gray-900 p-10 rounded-lg shadow-lg w-96 relative">
                <div className="mb-6 text-center">

                    <img
                        src={require('./logo.png')}
                        alt="Logo Mali Ingenov"
                        className="mx-auto w-24 h-24 object-cover"
                    />
                    <p className="text-gray-400 text-sm">Gestion de Projet</p>
                </div>
                {error && (
                    <div className="mb-4 text-red-500 text-center">
                        {error}
                    </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="relative">
                        <User className="absolute left-3 top-3 text-gray-400" size={18} />
                        <input
                            type="email"
                            placeholder="Email d'utilisateur"
                            className="w-full py-2 pl-10 pr-3 bg-gray-800 text-white rounded-md border border-gray-700 focus:outline-none focus:border-blue-500"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={isLoading}
                            required
                        />
                    </div>
                    <div className="relative">
                        <Lock className="absolute left-3 top-3 text-gray-400" size={18} />
                        <input
                            type="password"
                            placeholder="Mot de passe"
                            className="w-full py-2 pl-10 pr-3 bg-gray-800 text-white rounded-md border border-gray-700 focus:outline-none focus:border-blue-500"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            disabled={isLoading}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        ) : (
                            'Se Connecter'
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginComponent;