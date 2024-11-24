import React, { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import {
  Search,
  Edit,
  Trash2,
  ChevronLeft,
  ChevronRight,
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
import {Link} from "react-router-dom";
import AddClientModal from './AddClientModal';

const MenuItem = ({ icon: Icon, label, to }) => {
  return (
      <Link
          to={to} // Utilisez la prop `to` pour définir la route
          className="flex items-center space-x-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg p-2 cursor-pointer transition-colors"
      >
        <Icon className="w-5 h-5" />
        <span>{label}</span>
      </Link>
  );
};

const ClientList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  const [date, setDate] = useState(new Date());
  const [clients] = useState([
    { id: 9, name: 'UYREE', address: 'salaam', city: 'Oujda', projects: ['APPLICATION de5FG', 'AUTOROUTE rebat-casa', 'iaasMerFF'] },
    { id: 10, name: 'SONASID', address: 'Quartier industriel', city: 'Benimelial', projects: ['APPLICATION de DDFF', 'DDDDDD'] },
  ]);

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

          {/* Main Content */}
          <main className="flex-1 p-6 bg-gray-100">
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <div className="p-4 bg-gray-100 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold text-gray-800">Liste des Clients</h2>
                  <button
                      className="flex items-center bg-blue-500 text-white px-3 py-1 rounded-full hover:bg-blue-600 transition-colors"
                      onClick={handleOpenModal}
                  >
                    <PlusCircle className="w-5 h-5 mr-2"/>
                    Ajouter
                  </button>
                </div>
                {isModalOpen && <AddClientModal onClose={handleCloseModal}/>}
              </div>


              <div className="p-4 flex justify-between items-center border-b border-gray-200">
                <div className="flex items-center">
                  <span className="mr-2">Afficher</span>
                  <select className="border rounded px-2 py-1 text-sm">
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
                      className="border rounded px-2 py-1 text-sm"
                      placeholder="Recherche..."
                  />
                </div>
              </div>

              <table className="w-full">
                <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Prenom du Client
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nom du client
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Adresse Email
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Telephone
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Projets de ce Client
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                {clients.map((client) => (
                    <tr key={client.id}>
                      <td className="px-4 py-2 whitespace-nowrap">{client.id}</td>
                      <td className="px-4 py-2 whitespace-nowrap">{client.name}</td>
                      <td className="px-4 py-2 whitespace-nowrap">{client.address}</td>
                      <td className="px-4 py-2 whitespace-nowrap">{client.city}</td>
                      <td className="px-4 py-2">
                        <ul className="list-disc list-inside">
                          {client.projects.map((project, index) => (
                              <li key={index} className="text-sm">
                                {project}
                              </li>
                          ))}
                        </ul>
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap">
                        <button className="text-blue-600 hover:text-blue-800 mr-2">
                          <Edit className="h-5 w-5"/>
                        </button>
                        <button className="text-red-600 hover:text-red-800">
                          <Trash2 className="h-5 w-5"/>
                        </button>
                      </td>
                    </tr>
                ))}
                </tbody>
              </table>

              <div className="px-4 py-3 bg-gray-50 border-t border-gray-200 sm:px-6 flex justify-between items-center">
                <div className="text-sm text-gray-700">De 1 à 2 sur 2 enregistrements</div>
                <div className="flex-1 flex justify-end">
                  <button
                      className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                    <ChevronLeft className="h-5 w-5"/>
                  </button>
                  <button
                      className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                    <ChevronRight className="h-5 w-5"/>
                  </button>
                </div>
              </div>
            </div>
          </main>
        </div>

        {/* Footer */}
        <Footer/>
      </div>
  );
};

export default ClientList;
