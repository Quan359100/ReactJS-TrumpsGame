import React from 'react';
import { useMain } from '../hooks/useMain';

export default function Score() {
  const { userScore, comScore } = useMain();
  return (
    <div>
      <div className='user-score'>{userScore}</div>
      <div className='com-score'>{comScore}</div>
    </div>
  );
}
