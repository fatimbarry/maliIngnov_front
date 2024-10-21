import React from 'react';
import { Table, Edit, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';

const EmployeeList = () => {
  const employees = [
    { id: 1, photo: "/api/placeholder/50/50", name: "hajar GAOUCHE", address: "hay salam", city: "Rabat", group: "Groupe AA", category: "Techniciens", email: "sabir01abdel@gmail.com", phone: "0673525646" },
    { id: 321, photo: "/api/placeholder/50/50", name: "TAHRI Hanae", address: "charaf", city: "Salé", group: "Groupe AA", category: "Techniciens", email: "gaouche.hajar@gmail.com", phone: "0673525646" },
    { id: 551, photo: "/api/placeholder/50/50", name: "SABIR Abdelilah", address: "kkkfhoi", city: "Agadir", group: "Groupe B", category: "Ingénieurs", email: "kkkk@kkk.com", phone: "0673525646" },
    { id: 4546, photo: "/api/placeholder/50/50", name: "YAHIAOUI Hicham", address: "ksfkj", city: "Safi", group: "Groupe B", category: "Techniciens", email: "sabir01abdel@gmail.com", phone: "0673525646" },
  ];

  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <Table className="w-5 h-5 mr-2" />
          <h2 className="text-lg font-semibold text-gray-800">Liste des employés</h2>
        </div>
        <button className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition-colors">
          <span className="mr-1">&#9776;</span>
        </button>
      </div>
      
      <div className="bg-white rounded-md overflow-hidden">
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
            <input type="text" className="border rounded px-2 py-1" placeholder="Recherche..." />
          </div>
        </div>
        
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">Numéro</th>
              <th className="px-4 py-2 text-left">Photo</th>
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
            {employees.map((employee) => (
              <tr key={employee.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2">{employee.id}</td>
                <td className="px-4 py-2">
                  <img src={employee.photo} alt={employee.name} className="w-10 h-10 rounded-full" />
                </td>
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
  );
};

export default EmployeeList;