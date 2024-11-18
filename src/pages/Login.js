// Création d'une instance axios personnalisée
const api = axios.create({
    baseURL: 'http://localhost:8000',
    withCredentials: true,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
    }
});

const LoginComponent = () => {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    });
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const initializeCSRF = async () => {
            try {
                // Assurez-vous que les cookies sont bien définis
                await api.get('/sanctum/csrf-cookie');
                console.log('CSRF cookie set successfully');
            } catch (error) {
                console.error('Failed to set CSRF cookie:', error);
            }
        };

        initializeCSRF();
    }, []);

    const handleChange = (e) => {
        setCredentials(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const showToast = (message, type = "success") => {
        Swal.fire({
            toast: true,
            position: "top-end",
            icon: type,
            title: message,
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
        });
    };

    const handleRedirection = (role) => {
        switch (role) {
            case 'Admin':
                navigate('/admin-dashboard');
                break;
            case 'Comptable':
                navigate('/comptable-dashboard');
                break;
            case 'Chef_de_projet':
                navigate('/chef-projet-dashboard');
                break;
            case 'Employé':
                navigate('/employe-dashboard');
                break;
            default:
                navigate('/');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            console.log('Attempting login with credentials:', credentials);

            const response = await api.post('/api/login', credentials);
            console.log('Login response:', response.data);

            if (response.data.token) {
                // Stockage du token
                localStorage.setItem('auth_token', response.data.token);

                // Configuration du token pour les futures requêtes
                api.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;

                showToast('Connexion réussie !');

                // Stockage des informations utilisateur
                localStorage.setItem('user', JSON.stringify(response.data.user));

                // Redirection basée sur le rôle
                handleRedirection(response.data.user.role);
            }
        } catch (error) {
            console.error('Login error:', error.response || error);

            let errorMessage;
            if (error.response?.status === 419) {
                errorMessage = 'Session expirée. Tentative de reconnexion...';
                // Retenter d'obtenir un nouveau cookie CSRF
                try {
                    await api.get('/sanctum/csrf-cookie');
                    // Retenter la connexion
                    handleSubmit(e);
                    return;
                } catch (csrfError) {
                    errorMessage = 'Erreur de session. Veuillez rafraîchir la page.';
                }
            } else {
                errorMessage = error.response?.data?.message || 'Erreur lors de la connexion';
            }

            showToast(errorMessage, 'error');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-gray min-h-screen flex items-center justify-center">
            <div className="bg-gray-900 p-10 rounded-lg shadow-lg w-96 relative">
                <div className="absolute -top-3 -right-3 bg-gray-800 rounded-full p-2">
                    <Lock className="text-white" size={16} />
                </div>
                <div className="mb-6 text-center">
                    <img src="/logo.png" alt="Logo Mali Ingenov" className="mx-auto w-24 h-24 object-cover" />
                    <p className="text-gray-400 text-sm">Gestion de projet</p>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4 relative">
                        <User className="absolute left-3 top-3 text-gray-400" size={18} />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            className="w-full py-2 pl-10 pr-3 bg-gray-800 text-white rounded-md border border-gray-700 focus:outline-none focus:border-blue-500"
                            value={credentials.email}
                            onChange={handleChange}
                            disabled={isLoading}
                            required
                        />
                    </div>
                    <div className="mb-6 relative">
                        <Lock className="absolute left-3 top-3 text-gray-400" size={18} />
                        <input
                            type="password"
                            name="password"
                            placeholder="Mot de passe"
                            className="w-full py-2 pl-10 pr-3 bg-gray-800 text-white rounded-md border border-gray-700 focus:outline-none focus:border-blue-500"
                            value={credentials.password}
                            onChange={handleChange}
                            disabled={isLoading}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300 flex items-center justify-center"
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