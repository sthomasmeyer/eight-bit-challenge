import React, { useState, useEffect } from 'react';
import PropType from 'prop-types';
import { useNavigate } from 'react-router-dom';
import '../styles/Timer.css';
import { Navigate } from 'react-router-dom';

/**
 * This component is a countdown timer that takes in a number of seconds as a prop and updates...
 * every second until it reaches zero. It employs the 'useState' and 'useEffect' hooks from React...
 * to manage state and set-up the countdown interval.
 */
const Timer = ({ seconds, points }) => {
  // Initialize a 'secondsRemaining' state variable, w/ an initial value based on the 'seconds' prop.
  const [secondsRemaining, setSecondsRemaining] = useState(seconds);
  // Initialize a 'prevPoints' state variable to determine whether the user selected the correct answer.
  const [prevPoints, setPrevPoints] = useState(0);
  // The 'useNavigate' hook returns a function that lets you navigate programmatically.
  const navigate = useNavigate();

  useEffect(() => {
    const countdown = setTimeout(() => {
      if (secondsRemaining > 0) {
        setSecondsRemaining(secondsRemaining - 1);
      } else if (secondsRemaining === 0) {
        navigate('/game-over');
      }
    }, 1000);

    return () => clearTimeout(countdown);
  }, [secondsRemaining]);

  // Watch for changes in the `points` prop and reset the timer if the number of points increases.
  useEffect(() => {
    if (points > prevPoints) {
      setSecondsRemaining(seconds);
      setPrevPoints(points);
    }
  }, [points]);

  return (
    <div className='Timer'>
      <time>{secondsRemaining}</time>
    </div>
  );
};

Timer.propTypes = {
  seconds: PropType.number.isRequired,
  points: PropType.number.isRequired
};

export default Timer;
