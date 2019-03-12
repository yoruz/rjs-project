import React, { Component } from 'react';
import AdminLayout from '../../Hoc/AdminLayout';

import FormField from '../../ui/formFields';
import { validate } from '../../ui/misc';

import { dbTeams, database, dbMatches } from '../../../firebase';
import { dbLooper } from '../../ui/misc';

class AddEditMatch extends Component {

    state = {
        matchId: '',
        formType: '',
        formError: false,
        formSuccess: '',
        teams: [],
        formdata: {
            date: {
                element: 'input',
                value: 'dd-mm-yyyy',
                config: {
                    label: 'Match date',
                    name: 'date_input',
                    type: 'text'
                },
                validation: {
                    required: true
                },
                valid: false,
                validationMessage: '',
                showlabel: true
            },
            firstTeam: {
                element: 'select',
                value: '',
                config: {
                    label: 'First Team',
                    name: 'select_first',
                    type: 'select',
                    options: []
                },
                validation: {
                    required: true
                },
                valid: false,
                validationMessage: '',
                showlabel: false
            },
            resultFirstTeam: {
                element: 'input',
                value: '',
                config: {
                    label: 'First Team Result',
                    name: 'result_first_input',
                    type: 'text'
                },
                validation: {
                    required: true
                },
                valid: false,
                validationMessage: '',
                showlabel: false
            },
            secondTeam: {
                element: 'select',
                value: '',
                config: {
                    label: 'Second Team',
                    name: 'select_second',
                    type: 'select',
                    options: []
                },
                validation: {
                    required: true
                },
                valid: false,
                validationMessage: '',
                showlabel: false
            },
            resultSecondTeam: {
                element: 'input',
                value: '',
                config: {
                    label: 'Second Team Result',
                    name: 'result_second_input',
                    type: 'text'
                },
                validation: {
                    required: true
                },
                valid: false,
                validationMessage: '',
                showlabel: false
            },
            tournament: {
                element: 'input',
                value: '',
                config: {
                    label: 'Tournament',
                    name: 'tournament_input',
                    type: 'text'
                },
                validation: {
                    required: true
                },
                valid: false,
                validationMessage: '',
                showlabel: true
            },
            final: {
                element: 'select',
                value: '',
                config: {
                    label: 'Game played?',
                    name: 'select_final',
                    type: 'select',
                    options: [
                        { key: 'Yes', value: 'Yes' },
                        { key: 'No', value: 'No' }
                    ]
                },
                validation: {
                    required: true
                },
                valid: false,
                validationMessage: '',
                showlabel: true
            }
        }
    }

    updateForm(element) {
        const newFormdata = { ...this.state.formdata };
        const newElement = { ...newFormdata[element.id] };

        newElement.value = element.event.target.value;

        let validData = validate(newElement);
        newElement.valid = validData[0];
        newElement.validationMessage = validData[1];

        newFormdata[element.id] = newElement;

        this.setState({
            formError: false,
            formdata: newFormdata
        });
    }

    updateFields(match, teamOptions, teams, type, matchId){
        const newFormdata = {
            ...this.state.formdata
        };

        for(let key in newFormdata){
            if(match){
                newFormdata[key].value = match[key];
                newFormdata[key].valid = true;
            }
            if(key === 'firstTeam' || key === 'secondTeam'){
                newFormdata[key].config.options = teamOptions;
            }
        };

        this.setState({
            matchId,
            formType: type,
            formdata: newFormdata,
            teams
        });
    };

    componentDidMount() {
        const matchId = this.props.match.params.id;
        const getTeams = (match, type) => {
            dbTeams.once('value').then(snapshot => {
                const teams = dbLooper(snapshot);
                const teamOptions = [];
                
                snapshot.forEach((childSnapshot) => {
                    teamOptions.push({
                        key: childSnapshot.val().name,
                        value: childSnapshot.val().name
                    });
                });
                this.updateFields(match, teamOptions, teams, type, matchId);
            })
        }

        if(!matchId){
            getTeams(false, 'Add Match');
        } else {
            database.ref(`matches/${matchId}`).once('value')
                .then((snapshot) =>{
                    const match = snapshot.val();
                    getTeams(match, 'Edit Match')
                })
        }
    };

    successForm(message){
        this.setState({
            formSuccess: message
        });

        setTimeout(()=>{
            this.setState({
                formSuccess: ''
            });
        }, 2000);
    };

    submitForm(event) {
        event.preventDefault();

        let dataToSubmit = {};
        let formIsValid = true;

        for (let key in this.state.formdata) {
            dataToSubmit[key] = this.state.formdata[key].value;
            formIsValid = this.state.formdata[key].valid && formIsValid;
        }

        // this.state.teams.forEach((team)=>{
        //     if(team.name === dataToSubmit.firstTeam){
        //         dataToSubmit['firstTeamThmb'] = team.thmb;
        //     }
        //     if(team.name === dataToSubmit.secondTeam){
        //         dataToSubmit['secondTeamThmb'] = team.thmb;
        //     }
        // })

        if (formIsValid) {
            if(this.state.formType === 'Edit Match'){
                database.ref(`matches/${this.state.matchId}`)
                    .update(dataToSubmit)
                    .then(()=>{
                        this.successForm('Updated correctly!')
                    }).catch((e)=>{
                        this.setState({
                            formError: true
                        });
                    })
            } else {
                dbMatches.push(dataToSubmit).then(()=>{
                    this.props.history.push('/admin_matches');
                }).catch((e)=>{
                    this.setState({
                        formError: true
                    });
                });
            };
        } else {
            this.setState({
                formError: true
            });
        }
    }

    render() {
        return (
            <AdminLayout>
                <div className="editmatch_dialog_wrapper">
                    <h2>
                        {this.state.formType}
                    </h2>
                    <div>
                        <form onSubmit={(event) => this.submitForm(event)}>
                            <FormField
                                id={'date'}
                                formdata={this.state.formdata.date}
                                change={(element) => this.updateForm(element)}
                            />
                            <div className="select_team_layout">
                                <div className="label_inputs">First Team</div>
                                <div className="wrapper">
                                    <div className="left">
                                        <FormField
                                            id={'firstTeam'}
                                            formdata={this.state.formdata.firstTeam}
                                            change={(element) => this.updateForm(element)}
                                        />
                                    </div>
                                    <div>
                                        <FormField
                                            id={'resultFirstTeam'}
                                            formdata={this.state.formdata.resultFirstTeam}
                                            change={(element) => this.updateForm(element)}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="select_team_layout">
                                <div className="label_inputs">Second Team</div>
                                <div className="wrapper">
                                    <div className="left">
                                        <FormField
                                            id={'secondTeam'}
                                            formdata={this.state.formdata.secondTeam}
                                            change={(element) => this.updateForm(element)}
                                        />
                                    </div>
                                    <div>
                                        <FormField
                                            id={'resultSecondTeam'}
                                            formdata={this.state.formdata.resultSecondTeam}
                                            change={(element) => this.updateForm(element)}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="split_fields">
                                <FormField
                                    id={'tournament'}
                                    formdata={this.state.formdata.tournament}
                                    change={(element) => this.updateForm(element)}
                                />
                            </div>
                            <div className="split_fields last">
                                <FormField
                                    id={'final'}
                                    formdata={this.state.formdata.final}
                                    change={(element) => this.updateForm(element)}
                                />
                            </div>
                            <div className="success_label">{this.state.formSuccess}</div>
                            {this.state.formError ?
                                <div className="error_label">
                                    Something is wrong, try again!
                                </div>
                                : ''
                            }
                            <div className="admin_submit">
                                <button onClick={(event) => this.submitForm(event)}>
                                    {this.state.formType}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </AdminLayout>
        );
    }
}

export default AddEditMatch;