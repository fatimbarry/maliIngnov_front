import React from 'react';
import { UserPlus } from 'lucide-react';

const AddClientModal = ({ onClose }) => {

  return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-md max-w-md w-full">
          <div className="bg-gray-800 text-white p-4 rounded-t-lg flex items-center justify-between">
            <div className="flex items-center">
              <UserPlus className="mr-2" />
              <h2 className="text-xl font-semibold">Ajout d'un nouveau Client</h2>
            </div>
            <button onClick={onClose} className="text-white hover:text-gray-400">
              ✕
            </button>
          </div>

          <form className="p-6 space-y-4">
            <div>
              <label htmlFor="clientFirstName" className="block text-sm font-medium text-gray-700 mb-1">
                Prénom du Client
              </label>
              <input
                  type="text"
                  id="clientFirstName"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="clientLastName" className="block text-sm font-medium text-gray-700 mb-1">
                Nom du Client
              </label>
              <input
                  type="text"
                  id="clientLastName"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="clientEmail" className="block text-sm font-medium text-gray-700 mb-1">
                Adresse Email
              </label>
              <input
                  type="email"
                  id="clientEmail"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="clientPhone" className="block text-sm font-medium text-gray-700 mb-1">
                Téléphone
              </label>
              <input
                  type="text"
                  id="clientPhone"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex justify-end space-x-4 pt-4">
              <button
                  type="reset"
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition-colors"
              >
                Annuler
              </button>
              <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
              >
                Enregistrer
              </button>

            </div>

          </form>
        </div>
      </div>
  );
};

export default AddClientModal;
