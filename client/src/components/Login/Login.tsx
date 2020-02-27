import React from 'react';
import './Login.css';

const Login: React.FC = () => {
    return (
        <div className="Login">
            <div className="Login-background"></div>
            <div className="Login-form">
                <input type="text" placeholder="Email" className="Login-form__field"></input>
                <input type="password" placeholder="Password" className="Login-form__field"></input>
                <div className="Login-form__submit">Login</div>
            </div>
        </div>
    );
};
    
export default Login;
