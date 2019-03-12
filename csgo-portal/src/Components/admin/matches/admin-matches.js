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

import { dbMatches } from '../../../firebase';
import { dbLooper, reverseArray } from '../../ui/misc';

class AdminMatches extends Component {

    state = {
        isloading: true,
        matches: []
    }

    componentDidMount() {
        dbMatches.once('value').then(snapshot => {
            const matches = dbLooper(snapshot);

            this.setState({
                isloading: false,
                matches: reverseArray(matches)
            });
        });
    }

    render() {
        return (
            <AdminLayout>
                <div>
                    <Paper>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Date</TableCell>
                                    <TableCell>Match</TableCell>
                                    <TableCell>Result</TableCell>
                                    <TableCell>Final</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.matches
                                    ?
                                    this.state.matches.map((match, i)=>(
                                        <TableRow key={i}>
                                            <TableCell>
                                                {match.date}
                                            </TableCell>
                                            <TableCell>
                                                <Link to={`/admin_matches/edit_match/${match.id}`}>
                                                    {match.firstTeam} <strong> - </strong> {match.secondTeam}
                                                </Link>
                                            </TableCell>
                                            <TableCell>
                                                {match.resultFirstTeam} <strong> - </strong> {match.resultSecondTeam}
                                            </TableCell>
                                            <TableCell>
                                                {match.final === "Yes"
                                                    ?
                                                    <span className="matches_tag_red">Final</span>
                                                    :
                                                    <span className="matches_tag_green">Not played yet</span>
                                                }
                                            </TableCell>
                                        </TableRow>
                                    ))
                                    :
                                    null
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
        );
    }
}

export default AdminMatches;