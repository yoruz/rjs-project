import React, { Component } from 'react';
import Card from '../ui/card';
import Fade from 'react-reveal/Fade';

import { dbTeams, firebase } from '../../firebase';
import { dbLooper } from '../ui/misc';
import { Promise } from 'core-js';

class TheTeams extends Component {

    state = {
        loading: true,
        teams: []
    }

    componentDidMount() {
        dbTeams.once('value').then(snapshot => {
            const teams = dbLooper(snapshot);
            let promises = [];

            for (let key in teams) {
                promises.push(
                    new Promise((resolve, reject) => {
                        firebase.storage().ref('teams')
                            .child(teams[key].image).getDownloadURL()
                            .then(url => {
                                teams[key].url = url;
                                resolve();
                            })
                    })
                )
            }

            Promise.all(promises)
                .then(() => {
                    this.setState({
                        loading: false,
                        teams
                    })
                })
        })
    }

    showteamsByRegion = (region) => (
        this.state.teams
            ?
            this.state.teams.map((team, i) => {
                return team.region === region
                ?
                    <Fade left delay={i*200} key={i}>
                        <div className="item">
                            <Card
                                bck={team.url}
                                location={team.name}
                            />
                        </div>
                    </Fade>
                :
                null
            })
            :
            null
    )

    render() {
        return (
            <div className="the_teams_container">
                {!this.state.loading
                    ?
                    <div>
                        <div className="teams_region_wrapper">
                            <div className="title">Europe</div>
                            <div className="team_cards">
                                {this.showteamsByRegion('Europe')}
                            </div>
                        </div>
                        <div className="teams_region_wrapper">
                            <div className="title">CIS</div>
                            <div className="team_cards">
                                {this.showteamsByRegion('CIS')}
                            </div>
                        </div>
                        <div className="teams_region_wrapper">
                            <div className="title">North America</div>
                            <div className="team_cards">
                                {this.showteamsByRegion('North America')}
                            </div>
                        </div>
                        <div className="teams_region_wrapper">
                            <div className="title">Asia</div>
                            <div className="team_cards">
                                {this.showteamsByRegion('Asia')}
                            </div>
                        </div>
                        <div className="teams_region_wrapper">
                            <div className="title">South America</div>
                            <div className="team_cards">
                                {this.showteamsByRegion('South America')}
                            </div>
                        </div>
                    </div>
                    :
                    null
                }
            </div>
        )
    }
}

export default TheTeams;