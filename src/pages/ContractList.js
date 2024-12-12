import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Edit,
    Trash2,
    Home,
    Briefcase,
    Users,
    Award,
    UserCheck,
    Truck,
    Calendar as CalendarIcon,
    PlusCircle,
    LayoutDashboard,
} from 'lucide-react';
import Navbar from "../components/Navbar";
import Calendar from "react-calendar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';

const MenuItem = ({ icon: Icon, label, to }) => {
    return (
        <Link
            to={to}
            className="flex items-center space-x-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg p-2 cursor-pointer transition-colors"
        >
            <Icon className="w-5 h-5" />
            <span>{label}</span>
        </Link>
    );
};

const ContractList = () => {
    const [contracts, setContracts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [date, setDate] = useState(new Date());
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
    const fetchContracts = async () => {
        try {
            setLoading(true);
            const response = await axios.get('http://localhost:8000/api/contracts', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}` // If needed
                },
            });
            setContracts(response.data);
            setLoading(false);
        } catch (err) {
            setError('Impossible de récupérer les contrats');
            setLoading(false);
        }
    };
    const handleDeleteContract = async (contractId) => {
        try {
            const result = await Swal.fire({
                title: 'Êtes-vous sûr ?',
                text: 'Voulez-vous vraiment supprimer ce contrat ?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Oui, supprimer !',
                cancelButtonText: 'Annuler'
            });

            if (result.isConfirmed) {
                await axios.delete(`http://localhost:8000/api/contracts/destroy/${contractId}`);
                showToast('Le contrat a été supprimé avec succès !', 'success');

                // Update the contracts list
                setContracts(contracts.filter(contract => contract.id !== contractId));
            }
        } catch (error) {
            showToast('Une erreur est survenue lors de la suppression du contrat', 'error');
        }
    };

    useEffect(() => {
        fetchContracts();
    }, []);

    if (loading) return (
        <div className="flex justify-center items-center h-screen">
            Chargement...
        </div>
    );

    if (error) return (
        <div className="flex justify-center items-center h-screen text-red-500">
            {error}
        </div>
    );

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />

            <div className="flex flex-1">
                {/* Sidebar */}
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

                {/* Main Content */}
                <main className="flex-1 p-6 bg-gray-100">
                    <div className="bg-white shadow-md rounded-lg overflow-hidden">
                        <div className="p-4 bg-gray-100 border-b border-gray-200">
                            <div className="flex justify-between items-center">
                                <h2 className="text-lg font-semibold text-gray-800">Liste des Contrats</h2>
                            </div>
                        </div>

                        <table className="w-full">
                            <thead className="bg-gray-50">
                            <tr>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Titre
                                </th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Type de Contrat
                                </th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Statut
                                </th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Montant
                                </th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Date
                                </th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Projet
                                </th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Client
                                </th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Action
                                </th>
                            </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                            {contracts.map((contract) => (
                                <tr key={contract.id}>
                                    <td className="px-4 py-2 whitespace-nowrap">{contract.titre}</td>
                                    <td className="px-4 py-2 whitespace-nowrap">{contract.type_contrat}</td>
                                    <td className="px-4 py-2 whitespace-nowrap">{contract.statut}</td>
                                    <td className="px-4 py-2 whitespace-nowrap">{contract.montant} f</td>
                                    <td className="px-4 py-2 whitespace-nowrap">{new Date(contract.date).toLocaleDateString()}</td>
                                    <td className="px-4 py-2 whitespace-nowrap">{contract.projet?.libelle || 'N/A'}</td>
                                    <td className="px-4 py-2 whitespace-nowrap">{contract.projet?.client?.nom || 'N/A'} {contract.projet?.client?.prenom || 'N/A'}
                                    </td>
                                    <td className="px-4 py-2 whitespace-nowrap">
                                        <button
                                            className="text-blue-600 hover:text-blue-800 mr-2"
                                            // TODO: Implement update contract functionality
                                            // onClick={() => handleUpdateContract(contract)}
                                        >
                                            <Edit className="h-5 w-5"/>
                                        </button>
                                        <button
                                            className="text-red-600 hover:text-red-800"
                                            onClick={() => handleDeleteContract(contract.id)}
                                        >
                                            <Trash2 className="h-5 w-5"/>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>

                        <div
                            className="px-4 py-3 bg-gray-50 border-t border-gray-200 sm:px-6 flex justify-between items-center">
                            <div className="text-sm text-gray-700">
                                Total des contrats : {contracts.length}
                            </div>
                        </div>
                    </div>
                </main>
            </div>

            <Footer/>
        </div>
    );
};

export default ContractList;