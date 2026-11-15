import React, { useEffect, useRef, useState } from 'react';
import '../styles/Timer.css';

/*
 * Monotonic Round Countdown
 * ---------------------------------------------------------------------------
 * Anchors each round's deadline to performance.now() rather than chaining
 * 1000ms timeouts so background throttling never causes clock drift or a
 * 1-second lag at 0 before triggering expiration.
 */
const Timer = ({ seconds, points, onExpire }) => {
  const [secondsRemaining, setSecondsRemaining] = useState(seconds);
  const deadlineMsRef = useRef(performance.now() + seconds * 1000);
  const expiredRef = useRef(false);
  const onExpireRef = useRef(onExpire);

  useEffect(() => {
    onExpireRef.current = onExpire;
  }, [onExpire]);

  useEffect(() => {
    deadlineMsRef.current = performance.now() + seconds * 1000;
    expiredRef.current = false;
    setSecondsRemaining(seconds);

    const intervalId = setInterval(() => {
      const remainingMs = deadlineMsRef.current - performance.now();
      const nextSeconds = Math.max(0, Math.ceil(remainingMs / 1000));
      setSecondsRemaining(nextSeconds);

      if (remainingMs <= 0 && !expiredRef.current) {
        expiredRef.current = true;
        clearInterval(intervalId);
        onExpireRef.current();
      }
    }, 100);

    return () => clearInterval(intervalId);
  }, [seconds, points]);

  const isUrgent = secondsRemaining > 0 && secondsRemaining <= 5;

  return (
    <div
      className='Timer'
      data-urgent={isUrgent ? 'true' : 'false'}
      aria-label={`${secondsRemaining} seconds remaining`}
    >
      <time>{secondsRemaining}</time>
    </div>
  );
};

export default Timer;
