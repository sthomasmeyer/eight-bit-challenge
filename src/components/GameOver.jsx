import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/GameOver.css';

const GameOver = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/');
  };

  return (
    <div className='GameOver'>
      <div className='GameOver-title'>
        <h1>Game Over</h1>
      </div>
      <div className='GameOver-button'>
        <button onClick={handleClick}>play again</button>
      </div>
      <div className='GameOver-message'>
        <p>Perseverance is the key to victory, anon.</p>
      </div>
    </div>
  );
};

export default GameOver;
