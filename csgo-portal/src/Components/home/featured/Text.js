import React, { Component } from 'react';
import { easePolyOut } from 'd3-ease';
import Animate from 'react-move/Animate';

import TextLogo from '../../../Resources/images/text_logo.png';

class Text extends Component {
    
    animateFirst = () => (
        <Animate
            show={true}
            start={{
                opacity:0,
                x:403,
                y:450
            }}
            enter={{
                opacity:[1],
                x:[730],
                y:[450],
                timing:{delay: 400, duration: 900, ease:easePolyOut}
            }}
        >
            {({opacity, x, y}) => (
                <div 
                    className="featured_first"
                    style={{
                        opacity,
                        transform: `translate(${x}px, ${y}px)`
                    }}
                >
                    CS:GO
                </div>
            )}
        </Animate>
    )

    animateSecond = () => (
        <Animate
            show={true}
            start={{
                opacity:0,
                x:503,
                y:586
            }}
            enter={{
                opacity:[1],
                x:[265],
                y:[586],
                timing:{delay: 500, duration: 500, ease:easePolyOut}
            }}
        >
            {({opacity, x, y}) => (
                <div 
                    className="featured_second"
                    style={{
                        opacity,
                        transform: `translate(${x}px, ${y}px)`
                    }}
                >
                    GAME PORTAL
                </div>
            )}
        </Animate>
    )
    
    animateTextLogo = () => (
        <Animate
            show={true}
            start={{
                opacity:0
            }}
            enter={{
                opacity:[1],
                timing:{delay: 1000, duration: 500, ease:easePolyOut}
            }}
        >
            {({opacity}) => (
                <div 
                    className="featured_text_logo"
                    style={{
                        opacity,
                        background: `url(${TextLogo})`,
                        transform: `translate(140px, 295px)`
                    }}
                >
                </div>
            )}
        </Animate>
    )
    render() {
        return (
            <div className="featured_text">
                {this.animateTextLogo()}
                {this.animateFirst()}
                {this.animateSecond()}
            </div>
        )
    }
}

export default Text;