import React from 'react';
import Navbar from "../components/Navbar";
import {Link} from "react-router-dom";
import {Edit, Eye, Home, Star} from "lucide-react";

const ChefProject = () => {
    const data = [
        {
            numero: 12,
            libelle: 'Site e-commerce',
            'date_service': '9 sept. 2023',
            client: 'Assou Barry',
            etat: 'En Cours',
            'date_achevement': '16 sept. 2024',

        },
        {
            numero: 34,
            libelle: 'APPLICATION DE5G6',
            'date_service': '11 août 2014',
            client: 'Massamba Barry',
            etat: 'En Cours',
            'date_achevement': '20 août 2014',

        },
        {
            numero: 42,
            libelle: 'DDDDDD',
            'date_service': '12 août 2014',
            client: 'Ibou',
            etat: 'En Cours',
            'date_achevement': '14 août 2014',

        },
        {
            numero: 54,
            libelle: 'APPLICATION de DOFF',
            'date_service': '1 août 2014',
            client: 'Ibou Kah',
            etat: 'En Attente',
            'date_achevement': '15 août 2014',

        },
        {
            numero: 143,
            libelle: 'AUTOROUTE dakar-casa',
            'date_service': '13 août 2014',
            client: 'Assou Barry',
            etat: 'En Cours',
            'date_achevement': '13 nov. 2014',

        }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar className="h-16"/>
            {/* Sidebar */}
            <div className="flex">
                <aside className="w-64 bg-gray-900 text-white h-[calc(100vh-4rem)] fixed top-14 left-0">
                    <div className="p-4">
                        <h2 className="text-xl font-bold mb-4">MALI INGÉNOV</h2>
                        <nav className="space-y-2">
                            <Link to="/ChefInterface" className="flex items-center py-2 px-4 hover:bg-gray-800 rounded"><Home size={18}
                                                                                                                                  className="mr-2"/> Accueil</Link>
                            <Link to="/TacheList" className="flex items-center py-2 px-4 hover:bg-gray-800 rounded"><Eye size={18}
                                                                                                                            className="mr-2"/> Taches</Link>
                            <Link to="/ChefProject" className="flex items-center py-2 px-4 bg-blue-600 rounded"><Edit size={18}
                                                                                                           className="mr-2"/> Projets</Link>
                            <Link to="#" className="flex items-center py-2 px-4 hover:bg-gray-800 rounded"><Star size={18}
                                                                                                                 className="mr-2"/> Heures
                                supplémentaires</Link>
                        </nav>
                    </div>
                </aside>
                {/* Main content */}
                <main className="flex-1 ml-64 p-8">

                    <div className="flex-1 bg-gray-900 text-white p-6">
                        <h2 className="text-2xl font-bold mb-4">Liste des projets</h2>
                        <div className="flex justify-between items-center mb-4">
                            <div>
                                <span className="mr-2">Afficher</span>
                                <select className="bg-gray-800 text-white px-2 py-1 rounded">
                                    <option>10</option>
                                    <option>20</option>
                                    <option>50</option>
                                </select>
                            </div>
                            <input
                                type="text"
                                className="bg-gray-800 text-white px-2 py-1 rounded w-64"
                                placeholder="Chercher par..."
                            />
                        </div>
                        <table className="w-full border-collapse">
                            <thead>
                            <tr className="bg-gray-800 text-gray-400">
                                <th className="px-4 py-2 text-left">Numéro</th>
                                <th className="px-4 py-2 text-left">Libellé</th>
                                <th className="px-4 py-2 text-left">Date service</th>
                                <th className="px-4 py-2 text-left">Client</th>
                                <th className="px-4 py-2 text-left">Etat</th>
                                <th className="px-4 py-2 text-left">Date achèvement</th>
                            </tr>
                            </thead>
                            <tbody>
                            {data.map((affaire, index) => (
                                <tr
                                    key={index}
                                    className={`border-b border-gray-800 ${
                                        index % 2 === 0 ? 'bg-gray-800' : 'bg-gray-700'
                                    }`}
                                >
                                    <td className="px-4 py-2 text-left">{affaire.numero}</td>
                                    <td className="px-4 py-2 text-left">{affaire.libelle}</td>
                                    <td className="px-4 py-2 text-left">{affaire['date_service']}</td>
                                    <td className="px-4 py-2 text-left">{affaire.client}</td>
                                    <td
                                        className={`px-4 py-2 text-left ${
                                            affaire.etat === 'En Cours'
                                                ? 'text-green-500'
                                                : affaire.etat === 'En Attente'
                                                    ? 'text-orange-500'
                                                    : 'text-red-500'
                                        }`}
                                    >
                                        {affaire.etat}
                                    </td>
                                    <td className="px-4 py-2 text-left">{affaire['date_achevement']}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </main>
            </div>

        </div>
    );
};

export default ChefProject;