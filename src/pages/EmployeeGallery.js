import React, { useState } from 'react';
import { Search, Users } from 'lucide-react';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';

const EmployeeGallery = () => {
    const navigate = useNavigate();
    const currentDate = new Date().toLocaleString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZone: 'Africa/Dakar'
    });

    const [searchTerm, setSearchTerm] = useState('');

    const employees = [
        {
            id: 1,
            name: 'SABIR Abdellah',
            photo: require('./fatima.jpg'),
            role: 'Admin',
            status: 'Absent'
        },
        {
            id: 2,
            name: 'TAHRI Hanae',
            photo: require('./diarry.jpg'),
            role: 'Chef de Projet',
            status: 'Absent'
        },
        {
            id: 3,
            name: 'YARBAOLI Hicham',
            photo: require('./moussou.jpg'),
            role: 'Employe',
            status: 'Absent'
        },
        {
            id: 4,
            name: 'hajer GAOUCHE',
            photo: require('./mame saye.jpg'),
            role: 'Chef de Groupe',
            status: 'Absent'
        },
    ];

    const filteredEmployees = employees.filter(employee =>
        employee.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Fonction pour rediriger vers la page de login
    const handlePhotoClick = (employeeId) => {
        navigate('/login', { state: { employeeId } }); // Passer l'ID de l'employé si nécessaire
    };

    return (
        <div className="bg-gray-100 min-h-screen">
            <header className="bg-gray-800 text-white p-4">
                <div className="container mx-auto flex justify-between items-center">
                    <h1 className="text-xl font-bold">MAROC INGENOV</h1>
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
                        <h2 className="text-xl font-semibold">Liste du Persoonel MaliIngenov</h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {filteredEmployees.map((employee) => (
                            <div key={employee.id} className="relative bg-white rounded-lg overflow-hidden shadow border cursor-pointer mb-5"
                                 onClick={() => handlePhotoClick(employee.id)} // Gérer le clic sur la photo
                            >
                                <img
                                    src={employee.photo}
                                    alt={employee.name}
                                    className="w-full h-48 object-cover"
                                />
                                <div className="absolute top-2 right-2">
                                    <div className="bg-orange-500 text-white px-3 py-1 rounded text-sm">
                                        {employee.status}
                                    </div>
                                </div>
                                <div className="p-4">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="font-semibold text-lg text-gray-500">{employee.name}</h3>
                                    </div>
                                    <div className="bg-gray-200 text-gray-600 text-sm px-2 py-1 rounded inline-block">
                                        {employee.role}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <Footer/>
            </main>
        </div>
    );
};

export default EmployeeGallery;