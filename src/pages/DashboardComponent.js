import React from 'react';
import { Box, CheckCircle, Circle, Users } from 'lucide-react';

// Composant Card personnalisé
const Card = ({ children, className = '' }) => {
    return (
        <div className={`bg-white rounded-xl shadow-sm border border-gray-100 ${className}`}>
            {children}
        </div>
    );
};

const DashboardComponent = () => {
    return (
        <div className="min-h-screen bg-gray-50/50 p-8">
            {/* Header */}
            <h1 className="text-2xl font-semibold text-blue-900 mb-8">Titre de la page</h1>

            {/* Projects and Tasks Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Projects Card */}
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

                {/* Tasks Card */}
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
        </div>
    );
};

export default DashboardComponent;