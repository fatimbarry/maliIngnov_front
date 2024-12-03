import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


const ProjectsList = () => {
    const navigate = useNavigate();
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
        },
        // Autres projets...
    ];

    const handleProjectClick = (project) => {
        navigate(`/projects/${project.id}`, { state: project });
    };

    return (
        <div>
            <div className="py-6 bg-white shadow-md">
                <div className="container mx-auto flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Derniers projets sur le marché</h1>
                    <nav>
                        <ul className="flex space-x-4">
                            <li><Link to="/" className="text-blue-500 hover:text-blue-700">Tous les projets</Link></li>
                            <li><Link to="/programmation"
                                      className="text-gray-500 hover:text-gray-700">Programmation</Link></li>
                            <li><Link to="/design" className="text-gray-500 hover:text-gray-700">Design</Link></li>
                            <li><Link to="/marketing-digital" className="text-gray-500 hover:text-gray-700">Marketing
                                Digital</Link></li>
                            <li><Link to="/gestion-de-projet" className="text-gray-500 hover:text-gray-700">Gestion de
                                projet</Link></li>
                        </ul>
                    </nav>
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-5">
                {projects.map((project) => (
                    <div
                        key={project.id}
                        className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer"
                        onClick={() => handleProjectClick(project)}
                    >
                        <div className="relative h-48">
                            <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover"/>
                        </div>
                        <div className="p-4">
                            <h3 className="text-lg font-medium">{project.title}</h3>
                            <p className="text-gray-500 mt-2">{project.description}</p>
                            <div className="flex items-center justify-between mt-4">
                                <div className="flex items-center space-x-2">
                                    <img src={project.authorAvatar} alt={project.authorName} className="w-8 h-8 rounded-full" />
                                    <span className="text-gray-500">{project.authorName}</span>
                                </div>
                                <div className="flex items-center space-x-2 text-gray-500">
                                    <span>{project.category}</span>
                                    <span>•</span>
                                    <span>{project.createdAt}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProjectsList;