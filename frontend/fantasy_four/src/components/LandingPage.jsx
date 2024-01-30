import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/LandingPage.css';
import BackgroundImageRotator from './BackgroundImageRotator';
import NavigationMenu from './NavigationMenu';
 
const LandingPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
 
  const handleFormSubmit = (event) => {
    event.preventDefault();
 
    if (!name || !email || !password) {
      alert('Please fill in all fields');
      return;
    }
    alert('Form submitted successfully!');
  };
 
  return (
    <>
    <NavigationMenu></NavigationMenu>
    <BackgroundImageRotator>
    
      <h1 style={{ fontSize: '70px'}}>Welcome to FantasyFour</h1>
      <h3>Feel free to register and enjoy the game!</h3>
      <form onSubmit={handleFormSubmit}>
        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        <br />
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <br />
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <br />
        <button type="submit" id='register-button'>
          Register
        </button>
      </form>
     
      <Link to="/login" id='link'>
        I already have an account, go to the login page
      </Link>
    </BackgroundImageRotator>
    </>
  );
};
 
export default LandingPage;