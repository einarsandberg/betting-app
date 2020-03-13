import React from 'react';
import './GroupTable.css';
export interface IGroupTableTeam {
    name: string;
    played: number;
    points: number;
    goalsFor: number;
    goalsAgainst: number;
    goalDifference: number;
    wins: number;
    draws: number;
    losses: number;
}

interface IGroupTableProps {
    teams: IGroupTableTeam[];
}

const GroupTable: React.FC<IGroupTableProps> = (props: IGroupTableProps) => {
    props.teams.sort(compareTeams);

    return (
        <table className="GroupTable">
            <thead>
                <tr>
                    <th className="GroupTable__team-header">Team</th>
                    <th>M</th>
                    <th>W</th>
                    <th>D</th>
                    <th>L</th>
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
                            <td>{team.wins}</td>
                            <td>{team.draws}</td>
                            <td>{team.losses}</td>
                            <td>{team.goalsFor}</td>
                            <td>{team.goalsAgainst}</td>
                            <td>{team.goalDifference}</td>
                            <td>{team.points}</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};

function compareTeams(a: IGroupTableTeam, b: IGroupTableTeam): number{
    if (a.points > b.points) return -1;
    if (a.points < b.points) return 1;
    
    if (a.goalDifference > b.goalDifference) return -1;
    if (a.goalDifference < b.goalDifference) return 1; 

    if (a.goalsFor > b.goalsFor) return -1;
    if (a.goalsFor < b.goalsFor) return 1;

    if (a.wins > b.wins) return -1;
    if (a.wins < b.wins) return 1;

    return 0;
}

export default GroupTable;