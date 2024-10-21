import React from 'react';
import { Search, Users } from 'lucide-react';

const EmployeeGallery = () => {
  const employees = [
    { id: 1, name: 'SABIR Abdelilah', photo: '/api/placeholder/150/150', role: 'Admin' },
    { id: 2, name: 'TAHRI Hanae', photo: '/api/placeholder/150/150', role: 'Admin' },
    { id: 3, name: 'YAHIAOUI Hicham', photo: '/api/placeholder/150/150', role: 'Admin' },
    { id: 4, name: 'hajar GAOUCHE', photo: '/api/placeholder/150/150', role: 'Admin' },
  ];

  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-gray-800 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">MAROC INGENIOV</h1>
          <div className="text-sm">Date : 19 octobre 2024 15:35:59 WEST</div>
        </div>
      </header>

      <main className="container mx-auto p-4">
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="flex items-center border rounded-md overflow-hidden">
            <input
              type="text"
              placeholder="Rechercher par nom..."
              className="flex-grow p-2 outline-none"
            />
            <button className="bg-blue-500 text-white p-2">
              <Search className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex items-center mb-4">
            <Users className="h-6 w-6 mr-2 text-gray-600" />
            <h2 className="text-xl font-semibold">Liste des employés</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {employees.map((employee) => (
              <div key={employee.id} className="bg-gray-50 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <img
                  src={employee.photo}
                  alt={employee.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-1">{employee.name}</h3>
                  <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                    {employee.role}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default EmployeeGallery;