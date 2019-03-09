import React from 'react';
import { Link } from 'react-router-dom';

import csgologo from '../../Resources/images/logos/csgo_logo3.png';

export const CsLogo = (props) => {

    const template = <div
        className="img_cover"
        style={{
            width: props.width,
            height: props.height,
            background: `url(${csgologo}) no-repeat`
        }}
    ></div>


    return (
        <Link to={props.linkTo} className="link_logo">
            {template}
        </Link>
    )

}