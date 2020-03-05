import React from 'react';
import { MatchBet } from '../../api/BetService';
import { Match } from '../../api/MatchService';
import GroupTable, { GroupTableTeam } from '../Standings/GroupTable';

type BetGroupTableProps = {
    bet: MatchBet[];
    matches: Match[];
};

const BetGroupTable: React.FC<BetGroupTableProps> = (props: BetGroupTableProps) => {
    // Assume every team has at least one match at home
    const teams = [...new Set<string>(props.matches.map((match) => match.homeTeam))];

    const tableTeams: GroupTableTeam[] = teams.map((teamName) => {
        return props.matches.reduce((acc, match) => {
            const homeResult = props.bet.find(({ matchId }) =>  matchId === match._id && match.homeTeam === teamName);
            const awayResult = props.bet.find(({ matchId }) =>  matchId === match._id && match.awayTeam === teamName);
            if (homeResult) {
                return calcCurrentStats(acc, homeResult.homeGoals!, homeResult.awayGoals!);
            } else if (awayResult) {
                return calcCurrentStats(acc, awayResult!.awayGoals!, awayResult!.homeGoals!);
            }
            return acc;
        }, { name: teamName, played: 0, points: 0, goalsFor: 0, goalsAgainst: 0 } as GroupTableTeam);
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
function calcCurrentStats(prev: GroupTableTeam, matchGoalsFor: number, matchGoalsAgainst: number): GroupTableTeam {
    return {
        name: prev.name,
        played: prev.played + 1,
        points: prev.points + calcPoints(matchGoalsFor - matchGoalsAgainst),
        goalsFor: prev.goalsFor + matchGoalsFor,
        goalsAgainst: prev.goalsAgainst + matchGoalsAgainst,
    };
}

export default BetGroupTable;