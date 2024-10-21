import React from 'react';
import { User, FileText, Briefcase, Users, Award, LogOut } from 'lucide-react';

const NavItem = ({ text, count }) => (
    <div className="flex items-center px-4 py-2 text-white text-sm border-r border-gray-700">
        {text}
        {count && <span className="ml-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">{count}</span>}
    </div>
);

const DashboardItem = ({ icon: Icon, label, color, className }) => (
    <div className={`flex flex-col items-center justify-center p-4 ${color} ${className}`}>
        <Icon className="text-white mb-2" size={40} />
        <span className="text-white text-sm font-semibold">{label}</span>
    </div>
);

const DashboardComponent = () => {
    return (
        <div className="bg-gray-100 min-h-screen">
            <header className="bg-gray-900 text-white p-2 flex justify-between items-center">
                <div className="flex items-center">
                    <img src="/logo-placeholder.png" alt="Maroc Ingenov" className="h-8 mr-4" />
                    <span className="font-bold">MAROC INGENOV</span>
                </div>
                <nav className="flex">
                    <NavItem text="Tâches affectées" count={7} />
                    <NavItem text="Imputation à Valider" count={3} />
                    <NavItem text="Imputation à Valider" count={2} />
                    <NavItem text="Pièces Débours à valider" count={2} />
                    <NavItem text="Affaires en attente" count={1} />
                </nav>
                <div className="flex items-center text-sm">
                    <span className="mr-4">admin@admin.com</span>
                    <span>Profil</span>
                    <span className="mx-2">|</span>
                    <span>Changer Mot de passe</span>
                </div>
            </header>
            <main className="container mx-auto p-4">
                <div className="grid grid-cols-6 grid-rows-3 gap-4 h-screen">
                    <DashboardItem icon={User} label="Employé" color="bg-green-500" className="col-span-2 row-span-1" />
                    <DashboardItem icon={FileText} label="Fournisseur" color="bg-purple-600" className="col-span-2 row-span-1" />
                    <DashboardItem icon={Users} label="Client" color="bg-blue-400" className="col-span-2 row-span-2" />
                    <DashboardItem icon={FileText} label="catégorie" color="bg-orange-500" className="col-span-2 row-span-1" />
                    <DashboardItem icon={Briefcase} label="Affaire" color="bg-red-500" className="col-span-2 row-span-1" />
                    <DashboardItem icon={Award} label="Qualification" color="bg-purple-500" className="col-span-2 row-span-1" />
                    <DashboardItem icon={Users} label="Groupe" color="bg-yellow-500" className="col-span-2 row-span-1" />
                    <DashboardItem icon={LogOut} label="Déconnexion" color="bg-gray-700" className="col-span-2 row-span-1" />
                </div>
            </main>
        </div>
    );
};

export default DashboardComponent;