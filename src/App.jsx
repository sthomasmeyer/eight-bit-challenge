import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PointsAndTimerRow from './components/PointsAndTimerRow';
import Byte from './components/Byte';
import PowersOfTwo from './components/PowersOfTwo';
import AnswerChoices from './components/AnswerChoices';
import {
  generateAllPossibleEightBitBinarySequences,
  generateIncorrectAnswerChoices,
  produceRandomSelectionOrder
} from './utils';
import './App.css';

// The 'eightBitMegaList' is a comprehensive, ordered list of 8-bit binary sequences that...
// represent the decimal numbers 0-255. It is incorporated as a constant, global variable...
// because it never changes.
const eightBitMegaList = generateAllPossibleEightBitBinarySequences();

function App() {
  // In v1 of the 8-bit Challenge, 'currentRound' refers to the game round that the player...
  // is in, from 0-255. Increment it every time that the player selects the correct answer...
  // Note, it's also eqaul to the number of points they've earned.
  const [currentRound, setCurrentRound] = useState(0);
  // The 'selectionOrder' state variable is a randomly-generated list of decimal numbers...
  // from 0-255. It's critical because each individual number represents not only the correct...
  // answer, but also the key index-position of the relevant 8-bit binary sequence.
  const [selectionOrder, setSelectionOrder] = useState(
    produceRandomSelectionOrder()
  );
  // This state variable represents the currently displayed 8-bit sequence that drives the game.
  const [eightBitSequence, setEightBitSequence] = useState(
    eightBitMegaList[selectionOrder[currentRound]]
  );
  // This state variable is a list that contains two randomly-generated incorrect answer choices.
  const [incorrectAnswers, setIncorrectAnswers] = useState(
    generateIncorrectAnswerChoices(selectionOrder[currentRound])
  );
  // This state variable represents the number of seconds the player has to select the correct answer.
  const [seconds, setSeconds] = useState(32);

  // The `useNavigate` hook returns a function that lets you navigate programmatically.
  const navigate = useNavigate();

  const handleAnswerSelection = (selectedAnswer) => {
    if (selectedAnswer === selectionOrder[currentRound]) {
      // Increment the current round.
      const nextRound = currentRound + 1;
      if (nextRound === 256) {
        return navigate('/victory');
      }
      setCurrentRound(nextRound);
      // Update the 8-bit sequence.
      setEightBitSequence(eightBitMegaList[selectionOrder[nextRound]]);
      setIncorrectAnswers(
        generateIncorrectAnswerChoices(selectionOrder[nextRound])
      );
      // Set the countdown-timer in seconds. Note, the time that player's have to make the...
      // conversion from binary to decimal gets increasingly shorter as the game progresses.
      if (nextRound < 8) {
        setSeconds(32);
      } else if (nextRound < 16) {
        setSeconds(24);
      } else if (nextRound < 24) {
        setSeconds(16);
      } else if (nextRound < 64) {
        setSeconds(8);
      } else {
        setSeconds(4);
      }
    } else {
      // If the user selects the wrong answer choice, the game is over.
      navigate('/game-over');
    }
  };

  return (
    <div className='App'>
      <PointsAndTimerRow points={currentRound} seconds={seconds} />
      <PowersOfTwo />
      <Byte binarySequence={eightBitSequence} />
      <AnswerChoices
        correctAnswer={selectionOrder[currentRound]}
        incorrectAnswerOne={incorrectAnswers[0]}
        incorrectAnswerTwo={incorrectAnswers[1]}
        handleAnswerSelection={handleAnswerSelection}
      />
    </div>
  );
}

export default App;
