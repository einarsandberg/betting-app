import React from 'react';
import { Match, MatchResult } from '../../api/MatchService';
import MatchBet from './Match';
import './Round.css';
type RoundProps = {
    matches: Match[];
    setBet: React.Dispatch<React.SetStateAction<MatchResult[]>>;
};

const Round: React.FC<RoundProps> = (props: RoundProps) => {
    
    const matches = props.matches.map((match) => {
        return (
            <MatchBet 
                key={match._id}
                homeTeam={match.homeTeam}
                awayTeam={match.awayTeam}
                setBet={props.setBet}
            ></MatchBet>
        );
    });
    return (
        <div className="Round">
            <div className="Round__header">Round { props.matches[0].round } </div>
            <div  className="Round__matches">{ matches }</div>
        </div>
    );
};
    
export default Round;