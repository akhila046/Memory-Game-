import React from 'react';
import Card from './Card';
import { Card as CardType } from '../types';

interface GameBoardProps {
  cards: CardType[];
  onCardClick: (id: number) => void;
  isDisabled: boolean;
}

const GameBoard: React.FC<GameBoardProps> = ({ cards, onCardClick, isDisabled }) => {
  return (
    <div className="grid grid-cols-4 gap-3 sm:gap-4 max-w-md mx-auto">
      {cards.map((card) => (
        <Card
          key={card.id}
          card={card}
          onClick={onCardClick}
          isDisabled={isDisabled}
        />
      ))}
    </div>
  );
};

export default GameBoard;