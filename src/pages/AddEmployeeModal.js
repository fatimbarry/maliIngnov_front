import React from "react";
import { X } from "lucide-react";

const AddEmployeeModal = ({ onClose }) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" onClick={onClose} />

            <div className="relative bg-white rounded-xl shadow-2xl w-3/4 max-h-[90vh] overflow-y-auto p-8">
                {/* Bouton de fermeture */}
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
                >
                    <X className="h-5 w-5 text-gray-500" />
                </button>

                <h2 className="text-2xl font-medium mb-8 text-gray-900">
                    Ajout d'un nouvel employé
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                    <div className="space-y-6">
                        <div className="pb-4 border-b border-gray-100">
                            <h3 className="text-lg font-medium text-gray-900 mb-6">
                                Informations Personnelles
                            </h3>
                            <div className="space-y-4">
                                <InputField label="Nom" />
                                <InputField label="Prénom" />
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">Sexe</label>
                                    <div className="flex space-x-6">
                                        <label className="inline-flex items-center">
                                            <input
                                                type="radio"
                                                className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                                                name="sexe"
                                                value="male"
                                            />
                                            <span className="ml-2 text-gray-700">Homme</span>
                                        </label>
                                        <label className="inline-flex items-center">
                                            <input
                                                type="radio"
                                                className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                                                name="sexe"
                                                value="female"
                                            />
                                            <span className="ml-2 text-gray-700">Femme</span>
                                        </label>
                                    </div>
                                </div>
                                <InputField label="Adresse Email" />
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">Photo</label>
                                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-gray-400 transition-colors">
                                        <div className="space-y-1 text-center">
                                            <div className="flex text-sm text-gray-600">
                                                <label className="relative cursor-pointer rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                                                    <span>Télécharger un fichier</span>
                                                    <input type="file" className="sr-only" />
                                                </label>
                                                <p className="pl-1">ou glisser-déposer</p>
                                            </div>
                                            <p className="text-xs text-gray-500">PNG, JPG jusqu'à 10MB</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="pb-4 border-b border-gray-100">
                            <h3 className="text-lg font-medium text-gray-900 mb-6">
                                Informations Professionnelles
                            </h3>
                            <div className="space-y-4">
                                <InputField
                                    label="Date d'embauche"
                                    type="date"
                                />
                                <SelectField label="Department" options={["Option 1", "Option 2"]} />
                                <InputField label="Poste" />
                                <SelectField label="Role" options={["Option 1", "Option 2"]} />

                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-8 flex justify-end space-x-4">
                    <button
                        onClick={onClose}
                        className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-200"
                    >
                        Annuler
                    </button>
                    <button className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                        Enregistrer
                    </button>
                </div>
            </div>
        </div>
    );
};

const InputField = ({ label, type = "text", placeholder = "" }) => (
    <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">{label}</label>
        <input
            type={type}
            placeholder={placeholder}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
        />
    </div>
);

const SelectField = ({ label, options = [] }) => (
    <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">{label}</label>
        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors">
            {options.map((option, index) => (
                <option key={index}>{option}</option>
            ))}
        </select>
    </div>
);

export default AddEmployeeModal;