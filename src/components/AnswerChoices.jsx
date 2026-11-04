import React, { useMemo } from 'react';
import AnswerChoice from './AnswerChoice';
import { shuffleArray } from '../utils';
import '../styles/AnswerChoices.css';
import waystonePortal from '../images/waystone-portal.webp';
import cyberpunkAlley from '../images/cyberpunk-alley.webp';
import mysticalForestPath from '../images/mystical-forest-path.webp';

const PORTAL_IMAGES = [cyberpunkAlley, waystonePortal, mysticalForestPath];

const AnswerChoices = ({
  correctAnswer,
  incorrectAnswerOne,
  incorrectAnswerTwo,
  handleAnswerSelection
}) => {
  // Keep render pure; only reshuffle when the round's answer set changes.
  const shuffledChoices = useMemo(() => {
    const shuffledValues = shuffleArray([
      correctAnswer,
      incorrectAnswerOne,
      incorrectAnswerTwo
    ]);

    return shuffledValues.map((decimalValue, index) => ({
      decimalValue,
      image: PORTAL_IMAGES[index]
    }));
  }, [correctAnswer, incorrectAnswerOne, incorrectAnswerTwo]);

  return (
    <div className='AnswerChoices'>
      <div className='AnswerChoices-user-direction'>
        <p>Evaluate the 8-bit binary sequence, then choose the correct path.</p>
      </div>
      <div className='AnswerChoice-wrapper'>
        {shuffledChoices.map((choice, index) => (
          <div key={index} className={`AnswerChoice${index + 1}`}>
            <AnswerChoice
              decimalValue={choice.decimalValue}
              image={choice.image}
              handleAnswerSelection={handleAnswerSelection}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnswerChoices;
