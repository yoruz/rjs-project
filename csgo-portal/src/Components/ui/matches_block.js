import React from 'react';

const MatchesBlock = ({ match }) => {

    return (
        <div className="match_block">
            <div className="match_date">
                {match.final !== "No" ? match.date : `Match not played yet: ${match.date}`}
            </div>
            <div className="match_wrapper">
                <div className="match_top">
                    <div className="left">
                        <div className="icon">
                        </div>
                        <div className="team_name">
                            {match.firstTeam}
                        </div>
                    </div>
                    <div className="right">
                        {match.final ? match.resultFirstTeam : '-'}
                    </div>
                </div>
                <div className="match_bottom">
                    <div className="left">
                        <div className="icon">
                        </div>
                        <div className="team_name">
                            {match.secondTeam}
                        </div>
                    </div>
                    <div className="right">
                        {match.final ? match.resultSecondTeam : '-'}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MatchesBlock;