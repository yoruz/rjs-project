import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../../Hoc/AdminLayout';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';

import { dbTeams } from '../../../firebase';
import { dbLooper } from '../../ui/misc';

class AdminTeams extends Component {

    state = {
        isloading: true,
        teams: []
    }

    componentDidMount() {
        dbTeams.once('value').then((snapshot) => {
            const teams = dbLooper(snapshot);

            this.setState({
                isloading: false,
                teams: teams
            })
        })
    }

    render() {

        return (
            <AdminLayout>
                <div>
                    <Paper>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Location</TableCell>
                                    <TableCell>Region</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.teams
                                    ?
                                    this.state.teams.map((team, i) => (
                                        <TableRow key={i}>
                                            <TableCell>
                                                <Link to={`/admin_teams/edit_team/${team.id}`}>
                                                    {team.name}
                                                </Link>
                                            </TableCell>
                                            <TableCell>
                                                {team.location}
                                            </TableCell>
                                            <TableCell>
                                                {team.region}
                                            </TableCell>
                                        </TableRow>
                                    ))
                                    :
                                    ''
                                }
                            </TableBody>
                        </Table>
                    </Paper>
                    <div className="admin_progress">
                        {
                            this.state.isloading
                                ?
                                <CircularProgress thickness={7} style={{ color: '#808080' }} />
                                :
                                ''
                        }
                    </div>
                </div>
            </AdminLayout>
        )
    }
}

export default AdminTeams;