import React, { useCallback, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { shouldIgnoreKeyEvent } from '../utils';
import '../styles/Victory.css';

const Victory = () => {
  const headingRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Victory | 8-bit Challenge';
    headingRef.current?.focus();

    localStorage.setItem('eight-bit-challenge-session-high-score', '256');
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
    <main className='Victory'>
      <div className='Victory-title'>
        <h1 ref={headingRef} tabIndex={-1}>
          Victory
        </h1>
      </div>
      <div className='Victory-message'>
        <p>Congratulations anon, you've completed the 8-bit challenge.</p>
      </div>
      <div className='Victory-button'>
        <button
          type='button'
          className='ActionButton'
          onClick={handlePlayAgain}
          aria-keyshortcuts='r'
        >
          play again
        </button>
      </div>
      <p className='KeyboardLegend' aria-hidden='true'>
        <kbd>R</kbd> play again · <kbd>T</kbd> theme
      </p>
    </main>
  );
};

export default Victory;
