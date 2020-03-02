import React, { useState } from 'react';
import { Match } from '../../api/MatchService';
import Round from './Round';
import './Bet.css';
import BetService, { MatchBet } from '../../api/BetService';
import { useEffect } from 'react';

const betService = new BetService();

type BetProps = {
    rounds: Match[][];
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
    
    useEffect(() => {
        async function getBet(): Promise<void> {
            try {
                const bet = await betService.getBet();
                setBet(bet);
            } catch(err) {
                //
            }
        }
        
        getBet();
        
    }, []);

    const roundEls = props.rounds.map((matches, i) => {
        return ( 
            <Round 
                key={'round' + i} 
                currentBet={bet} 
                matches={matches} 
                updateBet={updateBet}
            /> );
    });
    return (
        <div className="Bet">
            { roundEls }
            <div className="Bet__submit" onClick={submitBet}>Submit</div>
        </div>
    );
};
    
export default Bet;