import React from 'react';
import '../styles/AnswerChoice.css';

const AnswerChoice = ({ decimalValue, image, handleAnswerSelection }) => {
  const handleClick = () => {
    handleAnswerSelection(decimalValue);
  };

  return (
    <div className='AnswerChoice' onClick={handleClick}>
      <div className='AnswerChoice-decimalValue-wrapper'>{decimalValue}</div>
      <div className='AnswerChoice-button-wrapper'>
        <img src={image} alt='' />
      </div>
    </div>
  );
};

export default AnswerChoice;
