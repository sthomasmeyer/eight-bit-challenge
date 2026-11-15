import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { shouldIgnoreKeyEvent } from '../utils';
import '../styles/GameOver.css';

const GameOver = () => {
  const [finalScore, setFinalScore] = useState(null);
  const [highScore, setHighScore] = useState(null);
  const headingRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Game Over | 8-bit Challenge';
    headingRef.current?.focus();

    const rawLatest = localStorage.getItem(
      'eight-bit-challenge-current-points-tracker'
    );
    const latestScore = rawLatest !== null ? Number(rawLatest) : 0;
    const rawHigh = localStorage.getItem('eight-bit-challenge-session-high-score');
    const savedHighScore = rawHigh !== null ? Number(rawHigh) : null;

    setFinalScore(latestScore);

    if (savedHighScore === null || latestScore > savedHighScore) {
      localStorage.setItem(
        'eight-bit-challenge-session-high-score',
        String(latestScore)
      );
      setHighScore(latestScore);
    } else {
      setHighScore(savedHighScore);
    }
  }, []);

  const handlePlayAgain = useCallback(() => {
    navigate('/');
  }, [navigate]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (shouldIgnoreKeyEvent(event)) return;

      if (event.key.toLowerCase() === 'r') {
        event.preventDefault();
        handlePlayAgain();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handlePlayAgain]);

  return (
    <main className='GameOver'>
      <div className='GameOver-title'>
        <h1 ref={headingRef} tabIndex={-1}>
          Game Over
        </h1>
      </div>
      <div className='GameOver-button'>
        <button
          type='button'
          className='ActionButton'
          onClick={handlePlayAgain}
          aria-keyshortcuts='r'
        >
          play again
        </button>
      </div>
      {finalScore !== null && highScore !== null ? (
        <section className='GameOver-score-summary' aria-label='Score summary'>
          <h2>Final Score: {finalScore}</h2>
          <p className='GameOver-high-score'>Local High Score: {highScore}</p>
        </section>
      ) : null}
      <p className='KeyboardLegend' aria-hidden='true'>
        <kbd>R</kbd> play again · <kbd>T</kbd> theme
      </p>
    </main>
  );
};

export default GameOver;
