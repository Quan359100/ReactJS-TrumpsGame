import React from 'react';
import { useMain } from '../hooks/useMain';

export default function Score() {
  const { userScore, comScore } = useMain();
  return (
    <div>
      <div className='user-score'>User Score : {userScore}</div>
      <div className='com-score'>Computer Score : {comScore}</div>
    </div>
  );
}
