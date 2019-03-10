import React, { Component } from 'react';
import { Tag } from '../../ui/misc';
import Reveal from 'react-reveal/Reveal';


class Teams extends Component {

    state = {
        show: false
    }

    render() {
        return (
            <div className="home_teams">
                <div className="container">
                    <Reveal
                        fraction={0.7}
                        onReveal={() => {
                            this.setState({
                                show: true
                            })
                        }}
                    >
                        <div className="home_teams_wrapper">
                            <div className="home_card_wrapper">
                            </div>
                            <div className="home_text_wrapper">
                                <div>
                                    <Tag size="100px" color="#ffffff" add={{
                                        display: 'inline-block',
                                        marginBottom: '20px',
                                    }}>
                                        The
                                </Tag>
                                </div>
                                <div>
                                    <Tag size="100px" color="#ffffff" add={{
                                        display: 'inline-block',
                                        marginBottom: '20px',
                                    }}>
                                        Teams
                                </Tag>
                                </div>
                                <div>
                                    <Tag
                                        bck="#808080"
                                        border='5px solid #000000'
                                        size="27px"
                                        color="#000000"
                                        link={true}
                                        linkTo="/teams"
                                        add={{
                                            display: 'inline-block',
                                            marginBottom: '20px',
                                        }}
                                    >
                                        Check them out!
                                </Tag>
                                </div>
                            </div>
                        </div>
                    </Reveal >
                </div>
            </div >

        );
    }
}

export default Teams;