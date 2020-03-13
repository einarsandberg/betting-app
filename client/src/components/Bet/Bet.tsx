import React, { useState } from 'react';
import { IMatch } from '../../api/MatchService';
import BetGroup from './BetGroup';
import './Bet.css';
import BetService, { IMatchBet } from '../../api/BetService';
import { useEffect } from 'react';
import BetGroupTable from './BetGroupTable';

const betService = new BetService();

type BetProps = {
    groups: {
        [key: string]: IMatch[];
    };
};

const Bet: React.FC<BetProps> = (props: BetProps) => {
    const [bet, setBet] = useState<IMatchBet[]>([]);
    
    const updateBet = (matchBet: IMatchBet): void => {
        setBet((prevBet: IMatchBet[]) => {
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
            <div className="Bet__group-wrapper" key={`group${groupName}`}>
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