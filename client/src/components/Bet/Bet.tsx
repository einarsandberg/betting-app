import React, { useState } from 'react';
import { Match } from '../../api/MatchService';
import Round from './Round';
import './Bet.css';
import BetService, { MatchBet } from '../../api/BetService';
const betService = new BetService();
type BetProps = {
    matches: Match[];
};

const Bet: React.FC<BetProps> = (props: BetProps) => {
    const [bet, setBet] = useState<MatchBet[]>([]);
    
    const updateBet = (matchBet: MatchBet): void => {
        setBet((prevBet: MatchBet[]) => {
            const currentBet = [ ...prevBet ];
            const index = currentBet.map(({ matchId }) => matchId).indexOf(matchBet.matchId);
            if (index === -1 ) {
                currentBet.push(matchBet);
            } else {
                currentBet[index] = { ...currentBet[index], ...matchBet };
            }
            return currentBet;
        });
    };

    const submitBet = (): void => {
        betService.placeBet(bet);
    };
    
    const rounds = props.matches.reduce((acc: Match[][], curr: Match) => {
        acc[curr.round] = acc[curr.round] || [];
        acc[curr.round].push(curr);
        return acc;
    }, []);

    const roundEls = rounds.map((matches: Match[], i) => <Round key={'round' + i} matches={matches} updateBet={updateBet}/>);
    return (
        <div className="Bet">
            { roundEls }
            <div className="Bet__submit" onClick={submitBet}>Submit</div>
        </div>
    );
};
    
export default Bet;