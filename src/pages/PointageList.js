import React from 'react';
import { Home, Eye, Edit, Star, Clock, ChevronDown, Search, User, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from "../components/Navbar";
import { useState, useEffect } from 'react';
import axios from 'axios';

  const PointageList = () => {
  // State for managing pointage data and pagination
  const [pointages, setPointages] = useState([]);
  const [pagination, setPagination] = useState({
    total: 0,
    perPage: 10,
    currentPage: 1,
    lastPage: 1
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State for search and filtering
  const [searchTerm, setSearchTerm] = useState('');
  const [perPage, setPerPage] = useState(10);

  // Fetch pointage data
  const fetchPointages = async (page = 1) => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:8000/api/punches', {
        params: {
          page,
          per_page: perPage,
          search: searchTerm
        },
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });

      const { data } = response.data;
      setPointages(data.punches);
      setPagination({
        total: data.pagination.total,
        perPage: data.pagination.per_page,
        currentPage: data.pagination.current_page,
        lastPage: data.pagination.last_page
      });
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch pointages');
      setLoading(false);
    }
  };

  // Effect to fetch data on component mount and when key parameters change
  useEffect(() => {
    fetchPointages();
  }, [perPage, searchTerm]);

  // Render loading state
  if (loading) {
    return (
        <div className="flex justify-center items-center min-h-screen">
          Loading...
        </div>
    );
  }

  // Render error state
  if (error) {
    return (
        <div className="text-red-500 text-center p-4">
          {error}
        </div>
    );
  }

  return (
      <div className="min-h-screen bg-gray-50">
        <Navbar className="h-16"/>
        {/* Sidebar */}
        <div className="flex">
          <aside className="w-64 bg-gray-900 text-white h-[calc(100vh-4rem)] fixed top-14 left-0">
            <div className="p-4">
              <h2 className="text-2xl font-bold mb-4">MALI INGÉNOV</h2>
              <nav>
                <Link to="/EmployeeInterface" className="flex items-center py-2 px-4 bg-blue-600 rounded">
                  <Home className="mr-2" size={18} /> Accueil
                </Link>
                <Link to="#" className="flex items-center py-2 px-4">
                  <Eye className="mr-2" size={18} /> Pointage
                </Link>
                <Link to="/EmployeeImputation" className="flex items-center py-2 px-4">
                  <Edit className="mr-2" size={18} /> Imputation
                </Link>
                <Link to="#" className="flex items-center py-2 px-4">
                  <Star className="mr-2" size={18} /> Heures supplémentaires
                </Link>
              </nav>
            </div>
          </aside>

          {/* Main content */}
          <main className="flex-1 ml-64 p-8">
            <header className="flex justify-between items-center mb-8">
              <h1 className="text-2xl font-bold">Liste des Pointages</h1>
              <div className="flex items-center">
                <Clock className="mr-2" size={18} />
                <span>Plages Définies à valider</span>
                <User className="ml-4 mr-2" size={18} />
                <span>Profil: User</span>
                <LogOut className="ml-4" size={18} />
              </div>
            </header>

            <div className="bg-white shadow rounded-lg">
              <div className="p-4 border-b flex justify-between items-center">
                <div className="flex items-center">
                  <span className="mr-2">Afficher:</span>
                  <select
                      className="border rounded px-2 py-1"
                      value={perPage}
                      onChange={(e) => setPerPage(Number(e.target.value))}
                  >
                    <option value={10}>10</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                  </select>
                  <span className="ml-2">enregistrements</span>
                </div>
                <div className="flex items-center">
                  <span className="mr-2">Chercher par:</span>
                  <input
                      type="text"
                      className="border rounded px-2 py-1"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Rechercher..."
                  />
                  <Search className="ml-2" size={18} />
                </div>
              </div>

              <table className="w-full">
                <thead className="bg-gray-100">
                <tr>
                  <th className="p-2 text-left">Date <ChevronDown size={14} className="inline" /></th>
                  <th className="p-2 text-left">Pointage <ChevronDown size={14} className="inline" /></th>
                  <th className="p-2 text-left">Durée <ChevronDown size={14} className="inline" /></th>
                  <th className="p-2 text-left">Statut</th>
                </tr>
                </thead>
                <tbody>
                {pointages.map((pointage, index) => (
                    <tr key={pointage.id} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
                      <td className="p-2">{pointage.punch_in.formatted.split(' ')[0]}</td>
                      <td className="p-2">
                        {pointage.punch_in.formatted.split(' ')[1]} →
                        {pointage.punch_out ? pointage.punch_out.formatted.split(' ')[1] : 'En cours'}
                      </td>
                      <td className="p-2">{pointage.duration || 'N/A'}</td>
                      <td className="p-2">{pointage.status}</td>
                    </tr>
                ))}
                </tbody>
              </table>

              <div className="p-4 border-t bg-gray-100 text-right">
                <div className="flex justify-between items-center">
                <span>
                  Page {pagination.currentPage} of {pagination.lastPage}
                </span>
                  <div>
                    <button
                        onClick={() => fetchPointages(pagination.currentPage - 1)}
                        disabled={pagination.currentPage === 1}
                        className="mr-2 px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
                    >
                      Précédent
                    </button>
                    <button
                        onClick={() => fetchPointages(pagination.currentPage + 1)}
                        disabled={pagination.currentPage === pagination.lastPage}
                        className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
                    >
                      Suivant
                    </button>
                  </div>
                  <span>Total: {pagination.total} enregistrements</span>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
  );
};

export default PointageList;