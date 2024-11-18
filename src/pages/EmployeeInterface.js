import React from 'react';
import { FileText, Calendar, Hand, Power, User } from 'lucide-react';
import Footer from '../components/Footer';

const EmployeeInterface= () => {
  const tiles = [
    { id: 1, title: 'Consultation', icon: FileText, color: 'bg-yellow-500', size: 'col-span-1' },
    { id: 2, title: 'Imputation', icon: Calendar, color: 'bg-blue-500', size: 'col-span-1' },
    { id: 3, title: 'Pointage', icon: Hand, color: 'bg-red-500', size: 'col-span-1' },
    { id: 4, title: 'Déconnexion', icon: Power, color: 'bg-gray-700', size: 'col-span-1' },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-gray-800 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mr-3">
              <span className="text-gray-800 font-bold">MI</span>
            </div>
            <h1 className="text-xl font-bold">MAli INGENIOV</h1>
          </div>
          <div className="flex items-center">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors mr-4">
              Pièces Détachées à valider
            </button>
            <div className="flex items-center">
              <User className="w-5 h-5 mr-2" />
              <span className="text-sm">hajar.m@gmail.com</span>
            </div>
          </div>
        </div>
      </header>

      <main className="container p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
          {tiles.map((tile) => (
            <div key={tile.id} className={`${tile.color} ${tile.size} rounded-lg shadow-lg hover:shadow-xl transition-shadow`}>
              <button className="w-full h-full flex flex-col items-center justify-center text-white p-6">
                <tile.icon className="w-16 h-16 mb-4" />
                <span className="text-xl font-semibold">{tile.title}</span>
              </button>
            </div>
          ))}
        </div>
        <Footer/>
      </main>
    </div>
  );
};

export default EmployeeInterface;