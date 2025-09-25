import { Card } from '../types';

// Card symbols for the game
export const CARD_SYMBOLS = ['🎮', '🎯', '🎨', '🎵', '🎪', '🎭', '🎲', '🎸'];

export const createDeck = (): Card[] => {
  const symbols = CARD_SYMBOLS;
  const deck: Card[] = [];
  
  // Create pairs of cards
  symbols.forEach((symbol, index) => {
    deck.push({
      id: index * 2,
      symbol,
      isFlipped: false,
      isMatched: false,
    });
    deck.push({
      id: index * 2 + 1,
      symbol,
      isFlipped: false,
      isMatched: false,
    });
  });
  
  // Shuffle the deck
  return shuffleDeck(deck);
};

export const shuffleDeck = (deck: Card[]): Card[] => {
  const shuffled = [...deck];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const checkForMatch = (cards: Card[]): boolean => {
  const flippedCards = cards.filter(card => card.isFlipped && !card.isMatched);
  if (flippedCards.length === 2) {
    return flippedCards[0].symbol === flippedCards[1].symbol;
  }
  return false;
};

export const isGameComplete = (cards: Card[]): boolean => {
  return cards.every(card => card.isMatched);
};

export const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};