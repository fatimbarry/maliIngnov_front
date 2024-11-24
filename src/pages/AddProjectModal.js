import React from "react";
import { PlusCircle, X } from "lucide-react";

const AddProjectModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null; // Cache le modal si `isOpen` est faux

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
            <div className="bg-white rounded-lg shadow-md max-w-2xl w-full p-6 relative">
                <button
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
                    onClick={onClose}
                >
                    <X className="w-6 h-6" />
                </button>
                <div className="flex items-center mb-6 text-blue-600">
                    <PlusCircle className="w-6 h-6 mr-2" />
                    <h2 className="text-xl font-semibold text-center">
                        Ajout d'un nouveau Projet
                    </h2>
                </div>

                <form className="space-y-4">
                    <div className="grid grid-cols-1 gap-4">
                        <InputField label="Date service" type="date"/>
                        <InputField label="Délai"/>
                        <InputField label="Nom"/>
                        <div className="mb-4">
                            <label
                                htmlFor="description"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Description
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                rows="4"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                placeholder="Entrez la description ici"
                            ></textarea>
                        </div>
                        <SelectField label="Chef de projet" options={["SABIR Abdellah"]}/>
                        <SelectField label="Client" options={["UYREE"]}/>
                    </div>

                    <div className="flex justify-end space-x-4 mt-6 bg-gray-100 p-4 rounded">
                        <button
                            type="reset"
                            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
                        >
                            Annuler
                        </button>

                        <button
                            type="submit"
                            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
                        >
                            Enregistrer
                        </button>

                    </div>

                </form>
            </div>
        </div>
    );
};

const InputField = ({label, type = "text"}) => (
    <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
        <input
            type={type}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
        />
    </div>
);

const SelectField = ({label, options}) => (
    <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
        <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50">
            {options.map((option, index) => (
                <option key={index}>{option}</option>
            ))}
        </select>
    </div>
);

export default AddProjectModal;