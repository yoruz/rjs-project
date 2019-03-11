import React from 'react';
import { CsLogo } from '../ui/icons';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bck_black">
            <div className="footer_logo">
                <CsLogo
                    width="70px"
                    height="70px"
                    link={false}
                />
            </div>
            <div className="discl">
                CS:GO Portal 2019
                <br/>
                <Link to="/sign_in">
                    <Button color="inherit">Admin sign in</Button>
                </Link>
            </div>
        </footer>
    )
}

export default Footer;