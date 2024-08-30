import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/LandingPage.css'; 
import BackgroundImageRotator from './BackgroundImageRotator';

const LoginPage = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('http://localhost:8000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ login, password }),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage(`Login successful! ${data.message}`);
                localStorage.setItem('token', data.token);
                localStorage.setItem('username', data.username); 
                navigate('/create_team');
            } else {
                setMessage(`Login failed: ${data.message}`);
            }
        } catch (error) {
            setMessage('An error occurred while trying to log in.');
        }
    };

    return (
        <BackgroundImageRotator>
            <h1 style={{ fontSize: '70px' }}>Welcome to FantasyFour</h1>
            <h3>If you have already created an account, feel free to log in and play the game!</h3>
            <form onSubmit={handleFormSubmit}>
                <label>Email:</label>
                <input 
                    type="email" 
                    value={login} 
                    onChange={(e) => setLogin(e.target.value)} 
                    required
                />
                <br />
                <label>Password:</label>
                <input 
                    type="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required
                />
                <br />
                <button type="submit" id="register-button">Login</button>
            </form>
            {message && <p>{message}</p>}
            <Link to="/create_team" id="link">Go to the team creation page</Link>
        </BackgroundImageRotator>
    );
};

export default LoginPage;