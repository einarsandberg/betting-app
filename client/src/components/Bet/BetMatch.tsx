import React, { ChangeEvent } from 'react';
import { IMatchBet} from '../../api/BetService';
import './BetMatch.css';

interface BetMatchProps {
    matchId: string;
    homeTeam: string;
    awayTeam: string;
    updateBet: (bet: IMatchBet) => void;
    currentBet?: IMatchBet;
};

const BetMatch: React.FC<BetMatchProps> = (props: BetMatchProps) => {

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const bet = {} as IMatchBet;
        let value: number | undefined;
        if(!isNaN(parseInt(e.target.value))) {
            value = parseInt(e.target.value);
        }

        if (e.target.name === 'home') {
            bet.homeGoals = value;
        } else {
            bet.awayGoals = value;
        }
        bet.matchId = props.matchId;
        props.updateBet(bet);
    };
    
    return (
        <div className="BetMatch">
            <div className="BetMatch__teams">
                <span className="teams__home" title={props.homeTeam}>
                    { props.homeTeam }
                </span>
                <span> - </span>
                <span className="teams__away" title={props.awayTeam}>
                    { props.awayTeam }
                </span>
            </div>
            <div className="BetMatch__goals">
                <input 
                    className="goals__input"
                    type="number"
                    name="home"
                    min="0"
                    value={props.currentBet?.homeGoals !== undefined ? props.currentBet?.homeGoals : ''}
                    onChange={handleInputChange}
                ></input>
                <span>-</span>
                <input 
                    className="goals__input"
                    type="number"
                    name="away"
                    min="0"
                    value={props.currentBet?.awayGoals !== undefined ? props.currentBet?.awayGoals : ''}
                    onChange={handleInputChange}
                ></input>
            </div>
            
        </div>
    );
};
    
export default BetMatch;