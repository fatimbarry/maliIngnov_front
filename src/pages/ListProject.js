import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  LayoutDashboard,
  Home,
  Briefcase,
  Users,
  Award,
  UserCheck,
  Truck,
  Calendar as CalendarIcon,
  Plus,
  Edit,
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Calendar from "react-calendar";
import AddProjectModal from "./AddProjectModal";


const MenuItem = ({ icon: Icon, label, to }) => (
    <Link
        to={to}
        className="flex items-center space-x-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg p-2 transition-colors"
    >
      <Icon className="w-5 h-5" />
      <span>{label}</span>
    </Link>
);

const ListProject = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const [date, setDate] = useState(new Date());

  const projects = [
    { numero: 12, libelle: 'IaaS/PaaS/7', dateService: '9 sept. 2014', delai: '16 sept. 2014', client: 'UYREE', etat: 'En Cours' },
    { numero: 34, libelle: 'APPLICATION', dateService: '11 août 2014', delai: '20 août 2014', client: 'UYREE', etat: 'En Cours' },
    { numero: 42, libelle: 'DDDDDD', dateService: '17 août 2014', delai: '14 août 2014', client: 'SONASD', etat: 'En Cours' },
    { numero: 54, libelle: 'APPLICATION', dateService: '1 août 2014', delai: '15 août 2014', client: 'SONASD', etat: 'En Attente' },
    { numero: 141, libelle: 'AUTOROUTE rebre-casa', dateService: '13 août 2014', delai: '13 nov. 2014', client: 'UYREE', etat: 'En Cours' },
  ];

  return (
      <div className="flex flex-col min-h-screen">
        {/* Navbar */}
        <Navbar />

        <div className="flex flex-1">
          {/* Sidebar */}
          <aside className="w-64 bg-gray-900 min-h-full">
            <div className="p-4 space-y-2">
              <MenuItem icon={Home} label="Accueil" to="/"/>
              <MenuItem icon={Briefcase} label="Projet" to="/ListProject"/>
              <MenuItem icon={Users} label="Employés" to="/EmployeeList"/>
              <MenuItem icon={Award} label="Department" to="/Department"/>
              <MenuItem icon={LayoutDashboard} label="Dashboard" to="/Dashboard"/>
              <MenuItem icon={UserCheck} label="Clients" to="/ClientList"/>
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

          {/* Main content */}
          <main className="flex-1 bg-gray-100 p-6">
            <div className="bg-white rounded-lg shadow-md">
              {/* Header */}
              <div className="p-4 flex justify-between items-center border-b">
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
                  <input
                      type="text"
                      placeholder="Chercher par"
                      className="border rounded px-2 py-1 mr-2"
                  />
                  <div>
                    <button
                        className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition-colors"
                        onClick={handleOpenModal}
                      >
                      Ajouter
                    </button>

                    {/* Appel du modal */}
                    <AddProjectModal isOpen={isModalOpen} onClose={handleCloseModal} />
                  </div>

                </div>
              </div>

              {/* Table */}
              <table className="w-full">
                <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-left">Numéro</th>
                  <th className="px-4 py-2 text-left">Libellé</th>
                  <th className="px-4 py-2 text-left">Date service</th>
                  <th className="px-4 py-2 text-left">Délai</th>
                  <th className="px-4 py-2 text-left">Client</th>
                  <th className="px-4 py-2 text-left">État</th>
                  <th className="px-4 py-2 text-left">Date achèvement</th>
                  <th className="px-4 py-2 text-left">Action</th>
                </tr>
                </thead>
                <tbody>
                {projects.map((project) => (
                    <tr key={project.numero} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-2">{project.numero}</td>
                      <td className="px-4 py-2">{project.libelle}</td>
                      <td className="px-4 py-2">{project.dateService}</td>
                      <td className="px-4 py-2">{project.delai}</td>
                      <td className="px-4 py-2">{project.client}</td>
                      <td className="px-4 py-2">
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${project.etat === 'En Cours' ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800'}`}
                        >
                        {project.etat}
                        </span>
                      </td>
                      <td className="px-4 py-2">-</td>
                      <td className="px-4 py-2">
                        <button className="text-green-500 hover:text-green-700 mr-2">
                          <Plus className="h-4 w-4"/>
                        </button>
                        <button className="text-gray-500 hover:text-gray-700">
                          <Edit className="h-4 w-4"/>
                        </button>
                      </td>
                    </tr>
                ))}
                </tbody>
              </table>
            </div>
          </main>
        </div>

        {/* Footer */}
        <Footer/>
      </div>
  );
};

export default ListProject;
