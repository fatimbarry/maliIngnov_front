const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="w-full border-t border-gray-200 p-2">
            <div className="container mx-auto flex items-center justify-between text-sm text-gray-600">
                <p>
                    Merci d'avoir utiliser MaliIngenov Work <span className="mx-1">|</span> {currentYear} ©
                </p>
                <p className="text-right">v1.0.0</p>
            </div>
        </footer>
    );
};

export default Footer;