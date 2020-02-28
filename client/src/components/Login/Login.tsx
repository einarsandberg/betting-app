import React from 'react';
import './Login.css';
import { useState } from 'react';
import useKey from '../../hooks/useKey';

type LoginProps = {
    login: (userName: string, password: string) => void;
}

const Login: React.FC<LoginProps> = (props: LoginProps) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const enterPressed = useKey('ENTER');
    
    if (enterPressed) {
        props.login(email, password);
    }

    return (
        <div className="Login">
            <div className="Login-background"></div>
            <div className="Login-form">
                <input 
                    className="Login-form__field" 
                    type="text" 
                    placeholder="Email"
                    onChange={(e): void => setEmail(e.target.value)}
                ></input>
                <input 
                    className="Login-form__field" 
                    type="password" 
                    placeholder="Password"
                    onChange={(e): void => setPassword(e.target.value)}
                ></input>
                <div 
                    className="Login-form__submit"
                    onClick={(): void => props.login(email, password)}
                >
                    Login
                </div>
            </div>
        </div>
    );
};
    
export default Login;
