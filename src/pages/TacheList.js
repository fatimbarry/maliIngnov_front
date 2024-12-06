import React from 'react';

const Dashboard = () => {
    const data = [
        {
            type: 'accept',
            title: 'En attente qu\'un administrateur, je veux pouvoir créer un rendez-vous afin de libérer les créneaux pour d\'autres clients.',
            duration: 15
        },
        {
            type: 'inProgress',
            title: 'En tant qu\'administrateur, je veux pouvoir gérer les créneaux horaires disponibles pour les clients afin de contrôler les plages accessibles.',
            duration: 15
        },
        {
            type: 'review',
            title: 'En tant qu\'administrateur, je veux que les informations de rendez-vous soient sauvegardées en cas de connexion interrompue afin de ne pas perdre les données saisies.',
            duration: 15
        },
        {
            type: 'terminated',
            title: 'En tant que client, je veux recevoir un rappel automatique (e-mail ou SMS) avant le rendez-vous afin de ne pas l\'oublier.',
            duration: 15
        },
        {
            type: 'accept',
            title: 'En attente qu\'un administrateur, je veux pouvoir créer un rendez-vous afin de libérer les créneaux pour d\'autres clients.',
            duration: 15
        },
        {
            type: 'inProgress',
            title: 'En tant qu\'administrateur, je veux pouvoir gérer les créneaux horaires disponibles pour les clients afin de contrôler les plages accessibles.',
            duration: 15
        },
        {
            type: 'review',
            title: 'En tant qu\'administrateur, je veux que les informations de rendez-vous soient sauvegardées en cas de connexion interrompue afin de ne pas perdre les données saisies.',
            duration: 15
        },
        {
            type: 'terminated',
            title: 'En tant que client, je veux recevoir un rappel automatique (e-mail ou SMS) avant le rendez-vous afin de ne pas l\'oublier.',
            duration: 15
        }
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {data.map((item, index) => (
                <div
                    key={index}
                    className={`p-4 rounded-md shadow-md ${
                        item.type === 'accept'
                            ? 'bg-green-100 text-green-800'
                            : item.type === 'inProgress'
                                ? 'bg-blue-100 text-blue-800'
                                : item.type === 'review'
                                    ? 'bg-yellow-100 text-yellow-800'
                                    : 'bg-red-100 text-red-800'
                    }`}
                >
                    <h3 className="text-lg font-medium mb-2">{item.title}</h3>
                    <p className="text-gray-600">Durée: {item.duration} minutes</p>
                </div>
            ))}
        </div>
    );
};

export default Dashboard;