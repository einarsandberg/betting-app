import React from 'react';
import { Match } from '../../api/MatchService';
import BetMatch from './BetMatch';
import './Round.css';
import { MatchBet } from '../../api/BetService';
type RoundProps = {
    matches: Match[];
    currentBet: MatchBet[];
    updateBet: (bet: MatchBet) => void;
};

const Round: React.FC<RoundProps> = (props: RoundProps) => {
    
    const matches = props.matches.map((match) => {
        return (
            <BetMatch 
                key={match._id}
                matchId={match._id}
                homeTeam={match.homeTeam}
                awayTeam={match.awayTeam}
                updateBet={props.updateBet}
                currentBet={props.currentBet.find(({ matchId }) => matchId === match._id)}
            ></BetMatch>
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