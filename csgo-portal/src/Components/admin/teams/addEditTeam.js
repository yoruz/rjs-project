import React, { Component } from 'react';
import AdminLayout from '../../Hoc/AdminLayout';

import FormField from '../../ui/formFields';
import { validate } from '../../ui/misc';

import Fileuploader from '../../ui/fileuploader';
import { dbTeams, database, firebase } from '../../../firebase';

class AddEditTeam extends Component {

    state = {
        teamId: '',
        formType: '',
        formError: false,
        formSuccess: '',
        defaultImg: '',
        formdata: {
            name: {
                element: 'input',
                value: '',
                config: {
                    label: 'Team name',
                    name: 'name_input',
                    type: 'text'
                },
                validation: {
                    required: true
                },
                valid: false,
                validationMessage: '',
                showlabel: true
            },
            location: {
                element: 'input',
                value: '',
                config: {
                    label: 'Team location',
                    name: 'location_input',
                    type: 'text'
                },
                validation: {
                    required: true
                },
                valid: false,
                validationMessage: '',
                showlabel: true
            },
            region: {
                element: 'select',
                value: '',
                config: {
                    label: 'Select a region',
                    name: 'select_region',
                    type: 'select',
                    options: [
                        { key: "Europe", value: "Europe" },
                        { key: "CIS", value: "CIS" },
                        { key: "North America", value: "North America" },
                        { key: "Asia", value: "Asia" },
                        { key: "South America", value: "South America" }
                    ]
                },
                validation: {
                    required: true
                },
                valid: false,
                validationMessage: '',
                showlabel: true
            },
            image: {
                element: 'image',
                value: '',
                validation: {
                    required: true
                },
                valid: false
            }
        }
    }

    updateFields = (team, teamId, formType, defaultImg) => {
        const newFormdata = { ...this.state.formdata }

        for (let key in newFormdata) {
            newFormdata[key].value = team[key];
            newFormdata[key].valid = true;
        }

        this.setState({
            teamId,
            defaultImg,
            formType,
            formdata: newFormdata
        });
    }

    componentDidMount() {
        const teamId = this.props.match.params.id;

        if (!teamId) {
            this.setState({
                formType: 'Add team'
            })
        } else {
            database.ref(`teams/${teamId}`)
                .once('value')
                .then(snapshot => {
                    const teamData = snapshot.val();

                    firebase.storage().ref('teams')
                        .child(teamData.image).getDownloadURL()
                        .then(url => {
                            this.updateFields(teamData, teamId, 'Edit player', url);
                        });
                });
        }
    }

    updateForm(element, content = '') {
        const newFormdata = { ...this.state.formdata };
        const newElement = { ...newFormdata[element.id] };

        if (content === '') {
            newElement.value = element.event.target.value;
        } else {
            newElement.value = content;
        }

        let validData = validate(newElement);
        newElement.valid = validData[0];
        newElement.validationMessage = validData[1];

        newFormdata[element.id] = newElement;

        this.setState({
            formError: false,
            formdata: newFormdata
        });
    }

    successForm = (message) => {
        this.setState({
            formSuccess: message
        });

        setTimeout(() => {
            this.setState({
                formSuccess: ''
            });
        }, 2000)
    }

    submitForm(event) {
        event.preventDefault();

        let dataToSubmit = {};
        let formIsValid = true;

        for (let key in this.state.formdata) {
            dataToSubmit[key] = this.state.formdata[key].value;
            formIsValid = this.state.formdata[key].valid && formIsValid;
        }

        if (formIsValid) {
            if (this.state.formType === 'Edit player') {
                database.ref(`teams/${this.state.teamId}`)
                    .update(dataToSubmit)
                    .then(() => {
                        this.successForm('Updated correctly!')
                    }).catch((e) => {
                        this.setState({ formError: true });
                    });
            } else {
                dbTeams.push(dataToSubmit)
                    .then(() => {
                        this.props.history.push('/admin_teams');
                    }).catch((e) => {
                        this.setState({
                            formError: true
                        });
                    });
            }
        } else {
            this.setState({
                formError: true
            });
        }
    }

    resetImage = () => {
        const newFormdata = { ...this.state.formdata };
        newFormdata['image'].value = '';
        newFormdata['image'].valid = false;
        this.setState({
            defaultImg: '',
            formdata: newFormdata
        });
    }

    storeFilename = (filename) => {
        this.updateForm({ id: 'image' }, filename)
    }

    render() {
        return (
            <AdminLayout>
                <div className="editteam_dialog_wrapper">
                    <h2>
                        {this.state.formType}
                    </h2>
                    <div>
                        <form onSubmit={(event) => this.submitForm(event)}>

                            <Fileuploader
                                dir="teams"
                                tag={"Team image"}
                                defaultImg={this.state.defaultImg}
                                defaultImgName={this.state.formdata.image.value}
                                resetImage={() => this.resetImage()}
                                filename={(filename) => this.storeFilename(filename)}
                            />

                            <FormField
                                id={'name'}
                                formdata={this.state.formdata.name}
                                change={(element) => this.updateForm(element)}

                            />

                            <FormField
                                id={'location'}
                                formdata={this.state.formdata.location}
                                change={(element) => this.updateForm(element)}

                            />

                            <FormField
                                id={'region'}
                                formdata={this.state.formdata.region}
                                change={(element) => this.updateForm(element)}
                            />

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
        )
    }
}

export default AddEditTeam;