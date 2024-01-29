import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../css/LandingPage.css';
import CurrentGameDataField from './CurrentGameDataField';
import BackgroundImageRotator from './BackgroundImageRotator';

const LandingPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
 
  const handleFormSubmit = (event) => {
    event.preventDefault();
  };

  return (
    
    <BackgroundImageRotator>

      <h1>Welcome to FantasyFour</h1>
      <form onSubmit={handleFormSubmit}>
        <label>
          Name:
        </label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        <br />
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
        <button type="submit" id='register-button'>Register</button>
      </form>
      <div id='game-data'>
      </div>
      <Link to="/login" id='link'>
        Go to the login page
      </Link>

    </BackgroundImageRotator>
    
  );
};

export default LandingPage;