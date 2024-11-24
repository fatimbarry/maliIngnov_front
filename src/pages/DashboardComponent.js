import React, { useState } from 'react';
import {
    Box,
    CheckCircle,
    Circle,
    Users,
    Home,
    Briefcase,
    Award,
    UserCheck,
    Truck,
    Calendar as CalendarIcon,
    LayoutDashboard
} from 'lucide-react';
import Calendar from 'react-calendar';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';

const MenuItem = ({ icon: Icon, label, to }) => {
    return (
        <Link
            to={to} // Utilisez la prop `to` pour définir la route
            className="flex items-center space-x-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg p-2 cursor-pointer transition-colors"
        >
            <Icon className="w-5 h-5" />
            <span>{label}</span>
        </Link>
    );
};

// Composant Card personnalisé
const Card = ({ children, className = '' }) => {
    return (
        <div className={`bg-white rounded-xl shadow-sm border border-gray-100 ${className}`}>
            {children}
        </div>
    );
};

const DashboardComponent = () => {
    const [date, setDate] = useState(new Date());

    return (
        <div className="min-h-screen flex flex-col">
            {/* Navbar */}
            <Navbar />

            <div className="flex flex-1">
                {/* Sidebar */}
                <aside className="w-64 bg-gray-900 min-h-full">
                    <div className="p-4 space-y-2">
                        <MenuItem icon={Home} label="Accueil" to="/"/>
                        <MenuItem icon={Briefcase} label="Projet" to="/ListProject"/>
                        <MenuItem icon={Users} label="Employés" to="/EmployeeList"/>
                        <MenuItem icon={Award} label="Department" to="/Department"/>
                        <MenuItem icon={LayoutDashboard} label="Dashboard" to="/Dashboard"/>
                        <MenuItem icon={UserCheck} label="Clients" to="/ClientList"/>
                        <MenuItem icon={Truck} label="Fournisseurs" to="/fournisseurs"/>
                    </div>
                    <div className="mt-8 p-4">
                        <CalendarIcon className="text-white mb-2"/>
                        <Calendar
                            className="bg-white rounded-lg p-2"
                            onChange={setDate}
                            value={date}
                        />
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1 p-8 bg-gray-50/50">
                    <h1 className="text-2xl font-semibold text-blue-900 mb-8">Titre de la page</h1>

                    {/* Projects and Tasks Section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <Card className="p-6">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-emerald-100 rounded-lg">
                                    <Box className="w-6 h-6 text-emerald-500" />
                                </div>
                                <h2 className="text-xl text-orange-500 font-medium">Projets</h2>
                            </div>
                            <div className="grid grid-cols-4 gap-4">
                                <div>
                                    <div className="text-3xl font-bold text-blue-900">44</div>
                                    <div className="text-gray-500 text-sm">Total</div>
                                </div>
                                <div>
                                    <div className="text-3xl font-bold text-orange-500">16</div>
                                    <div className="text-gray-500 text-sm">En cours</div>
                                </div>
                                <div>
                                    <div className="text-3xl font-bold text-pink-500">18</div>
                                    <div className="text-gray-500 text-sm">En pause</div>
                                </div>
                                <div>
                                    <div className="text-3xl font-bold text-emerald-500">14</div>
                                    <div className="text-gray-500 text-sm">Terminés</div>
                                </div>
                            </div>
                        </Card>

                        <Card className="p-6">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-blue-100 rounded-lg">
                                    <CheckCircle className="w-6 h-6 text-blue-500" />
                                </div>
                                <h2 className="text-xl text-orange-500 font-medium">Tâches</h2>
                            </div>
                            <div className="grid grid-cols-4 gap-4">
                                <div>
                                    <div className="text-3xl font-bold text-blue-900">53</div>
                                    <div className="text-gray-500 text-sm">Total</div>
                                </div>
                                <div>
                                    <div className="text-3xl font-bold text-orange-500">22</div>
                                    <div className="text-gray-500 text-sm">En cours</div>
                                </div>
                                <div>
                                    <div className="text-3xl font-bold text-pink-500">13</div>
                                    <div className="text-gray-500 text-sm">En pause</div>
                                </div>
                                <div>
                                    <div className="text-3xl font-bold text-emerald-500">18</div>
                                    <div className="text-gray-500 text-sm">Terminées</div>
                                </div>
                            </div>
                        </Card>
                    </div>

                    {/* Bakelistes Section */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                        <Card className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="text-3xl font-bold text-gray-700">42</div>
                                    <div className="text-gray-500 text-sm">Total Bakelistes</div>
                                </div>
                                <div className="p-2 bg-pink-100 rounded-lg">
                                    <Users className="w-6 h-6 text-pink-500" />
                                </div>
                            </div>
                        </Card>

                        <Card className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="text-3xl font-bold text-gray-700">12</div>
                                    <div className="text-gray-500 text-sm">Bakelistes actifs</div>
                                </div>
                                <div className="p-2 bg-blue-100 rounded-lg">
                                    <Users className="w-6 h-6 text-blue-500" />
                                </div>
                            </div>
                        </Card>

                        <Card className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="text-3xl font-bold text-gray-700">25</div>
                                    <div className="text-gray-500 text-sm">Bakelistes Payés</div>
                                </div>
                                <div className="p-2 bg-emerald-100 rounded-lg">
                                    <Users className="w-6 h-6 text-emerald-500" />
                                </div>
                            </div>
                        </Card>

                        <Card className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="text-3xl font-bold text-gray-700">13</div>
                                    <div className="text-gray-500 text-sm">Bakelistes Retirés</div>
                                </div>
                                <div className="p-2 bg-red-100 rounded-lg">
                                    <Users className="w-6 h-6 text-red-500" />
                                </div>
                            </div>
                        </Card>
                    </div>

                    {/* Deliveries Section */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <Card className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="text-3xl font-bold text-gray-700">11</div>
                                    <div className="text-gray-500 text-sm">Total Livraisons</div>
                                </div>
                                <div className="p-2 bg-purple-100 rounded-lg">
                                    <Circle className="w-6 h-6 text-purple-500" />
                                </div>
                            </div>
                        </Card>

                        <Card className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="text-3xl font-bold text-gray-700">14</div>
                                    <div className="text-gray-500 text-sm">Livraisons Validées</div>
                                </div>
                                <div className="p-2 bg-orange-100 rounded-lg">
                                    <Circle className="w-6 h-6 text-orange-500" />
                                </div>
                            </div>
                        </Card>

                        <Card className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="text-3xl font-bold text-gray-700">14</div>
                                    <div className="text-gray-500 text-sm">Livraisons Rejetées</div>
                                </div>
                                <div className="p-2 bg-blue-100 rounded-lg">
                                    <Circle className="w-6 h-6 text-blue-500" />
                                </div>
                            </div>
                        </Card>

                        <Card className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="text-3xl font-bold text-gray-700">14</div>
                                    <div className="text-gray-500 text-sm">Livraisons Rejetées</div>
                                </div>
                                <div className="p-2 bg-blue-100 rounded-lg">
                                    <Circle className="w-6 h-6 text-blue-500" />
                                </div>
                            </div>
                        </Card>
                    </div>

                </main>
            </div>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default DashboardComponent;
