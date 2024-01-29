import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../css/LandingPage.css';
import NavigationMenu from './NavigationMenu';
import CurrentGameDataField from './CurrentGameDataField';

const LandingPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [currentImage, setCurrentImage] = useState(0);

  const images = [
    'photos/image1.jpeg',
    'photos/image2.jpeg',
    'photos/image3.jpeg',
    'photos/image4.jpeg',
    'photos/image5.jpeg',
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      // Update the current image index every 5 seconds
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 5000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [images.length]);

  const backgroundStyle = {
    backgroundImage: `url(${images[currentImage]})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    minHeight: '100vh',
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
  };

  return (
    
    <div className="container" style={backgroundStyle}>
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
      <div id='game-data'>
      </div>
      <Link to="/login" id='link'>
        Go to the login page
      </Link>
    </div>
  );
};

export default LandingPage;