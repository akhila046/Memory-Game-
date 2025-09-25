import React, { useState, useEffect, useCallback } from 'react';
import { Brain } from 'lucide-react';
import GameBoard from './components/GameBoard';
import GameStats from './components/GameStats';
import WinModal from './components/WinModal';
import { Card, GameStats as GameStatsType } from './types';
import { createDeck, checkForMatch, isGameComplete } from './utils/gameLogic';

function App() {
  const [cards, setCards] = useState<Card[]>(() => createDeck());
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [isDisabled, setIsDisabled] = useState(false);
  const [showWinModal, setShowWinModal] = useState(false);
  
  const [gameStats, setGameStats] = useState<GameStatsType>({
    moves: 0,
    matches: 0,
    time: 0,
    isPlaying: false,
    isComplete: false,
  });

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (gameStats.isPlaying && !gameStats.isComplete) {
      interval = setInterval(() => {
        setGameStats(prev => ({
          ...prev,
          time: prev.time + 1,
        }));
      }, 1000);
    }
    
    return () => clearInterval(interval);
  }, [gameStats.isPlaying, gameStats.isComplete]);

  const handleCardClick = useCallback((id: number) => {
    if (isDisabled) return;
    
    // Start the game on first click
    if (!gameStats.isPlaying) {
      setGameStats(prev => ({ ...prev, isPlaying: true }));
    }

    setCards(prev => prev.map(card => 
      card.id === id ? { ...card, isFlipped: true } : card
    ));
    
    setFlippedCards(prev => [...prev, id]);
  }, [isDisabled, gameStats.isPlaying]);

  // Handle card matching logic
  useEffect(() => {
    if (flippedCards.length === 2) {
      setIsDisabled(true);
      setGameStats(prev => ({ ...prev, moves: prev.moves + 1 }));
      
      const [firstId, secondId] = flippedCards;
      const firstCard = cards.find(card => card.id === firstId);
      const secondCard = cards.find(card => card.id === secondId);
      
      if (firstCard && secondCard && firstCard.symbol === secondCard.symbol) {
        // Match found
        setTimeout(() => {
          setCards(prev => prev.map(card => 
            card.id === firstId || card.id === secondId 
              ? { ...card, isMatched: true }
              : card
          ));
          setGameStats(prev => ({ ...prev, matches: prev.matches + 1 }));
          setFlippedCards([]);
          setIsDisabled(false);
        }, 500);
      } else {
        // No match
        setTimeout(() => {
          setCards(prev => prev.map(card => 
            card.id === firstId || card.id === secondId 
              ? { ...card, isFlipped: false }
              : card
          ));
          setFlippedCards([]);
          setIsDisabled(false);
        }, 1000);
      }
    }
  }, [flippedCards, cards]);

  // Check for game completion
  useEffect(() => {
    if (gameStats.matches === 8 && !gameStats.isComplete) {
      setGameStats(prev => ({ ...prev, isComplete: true, isPlaying: false }));
      setTimeout(() => setShowWinModal(true), 500);
    }
  }, [gameStats.matches, gameStats.isComplete]);

  const restartGame = () => {
    setCards(createDeck());
    setFlippedCards([]);
    setIsDisabled(false);
    setShowWinModal(false);
    setGameStats({
      moves: 0,
      matches: 0,
      time: 0,
      isPlaying: false,
      isComplete: false,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Brain className="text-blue-600 w-8 h-8" />
            <h1 className="text-4xl font-bold text-gray-900">Memory Game</h1>
          </div>
          <p className="text-gray-600 text-lg">
            Flip cards and find matching pairs. Test your memory skills!
          </p>
        </div>

        {/* Game Stats */}
        <GameStats stats={gameStats} onRestart={restartGame} />

        {/* Game Board */}
        <GameBoard 
          cards={cards} 
          onCardClick={handleCardClick} 
          isDisabled={isDisabled}
        />

        {/* Instructions */}
        <div className="mt-8 text-center">
          <p className="text-gray-500 text-sm">
            Click on cards to flip them. Find all matching pairs to win!
          </p>
        </div>

        {/* Win Modal */}
        <WinModal
          isOpen={showWinModal}
          onClose={() => setShowWinModal(false)}
          onRestart={restartGame}
          time={gameStats.time}
          moves={gameStats.moves}
        />
      </div>
    </div>
  );
}

export default App;