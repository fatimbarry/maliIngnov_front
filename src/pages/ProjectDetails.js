import React from 'react';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';


const ProjectDetails = () => {
    const { id } = useParams();
    const MySwal = withReactContent(Swal);

    const handleJoinProject = () => {
        MySwal.fire({
            title: 'Confirmation',
            text: 'Êtes-vous sûr de vouloir rejoindre ce projet?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#00C896',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Confirmer',
            cancelButtonText: 'Annuler',
        }).then((result) => {
            if (result.isConfirmed) {
                // Perform the necessary actions to join the project
                showToast('Votre Demande est envoyé avec succés');
                console.log('Rejoindre le projet');
            }
        });
    };

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
    const showToast = (message, type = "success") => {
        Swal.fire({
            toast: true,
            position: "top-end",
            icon: type,
            title: message,
            showConfirmButton: false,
            timer: 4000,
            timerProgressBar: true,
        });
    };

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
                    <button
                        className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-lg float-end"
                        onClick={handleJoinProject}
                    >
                        Rejoindre le projet
                    </button>
                </div>
                <div className="flex justify-between w-full">
                    <div className="w-3/4 bg-white rounded-lg shadow-md p-6">
                        <div className="mb-6">
                        <h3 className="text-lg font-medium mb-2">Description du projet</h3>
                            <p className="text-gray-600">{project.description}</p>
                        </div>
                        <div>
                            <h3 className="text-lg font-medium mb-2">Compétences requises</h3>
                            <div className="flex space-x-2">
                                <div className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full">
                                    Next.js
                                </div>
                                <div className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full">
                                    React.js
                                </div>
                                <div className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full">
                                    Node.js
                                </div>
                                <div className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full">
                                    Graph QL
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="bg-orange-500 text-white px-4 py-2 rounded-lg">
                                Ouvert
                            </div>
                            <p className="text-gray-500 text-sm">Publié il y a 2 mois - Se termine dans 5 jours</p>

                        </div>
                    </div>
                    <div className="w-1/4 ml-6">
                    <div className="flex items-center mb-4">
                            <img src="/Coach Barry.png" alt="Client" className="w-8 h-8 rounded-full mr-2"/>
                            <div>
                                <p className="text-gray-600">À propos du client</p>
                                <p className="font-medium">Menardou Barry</p>
                            </div>
                        </div>
                        <p className="text-gray-600 mb-2">Mode de paiement vérifié</p>
                        <p className="text-gray-600 mb-4">Membre depuis le 30 septembre 2024</p>
                        <h3 className="text-lg font-medium mb-4">Tâches associées au projet</h3>
                        <div className="space-y-4">
                            <div className="bg-white rounded-lg shadow-md p-4">
                                <h4 className="text-lg font-medium mb-2">faire un test</h4>
                                <div className="flex justify-between items-center">
                                    <p className="text-gray-600">À livrer avant le : Non défini</p>
                                    <div className="text-orange-500 font-bold">6.00 FCFA</div>
                                </div>
                            </div>
                            {/* Ajouter d'autres tâches ici */}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ProjectDetails;