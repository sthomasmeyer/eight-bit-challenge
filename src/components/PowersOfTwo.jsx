import React from 'react';
import '../styles/PowersOfTwo.css';

const PowersOfTwo = () => {
  const exponents = [7, 6, 5, 4, 3, 2, 1, 0];

  return (
    <div className='PowersOfTwo' aria-hidden='true'>
      <div className='PowersOfTwo-wrapper'>
        {exponents.map((exponent) => (
          <div className='Num-wrapper' key={`num${exponent}`} id={`num${exponent}`}>
            2<sup>{exponent}</sup>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PowersOfTwo;
