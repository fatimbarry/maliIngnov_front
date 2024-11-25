import React, { useState, useEffect, useCallback } from 'react';
import { Search, Users, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';

const EmployeeGallery = () => {
    const navigate = useNavigate();
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [pagination, setPagination] = useState({
        current_page: 1,
        last_page: 1,
        per_page: 8,
        total: 0
    });

    const currentDate = new Date().toLocaleString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZone: 'Africa/Dakar'
    });

    const fetchEmployees = useCallback(async (page = 1) => {
        try {
            setLoading(true);
            const response = await fetch(`http://127.0.0.1:8000/api/users?page=${page}`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });

            const result = await response.json();

            if (result.success) {
                setEmployees(result.data.data);
                setPagination({
                    current_page: result.data.current_page,
                    last_page: result.data.last_page,
                    per_page: result.data.per_page,
                    total: result.data.total
                });
                setError(null);
            } else {
                throw new Error(result.message || 'Erreur de chargement');
            }
        } catch (err) {
            console.error('Erreur de chargement:', err);
            setError(err.message || 'Erreur lors du chargement des données');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchEmployees();
    }, [fetchEmployees]);

    const handlePageChange = (newPage) => {
        fetchEmployees(newPage);
    };

    const filteredEmployees = employees.filter(employee =>
        employee.nom.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handlePhotoClick = (employeeId) => {
        navigate('/login', { state: { employeeId } });
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                    <strong className="font-bold">Erreur! </strong>
                    <span>{error}</span>
                    <button
                        onClick={() => fetchEmployees()}
                        className="ml-4 bg-red-500 text-white px-3 py-1 rounded"
                    >
                        Réessayer
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gray-100 min-h-screen">
            <header className="bg-gray-800 text-white p-4">
                <div className="container mx-auto flex justify-between items-center">
                    <h1 className="text-xl font-bold">MALI INGENOV</h1>
                    <div className="text-sm">{currentDate}</div>
                </div>
            </header>

            <main className="container mx-auto p-4">
                <div className="bg-white rounded-lg shadow-md p-4 mb-6">
                    <div className="flex items-center border rounded-md overflow-hidden">
                        <input
                            type="text"
                            placeholder="Chercher par nom..."
                            className="flex-grow p-2 outline-none"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button className="bg-blue-500 text-white p-2">
                            <Search className="h-5 w-5" />
                        </button>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-4">
                    <div className="flex items-center mb-4">
                        <Users className="h-6 w-6 mr-2 text-gray-600" />
                        <h2 className="text-xl font-semibold">Liste du Personnel</h2>
                    </div>

                    {filteredEmployees.length === 0 ? (
                        <div className="text-center py-8 text-gray-500">
                            Aucun employé trouvé
                        </div>
                    ) : (
                        <>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {filteredEmployees.map((employee) => (
                                    <div
                                        key={employee.id}
                                        className="relative bg-white rounded-lg overflow-hidden shadow border cursor-pointer hover:shadow-lg transition-shadow"
                                        onClick={() => handlePhotoClick(employee.id)}
                                    >
                                        <img
                                            src={employee.photo || '/Coach Barry.png'}
                                            alt={employee.nom}
                                            className="w-full h-48 object-cover"
                                            onError={(e) => {
                                                e.target.src = '/Coach Barry.png';
                                            }}
                                        />
                                        <div className="absolute top-2 right-2">
                                            <div className="bg-orange-500 text-white px-3 py-1 rounded text-sm">
                                                {employee.status}
                                            </div>
                                        </div>
                                        <div className="p-4">
                                            <h3 className="font-semibold text-lg text-gray-700 truncate">
                                                {employee.prenom} {employee.nom}
                                            </h3>
                                            <div
                                                className="bg-gray-200 text-gray-600 text-sm px-2 py-1 rounded inline-block mt-2">
                                                {employee.role}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="flex justify-center items-center mt-6 space-x-4">
                                <button
                                    onClick={() => handlePageChange(pagination.current_page - 1)}
                                    disabled={pagination.current_page === 1}
                                    className="flex items-center justify-center p-2 bg-blue-500 text-white rounded disabled:opacity-50 hover:bg-blue-600 transition"
                                >
                                    <ChevronLeft className="mr-2" /> Précédent
                                </button>
                                <span className="text-gray-600">
                                    Page {pagination.current_page} / {pagination.last_page}
                                </span>
                                <button
                                    onClick={() => handlePageChange(pagination.current_page + 1)}
                                    disabled={pagination.current_page === pagination.last_page}
                                    className="flex items-center justify-center p-2 bg-blue-500 text-white rounded disabled:opacity-50 hover:bg-blue-600 transition"
                                >
                                    Suivant <ChevronRight className="ml-2" />
                                </button>
                            </div>
                        </>
                    )}
                </div>
                <Footer/>
            </main>
        </div>
    );
};

export default EmployeeGallery;