/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"], // Active le mode sombre basé sur la classe
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  prefix: "", // Aucun préfixe ajouté aux classes Tailwind
  theme: {
    extend: {
      width: {
        'full': '100%',
      },
      height: {
        'full': '100%',
      },
      overflow: {
        'hidden': 'hidden',
      },
      backgroundImage: {
        'gradient-br': 'linear-gradient(to bottom right, var(--tw-gradient-stops))',
      },
      boxShadow: {
        'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      },
      transitionProperty: {
        'shadow': 'box-shadow',
      },
      transitionDuration: {
        '300': '300ms',
      },
      padding: {
        '6': '1.5rem',
      },
      display: {
        'flex': 'flex',
        'flex-col': 'flex-column',
      },
      alignItems: {
        'center': 'center',
        'justify-center': 'center',
      },
      spacing: {
        '4': '1rem',
        '6': '1.5rem',
      },
      backgroundColor: {
        'white/20': 'rgba(255, 255, 255, 0.2)',
      },
      borderRadius: {
        'full': '9999px',
      },
      textColor: {
        'white': '#ffffff',
      },
      fontWeight: {
        'medium': '500',
      },
      letterSpacing: {
        'wide': '0.025em',
      },
      textAlign: {
        'center': 'center',
      },
    }
  }
};
