import React from 'react';
import { IMatchBet } from '../../api/BetService';
import { IMatch } from '../../api/MatchService';
import GroupTable, { IGroupTableTeam } from '../Standings/GroupTable';

type BetGroupTableProps = {
    bet: IMatchBet[];
    matches: IMatch[];
};

const BetGroupTable: React.FC<BetGroupTableProps> = (props: BetGroupTableProps) => {
    // Assume every team has at least one match at home
    const teams = [...new Set<string>(props.matches.map((match) => match.homeTeam))];
    
    const tableTeams: IGroupTableTeam[] = teams.map((teamName) => {
        const initialStats: IGroupTableTeam = {
            name: teamName,
            played: 0,
            points: 0,
            goalsFor: 0,
            goalsAgainst: 0,
            goalDifference: 0,
            wins: 0,
            draws: 0,
            losses: 0,
        };
        return props.matches.reduce((acc, match) => {
            const homeResult = props.bet.find(({ matchId }) =>  matchId === match._id && match.homeTeam === teamName);
            const awayResult = props.bet.find(({ matchId }) =>  matchId === match._id && match.awayTeam === teamName);
            if (homeResult) {
                return calcCurrentStats(acc, homeResult.homeGoals!, homeResult.awayGoals!);
            } else if (awayResult) {
                return calcCurrentStats(acc, awayResult!.awayGoals!, awayResult!.homeGoals!);
            }
            return acc;
        }, initialStats);
    });

    return  (
        <GroupTable teams={tableTeams}></GroupTable>
    );
};

function calcPoints(goalDifference: number): number {
    if (goalDifference > 0) return 3;
    if (goalDifference < 0 ) return 0;
    return 1;
}

// Add new match stats to table stats
function calcCurrentStats(prev: IGroupTableTeam, matchGoalsFor: number, matchGoalsAgainst: number): IGroupTableTeam {
    const goalDifference = matchGoalsFor - matchGoalsAgainst;
    const points = calcPoints(goalDifference);
    
    return {
        name: prev.name,
        played: prev.played + 1,
        points: prev.points + points,
        goalsFor: prev.goalsFor + matchGoalsFor,
        goalsAgainst: prev.goalsAgainst + matchGoalsAgainst,
        goalDifference: prev.goalDifference + goalDifference,
        wins: prev.wins + (points === 3 ? 1 : 0),
        draws: prev.draws + (points === 1 ? 1 : 0),
        losses: prev.losses + (points === 0 ? 1 : 0),
    };
}

export default BetGroupTable;