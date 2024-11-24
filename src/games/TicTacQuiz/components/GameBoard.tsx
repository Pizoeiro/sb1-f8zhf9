import React from 'react';
import { Clock, Star, Brain, Users, Bot } from 'lucide-react';
import { Difficulty, GameMode, Player } from '../types';
import { DIFFICULTY_CONFIGS } from '../config';

interface GameBoardProps {
  board: Array<Player | null>;
  currentPlayer: Player;
  onCellClick: (index: number) => void;
  score: number;
  startTime: number;
  difficulty: Difficulty;
  questionsAnswered: number;
  correctAnswers: number;
  gameMode: GameMode;
}

export default function GameBoard({
  board,
  currentPlayer,
  onCellClick,
  score,
  startTime,
  difficulty,
  questionsAnswered,
  correctAnswers,
  gameMode,
}: GameBoardProps) {
  const formatTime = (startTime: number) => {
    const seconds = Math.floor((Date.now() - startTime) / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="max-w-lg mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <div className="glass-card px-4 py-2 rounded-lg flex items-center gap-2">
            <div className="text-lg font-bold text-purple-600 dark:text-purple-400">
              {score} pontos
            </div>
          </div>
          <div className="glass-card px-4 py-2 rounded-lg flex items-center gap-2">
            <Clock className="w-4 h-4 text-purple-500" />
            <span>{formatTime(startTime)}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {gameMode === 'pvp' ? (
            <Users className="w-4 h-4 text-purple-500" />
          ) : (
            <Bot className="w-4 h-4 text-purple-500" />
          )}
          <div className="flex">
            {[...Array(DIFFICULTY_CONFIGS[difficulty].scoreMultiplier)].map((_, i) => (
              <Star key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" />
            ))}
          </div>
        </div>
      </div>

      <div className="glass-card p-4 rounded-lg mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Brain className="w-5 h-5 text-purple-500" />
          <span className="text-sm">
            Acertos: {correctAnswers}/{questionsAnswered}
          </span>
        </div>
        <div className="text-lg font-semibold">
          Vez do {gameMode === 'computer' && currentPlayer === 'O' ? 'computador' : `jogador ${currentPlayer}`}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {board.map((cell, index) => (
          <button
            key={index}
            onClick={() => onCellClick(index)}
            className={`aspect-square glass-card rounded-lg text-4xl font-bold flex items-center justify-center transition-all ${
              !cell && (gameMode !== 'computer' || currentPlayer === 'X')
                ? 'hover:bg-purple-50 dark:hover:bg-purple-900 cursor-pointer'
                : 'cursor-default'
            }`}
            disabled={!!cell || (gameMode === 'computer' && currentPlayer === 'O')}
          >
            <span 
              className={cell === 'X' ? 'text-blue-600' : cell === 'O' ? 'text-red-600' : ''}
            >
              {cell}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}