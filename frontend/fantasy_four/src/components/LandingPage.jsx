import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/LandingPage.css'; // Import the CSS file
import NavigationMenu from './NavigationMenu';

const LandingPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleFormSubmit = (event) => {
    event.preventDefault();
    // Add logic to handle form submission (e.g., sending data to a server)
  };

  return (
    
    <div className="container">
      <NavigationMenu />
      <h1>Welcome to FantasyFour</h1>
      <form onSubmit={handleFormSubmit}>
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <br />
        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <br />
        <button type="submit">Register</button>
      </form>
      <Link to="/login" id='link'>
        Go to the login page
      </Link>
    </div>
  );
};

export default LandingPage;