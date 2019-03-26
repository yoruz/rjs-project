import React, { Component } from 'react';
import { easePolyOut } from 'd3-ease';
import NodeGroup from 'react-move/NodeGroup';

class MatchesList extends Component {

    state = {
        matcheslist: [],
        teams: []
    }

    static getDerivedStateFromProps(props, state) {
        return state = {
            matcheslist: props.matches,
            teams: props.teams
        }
    }

    showMatches = () => (
        this.state.matcheslist
            ?
            <NodeGroup
                data={this.state.matcheslist}
                keyAccessor={(d) => d.id}

                start={() => ({
                    opacity: 0,
                    x: -200
                })}

                enter={(d, i) => ({
                    opacity: [1],
                    x: [0],
                    timing: { duration: 800, delay: i * 50, ease: easePolyOut }
                })}

                update={(d, i) => ({
                    opacity: [1],
                    x: [0],
                    timing: { duration: 800, delay: i * 50, ease: easePolyOut }
                })}

                leave={(d, i) => ({
                    opacity: [0],
                    x: [-200],
                    timing: { duration: 800, delay: i * 50, ease: easePolyOut }
                })}
            >
                {(nodes) => (
                    <div>
                        {nodes.map(({ key, data, state: { x, opacity } }) => (
                            <div key={key}
                                className="match_box_big"
                                style={{
                                    opacity,
                                    transform: `translate(${x}px)`
                                }}
                            >
                                <div className="block_wrapper">
                                    <div className="block">
                                        <div
                                            className="icon"
                                            style={{ background: `url(/images/team_icons/${data.firstTeam}.ico)` }}>
                                        </div>
                                        <div className="team">{data.firstTeam}</div>
                                        <div className="result">{data.resultFirstTeam}</div>
                                    </div>
                                    <div className="block">
                                        <div
                                            className="icon"
                                            style={{ background: `url(/images/team_icons/${data.secondTeam}.ico)` }}>
                                        </div>
                                        <div className="team">{data.secondTeam}</div>
                                        <div className="result">{data.resultSecondTeam}</div>
                                    </div>
                                </div>
                                <div className="block_wrapper nfo">
                                    <div><strong>Date:</strong>{data.date}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </NodeGroup>
            :
            null
    )

    render() {
        return (
            <div>
                {this.showMatches()}
            </div>
        )
    }
}

export default MatchesList;