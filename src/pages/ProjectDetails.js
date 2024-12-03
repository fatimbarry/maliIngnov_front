import React from 'react';
import { useLocation } from 'react-router-dom';

const ProjectDetails = () => {
    const { state: project } = useLocation();

    return (
        <div className="container mx-auto py-8">
            <h1 className="text-3xl font-bold mb-4">{project.title}</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <img src={project.imageUrl} alt={project.title} className="w-full rounded-lg" />
                </div>
                <div>
                    <p className="text-gray-500 mb-4">{project.description}</p>
                    <div className="flex items-center space-x-4 mb-4">
                        <img src={project.authorAvatar} alt={project.authorName} className="w-10 h-10 rounded-full" />
                        <span className="text-gray-500">{project.authorName}</span>
                    </div>
                    <div className="flex items-center space-x-4 text-gray-500">
                        <span>{project.category}</span>
                        <span>•</span>
                        <span>{project.createdAt}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectDetails;