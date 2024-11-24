import React, { useState } from 'react';
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
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Calendar from 'react-calendar';
import Footer from '../components/Footer';
import AddEmployeeModal from "./AddEmployeeModal";

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
    const handleOpenModal = () => {
        console.log("Ouverture du modal pour ajouter un employé");
        setIsModalOpen(true); // Ouvre le modal
    };

    const handleCloseModal = () => {
        setIsModalOpen(false); // Ferme le modal
    };
  const employees = [
    {
      name: 'Hajar GAOUCHE',
      address: 'Hay Salam',
      city: 'Rabat',
      group: 'Groupe AA',
      category: 'Techniciens',
      email: 'sabir01abdel@gmail.com',
      phone: '0673525646',
    },
    {
      name: 'Tahri Hanae',
      address: 'Charaf',
      city: 'Salé',
      group: 'Groupe AA',
      category: 'Techniciens',
      email: 'gaouche.hajar@gmail.com',
      phone: '0673525646',
    },
    {
      name: 'Sabir Abdelilah',
      address: 'kkkfhoi',
      city: 'Agadir',
      group: 'Groupe B',
      category: 'Ingénieurs',
      email: 'kkkk@kkk.com',
      phone: '0673525646',
    },
    {
      name: 'Yahiaoui Hicham',
      address: 'ksfkj',
      city: 'Safi',
      group: 'Groupe B',
      category: 'Techniciens',
      email: 'sabir01abdel@gmail.com',
      phone: '0673525646',
    },
  ];

    return (
        <div className="min-h-screen flex flex-col">
            {/* Navbar */}
            <Navbar />

            <div className="flex flex-1">
                {/* Sidebar */}
                <aside className="w-64 bg-gray-900 min-h-full">
                    <div className="p-4">
                        <MenuItem icon={Home} label="Accueil" to="/" />
                        <MenuItem icon={Briefcase} label="Projet" to="/projet" />
                        <MenuItem icon={Users} label="Employés" to="/EmployeeList" />
                        <MenuItem icon={Users} label="Groupes" to="/groupes" />
                        <MenuItem icon={Award} label="Qualifications" to="/qualifications" />
                        <MenuItem icon={UserCheck} label="Clients" to="/clients" />
                        <MenuItem icon={Truck} label="Fournisseurs" to="/fournisseurs" />
                    </div>
                    <div className="mt-8 p-4">
                        <CalendarIcon className="text-white mb-2" />
                        <Calendar
                            className="bg-white rounded-lg p-2"
                            onChange={setDate}
                            value={date}
                        />
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1 p-8 bg-gray-50">
                    <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                        <div className="flex justify-between items-center mb-4">
                            <div className="flex items-center">
                                <Table className="w-5 h-5 mr-2" />
                                <h2 className="text-lg font-semibold text-gray-800">
                                    Liste des employés
                                </h2>
                            </div>
                            <div>
                                <button
                                    className="flex items-center bg-blue-500 text-white px-3 py-1 rounded-full hover:bg-blue-600 transition-colors"
                                    onClick={handleOpenModal}
                                >
                                    <PlusCircle className="w-5 h-5 mr-2" />
                                    Ajouter
                                </button>
                                {isModalOpen && <AddEmployeeModal onClose={handleCloseModal} />}
                            </div>
                        </div>

                        {/* Table Section */}
                        <div className="bg-white rounded-md overflow-hidden">
                            {/* Search and Filters */}
                            <div className="flex justify-between items-center p-3 border-b">
                                <div className="flex items-center">
                                    <span className="mr-2">Afficher</span>
                                    <select className="border rounded px-2 py-1">
                                        <option>10</option>
                                        <option>20</option>
                                        <option>50</option>
                                    </select>
                                    <span className="ml-2">Enregistrements</span>
                                </div>
                                <div className="flex items-center">
                                    <span className="mr-2">Chercher par:</span>
                                    <input
                                        type="text"
                                        className="border rounded px-2 py-1"
                                        placeholder="Recherche..."
                                    />
                                </div>
                            </div>

                            {/* Table */}
                            <table className="w-full">
                                <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-4 py-2 text-left">Nom et Prénom</th>
                                    <th className="px-4 py-2 text-left">Adresse</th>
                                    <th className="px-4 py-2 text-left">Ville</th>
                                    <th className="px-4 py-2 text-left">Groupe</th>
                                    <th className="px-4 py-2 text-left">Catégorie</th>
                                    <th className="px-4 py-2 text-left">E-mail</th>
                                    <th className="px-4 py-2 text-left">Téléphone</th>
                                    <th className="px-4 py-2 text-left">Action</th>
                                </tr>
                                </thead>
                                <tbody>
                                {employees.map((employee, index) => (
                                    <tr
                                        key={index}
                                        className="border-b hover:bg-gray-50"
                                    >
                                        <td className="px-4 py-2">{employee.name}</td>
                                        <td className="px-4 py-2">{employee.address}</td>
                                        <td className="px-4 py-2">{employee.city}</td>
                                        <td className="px-4 py-2">{employee.group}</td>
                                        <td className="px-4 py-2">{employee.category}</td>
                                        <td className="px-4 py-2">{employee.email}</td>
                                        <td className="px-4 py-2">{employee.phone}</td>
                                        <td className="px-4 py-2">
                                            <button className="text-blue-500 hover:text-blue-700 mr-2">
                                                <Edit className="w-4 h-4" />
                                            </button>
                                            <button className="text-red-500 hover:text-red-700">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>

                            {/* Pagination */}
                            <div className="flex justify-between items-center p-3 border-t">
                                <div>De 1 à 4 sur 4 enregistrements</div>
                                <div className="flex items-center">
                                    <button className="border rounded px-3 py-1 mr-2 hover:bg-gray-100">
                                        <ChevronLeft className="w-4 h-4" />
                                    </button>
                                    <button className="border rounded px-3 py-1 hover:bg-gray-100">
                                        <ChevronRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>

            {/* Footer */}
            <Footer />
        </div>
    );

};

export default EmployeeList;
