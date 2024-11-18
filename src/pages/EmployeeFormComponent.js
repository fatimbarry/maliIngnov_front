import React, { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { Home, Briefcase, Users, Layers, Award, UserCheck, Truck, Calendar as CalendarIcon } from 'lucide-react';
import Calendar from 'react-calendar';  // Composant calendrier interactif
import 'react-calendar/dist/Calendar.css';  // Import des styles par défaut

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
    const [date, setDate] = useState(new Date());
    return (
        <div className="flex  bg-gray-100 h-100">
            <aside className="w-64 bg-gray-900">
                <div className="p-4">
                    <MenuItem icon={Home} label="Accueil" />
                    <MenuItem icon={Briefcase} label="Projet" />
                    <MenuItem icon={Users} label="Employés" />
                    <MenuItem icon={Users} label="Groupes" />
                    <MenuItem icon={Award} label="Qualifications" />
                    <MenuItem icon={UserCheck} label="Clients" />
                    <MenuItem icon={Truck} label="Fournisseurs" />
                </div>
                <div className="mt-8 p-4">
                    <CalendarIcon className="text-white" /> {/* Icône de calendrier */}
                    <Calendar
                        className="text-black"
                        onChange={setDate}
                        value={date}
                    /> {/* Composant calendrier interactif */}
        </div>
            </aside>
            <main className="flex-1 p-8">
                <div className="bg-white shadow-md rounded-lg p-6 max-h-100">
                    <h2 className="text-2xl font-semibold mb-6 text-blue-600">Ajout d'un nouvel employé</h2>
                    <div className="grid grid-cols-2 gap-8">
                        <div>
                            <h3 className="text-lg font-medium mb-4">Informations Personnelles</h3>
                            <InputField label="Nom" />
                            <InputField label="Prénom" />
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
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Photo</label>
                                <input type="file" className="mt-1 block w-full" />
                            </div>
                        </div>
                        <div>
                            <h3 className="text-lg font-medium mb-4">Informations Professionnelles</h3>
                            <InputField label="Date d'embauche" type="date" placeholder="MM/JJ/YYYY" />
                            <SelectField label="Groupe" />
                            <SelectField label="Qualification" />
                            <InputField label="Poste" />
                        </div>
                    </div>
                    <div className="mt-8 flex justify-end space-x-4">
                        <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">Enregistrer</button>
                        <button className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400">Réinitialiser</button>
                    </div>
                </div>
                
            </main>
        </div>
    );
};

export default EmployeeFormComponent;