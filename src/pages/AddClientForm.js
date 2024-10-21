import React from 'react';
import { UserPlus } from 'lucide-react';

const AddClientForm = () => {
  return (
    <div className="bg-white rounded-lg shadow-md max-w-md mx-auto">
      <div className="bg-gray-800 text-white p-4 rounded-t-lg flex items-center">
        <UserPlus className="mr-2" />
        <h2 className="text-xl font-semibold">Ajout d'un nouveau Client</h2>
      </div>
      
      <form className="p-6 space-y-4">
        <div>
          <label htmlFor="clientName" className="block text-sm font-medium text-gray-700 mb-1">
            Nom du Client
          </label>
          <input
            type="text"
            id="clientName"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
            Adresse
          </label>
          <textarea
            id="address"
            rows="3"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>
        
        <div>
          <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
            Ville
          </label>
          <select
            id="city"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option>Rabat</option>
            <option>Casablanca</option>
            <option>Marrakech</option>
            <option>Fès</option>
            <option>Tanger</option>
          </select>
        </div>
        
        <div className="flex justify-start space-x-4 pt-4">
          <button
            type="submit"
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
          >
            Enregistrer
          </button>
          <button
            type="reset"
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition-colors"
          >
            Réinitialiser
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddClientForm;