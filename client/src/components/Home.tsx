import React, { useState } from 'react';
import { IUser } from '../api/AuthService';
import { useEffect } from 'react';
import MatchService, { IMatch } from '../api/MatchService';
import Bet from './Bet/Bet';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';
import './Home.css';
const matchService = new MatchService();

interface IHomeProps {
    user: IUser;
}

const Home: React.FC<IHomeProps> = (props: IHomeProps) => {
    const [matches, setMatches] = useState<IMatch[]>([]);

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

    const groups = matches.reduce((acc: { [key: string]: IMatch[]; }, curr: IMatch) => {
        acc[curr.group] = acc[curr.group] || [];
        acc[curr.group].push(curr);
        return acc;
    }, {});

    return (
        <Router>
            <div className="Home">
                <Switch>
                    <Route path="/bet">
                        <Bet groups={groups} />
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