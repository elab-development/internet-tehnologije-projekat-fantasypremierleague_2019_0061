import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import '../css/LandingPage.css'; 
import BackgroundImageRotator from './BackgroundImageRotator';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleFormSubmit = (event) => {
        event.preventDefault();
    };

return (
    <BackgroundImageRotator>
        <h1 style={{fontSize: '70px'}}>Welcome to FantasyFour</h1>
        <form onSubmit={handleFormSubmit}>
    
        <label>
          Email:
          
        </label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <br />
        <label>
          Password:
          
        </label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <br />
        <button type="submit" id='register-button'>Login</button>
        </form>
        <Link to="/create_team" id='link'>Go to the team creation page</Link>
    </BackgroundImageRotator>
);
};

export default LoginPage;