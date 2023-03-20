import React from 'react';
import PointsDisplay from './PointsDisplay';
import Timer from './Timer';
import eightBitLogo from '../images/8-bit-logo-ii.png';
import '../styles/PointsAndTimerRow.css';

const PointsAndTimerRow = ({ points, seconds }) => {
  return (
    <div className='PointsAndTimerRow'>
      <div className='PointsDisplay-container'>
        <PointsDisplay points={points} />
      </div>
      <div className='Logo-container'>
        <img src={eightBitLogo} alt={'The 8-bit Challenge'}></img>
      </div>
      <div className='Timer-container'>
        <Timer seconds={seconds} points={points} />
      </div>
    </div>
  );
};

export default PointsAndTimerRow;
