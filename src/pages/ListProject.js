import React from 'react';
import { Home, Briefcase, Users, Folder, Tag, UserCheck, Building, Truck, Calendar, Search, Plus, Edit, Settings } from 'lucide-react';

const ListProject= () => {
  const projects = [
    { numero: 12, libelle: 'IaaS/PaaS/7', dateService: '9 sept. 2014', delai: '16 sept. 2014', client: 'UYREE', etat: 'En Cours' },
    { numero: 34, libelle: 'APPLICATION', dateService: '11 août 2014', delai: '20 août 2014', client: 'UYREE', etat: 'En Cours' },
    { numero: 42, libelle: 'DDDDDD', dateService: '17 août 2014', delai: '14 août 2014', client: 'SONASD', etat: 'En Cours' },
    { numero: 54, libelle: 'APPLICATION', dateService: '1 août 2014', delai: '15 août 2014', client: 'SONASD', etat: 'En Attente' },
    { numero: 141, libelle: 'AUTOROUTE rebre-casa', dateService: '13 août 2014', delai: '13 nov. 2014', client: 'UYREE', etat: 'En Cours' },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white">
        <div className="p-4 text-xl font-bold">MAROC INGENIOV</div>
        <nav className="mt-6">
          {[
            { icon: Home, label: 'Accueil' },
            { icon: Briefcase, label: 'Affaires' },
            { icon: Users, label: 'Employés' },
            { icon: Users, label: 'Groupes' },
            { icon: Tag, label: 'Catégories' },
            { icon: UserCheck, label: 'Qualifications' },
            { icon: Building, label: 'Clients' },
            { icon: Truck, label: 'Fournisseurs' },
          ].map((item, index) => (
            <a key={index} href="#" className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-800">
              <item.icon className="mr-3 h-5 w-5" />
              {item.label}
            </a>
          ))}
        </nav>
        <div className="absolute bottom-0 w-64 p-4">
          <Calendar className="w-full text-gray-600" />
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-md p-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">Liste des affaires</h1>
          <div className="flex items-center">
            <span className="mr-4">abdo1.harir@gmail.com</span>
            <button className="bg-gray-200 p-2 rounded-full">
              <Settings className="h-5 w-5 text-gray-600" />
            </button>
          </div>
        </header>

        {/* Project list */}
        <main className="p-6">
          <div className="bg-white rounded-lg shadow-md">
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
                <input type="text" placeholder="Chercher par" className="border rounded px-2 py-1 mr-2" />
                <button className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition-colors">
                  Ajouter contrat à cette affaire
                </button>
              </div>
            </div>
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
                  <th className="px-4 py-2 text-left">Secteur</th>
                  <th className="px-4 py-2 text-left">Région</th>
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
                      <span className={`px-2 py-1 rounded-full text-xs ${project.etat === 'En Cours' ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800'}`}>
                        {project.etat}
                      </span>
                    </td>
                    <td className="px-4 py-2">-</td>
                    <td className="px-4 py-2">-</td>
                    <td className="px-4 py-2">-</td>
                    <td className="px-4 py-2">
                      <button className="text-blue-500 hover:text-blue-700 mr-2">
                        <Search className="h-4 w-4" />
                      </button>
                      <button className="text-green-500 hover:text-green-700 mr-2">
                        <Plus className="h-4 w-4" />
                      </button>
                      <button className="text-gray-500 hover:text-gray-700">
                        <Edit className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="p-4 flex justify-between items-center border-t">
              <span>De 1 à 5 sur 5 enregistrements</span>
              <div className="flex">
                <button className="px-3 py-1 border rounded mr-2">&lt;</button>
                <button className="px-3 py-1 border rounded">&gt;</button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ListProject;