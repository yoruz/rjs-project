import React, { Component } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

import { dbMatches, dbTeams, firebase } from '../../firebase';
import { dbLooper, reverseArray } from '../ui/misc';

import MatchesList from './matchesList';

class TheMatches extends Component{
    
    state = {
        loading: true,
        matches: [],
        filterMatches: [],
        teams: [],
        matchFilter: 'All'
    }

    componentDidMount(){
        dbMatches.once('value').then(snapshot => {
            const matches = dbLooper(snapshot);

            this.setState({
                loading: false,
                matches: reverseArray(matches),
                filterMatches: reverseArray(matches)
            });
        });
    }

    showPlayed = (played) => {
        const list = this.state.matches.filter((match)=>{
            return match.final === played
        });
        this.setState({
            filterMatches: played === 'All' 
            ? 
            this.state.matches
            : list,

            matchFilter: played
        })
    }
    
    render(){
        const state = this.state;
        return(
            <div className="the_matches_container">
                <div className="the_matches_wrapper">
                    <div className="left">
                        <div className="match_filters">
                            <div className="match_filters_box">
                                <div className="tag">
                                    Show Match
                                </div>
                                <div className="cont">
                                    <div className={`option ${state.matchFilter === 'All'?'active':''}`}
                                        onClick={()=>this.showPlayed('All')}
                                    >
                                        All
                                    </div>
                                    <div className={`option ${state.matchFilter === 'Yes'?'active':''}`}
                                        onClick={()=>this.showPlayed('Yes')}
                                    >
                                        Played
                                    </div>
                                    <div className={`option ${state.matchFilter === 'No'?'active':''}`}
                                        onClick={()=>this.showPlayed('No')}
                                    >
                                        Not Played
                                    </div>
                                </div>
                            </div>
                        </div>
                        <MatchesList matches={state.filterMatches} teams={state.teams}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default TheMatches;