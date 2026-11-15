import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PointsAndTimerRow from './components/PointsAndTimerRow';
import Byte from './components/Byte';
import PowersOfTwo from './components/PowersOfTwo';
import AnswerChoices from './components/AnswerChoices';
import {
  generateAllPossibleEightBitBinarySequences,
  generateIncorrectAnswerChoices,
  getRoundDurationSeconds,
  produceRandomSelectionOrder
} from './utils';
import './App.css';

// Precomputed 0..255 lookup table shared across rounds since binary sequences are immutable.
const EIGHT_BIT_MEGA_LIST = generateAllPossibleEightBitBinarySequences();

function App() {
  const [currentRound, setCurrentRound] = useState(0);
  const [selectionOrder] = useState(produceRandomSelectionOrder);
  const [eightBitSequence, setEightBitSequence] = useState(
    () => EIGHT_BIT_MEGA_LIST[selectionOrder[0]]
  );
  const [incorrectAnswers, setIncorrectAnswers] = useState(
    () => generateIncorrectAnswerChoices(selectionOrder[0])
  );
  const [seconds, setSeconds] = useState(() => getRoundDurationSeconds(0));

  // Prevents a simultaneous timer expiry and button/key press from double-navigating.
  const hasEndedRef = useRef(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = '8-bit Challenge';
    localStorage.setItem('eight-bit-challenge-current-points-tracker', '0');
  }, []);

  const endGame = useCallback(
    (route) => {
      if (hasEndedRef.current) return;
      hasEndedRef.current = true;
      navigate(route);
    },
    [navigate]
  );

  const handleExpire = useCallback(() => {
    endGame('/game-over');
  }, [endGame]);

  const handleAnswerSelection = useCallback(
    (selectedAnswer) => {
      if (hasEndedRef.current) return;

      if (selectedAnswer === selectionOrder[currentRound]) {
        const nextRound = currentRound + 1;
        localStorage.setItem(
          'eight-bit-challenge-current-points-tracker',
          String(nextRound)
        );

        if (nextRound === 256) {
          endGame('/victory');
          return;
        }

        setCurrentRound(nextRound);
        setEightBitSequence(EIGHT_BIT_MEGA_LIST[selectionOrder[nextRound]]);
        setIncorrectAnswers(
          generateIncorrectAnswerChoices(selectionOrder[nextRound])
        );
        setSeconds(getRoundDurationSeconds(nextRound));
      } else {
        endGame('/game-over');
      }
    },
    [currentRound, endGame, selectionOrder]
  );

  return (
    <main className='App'>
      <h1 className='visually-hidden'>The 8-bit Challenge</h1>
      <PointsAndTimerRow
        points={currentRound}
        seconds={seconds}
        onExpire={handleExpire}
      />
      <PowersOfTwo />
      <Byte binarySequence={eightBitSequence} />
      <AnswerChoices
        correctAnswer={selectionOrder[currentRound]}
        incorrectAnswerOne={incorrectAnswers[0]}
        incorrectAnswerTwo={incorrectAnswers[1]}
        handleAnswerSelection={handleAnswerSelection}
      />
    </main>
  );
}

export default App;
