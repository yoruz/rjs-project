import React from 'react';
import { Tag } from '../../ui/misc';
import Blocks from './Blocks';

const MatchesHome = () => {
    return (
        <div className="home_matches_wrapper" 
        style={{borderBottom: '15px solid #999900'}}
        >
            <div className="container">
                <Tag
                    //bck="#808080"
                    size="50px"
                    color="#ffffff"
                >
                    Matches
                </Tag>
                    <Blocks/>
                <Tag
                    bck="#808080"
                    size="22px"
                    color="#000000"
                    link={true}
                    linkTo="/matches"
                >
                    See more matches
                </Tag>
            </div>
        </div>
    )
}

export default MatchesHome;