import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import '../css/LandingPage.css'; 
import NavigationMenu from './NavigationMenu';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleFormSubmit = (event) => {
        event.preventDefault();
    };

return (
    <div className='container'>
        <NavigationMenu />
        <h1>Welcome to FantasyFour</h1>
        <form onSubmit={handleFormSubmit}>
            <label>Email:
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </label>
            <br />
            <label>Password:
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </label>
            <br />
            <button type="submit">Log in</button>
        </form>
        <Link to="/create_team" id='link'>Go to the team creation page</Link>
    </div>
);
};

export default LoginPage;