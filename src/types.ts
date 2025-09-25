export interface Card {
  id: number;
  symbol: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export interface GameStats {
  moves: number;
  matches: number;
  time: number;
  isPlaying: boolean;
  isComplete: boolean;
}