import React from 'react';
import { useMain } from '../hooks/useMain';
import bg from './bg.png';

export default function CardItem({ card, isSecretCard = false }) {
  const { isHidden, play } = useMain();
  return (
    <div className='card'>
      <div className='card-header'>{card.name}</div>
      <div className='card-image'>
        <img src={bg} />
      </div>
      <div className='card-body'>
        {card.categories.map((c) => (
          <a
            className='category-item'
            key={c.label}
            onClick={() => play(c.label)}
          >
            <div className='label'>{c.label}</div>
            <div className='value'>
              {isSecretCard && isHidden ? '?' : c.value}
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
