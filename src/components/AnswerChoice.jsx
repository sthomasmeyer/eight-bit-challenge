import React from 'react';
import '../styles/AnswerChoice.css';

const AnswerChoice = ({ index, decimalValue, handleAnswerSelection }) => {
  const handleClick = () => {
    handleAnswerSelection(decimalValue);
  };

  return (
    <button
      type='button'
      className='AnswerChoice'
      onClick={handleClick}
      aria-label={`Select decimal value ${decimalValue}`}
    >
      <span className='AnswerChoice-index' aria-hidden='true'>
        0{index}
      </span>
      <span className='AnswerChoice-decimalValue'>{decimalValue}</span>
    </button>
  );
};

export default AnswerChoice;
