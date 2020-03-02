import React from 'react';
import { Match, MatchResult } from '../../api/MatchService';
import Round from './Round';
import './Bet.css';
type BetProps = {
    matches: Match[];
    setBet: React.Dispatch<React.SetStateAction<MatchResult[]>>;
};

const Bet: React.FC<BetProps> = (props: BetProps) => {
    
    const rounds = props.matches.reduce((acc: Match[][], curr: Match) => {
        acc[curr.round] = acc[curr.round] || [];
        acc[curr.round].push(curr);
        return acc;
    }, []);

    const roundEls = rounds.map((matches: Match[], i) => <Round key={'round' + i} matches={matches} setBet={props.setBet}/>);
    return (
        <div className="Bet">
            { roundEls }
        </div>
    );
};
    
export default Bet;