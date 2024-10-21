import React from 'react';
import { Home, Eye, Edit, Star, Clock, ChevronDown, Search, User, LogOut } from 'lucide-react';

const PointageList = () => {
  const pointages = [
    { jour: 'jeu.', date: '9 oct. 2014', debut: '16:14:46', fin: '16:16:17', duree: '00:01:31', ecart: '07:58:28' },
    { jour: 'jeu.', date: '9 oct. 2014', debut: '16:21:27', fin: '16:22:48', duree: '00:01:21', ecart: '07:58:34' },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white">
        <div className="p-4">
          <h2 className="text-2xl font-bold mb-4">MISACC INGÉNOV</h2>
          <nav>
            <a href="#" className="flex items-center py-2 px-4 bg-blue-600 rounded"><Home className="mr-2" size={18} /> Accueil</a>
            <a href="#" className="flex items-center py-2 px-4"><Eye className="mr-2" size={18} /> Consultation</a>
            <a href="#" className="flex items-center py-2 px-4"><Edit className="mr-2" size={18} /> Imputation</a>
            <a href="#" className="flex items-center py-2 px-4"><Star className="mr-2" size={18} /> Heures supplémentaires</a>
          </nav>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Liste des Pointages</h1>
          <div className="flex items-center">
            <Clock className="mr-2" size={18} />
            <span>Plages Définies à valider</span>
            <User className="ml-4 mr-2" size={18} />
            <span>Profil: Chargeur Mos de passe</span>
            <LogOut className="ml-4" size={18} />
          </div>
        </header>

        <div className="bg-white shadow rounded-lg">
          <div className="p-4 border-b flex justify-between items-center">
            <div className="flex items-center">
              <span className="mr-2">Afficher:</span>
              <select className="border rounded px-2 py-1">
                <option>10</option>
              </select>
              <span className="ml-2">enregistrements</span>
            </div>
            <div className="flex items-center">
              <span className="mr-2">Chercher par:</span>
              <input type="text" className="border rounded px-2 py-1" />
              <Search className="ml-2" size={18} />
            </div>
          </div>

          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 text-left">Jour <ChevronDown size={14} className="inline" /></th>
                <th className="p-2 text-left">Date <ChevronDown size={14} className="inline" /></th>
                <th className="p-2 text-left">Pointage <ChevronDown size={14} className="inline" /></th>
                <th className="p-2 text-left">Durée <ChevronDown size={14} className="inline" /></th>
                <th className="p-2 text-left">Écart</th>
              </tr>
            </thead>
            <tbody>
              {pointages.map((pointage, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
                  <td className="p-2">{pointage.jour}</td>
                  <td className="p-2">{pointage.date}</td>
                  <td className="p-2">{pointage.debut} → {pointage.fin}</td>
                  <td className="p-2">{pointage.duree}</td>
                  <td className="p-2">{pointage.ecart}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="p-4 border-t bg-gray-100 text-right">
            <span className="font-bold">Total : 0:2:57</span>
            <span className="ml-4">15:57:2</span>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PointageList;