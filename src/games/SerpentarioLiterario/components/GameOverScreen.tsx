import React from 'react';
import { Trophy, Clock, ArrowLeft, Star, BookOpen } from 'lucide-react';
import { Difficulty } from '../types';
import { DIFFICULTY_CONFIGS } from '../config';

interface GameOverScreenProps {
  score: number;
  elapsedTime: number;
  onPlayAgain: () => void;
  onBack: () => void;
  difficulty: Difficulty;
  wordsCompleted: number;
}

export default function GameOverScreen({
  score,
  elapsedTime,
  onPlayAgain,
  onBack,
  difficulty,
  wordsCompleted,
}: GameOverScreenProps) {
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const difficultyStars = {
    facil: 1,
    medio: 2,
    dificil: 3,
    extremo: 4,
  };

  const maxWords = DIFFICULTY_CONFIGS[difficulty].maxWords;
  const isInfiniteMode = difficulty === 'extremo';

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
        <div className="relative mb-8">
          <Trophy className="w-16 h-16 text-yellow-400 mx-auto" />
          <BookOpen className="w-8 h-8 text-purple-500 absolute bottom-0 right-1/2 translate-x-12" />
        </div>
        
        <h2 className="text-2xl font-bold mb-6">Fim de Jogo!</h2>

        <div className="flex justify-center gap-1 mb-4">
          {[...Array(difficultyStars[difficulty])].map((_, i) => (
            <Star
              key={i}
              className="w-5 h-5 text-yellow-400 animate-pulse"
              fill="currentColor"
            />
          ))}
        </div>

        <div className="space-y-4 mb-8">
          <div className="glass-card p-6 rounded-lg">
            <p className="text-4xl font-bold mb-2 text-purple-600 dark:text-purple-400">
              {score} pontos
            </p>
            <div className="flex items-center justify-center gap-4 text-sm text-purple-500 dark:text-purple-400">
              <p>
                Multiplicador: {DIFFICULTY_CONFIGS[difficulty].scoreMultiplier}x
              </p>
              <p>
                {isInfiniteMode ? (
                  `${wordsCompleted} palavras completadas`
                ) : (
                  `${wordsCompleted}/${maxWords} palavras`
                )}
              </p>
            </div>
            <div className="flex items-center justify-center gap-2 opacity-75 mt-4">
              <Clock className="w-4 h-4" />
              <span className="font-mono">{formatTime(elapsedTime)}</span>
            </div>
          </div>
        </div>

        <button
          onClick={onPlayAgain}
          className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-all font-semibold transform hover:scale-105"
        >
          Jogar Novamente
        </button>
      </div>
    </div>
  );
}