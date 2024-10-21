import React from 'react';
import { Home, Briefcase, Users, Layers, Award, UserCheck, Truck, Calendar } from 'lucide-react';

const MenuItem = ({ icon: Icon, label }) => (
    <div className="flex items-center space-x-2 p-2 text-white hover:bg-gray-700 cursor-pointer">
        <Icon size={18} />
        <span>{label}</span>
    </div>
);

const InputField = ({ label, type = "text", placeholder = "" }) => (
    <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">{label}</label>
        <input type={type} placeholder={placeholder} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
    </div>
);

const SelectField = ({ label, options = ["---Selectionner---"] }) => (
    <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">{label}</label>
        <select className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2">
            {options.map((option, index) => (
                <option key={index}>{option}</option>
            ))}
        </select>
    </div>
);

const EmployeeFormComponent = () => {
    return (
        <div className="flex h-screen bg-gray-100">
            <aside className="w-64 bg-gray-900">
                <div className="p-4">
                    <MenuItem icon={Home} label="Accueil" />
                    <MenuItem icon={Briefcase} label="Affaires" />
                    <MenuItem icon={Users} label="Employés" />
                    <MenuItem icon={Users} label="Groupes" />
                    <MenuItem icon={Layers} label="Catégories" />
                    <MenuItem icon={Award} label="Qualifications" />
                    <MenuItem icon={UserCheck} label="Clients" />
                    <MenuItem icon={Truck} label="Fournisseurs" />
                </div>
                <div className="mt-8 p-4">
                    <Calendar className="text-white" />
                    {/* Implement a more detailed calendar component here */}
                </div>
            </aside>
            <main className="flex-1 p-8">
                <div className="bg-white shadow-md rounded-lg p-6">
                    <h2 className="text-2xl font-semibold mb-6 text-blue-600">Ajout d'un nouvel employé</h2>
                    <div className="grid grid-cols-2 gap-8">
                        <div>
                            <h3 className="text-lg font-medium mb-4">Informations Personnelles</h3>
                            <InputField label="Nom" />
                            <InputField label="Prénom" />
                            <InputField label="Date de naissance" type="date" placeholder="MM/JJ/YYYY" />
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Sexe</label>
                                <div className="mt-2">
                                    <label className="inline-flex items-center">
                                        <input type="radio" className="form-radio" name="sexe" value="male" />
                                        <span className="ml-2">Male</span>
                                    </label>
                                    <label className="inline-flex items-center ml-6">
                                        <input type="radio" className="form-radio" name="sexe" value="female" />
                                        <span className="ml-2">Female</span>
                                    </label>
                                </div>
                            </div>
                            <InputField label="Adresse" />
                            <InputField label="Téléphone" />
                            <SelectField label="Ville" options={["---Selectionner---", "Rabat", "Casablanca", "Marrakech"]} />
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Photo</label>
                                <input type="file" className="mt-1 block w-full" />
                            </div>
                        </div>
                        <div>
                            <h3 className="text-lg font-medium mb-4">Informations Professionnelles</h3>
                            <InputField label="Numéro Employé" />
                            <InputField label="Date d'embauche" type="date" placeholder="MM/JJ/YYYY" />
                            <InputField label="E-mail interne" type="email" />
                            <InputField label="E-mail internet" type="email" />
                            <SelectField label="Supérieur Hiérarchique" />
                            <SelectField label="Groupe" />
                            <SelectField label="Catégorie" />
                            <SelectField label="Qualification" />
                            <InputField label="Numéro d'assurance" type="number" />
                            <InputField label="Numéro de paie" type="number" />
                            <InputField label="Numéro CNSS" />
                            <InputField label="Poste" />
                        </div>
                    </div>
                    <div className="mt-6">
                        <h3 className="text-lg font-medium mb-4">Roles</h3>
                        <div className="flex space-x-4">
                            <label className="inline-flex items-center">
                                <input type="checkbox" className="form-checkbox" />
                                <span className="ml-2">Comptable</span>
                            </label>
                            <label className="inline-flex items-center">
                                <input type="checkbox" className="form-checkbox" />
                                <span className="ml-2">ResponsableFacture</span>
                            </label>
                            <label className="inline-flex items-center">
                                <input type="checkbox" className="form-checkbox" />
                                <span className="ml-2">AgentSaisie</span>
                            </label>
                        </div>
                    </div>
                    <div className="mt-8 flex justify-end space-x-4">
                        <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">Enregistrer</button>
                        <button className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400">Réinitialiser</button>
                    </div>
                </div>
                <div className="mt-4 bg-yellow-100 p-4 rounded">
                    <p className="text-sm text-yellow-800">NB : Les roles Employé, Chef de Projet et Chef de groupe sont affectés automatiquement</p>
                </div>
            </main>
        </div>
    );
};

export default EmployeeFormComponent;