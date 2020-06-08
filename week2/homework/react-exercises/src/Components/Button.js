import React from 'react';
// import DogGallery from './DogGallery';

export default function Button({onClick, title}) {
  return (
    <div>
      <button className="my-button-class" style={{ padding: '10px' }} onClick={onClick}>
        Get a {title}
      </button>
    </div>
    
  );
}