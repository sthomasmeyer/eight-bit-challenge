import React from 'react';
import PropTypes from 'prop-types';
import '../styles/AnswerChoice.css';

const AnswerChoice = ({ decimalValue, image, handleAnswerSelection }) => {
  const handleClick = () => {
    handleAnswerSelection(decimalValue);
  };

  return (
    <div className='AnswerChoice' onClick={handleClick}>
      <div className='AnswerChoice-decimalValue-wrapper'>{decimalValue}</div>
      <div className='AnswerChoice-button-wrapper'>
        <img src={image}></img>
      </div>
    </div>
  );
};

AnswerChoice.propTypes = {
  decimalValue: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  handleAnswerSelection: PropTypes.func.isRequired
};

export default AnswerChoice;
