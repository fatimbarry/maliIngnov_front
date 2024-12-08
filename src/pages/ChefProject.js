import React from 'react';

const ChefProject = () => {
    const data = [
        {
            numero: 12,
            libelle: 'IQSKFKERFF',
            'date_service': '9 sept. 2014',
            client: 'UYRÉE',
            etat: 'En Cours',
            'date_achevement': '16 sept. 2014',
            secteur: null,
            region: null,
            action: null
        },
        {
            numero: 34,
            libelle: 'APPLICATION DE5G6',
            'date_service': '11 août 2014',
            client: 'UYRÉE',
            etat: 'En Cours',
            'date_achevement': '20 août 2014',
            secteur: null,
            region: null,
            action: null
        },
        {
            numero: 42,
            libelle: 'DDDDDD',
            'date_service': '12 août 2014',
            client: 'SONASID',
            etat: 'En Cours',
            'date_achevement': '14 août 2014',
            secteur: null,
            region: null,
            action: null
        },
        {
            numero: 54,
            libelle: 'APPLICATION de DOFF',
            'date_service': '1 août 2014',
            client: 'SONASID',
            etat: 'En Attente',
            'date_achevement': '15 août 2014',
            secteur: null,
            region: null,
            action: null
        },
        {
            numero: 143,
            libelle: 'AUTOROUTE rabat-casa',
            'date_service': '13 août 2014',
            client: 'UYRÉE',
            etat: 'En Cours',
            'date_achevement': '13 nov. 2014',
            secteur: null,
            region: null,
            action: null
        }
    ];

    return (
        <div className="flex h-screen">
            <div className="bg-black text-white w-48 p-6">
                <div className="mb-6">
                    <h2 className="text-lg font-bold">Accueil</h2>
                    <h2 className="text-lg font-bold">Affaires</h2>
                    <h2 className="text-lg font-bold">Contrôle du temps</h2>
                    <h2 className="text-lg font-bold">Pièce debours</h2>
                    <h2 className="text-lg font-bold">octobre 2014</h2>
                </div>
                <div className="mb-6">
                    <h3 className="text-sm font-bold">L</h3>
                    <h3 className="text-sm font-bold">M</h3>
                    <h3 className="text-sm font-bold">M</h3>
                    <h3 className="text-sm font-bold">J</h3>
                    <h3 className="text-sm font-bold">V</h3>
                    <h3 className="text-sm font-bold">S</h3>
                    <h3 className="text-sm font-bold">D</h3>
                </div>
            </div>
            <div className="flex-1 bg-gray-900 text-white p-6">
                <h2 className="text-2xl font-bold mb-4">Liste des affaires</h2>
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
                        <th className="px-4 py-2 text-left">Secteur</th>
                        <th className="px-4 py-2 text-left">Région</th>
                        <th className="px-4 py-2 text-left">Action</th>
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
                            <td className="px-4 py-2 text-left">{affaire.secteur}</td>
                            <td className="px-4 py-2 text-left">{affaire.region}</td>
                            <td className="px-4 py-2 text-left">{affaire.action}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ChefProject;