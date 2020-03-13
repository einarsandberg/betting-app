import React, { useState } from 'react';
import './App.css';
import Login from './Login/Login';
import AuthService, { IUser } from '../api/AuthService';
import { useEffect } from 'react';
import Home from './Home';

const authService = new AuthService();

const App: React.FC = () => {

    const [isAuthorized, setIsAuthorized] = useState();
    const [currentUser, setCurrentUser] = useState({} as IUser);
    useEffect(() => {
        async function authUser(): Promise<void> {
            try {
                const res = await authService.auth();
                if (res.authorized) {
                    setCurrentUser(res.user);
                }
                setIsAuthorized(res.authorized);
            } catch(err) {
                setIsAuthorized(false);
            }
        }
        authUser();
    }, []);

    const login = async (email: string, password: string): Promise<void> => {
        try  {
            const res = await authService.login(email, password);
            if (res.authorized) {
                setCurrentUser(res.user);
                setIsAuthorized(true);
            } else {
                setIsAuthorized(false);
            }
        }
        catch {
            setIsAuthorized(false);
        }
    };

    return (
        <div className="App">
            { !isAuthorized ? 
                <Login login={login} />
                : <Home user={currentUser} />
            }
        </div>
    );
};

export default App;
