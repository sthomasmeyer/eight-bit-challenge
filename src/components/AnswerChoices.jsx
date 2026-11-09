import React, { useMemo } from 'react';
import AnswerChoice from './AnswerChoice';
import { shuffleArray } from '../utils';
import '../styles/AnswerChoices.css';

const AnswerChoices = ({
  correctAnswer,
  incorrectAnswerOne,
  incorrectAnswerTwo,
  handleAnswerSelection
}) => {
  // Shuffle once per round so re-renders don't reorder the choices.
  const shuffledValues = useMemo(() => {
    return shuffleArray([
      correctAnswer,
      incorrectAnswerOne,
      incorrectAnswerTwo
    ]);
  }, [correctAnswer, incorrectAnswerOne, incorrectAnswerTwo]);

  return (
    <div className='AnswerChoices'>
      <div className='AnswerChoices-user-direction'>
        <p>Evaluate the 8-bit binary sequence and select its decimal value.</p>
      </div>
      <div className='AnswerChoice-wrapper'>
        {shuffledValues.map((decimalValue, index) => (
          <div key={index} className={`AnswerChoice${index + 1}`}>
            <AnswerChoice
              index={index + 1}
              decimalValue={decimalValue}
              handleAnswerSelection={handleAnswerSelection}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnswerChoices;
