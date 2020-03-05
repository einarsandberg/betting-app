import React from 'react';
import './GroupTable.css';
export interface GroupTableTeam {
    name: string;
    played: number;
    points: number;
    goalsFor: number;
    goalsAgainst: number;
}

type GroupTableProps = {
    teams: GroupTableTeam[];
}

const GroupTable: React.FC<GroupTableProps> = (props: GroupTableProps) => {

    return (
        <table className="GroupTable">
            <thead>
                <tr>
                    <th className="GroupTable__team-header">Team</th>
                    <th>M</th>
                    <th>GF</th>
                    <th>GA</th>
                    <th>GD</th>
                    <th>P</th>
                </tr>
            </thead>
            <tbody>
                {props.teams.map((team) => {
                    return (
                        <tr key={`row${team.name}`}>
                            <td>{team.name}</td>
                            <td>{team.played}</td>
                            <td>{team.goalsFor}</td>
                            <td>{team.goalsAgainst}</td>
                            <td>{team.goalsFor - team.goalsAgainst}</td>
                            <td>{team.points}</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};

export default GroupTable;