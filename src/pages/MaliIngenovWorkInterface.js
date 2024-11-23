import React from 'react';
import { Bell, Search, MoreVertical } from 'lucide-react';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

const MaliIngenovWorkInterface = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Top Navbar */}
            <nav className="bg-white px-6 py-3 flex items-center justify-between border-b">
                <div className="flex items-center gap-4 flex-1">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center">
                            <span className="text-white font-semibold">M</span>
                        </div>
                        <span className="text-green-500 font-semibold">MaliIngenov Work</span>
                    </div>
                    <div className="flex-1 max-w-xl">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Rechercher"
                                className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-100 border-none focus:ring-2 focus:ring-green-500"
                            />
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <Bell className="w-5 h-5 text-gray-600" />
                        <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">1</span>
                    </div>
                    <MoreVertical className="w-5 h-5 text-gray-600" />
                    <img src="/api/placeholder/32/32" alt="Profile" className="w-8 h-8 rounded-full" />
                </div>
            </nav>

            <div className="flex">
                {/* Sidebar */}
                <aside className="w-64 bg-white h-[calc(100vh-4rem)] border-r p-4">
                    <div className="space-y-2">
                        <div className="text-sm text-gray-500 px-4 py-2">FONCTIONNALITES</div>
                        <Link to="#" className="flex items-center gap-3 px-4 py-2 text-gray-600 rounded-lg hover:bg-gray-100">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="10"/>
                                <polyline points="12 6 12 12 16 14"/>
                            </svg>
                            <span>Dashboard</span>
                        </Link>
                        <Link to="#" className="flex items-center gap-3 px-4 py-2 text-gray-600 rounded-lg hover:bg-gray-100">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <rect x="3" y="3" width="18" height="18" rx="2"/>
                                <path d="M3 9h18"/>
                            </svg>
                            <span>Suivi Projets</span>
                        </Link>
                        <div className="pl-8">
                            <Link to="#" className="flex items-center gap-3 px-4 py-2 text-gray-600 rounded-lg hover:bg-gray-100">
                                Easy Appointments
                            </Link>
                        </div>
                        <div className="text-sm text-gray-500 px-4 py-2 mt-4">PAGES</div>
                        <Link to="#" className="flex items-center gap-3 px-4 py-2 text-gray-600 rounded-lg hover:bg-gray-100">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                                <polyline points="14 2 14 8 20 8"/>
                                <line x1="16" y1="13" x2="8" y2="13"/>
                                <line x1="16" y1="17" x2="8" y2="17"/>
                                <polyline points="10 9 9 9 8 9"/>
                            </svg>
                            <span>Templates</span>
                        </Link>
                        <Link to="#" className="flex items-center gap-3 px-4 py-2 text-gray-600 rounded-lg bg-orange-500/10 text-orange-500">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="3"/>
                                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
                            </svg>
                            <span>Paramètres</span>
                        </Link>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1 p-6">
                    <div className="bg-white rounded-lg shadow-sm">
                        <div className="p-6">
                            <h1 className="text-xl font-semibold text-green-500">Informations personnels</h1>

                            <div className="mt-6 grid grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Prénom & Nom</label>
                                    <input
                                        type="text"
                                        placeholder="Fatoumata Boubacar Barry"
                                        className="w-full px-4 py-2 rounded-lg bg-gray-50 border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
                                    <input
                                        type="text"
                                        placeholder="784659628"
                                        className="w-full px-4 py-2 rounded-lg bg-gray-50 border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Mot de passe</label>
                                    <input
                                        type="password"
                                        value="********"
                                        className="w-full px-4 py-2 rounded-lg bg-gray-50 border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Confirmation</label>
                                    <input
                                        type="text"
                                        placeholder="Confirmez le mot de passe"
                                        className="w-full px-4 py-2 rounded-lg bg-gray-50 border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Sélectionner un pays</label>
                                    <select className="w-full px-4 py-2 rounded-lg bg-gray-50 border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent">
                                        <option>Sélectionner un pays</option>
                                    </select>
                                </div>
                                <div className="col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Biographie</label>
                                    <div className="relative">
                    <textarea
                        placeholder="Écrire ma biographie"
                        className="w-full px-4 py-2 rounded-lg bg-gray-50 border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        rows={4}
                    ></textarea>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="absolute top-3 left-3 w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 flex justify-end">
                                <button className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
                                    Sauvegarder
                                </button>
                            </div>
                        </div>
                    </div>
                </main>

                {/* Profile Section */}
                <aside className="w-80 p-6">
                    <h2 className="text-xl font-semibold text-green-500 mb-6">Photo de profil</h2>
                    <div className="flex flex-col items-center">
                        <div className="w-40 h-40 rounded-full overflow-hidden bg-yellow-400">
                            <img src="/Coach Barry.png/160/160" alt="Profile" className="w-full h-full object-cover" />
                        </div>
                        <h3 className="mt-4 text-lg font-semibold text-gray-900">Fatoumata Boubacar Barry</h3>
                        <p className="text-gray-500">fatimbarry78130@gmail.com</p>
                        <button className="mt-4 px-4 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 inline-flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                                <circle cx="8.5" cy="8.5" r="1.5"/>
                                <polyline points="21 15 16 10 5 21"/>
                            </svg>
                            choisir une photo
                        </button>
                    </div>
                </aside>
            </div>
            <Footer/>
        </div>
    );
};

export default MaliIngenovWorkInterface;