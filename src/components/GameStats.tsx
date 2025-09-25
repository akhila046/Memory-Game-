import React from 'react';
import { Clock, Target, Trophy, RotateCcw } from 'lucide-react';
import { GameStats as GameStatsType } from '../types';
import { formatTime } from '../utils/gameLogic';

interface GameStatsProps {
  stats: GameStatsType;
  onRestart: () => void;
}

const GameStats: React.FC<GameStatsProps> = ({ stats, onRestart }) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 text-blue-600">
            <Clock size={20} />
            <span className="font-semibold text-lg">{formatTime(stats.time)}</span>
          </div>
          
          <div className="flex items-center gap-2 text-orange-600">
            <Target size={20} />
            <span className="font-semibold text-lg">{stats.moves} moves</span>
          </div>
          
          <div className="flex items-center gap-2 text-green-600">
            <Trophy size={20} />
            <span className="font-semibold text-lg">{stats.matches}/8 pairs</span>
          </div>
        </div>
        
        <button
          onClick={onRestart}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          <RotateCcw size={16} />
          New Game
        </button>
      </div>
    </div>
  );
};

export default GameStats;