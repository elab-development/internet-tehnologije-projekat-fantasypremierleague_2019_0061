import React, { useState, useEffect } from 'react';

const BackgroundImageRotator = ({children}) => {
  const [currentImage, setCurrentImage] = useState(0);

  const images = [
    'photos/image1.jpeg',
    'photos/image2.jpeg',
    'photos/image3.jpeg',
    'photos/image4.jpeg',
    'photos/image5.jpeg',
    'photos/image6.jpg',
    'photos/image7.jpg'
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 5000);

    return () => clearInterval(intervalId);
  }, [images.length]);

  const backgroundStyle = {
    backgroundImage: `url(${images[currentImage]})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    minHeight: '100vh',
    transition: 'background-image 1s ease-in-out'
  };

  return (
    <div style={backgroundStyle} className='container'>
      {children}
    </div>
  );
};

export default BackgroundImageRotator;