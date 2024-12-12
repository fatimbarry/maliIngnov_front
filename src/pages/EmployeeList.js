import React, { useState, useEffect } from 'react';
import {
    Table,
    Edit,
    Trash2,
    ChevronLeft,
    ChevronRight,
    Home,
    Briefcase,
    Users,
    Award,
    PlusCircle,
    UserCheck,
    Truck,
    Calendar as CalendarIcon,
    LayoutDashboard,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Calendar from 'react-calendar';
import Footer from '../components/Footer';
import AddEmployeeModal from "./AddEmployeeModal";
import Swal from 'sweetalert2';

const MenuItem = ({ icon: Icon, label, to }) => {
    return (
        <Link
            to={to}
            className="flex items-center space-x-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg p-2 transition-colors"
        >
            <Icon className="w-5 h-5" />
            <span>{label}</span>
        </Link>
    );
};

const EmployeeList = () => {
    const [date, setDate] = useState(new Date());
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [recordsPerPage, setRecordsPerPage] = useState(10);
    const [totalRecords, setTotalRecords] = useState(0);

    useEffect(() => {
        fetchEmployees();
    }, [currentPage, recordsPerPage, searchTerm]);

    const fetchEmployees = async () => {
        try {
            setLoading(true);
            const response = await fetch(
                `http://localhost:8000/api/users?page=${currentPage}&per_page=${recordsPerPage}&search=${searchTerm}`
            );

            if (!response.ok) {
                throw new Error('Erreur lors de la récupération des données');
            }

            const data = await response.json();

            // Assurez-vous d'extraire les utilisateurs du bon niveau
            setEmployees(data.data.data); // Accès au tableau des utilisateurs
            setTotalPages(Math.ceil(data.data.total / recordsPerPage));
            setTotalRecords(data.data.total);

            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
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


    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        fetchEmployees(); // Actualiser la liste après l'ajout
    };

    const handleDelete = async (id) => {
        try {
            const confirmResult = await Swal.fire({
                title: 'Confirmer la suppression',
                text: 'Voulez-vous vraiment supprimer cet employé ?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Oui, supprimer',
                cancelButtonText: 'Annuler'
            });

            if (confirmResult.isConfirmed) {
                const response = await fetch(`http://localhost:8000/api/users/delete/${id}`, {
                    method: 'DELETE',

                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}` // Si nécessaire

                    },
                });

                if (response.ok) {
                    showToast('Employé supprimé avec succès', 'success');
                    fetchEmployees();
                } else {
                    throw new Error('Erreur lors de la suppression');
                }
            }
        } catch (err) {
            showToast(err.message, 'error');
        }
    };

    const handleModify = async (id, updatedData) => {
        try {
            const confirmResult = await Swal.fire({
                title: 'Confirmer la modification',
                text: 'Voulez-vous vraiment modifier cet employé ?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Oui, modifier',
                cancelButtonText: 'Annuler'
            });

            if (confirmResult.isConfirmed) {
                const response = await fetch(`http://localhost:8000/api/users/update/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}` // Si nécessaire

                    },
                    body: JSON.stringify(updatedData)
                });

                if (response.ok) {
                    showToast('Employé modifié avec succès', 'success');
                    fetchEmployees();
                } else {
                    throw new Error('Erreur lors de la modification');
                }
            }
        } catch (err) {
            showToast(err.message, 'error');
        }
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };

    const handleRecordsPerPageChange = (e) => {
        setRecordsPerPage(parseInt(e.target.value));
        setCurrentPage(1);
    };

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />

            <div className="flex flex-1">
                <aside className="w-64 bg-gray-900 min-h-full">
                    <div className="p-4 space-y-2">
                        <MenuItem icon={Home} label="Accueil" to="/"/>
                        <MenuItem icon={Briefcase} label="Projet" to="/ListProject"/>
                        <MenuItem icon={Users} label="Employés" to="/EmployeeList"/>
                        <MenuItem icon={Award} label="Contrats" to="/ContractList"/>
                        <MenuItem icon={LayoutDashboard} label="Dashboard" to="/DashboardComponent"/>
                        <MenuItem icon={UserCheck} label="Clients" to="/ClientList"/>
                        <MenuItem icon={Users} label="Groupes" to="/Groupe"/>
                        <MenuItem icon={Award} label="Departments" to="/Department"/>
                        <MenuItem icon={Truck} label="Fournisseurs" to="/fournisseurs"/>
                    </div>
                    <div className="mt-8 p-4">
                        <CalendarIcon className="text-white mb-2"/>
                        <Calendar
                            className="bg-white rounded-lg p-2"
                            onChange={setDate}
                            value={date}
                        />
                    </div>
                </aside>

                <main className="flex-1 p-8 bg-gray-50">
                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                            {error}
                        </div>
                    )}

                    <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                        <div className="flex justify-between items-center mb-4">
                            <div className="flex items-center">
                                <Table className="w-5 h-5 mr-2"/>
                                <h2 className="text-lg font-semibold text-gray-800">
                                    Liste des employés
                                </h2>
                            </div>
                            <div>
                                <button
                                    className="flex items-center bg-blue-500 text-white px-3 py-1 rounded-full hover:bg-blue-600 transition-colors"
                                    onClick={handleOpenModal}
                                >
                                    <PlusCircle className="w-5 h-5 mr-2"/>
                                    Ajouter
                                </button>
                            </div>
                        </div>

                        <div className="bg-white rounded-md overflow-hidden">
                            <div className="flex justify-between items-center p-3 border-b">
                                <div className="flex items-center">
                                    <span className="mr-2">Afficher</span>
                                    <select
                                        className="border rounded px-2 py-1"
                                        value={recordsPerPage}
                                        onChange={handleRecordsPerPageChange}
                                    >
                                        <option value={10}>10</option>
                                        <option value={20}>20</option>
                                        <option value={50}>50</option>
                                    </select>
                                    <span className="ml-2">Enregistrements</span>
                                </div>
                                <div className="flex items-center">
                                    <span className="mr-2">Chercher par:</span>
                                    <input
                                        type="text"
                                        className="border rounded px-2 py-1"
                                        placeholder="Recherche..."
                                        value={searchTerm}
                                        onChange={handleSearchChange}
                                    />
                                </div>
                            </div>

                            {loading ? (
                                <div className="text-center py-4">Chargement...</div>
                            ) : (
                                <table className="w-full">
                                    <thead className="bg-gray-100">
                                    <tr>
                                        <th className="px-4 py-2 text-left">Nom et Prénom</th>
                                        <th className="px-4 py-2 text-left">Adresse Email</th>
                                        <th className="px-4 py-2 text-left">Poste</th>
                                        <th className="px-4 py-2 text-left">Statut</th>
                                        <th className="px-4 py-2 text-left">Department</th>
                                        <th className="px-4 py-2 text-left">Role</th>
                                        <th className="px-4 py-2 text-left">Date Embauche</th>
                                        <th className="px-4 py-2 text-left">Action</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {Array.isArray(employees) && employees.map((employee) => (
                                        <tr key={employee.id} className="border-b hover:bg-gray-50">
                                            <td className="px-4 py-2">{employee.prenom} {employee.nom} </td>
                                            <td className="px-4 py-2">{employee.email || 'Non défini'}</td>
                                            <td className="px-4 py-2">{employee.post || 'Non défini'}</td>
                                            <td className="px-4 py-2">{employee.status || 'Non défini'}</td>
                                            <td className="px-4 py-2">{employee.department?.nom || 'Non défini'}</td>
                                            <td className="px-4 py-2">{employee.role || 'Non défini'}</td>
                                            <td className="px-4 py-2">{employee.date_Emb || 'Non défini'}</td>
                                            <td className="px-4 py-2">
                                                <button
                                                    className="text-blue-500 hover:text-blue-700 mr-2"
                                                    onClick={() => handleModify(employee.id)}
                                                >
                                                    <Edit className="w-4 h-4"/>
                                                </button>
                                                <button
                                                    className="text-red-500 hover:text-red-700"
                                                    onClick={() => handleDelete(employee.id)}
                                                >
                                                    <Trash2 className="w-4 h-4"/>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            )}

                            <div className="flex justify-between items-center p-3 border-t">
                                <div>
                                    De {((currentPage - 1) * recordsPerPage) + 1} à {Math.min(currentPage * recordsPerPage, totalRecords)} sur {totalRecords} enregistrements
                                </div>
                                <div className="flex items-center">
                                    <button
                                        className="border rounded px-3 py-1 mr-2 hover:bg-gray-100"
                                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                        disabled={currentPage === 1}
                                    >
                                        <ChevronLeft className="w-4 h-4"/>
                                    </button>
                                    <button
                                        className="border rounded px-3 py-1 hover:bg-gray-100"
                                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                        disabled={currentPage === totalPages}
                                    >
                                        <ChevronRight className="w-4 h-4"/>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {isModalOpen && <AddEmployeeModal onClose={handleCloseModal}/>}

                </main>
            </div>
            {/* Footer */}
            <Footer/>
        </div>
    );
};

export default EmployeeList;

