import React from 'react';
import AnswerChoice from './AnswerChoice';
import _ from 'lodash';
import PropTypes from 'prop-types';
import '../styles/AnswerChoices.css';
import waystonePortal from '../images/waystone-portal.png';
import cyberpunkAlley from '../images/cyberpunk-alley.png';
import mysticalForestPath from '../images/mystical-forest-path.png';

const AnswerChoices = ({
  correctAnswer,
  incorrectAnswerOne,
  incorrectAnswerTwo,
  handleAnswerSelection
}) => {
  const choices = [
    { decimalValue: correctAnswer },
    { decimalValue: incorrectAnswerOne },
    { decimalValue: incorrectAnswerTwo }
  ];

  const shuffledChoices = _.shuffle(choices);

  const images = [cyberpunkAlley, waystonePortal, mysticalForestPath];

  for (let i = 0; i < 3; i++) {
    shuffledChoices[i].image = images[i];
  }

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

AnswerChoices.propTypes = {
  correctAnswer: PropTypes.number.isRequired,
  incorrectAnswerOne: PropTypes.number.isRequired,
  incorrectAnswerTwo: PropTypes.number.isRequired
};

export default AnswerChoices;
