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

    componentDidMount(){
        dbTeams.once('value').then(snapshot => {
            const teams = dbLooper(snapshot);
            const promises = [];

            for(let key in teams){
                promises.push(
                    new Promise((resolve, reject)=>{
                        firebase.storage().ref('teams')
                        .child(teams[key].image).getDownloadURL()
                        .then(url=>{
                            teams[key].url = url;
                            resolve();
                        })
                    })
                )
            }

            Promise.all(promises)
                .then(()=>{
                    this.setState({
                        loading: false,
                        teams
                    })
                })
        })
    }

    render(){
        console.log(this.state.teams);
        return(
            <div>
            </div>
        )
    }
}

export default TheTeams;