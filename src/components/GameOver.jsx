import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/GameOver.css';

const GameOver = () => {
  // Declare and initialize the 'highScore' state variable.
  const [highScore, setHighScore] = useState(0);

  // The `useNavigate` hook returns a function that lets you navigate programmatically.
  const navigate = useNavigate();

  // This effect hook updates the value aligned to the 'session-high-score' key in localStorage...
  // and assigns the appropriate value to the 'highScore' state variable.
  useEffect(() => {
    // Retrieve the latest score from localStorage and convert it to a number.
    const latestScore = +localStorage.getItem(
      'eight-bit-challenge-current-points-tracker'
    );
    // Retrieve the session-high score from localStorage and convert it to a number.
    let sessionHighScore = +localStorage.getItem(
      'eight-bit-challenge-session-high-score'
    );

    // If there is no 'session-high-score' key or its value is less than latestScore, set the value...
    // of 'session-high-score' to be latestScore (+) update the 'highScore' state variable.
    if (!sessionHighScore || latestScore > sessionHighScore) {
      localStorage.setItem(
        'eight-bit-challenge-session-high-score',
        latestScore
      );
      setHighScore(latestScore);
    } else {
      // Otherwise, update the 'highScore' state variable.
      setHighScore(sessionHighScore);
    }
  }, []);

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
      {highScore ? (
        <div className='GameOver-score-summary'>
          <h3>
            Final Score:{' '}
            {localStorage.getItem('eight-bit-challenge-current-points-tracker')}
          </h3>
          <h3>Session-high Score: {highScore}</h3>
        </div>
      ) : null}
    </div>
  );
};

export default GameOver;
