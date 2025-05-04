import React from 'react';

const Footer = () => {
    return (
        <footer>
            <div className="footer-content">
                <p>&copy; {new Date().getFullYear()} WebStore. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;