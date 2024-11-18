const path = require('path');

module.exports = {
    mode: 'development', // Changez en 'production' pour une build optimisée
    entry: './src/index.js', // Point d'entrée principal
    output: {
        path: path.resolve(__dirname, 'dist'), // Répertoire de sortie
        filename: 'bundle.js', // Nom du fichier de sortie
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/, // Gestion des fichiers JS et JSX
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader', // Transpilation avec Babel
                },
            },
            {
                test: /\.css$/, // Gestion des fichiers CSS
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/, // Gestion des fichiers d'images
                type: 'asset/resource',
            },
        ],
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'), // Alias pour accéder à 'src'
        },
        extensions: ['.js', '.jsx', '.json'], // Extensions résolues automatiquement
    },
    devServer: {
        static: path.resolve(__dirname, 'public'), // Répertoire pour le serveur de développement
        compress: true,
        port: 3000, // Port par défaut
        historyApiFallback: true, // Support pour React Router
    },
};
