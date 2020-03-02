import React from 'react';
import { MatchResult } from '../../api/MatchService';
import './Match.css';

type MatchProps = {
    homeTeam: string;
    awayTeam: string;
    setBet: React.Dispatch<React.SetStateAction<MatchResult[]>>;
};

const Match: React.FC<MatchProps> = (props: MatchProps) => {
    return (
        <div className="Match">
            <div className="Match__teams">
                <span className="teams__home" title={props.homeTeam}>
                    { props.homeTeam }
                </span>
                <span> - </span>
                <span className="teams__away" title={props.awayTeam}>
                    { props.awayTeam }
                </span>
            </div>
            <input className="Match__goals-input" type="text"></input>
            <span>-</span>
            <input className="Match__goals-input" type="text"></input>
            
        </div>
    );
};
    
export default Match;