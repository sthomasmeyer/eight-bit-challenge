import React from 'react';
import '../styles/AnswerChoice.css';

const AnswerChoice = ({
  index,
  decimalValue,
  handleAnswerSelection,
  buttonRef
}) => {
  const handleClick = () => {
    handleAnswerSelection(decimalValue);
  };

  return (
    <button
      ref={buttonRef}
      type='button'
      className='AnswerChoice'
      onClick={handleClick}
      aria-keyshortcuts={String(index)}
      aria-label={`Option ${index}: ${decimalValue}`}
    >
      <span className='AnswerChoice-index' aria-hidden='true'>
        0{index}
      </span>
      <span className='AnswerChoice-decimalValue'>{decimalValue}</span>
    </button>
  );
};

export default AnswerChoice;
