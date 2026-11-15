import React from 'react';
import Bit from './Bit';
import '../styles/Byte.css';

const Byte = ({ binarySequence }) => {
  return (
    <div className='Byte'>
      <div
        className='Byte-wrapper'
        role='group'
        aria-label={`8-bit binary sequence: ${binarySequence.join(' ')}`}
      >
        {binarySequence.map((bit, index) => {
          const bitPosition = binarySequence.length - 1 - index;
          return (
            <div
              className='Bit-wrapper'
              data-bit={bit}
              key={`bit${bitPosition}`}
              id={`bit${bitPosition}`}
              aria-hidden='true'
            >
              <Bit value={bit} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Byte;
