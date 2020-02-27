import React from 'react';
import { User } from '../api/AuthService';
type HomeProps = {
    user: User;
}
const Home: React.FC<HomeProps> = (props: HomeProps) => {

    return (
        <div className="Home">
            Welcome {props.user.firstName}
        </div>
    );
};
    
export default Home;