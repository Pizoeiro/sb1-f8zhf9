import React from 'react';
import { Trophy, Clock, Star, ArrowLeft, Brain, Users, Bot } from 'lucide-react';
import { Difficulty, GameMode, Player } from '../types';
import { DIFFICULTY_CONFIGS } from '../config';

interface GameOverScreenProps {
  winner: Player | 'draw' | null;
  score: number;
  elapsedTime: number;
  onPlayAgain: () => void;
  onBack: () => void;
  difficulty: Difficulty;
  questionsAnswered: number;
  correctAnswers: number;
  gameMode: GameMode;
}

export default function GameOverScreen({
  winner,
  score,
  elapsedTime,
  onPlayAgain,
  onBack,
  difficulty,
  questionsAnswered,
  correctAnswers,
  gameMode,
}: GameOverScreenProps) {
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getWinnerText = () => {
    if (winner === 'draw') return 'Empate!';
    if (gameMode === 'computer') {
      return winner === 'X' ? 'Você venceu!' : 'O computador venceu!';
    }
    return `Jogador ${winner} venceu!`;
  };

  return (
    <div className="min-h-screen p-6">
      <button
        onClick={onBack}
        className="mb-6 flex items-center gap-2 opacity-75 hover:opacity-100 transition-opacity"
      >
        <ArrowLeft className="w-4 h-4" />
        Voltar ao Menu
      </button>

      <div className="glass-effect rounded-lg p-8 max-w-md mx-auto text-center">
        <Trophy className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-2">Fim de Jogo!</h2>

        <div className="flex justify-center items-center gap-4 mb-4">
          <div className="flex gap-1">
            {[...Array(DIFFICULTY_CONFIGS[difficulty].scoreMultiplier)].map((_, i) => (
              <Star key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" />
            ))}
          </div>
          {gameMode === 'pvp' ? (
            <Users className="w-5 h-5 text-purple-500" />
          ) : (
            <Bot className="w-5 h-5 text-purple-500" />
          )}
        </div>

        <div className="glass-card p-6 rounded-lg mb-6">
          <div className="text-lg mb-2">
            {getWinnerText()}
          </div>
          <p className="text-3xl font-bold mb-4 text-purple-600">
            {score} pontos
          </p>
          <div className="flex items-center justify-center gap-4 text-sm opacity-75">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{formatTime(elapsedTime)}</span>
            </div>
            <div className="flex items-center gap-1">
              <Brain className="w-4 h-4" />
              <span>
                {correctAnswers}/{questionsAnswered} acertos
              </span>
            </div>
          </div>
        </div>

        <button
          onClick={onPlayAgain}
          className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors font-semibold"
        >
          Jogar Novamente
        </button>
      </div>
    </div>
  );
}