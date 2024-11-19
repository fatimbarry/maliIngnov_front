import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import {
    UserCircle,
    //FileSpreadsheet,
    //Users,
    //KeyRound,
    Wallet,
    BriefcaseIcon,
    Compass
} from 'lucide-react';

const DashboardItem = ({ icon: Icon, label, gradient, delay, onClick  }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay }}
        whileHover={{ scale: 1.05 }}
        className="w-full"
        onClick={onClick}

    >
        <div className={`rounded-lg shadow-md h-full overflow-hidden ${gradient} hover:shadow-xl transition-shadow duration-300`}>
            <div className="p-6">
                <div className="flex flex-col items-center justify-center space-y-4">
                    <div className="p-4 bg-white/20 rounded-full">
                        <Icon size={32} className="text-white" strokeWidth={1.5} />
                    </div>
                    <span className="text-white font-medium tracking-wide text-center">
                        {label}
                    </span>
                </div>
            </div>
        </div>
    </motion.div>
);


const WelcomeComponent = () => {
    const currentDate = new Date().toLocaleString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'Africa/Dakar'
    });
    const navigate = useNavigate();

    const cards = [
        {
            icon: UserCircle,
            label: "Employé",
            gradient: "bg-gradient-to-br from-purple-500 to-indigo-600",
            delay: 0.1
        },

        {
            icon: Compass,
            label: "Direction",
            gradient: "bg-gradient-to-br from-cyan-500 to-blue-400",
            delay: 0.4
        },

        {
            icon: Wallet,
            label: "Comptable",
            gradient: "bg-gradient-to-br from-violet-500 to-purple-400",
            delay: 0.3
        },

        {
            icon: BriefcaseIcon,
            label: "Chef de Projet",
            gradient: "bg-gradient-to-br from-indigo-500 to-purple-500",
            delay: 0.2
        }




    ];
    const handleCardClick = () => {
        navigate('/EmployeeGallery'); // Redirige vers la route de gallery
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
            <header className="bg-gradient-to-r from-gray-900 to-gray-800 text-white">
                <div className="container mx-auto px-6 py-4">
                    <div className="flex justify-between items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <img
                                src={require('./logo.png')}
                                alt="Logo Mali Ingenov"
                                className="mx-auto w-14 h-14 object-cover"
                            />
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                            className="text-sm font-light"
                        >
                            {currentDate}
                        </motion.div>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-6 py-12">
                <motion.h1
                    initial={{opacity: 0, y: -20}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.5}}
                    className="text-4xl font-bold text-center mb-12 text-gray-800"
                >
                    Bienvenue dans Project Management de{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">
                        Mali-Ingenov
                    </span>
                </motion.h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 cursor-pointer mb-5">
                    {cards.map((card, index) => (
                        <DashboardItem
                            key={index}
                            icon={card.icon}
                            label={card.label}
                            gradient={card.gradient}
                            delay={card.delay}
                            onClick={handleCardClick}
                        />
                    ))}
                </div>
                <Footer/>
            </main>


        </div>

    );

};

export default WelcomeComponent;