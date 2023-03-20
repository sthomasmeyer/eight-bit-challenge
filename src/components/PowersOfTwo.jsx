import React from 'react';
import '../styles/PowersOfTwo.css';

const PowersOfTwo = () => {
  let nums = [];

  for (let i = 0; i < 8; i++) {
    nums.unshift(
      <div className='Num-wrapper' key={`num${i}`} id={`num${i}`}>
        2<sup>{i}</sup>
      </div>
    );
  }

  return (
    <div className='PowersOfTwo'>
      <div className='PowersOfTwo-wrapper'>{nums}</div>
    </div>
  );
};

export default PowersOfTwo;
