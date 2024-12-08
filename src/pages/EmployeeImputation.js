import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { Home, Eye, Edit, Star, Clock, User, LogOut, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const EmployeeImputation = () => {
  const [duration, setDuration] = useState('03:00');
  const [showDurationPicker, setShowDurationPicker] = useState(false);

  const handleDurationChange = (e) => {
    setDuration(e.target.value);
  };

  return (
      <div className="min-h-screen bg-gray-50">
        <Navbar/>
        {/* Sidebar */}
        <div className="flex">
          <aside className="w-64 bg-gray-900 text-white">
            <div className="p-4">
              <h2 className="text-xl font-bold mb-4">MALI INGÉNOV</h2>
              <nav className="space-y-2">
                <Link to="/EmployeeInterface" className="flex items-center py-2 px-4 hover:bg-gray-800 rounded"><Home size={18}
                                                                                                     className="mr-2"/> Accueil</Link>
                <Link to="/PointageList" className="flex items-center py-2 px-4 hover:bg-gray-800 rounded"><Eye size={18}
                                                                                                    className="mr-2"/> Pointage</Link>
                <Link to="#" className="flex items-center py-2 px-4 bg-blue-600 rounded"><Edit size={18}
                                                                                               className="mr-2"/> Imputation</Link>
                <Link to="#" className="flex items-center py-2 px-4 hover:bg-gray-800 rounded"><Star size={18}
                                                                                                     className="mr-2"/> Heures
                  supplémentaires</Link>
              </nav>
            </div>
          </aside>

          {/* Main content */}
          <main className="flex-1 p-8">
            <header className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold">Imputez pour une tâche</h1>
              <div className="flex items-center space-x-4 text-sm">
                <button className="flex items-center bg-blue-500 text-white px-3 py-1 rounded">
                  <Clock size={16} className="mr-1"/> Plages Définies à valider
                </button>
                <div className="flex items-center">
                  <User size={16} className="mr-1"/>
                  <span>Profil: User</span>
                </div>
                <button className="flex items-center text-gray-600 hover:text-gray-800">
                  <LogOut size={16} className="mr-1"/> Déconnexion
                </button>
              </div>
            </header>

            <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6" role="alert">
              <p className="font-bold">Imputation a été avec succès.</p>
            </div>

            <div className="bg-white shadow rounded-lg p-6 mb-6">
              <form className="space-y-4">
                <div className="flex items-center space-x-4">
                  <label className="w-1/4">Tâche à imputer:</label>
                  <select className="form-select w-3/4 border rounded px-3 py-2">
                    <option>Tache4</option>
                  </select>
                </div>
                <div className="flex items-center space-x-4">
                  <label className="w-1/4">La Durée:</label>
                  <div className="relative w-3/4">
                    <input
                        type="text"
                        value={duration}
                        onChange={handleDurationChange}
                        onClick={() => setShowDurationPicker(true)}
                        className="form-input w-full border rounded px-3 py-2"
                    />
                    {showDurationPicker && (
                        <div className="absolute top-full left-0 mt-1 w-48 bg-white border rounded shadow-lg p-4">
                          <h4 className="font-bold mb-2">Définir la durée</h4>
                          <div className="space-y-2">
                            <label className="block">
                              Temps
                              <input type="text" value={duration} onChange={handleDurationChange}
                                     className="form-input mt-1 w-full"/>
                            </label>
                            <label className="block">
                              Heure
                              <input type="range" min="0" max="23" className="form-range w-full"/>
                            </label>
                            <label className="block">
                              Minute
                              <input type="range" min="0" max="59" className="form-range w-full"/>
                            </label>
                          </div>
                          <div className="flex justify-end mt-4 space-x-2">
                            <button className="px-3 py-1 bg-green-500 text-white rounded"
                                    onClick={() => setShowDurationPicker(false)}>Valider
                            </button>
                            <button className="px-3 py-1 bg-gray-300 rounded"
                                    onClick={() => setShowDurationPicker(false)}>Annuler
                            </button>
                          </div>
                        </div>
                    )}
                  </div>
                </div>
                <div className="flex space-x-4">
                  <button type="submit"
                          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">Enregistrer
                  </button>
                  <button type="reset" className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Réinitialiser
                  </button>
                </div>
              </form>
            </div>

            <div className="bg-white shadow rounded-lg p-6 mb-6">
              <h2 className="text-lg font-bold mb-4">Liste des imputations</h2>
              {/* Vous pouvez ajouter un tableau ici pour afficher les imputations */}
            </div>

            <div className="bg-white shadow rounded-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold">Calendrier</h2>
                <div className="flex items-center space-x-2">
                  <button className="p-1 rounded-full hover:bg-gray-200"><ChevronLeft size={20}/></button>
                  <span>Aujourd'hui</span>
                  <button className="p-1 rounded-full hover:bg-gray-200"><ChevronRight size={20}/></button>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-4">octobre 2024</h3>
              <div className="grid grid-cols-7 gap-2 text-center">
                <div className="font-bold">lun.</div>
                <div className="font-bold">mar.</div>
                <div className="font-bold">mer.</div>
                <div className="font-bold">jeu.</div>
                <div className="font-bold">ven.</div>
                <div className="font-bold">sam.</div>
                <div className="font-bold">dim.</div>
                {/* Générez les jours du calendrier ici */}
                {Array.from({length: 31}, (_, i) => (
                    <div key={i} className={`p-2 ${i === 1 ? 'bg-blue-100' : ''}`}>
                      {i + 1}
                      {i === 1 && <div className="text-xs text-blue-600">16:37 à valider</div>}
                    </div>
                ))}
              </div>
            </div>
          </main>
        </div>
        <Footer/>
      </div>
  );
};

export default EmployeeImputation;