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
import {Link} from "react-router-dom";
import AddClientModal from './AddClientModal';
import Swal from 'sweetalert2';
import UpdateClientModal from './UpdateClientModal';
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

const ClientList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [date, setDate] = useState(new Date());
  const [selectedClient, setSelectedClient] = useState(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  const handleUpdateClient = (client) => {
    setSelectedClient(client);
    setIsUpdateModalOpen(true);
  };

  const handleClientUpdated = (updatedClient) => {
    // Update the client in the list
    setClients(prevClients =>
        prevClients.map(client =>
            client.id === updatedClient.id ? updatedClient : client
        )
    );
    fetchClients();
  };
  const handleClientAdded = () => {
    // Recharger la liste des clients
    fetchClients();
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

  const handleDeleteClient = async (clientId) => {
    try {
      const result = await Swal.fire({
        title: 'Êtes-vous sûr ?',
        text: 'Voulez-vous vraiment supprimer ce client ?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Oui, supprimer !',
        cancelButtonText: 'Annuler'
      });

      if (result.isConfirmed) {
        await axios.delete(`http://localhost:8000/api/clients/delete/${clientId}`);
        showToast('Le client a été supprimé avec succès !', 'success');


        // Mettre à jour la liste des clients
        setClients(clients.filter(client => client.id !== clientId));
      }
    } catch (error) {
      showToast('Une erreur est survenue lors de la suppression du client')

    }
  };


  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:8000/api/clients',{
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}` // Si nécessaire

        },
      });
      setClients(response.data);
      setLoading(false);
    } catch (err) {
      setError('Impossible de récupérer les clients');
      setLoading(false);
    }
  };

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
                {isModalOpen && (
                    <AddClientModal
                        onClose={handleCloseModal}
                        onClientAdded={handleClientAdded}
                    />
                )}

              </div>

              <table className="w-full">
                <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID
                  </th>
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
                    Projets
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
                      <td className="px-4 py-2 whitespace-nowrap">{client.prenom}</td>
                      <td className="px-4 py-2 whitespace-nowrap">{client.nom}</td>
                      <td className="px-4 py-2 whitespace-nowrap">{client.email}</td>
                      <td className="px-4 py-2 whitespace-nowrap">{client.telephone}</td>
                      <td className="px-4 py-2">
                        <ul className="list-disc list-inside">
                          {client.projets && client.projets.map((projet, index) => (
                              <li key={index} className="text-sm">
                                {projet.libelle}
                              </li>
                          ))}
                        </ul>
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap">
                        <button
                            onClick={() => handleUpdateClient(client)}
                            className="text-blue-600 hover:text-blue-800 mr-2"
                        >
                          <Edit className="h-5 w-5"/>
                        </button>


                      {/* Update Modal */}
                      {isUpdateModalOpen && (
                          <UpdateClientModal
                              client={selectedClient}
                              onClose={() => setIsUpdateModalOpen(false)}
                              onClientUpdated={handleClientUpdated}
                          />
                      )}

                  <button className="text-red-600 hover:text-red-800"
                  onClick={() => handleDeleteClient(client.id)}
                >
                <Trash2 className="h-5 w-5"/>
                </button>
              </td>
            </tr>
            ))}
          </tbody>
        </table>

        <div className="px-4 py-3 bg-gray-50 border-t border-gray-200 sm:px-6 flex justify-between items-center">
          <div className="text-sm text-gray-700">
            Total des clients : {clients.length}
          </div>
        </div>
      </div>
</main>
</div>

  <Footer/>
</div>
)
  ;
};

export default ClientList;