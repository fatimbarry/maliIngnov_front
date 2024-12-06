import React from 'react';
import { useParams } from 'react-router-dom';

const ProjectDetails = () => {
    const { id } = useParams();

    const clientInfo = {
        name: 'Mamadou Barry',
        paymentMethod: 'Verified',
        deadline: '30 septembre 2024'
    };

    const tasks = [
        { name: 'faire un test', cost: '0.00 FCFA', status: 'Non défini' }
    ];

    const projects = [
        {
            id: 1,
            imageUrl: '/project1.jpg',
            title: 'Easy Leave',
            description: 'L\'objectif principal de l\'application de gestion des congés est de faciliter le processus de demande et d\'approbation des congés',
            authorName: 'Fatima Barry',
            authorAvatar: '/Coach Barry.png',
            category: 'Dev',
            createdAt: '2023-05-01'
        }
        // Add more projects as needed
    ];

    const project = projects.find(p => p.id === parseInt(id));

    if (!project) {
        return <div>Projet non trouvé</div>;
    }

    return (
        <div className="container mx-auto py-8">
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-64 object-cover"
                />
                <div className="p-6">
                    <h1 className="text-2xl font-bold mb-2">{project.title}</h1>

                    <h2 className="text-lg font-medium mb-2">Description du projet</h2>
                    <p className="text-gray-600 mb-4">{project.description}</p>

                    <h2 className="text-lg font-medium mt-4 mb-2">Compétences requises</h2>
                    <div className="flex space-x-2 mb-4">
                        <span className="px-2 py-1 bg-gray-200 rounded-md">Next.js</span>
                        <span className="px-2 py-1 bg-gray-200 rounded-md">React.js</span>
                        <span className="px-2 py-1 bg-gray-200 rounded-md">Node.js</span>
                        <span className="px-2 py-1 bg-gray-200 rounded-md">GraphQl</span>
                    </div>

                    <h2 className="text-lg font-medium mb-2">À propos du client</h2>
                    <div className="mb-4">
                        <p>Nom: {clientInfo.name}</p>
                        <p>Mode de paiement: {clientInfo.paymentMethod}</p>
                        <p>Membre depuis le: {clientInfo.deadline}</p>
                    </div>

                    <h2 className="text-lg font-medium mb-2">Tâches associées au projet</h2>
                    <table className="w-full mb-4">
                        <thead>
                        <tr>
                            <th className="text-left pb-2">Tâche</th>
                            <th className="text-right pb-2">Coût</th>
                            <th className="text-left pb-2">Statut</th>
                        </tr>
                        </thead>
                        <tbody>
                        {tasks.map((task, index) => (
                            <tr key={index}>
                                <td className="py-2">{task.name}</td>
                                <td className="text-right py-2">{task.cost}</td>
                                <td className="py-2">{task.status}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>

                    <div className="flex items-center mb-4">
                        <img
                            src={project.authorAvatar}
                            alt={project.authorName}
                            className="w-10 h-10 rounded-full mr-2"
                        />
                        <span className="text-gray-500">{project.authorName}</span>
                    </div>

                    <div className="flex items-center text-gray-500 mb-4">
                        <span>{project.category}</span>
                        <span className="mx-2">·</span>
                        <span>{project.createdAt}</span>
                    </div>

                    <div className="text-right">
                        <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded">
                            Rejoindre le projet
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectDetails;