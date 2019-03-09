import React from 'react';
import { CsLogo } from '../ui/icons';

const Footer = () => {
    return (
        <footer className="bck_black">
            <div className="footer_logo">
                <CsLogo
                    width="70px"
                    height="70px"
                    link={true}
                    linkTo="/"
                />
            </div>
            <div className="discl">
                CS:GO Portal 2019
            </div>
        </footer>
    )
}

export default Footer;