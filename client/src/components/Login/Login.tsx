import React from 'react';
import './Login.css';
import { useState } from 'react';

interface ILoginProps {
    login: (userName: string, password: string) => void;
}

const Login: React.FC<ILoginProps> = (props: ILoginProps) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        props.login(email, password);
    };

    return (
        <div className="Login">
            <div className="Login-background"></div>
            <form className="Login-form" onSubmit={handleSubmit}>
                <input 
                    className="Login-form__field" 
                    type="text" 
                    placeholder="Email"
                    onChange={(e): void => setEmail(e.target.value)}
                />
                <input 
                    className="Login-form__field" 
                    type="password" 
                    placeholder="Password"
                    onChange={(e): void => setPassword(e.target.value)}
                />
                <input
                    type="submit"
                    value="Login"
                    className="Login-form__submit"
                />
            </form>
        </div>
    );
};
    
export default Login;
