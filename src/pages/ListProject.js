import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
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
import EditProjectModal from './EditProjectModal';


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
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [date, setDate] = useState(new Date());
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);


  // Appeler fetchProjects lors du montage du composant
  useEffect(() => {
    fetchProjects();
  }, []);

  const handleProjectAdded = () => {
    // Recharger la liste des clients
    fetchProjects();
  };

  const fetchProjects = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/projets', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}` // Si nécessaire
        }
      });
      setProjects(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch projects');
      setLoading(false);
    }
  };

  // Fonction pour ouvrir la modal de modification
  const handleEditProject = (project) => {
    setSelectedProject(project);
    setIsEditModalOpen(true);
  };

  // Fonction pour mettre à jour le projet dans la liste
  const handleProjectUpdated = (updatedProject) => {
    // Mettre à jour la liste des projets avec le projet modifié
    setProjects(currentProjects =>
        currentProjects.map(project =>
            project.id === updatedProject.id ? updatedProject : project
        )
    );
    fetchProjects();
  };



  const handleOpenModal = () => {
    setModalOpen(true);
  };


  const handleCloseModal = () => {
    setModalOpen(false);
  };


  // Render loading state
  if (loading) {
    return (
        <div className="flex justify-center items-center min-h-screen">
          <div className="spinner">Loading...</div>
        </div>
    );
  }

  // Render error state
  if (error) {
    return (
        <div className="flex justify-center items-center min-h-screen text-red-500">
          {error}
        </div>
    );
  }

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
              <MenuItem icon={LayoutDashboard} label="Dashboard" to="/DashboardComponent"/>
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

                    {/*/!* Appel du modal *!/*/}
                    {/*<AddProjectModal isOpen={isModalOpen}*/}
                    {/*                 onClose={handleCloseModal}*/}

                    {/*/>*/}
                  </div>
                  {isModalOpen && (
                      <AddProjectModal isOpen={isModalOpen}
                          onClose={handleCloseModal}
                          onProjectAdded={handleProjectAdded}
                      />
                  )}

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
                    <tr key={project.id} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-2">{project.id}</td>
                      <td className="px-4 py-2">{project.libelle}</td>
                      <td className="px-4 py-2">{project.date_debut}</td>
                      <td className="px-4 py-2">{project.delai}</td>
                      <td className="px-4 py-2">
                        {project.client ? `${project.client.nom} ${project.client.prenom}` : 'Aucun client'}
                      </td>

                      <td className="px-4 py-2">
                        <span
                            className={`px-2 py-1 rounded-full text-xs ${project.statut === 'en cours' ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800'}`}
                        >
                        {project.statut}
                        </span>
                      </td>
                      <td
                          className="px-4 py-2">
                        {project.date_fin ?  `${project.date_fin}` : '-'}
                      </td>
                      <td className="px-4 py-2">
                        <button className="text-green-500 hover:text-green-700 mr-2">
                          <Plus className="h-4 w-4"/>
                        </button>
                        <button
                            onClick={() => handleEditProject(project)}
                            className="text-gray-500 hover:text-gray-700"
                        >
                          <Edit className="h-4 w-4"/>
                        </button>


                      {/* Composant modal de modification */}
                      <EditProjectModal
                          isOpen={isEditModalOpen}
                          onClose={() => setIsEditModalOpen(false)}
                          project={selectedProject}
                          onProjectUpdated={handleProjectUpdated}
                      />

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