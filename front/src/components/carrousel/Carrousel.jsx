import React, { useState, useEffect } from 'react';
import './carrousel.css';

const Carrousel = ({ images }) => {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 3000);

    return () => clearInterval(intervalId);
  }, [images]);

  if (!images || images.length === 0) {
    return null;
  }

  return (
    <div className="carousel">
      <div className="slides">
        {images.map((image, index) => (
          <div
            key={index}
            className={`slide ${index === currentImage ? 'active' : ''}`}
          >
            <img src={image} alt={`Slide ${index + 1}`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carrousel;
