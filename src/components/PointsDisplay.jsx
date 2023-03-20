import React from 'react';
import '../styles/PointsDisplay.css';

const PointsDisplay = ({ points }) => {
  return (
    <div className='PointsDisplay'>
      <div className='Points'>Pts: {points}</div>
    </div>
  );
};

export default PointsDisplay;
