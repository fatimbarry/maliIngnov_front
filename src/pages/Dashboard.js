import React from 'react';
import { User, FileText, Users, Keyboard, DollarSign, Briefcase, Compass } from 'lucide-react';

const DashboardItem = ({ icon: Icon, label, color, isWide = false }) => (
    <div className={`flex flex-col items-center justify-center p-4 rounded-lg ${color} text-white ${isWide ? 'col-span-2' : ''}`}>
        <Icon size={48} />
        <span className="mt-2 text-sm font-semibold">{label}</span>
    </div>
);

const ProjectManagementDashboard = () => {
    const currentDate = new Date().toLocaleString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZone: 'Africa/Casablanca'
    });

    return (
        <div className="bg-gray-100 min-h-screen">
            <header className="bg-black text-white p-4 flex justify-between items-center">
                <div className="text-xl font-bold">MAROC INGENOV</div>
                <div className="text-sm">{`Date : ${currentDate} WEST`}</div>
            </header>
            <main className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-6">Bienvenu dans Project Management de Maroc-Ingenov</h1>
                <div className="grid grid-cols-4 gap-4">
                    <DashboardItem icon={User} label="Employé" color="bg-purple-500" isWide={true} />
                    <DashboardItem icon={FileText} label="respensable facturation" color="bg-blue-500" />
                    <DashboardItem icon={Users} label="Chef de groupe" color="bg-purple-500" />
                    <DashboardItem icon={Keyboard} label="Agent de saisie" color="bg-blue-400" />
                    <DashboardItem icon={DollarSign} label="Comptable" color="bg-blue-500" />
                    <DashboardItem icon={Briefcase} label="Chef de projet" color="bg-blue-500" />
                    <DashboardItem icon={Compass} label="Direction" color="bg-purple-500" />
                </div>
            </main>
        </div>
    );
};

export default ProjectManagementDashboard;