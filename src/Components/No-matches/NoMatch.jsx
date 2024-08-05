import React from 'react';
import noMatch from '../Assets/no_matches.png';
import './NoMatch.css';

const NoMatch = () => {
  return (
    <div className='img'>
      <img src={noMatch} alt="No matches found" />
    </div>
  );
}

export default NoMatch;
