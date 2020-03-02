import React, { useState } from 'react';
import { User } from '../api/AuthService';
import { useEffect } from 'react';
import MatchService, { Match } from '../api/MatchService';
import Bet from './Bet/Bet';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';
import './Home.css';
const matchService = new MatchService();

type HomeProps = {
    user: User;
}

const Home: React.FC<HomeProps> = (props: HomeProps) => {
    const [matches, setMatches] = useState<Match[]>([]);

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

    const rounds = matches.reduce((acc: Match[][], curr: Match) => {
        acc[curr.round] = acc[curr.round] || [];
        acc[curr.round].push(curr);
        return acc;
    }, []);

    return (
        <Router>
            <div className="Home">
                <Switch>
                    <Route path="/bet">
                        <Bet rounds={rounds} />
                    </Route>
                    <Route path="/">
                        Welcome { props.user.firstName }
                    </Route>
                </Switch>
            </div>
        </Router>
    );
};
    
export default Home;