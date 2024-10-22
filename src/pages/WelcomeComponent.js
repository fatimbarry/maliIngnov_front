import React from 'react';
import { User, FileText, Users, Keyboard, DollarSign, Briefcase, Compass } from 'lucide-react';

const DashboardItem = ({ icon: Icon, label, color, isWide = false }) => (
    <div className={`flex flex-col items-center justify-center p-4 rounded-lg ${color} text-white ${isWide ? 'col-span-2' : ''}`}>
        <Icon size={48} />
        <span className="mt-2 text-sm font-semibold">{label}</span>
    </div>
);

const WelcomeComponent = () => {
    const currentDate = new Date().toLocaleString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZone: 'Africa/Dakar'
    });

    return (
        <div className="bg-gray-100 min-h-screen">
            <header className="bg-black text-white flex justify-between items-center h-20">
            <div className="mb-6 text-center">
                    <img src={require('./logo.png')} alt="Logo Mali Ingenov" className="w-24 h-24 object-cover" />
            
                </div>
                <div className="text-sm">{`Date : ${currentDate}`}</div>
            </header>
            <main className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-6 text-center">Bienvenu dans Project Management de Mali-Ingenov</h1>
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

export default WelcomeComponent;