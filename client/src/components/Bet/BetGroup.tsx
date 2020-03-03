import React from 'react';
import { Match } from '../../api/MatchService';
import BetMatch from './BetMatch';
import './BetGroup.css';
import { MatchBet } from '../../api/BetService';
type BetGroupProps = {
    matches: Match[];
    currentBet: MatchBet[];
    updateBet: (bet: MatchBet) => void;
};

const BetGroup: React.FC<BetGroupProps> = (props: BetGroupProps) => {
    
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
        <div className="BetGroup">
            <div className="BetGroup__header">Group { props.matches[0].group } </div>
            <div  className="BetGroup__matches">{ matches }</div>
        </div>
    );
};
    
export default BetGroup;