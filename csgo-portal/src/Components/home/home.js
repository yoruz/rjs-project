import React from 'react';
import Featured from './featured/featured';
import Matches from './matches/matches';
import Teams from './teams/teams';

const Home = () => {
    return (
        <div className="bck_img">
            <Featured/>
            <Matches/>
            <Teams/>
        </div>
    )
}

export default Home;