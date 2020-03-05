import React, { useState } from 'react';
import { Match } from '../../api/MatchService';
import BetGroup from './BetGroup';
import './Bet.css';
import BetService, { MatchBet } from '../../api/BetService';
import { useEffect } from 'react';
import BetGroupTable from './BetGroupTable';

const betService = new BetService();

type BetProps = {
    groups: {
        [key: string]: Match[];
    };
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
    
    const validBet = bet.filter((matchBet) => matchBet.homeGoals !== undefined && matchBet.awayGoals !== undefined);
    
    const elements = Object.keys(props.groups).map((groupName: string) => {
        return ( 
            <div key={`group${groupName}`}>
                <BetGroup 
                    currentBet={bet} 
                    matches={props.groups[groupName]} 
                    updateBet={updateBet}
                />
                <BetGroupTable
                    bet={validBet}
                    matches={props.groups[groupName]}
                />
            </div>
        );
    });
    return (
        <div className="Bet">
            { elements }
            <div className="Bet__submit" onClick={submitBet}>Save</div>
        </div>
    );
};
    
export default Bet;