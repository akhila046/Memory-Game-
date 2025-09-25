import React from 'react';
import { Card as CardType } from '../types';

interface CardProps {
  card: CardType;
  onClick: (id: number) => void;
  isDisabled: boolean;
}

const Card: React.FC<CardProps> = ({ card, onClick, isDisabled }) => {
  const handleClick = () => {
    if (!isDisabled && !card.isFlipped && !card.isMatched) {
      onClick(card.id);
    }
  };

  return (
    <div
      className={`relative w-full aspect-square cursor-pointer transform transition-all duration-300 hover:scale-105 ${
        isDisabled && !card.isFlipped && !card.isMatched ? 'cursor-not-allowed' : ''
      }`}
      onClick={handleClick}
    >
      <div
        className={`absolute inset-0 w-full h-full transition-transform duration-500 transform-style-preserve-3d ${
          card.isFlipped || card.isMatched ? 'rotate-y-180' : ''
        }`}
      >
        {/* Back of card */}
        <div className="absolute inset-0 w-full h-full backface-hidden rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg border-2 border-blue-400 flex items-center justify-center">
          <div className="text-2xl text-white font-bold">?</div>
        </div>
        
        {/* Front of card */}
        <div
          className={`absolute inset-0 w-full h-full backface-hidden rounded-xl shadow-lg border-2 flex items-center justify-center rotate-y-180 transition-colors duration-300 ${
            card.isMatched
              ? 'bg-gradient-to-br from-green-400 to-green-500 border-green-400'
              : 'bg-gradient-to-br from-white to-gray-50 border-gray-300'
          }`}
        >
          <div className="text-3xl sm:text-4xl">{card.symbol}</div>
        </div>
      </div>
    </div>
  );
};

export default Card;