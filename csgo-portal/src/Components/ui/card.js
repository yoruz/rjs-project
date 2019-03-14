import React from 'react';

const Card = (props) => {
    return (
        <div className="card_wrapper">
            <div
                className="card_thmb"
                style={{
                    background: `#f2f9ff url(${props.bck})`
                }}
            ></div>
            <div className="card_nfo">
                <div className="card_location">
                    {props.location}
                </div>
            </div>
        </div>
    );
};

export default Card;