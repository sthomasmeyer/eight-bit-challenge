import React from 'react';
import Bit from './Bit';
import '../styles/Byte.css';

const Byte = ({ binarySequence }) => {
  let bits = [];

  for (let i = 0; i < binarySequence.length; i++) {
    bits.unshift(
      <div className='Bit-wrapper' key={`bit${i}`} id={`bit${i}`}>
        <Bit value={binarySequence[i]} />
      </div>
    );
  }

  return (
    <div className='Byte'>
      <div className='Byte-wrapper'>{bits}</div>
    </div>
  );
};

export default Byte;
