import React, { useState } from 'react';
import { Match, MatchResult } from '../../api/MatchService';
import Round from './Round';
import './Bet.css';

type BetProps = {
    matches: Match[];
};

const Bet: React.FC<BetProps> = (props: BetProps) => {
    const [bet, setBet] = useState<MatchResult[]>([]);
    
    const rounds = props.matches.reduce((acc: Match[][], curr: Match) => {
        acc[curr.round] = acc[curr.round] || [];
        acc[curr.round].push(curr);
        return acc;
    }, []);

    const roundEls = rounds.map((matches: Match[], i) => <Round key={'round' + i} matches={matches} setBet={setBet}/>);
    return (
        <div className="Bet">
            { roundEls }
            <div className="Bet__submit">Submit</div>
        </div>
    );
};
    
export default Bet;