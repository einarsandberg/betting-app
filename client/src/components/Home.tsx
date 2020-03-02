import React, { useState } from 'react';
import { User } from '../api/AuthService';
import { useEffect } from 'react';
import MatchService, { Match, MatchResult } from '../api/MatchService';
import Bet from './Bet/Bet';
import './Home.css';
const matchService = new MatchService();

type HomeProps = {
    user: User;
}

const Home: React.FC<HomeProps> = (props: HomeProps) => {
    const [matches, setMatches] = useState<Match[]>([]);
    const [bet, setBet] = useState<MatchResult[]>([]);

    useEffect(() => {
        async function getMatches(): Promise<void> {
            try {
                const matches = await matchService.getMatches();
                setMatches(matches);
            } catch(err) {
                //
            }
        }
        getMatches();
    }, []);

    return (
        <div className="Home">
            <Bet matches={matches} setBet={setBet} />
        </div>
    );
};
    
export default Home;