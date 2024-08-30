import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/LandingPage.css';
import BackgroundImageRotator from './BackgroundImageRotator';
import NavigationMenu from './NavigationMenu';

const LandingPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!username || !email || !password) {
      alert('Please fill in all fields');
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          email: email,
          password: password,
        }),
      });

      if (response.ok) {
        const data = response.json();

        // Show success message as an alert
        alert(data.message);

        // Optionally, you can also handle the user data here
        console.log(data.user);
      } else {
        const errorData = await response.json();
        console.error('Server responded with:', errorData);
        alert('Registration failed: ' + (errorData.message || 'Please try again.'));
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again later.');
    }
  };

  return (
    <>
      <NavigationMenu />
      <BackgroundImageRotator>
        <h1 style={{ fontSize: '70px'}}>Welcome to FantasyFour</h1>
        <h3>Feel free to register and enjoy the game!</h3>
        <form onSubmit={handleFormSubmit}>
          <label>Username:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
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