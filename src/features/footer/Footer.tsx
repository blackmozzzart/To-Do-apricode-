import React from 'react';
import '../footer/Footer.css';

export const Footer = () => {
    return (
        <footer>
            <a href='https://github.com/blackmozzzart' className='footer__logo'>BLACKMOZZZART</a>

            <div className='footer__copyright'>
                <small>&copy; BlackMozzzart. All rights reserved</small>
            </div>
        </footer>
    );
};