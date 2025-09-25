import React from 'react';
import { Trophy, Clock, Target, Sparkles } from 'lucide-react';
import { formatTime } from '../utils/gameLogic';

interface WinModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRestart: () => void;
  time: number;
  moves: number;
}

const WinModal: React.FC<WinModalProps> = ({ isOpen, onClose, onRestart, time, moves }) => {
  if (!isOpen) return null;

  const getPerformanceMessage = (moves: number, time: number) => {
    if (moves <= 20 && time <= 60) return "Outstanding! Perfect memory! 🧠✨";
    if (moves <= 30 && time <= 120) return "Excellent performance! 🎯";
    if (moves <= 40) return "Great job! Well played! 👏";
    return "Congratulations! You did it! 🎉";
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full transform animate-bounce-in">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <Trophy className="text-yellow-500 w-16 h-16" />
              <Sparkles className="absolute -top-2 -right-2 text-yellow-400 w-6 h-6 animate-pulse" />
            </div>
          </div>
          
          <h2 className="text-3xl font-bold text-gray-900 mb-2">You Win!</h2>
          <p className="text-lg text-gray-600 mb-6">
            {getPerformanceMessage(moves, time)}
          </p>
          
          <div className="bg-gray-50 rounded-2xl p-4 mb-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center justify-center gap-2 text-blue-600">
                <Clock size={20} />
                <span className="font-semibold">{formatTime(time)}</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-orange-600">
                <Target size={20} />
                <span className="font-semibold">{moves} moves</span>
              </div>
            </div>
          </div>
          
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-xl font-medium transition-colors duration-200"
            >
              Close
            </button>
            <button
              onClick={onRestart}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-colors duration-200"
            >
              Play Again
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WinModal;