import React, { useState } from 'react';
import { Search, Edit, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';

const ClientList = () => {
  const [clients] = useState([
    { id: 9, name: 'UYREE', address: 'salaam', city: 'Oujda', projects: ['APPLICATION de5FG', 'AUTOROUTE rebat-casa', 'iaasMerFF'] },
    { id: 10, name: 'SONASID', address: 'Quartier industriel', city: 'Benimelial', projects: ['APPLICATION de DDFF', 'DDDDDD'] },
  ]);

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="p-4 bg-gray-100 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800">Liste des Clients</h2>
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
          <input type="text" className="border rounded px-2 py-1 text-sm" placeholder="Recherche..." />
        </div>
      </div>
      
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Numéro Client</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nom du client</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Adresse</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ville</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Affaires de ce Client</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
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
                    <li key={index} className="text-sm">{project}</li>
                  ))}
                </ul>
              </td>
              <td className="px-4 py-2 whitespace-nowrap">
                <button className="text-blue-600 hover:text-blue-800 mr-2">
                  <Edit className="h-5 w-5" />
                </button>
                <button className="text-red-600 hover:text-red-800">
                  <Trash2 className="h-5 w-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      <div className="px-4 py-3 bg-gray-50 border-t border-gray-200 sm:px-6 flex justify-between items-center">
        <div className="text-sm text-gray-700">
          De 1 à 2 sur 2 enregistrements
        </div>
        <div className="flex-1 flex justify-end">
          <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClientList;