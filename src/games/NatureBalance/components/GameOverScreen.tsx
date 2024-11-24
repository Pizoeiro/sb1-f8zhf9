import React from 'react';
import { Trophy, Clock, Star, ArrowLeft, Leaf, Shield, BarChart2, Target } from 'lucide-react';
import { Difficulty, Biome } from '../types';
import { DIFFICULTY_CONFIGS, BIOME_CONFIGS, BIOME_MASCOTS } from '../config';

interface GameOverScreenProps {
  score: number;
  elapsedTime: number;
  onPlayAgain: () => void;
  onBack: () => void;
  difficulty: Difficulty;
  biome: Biome;
  elementsCollected: number;
  threatsStopped: number;
  balance: number;
  maxScore: number;
  gameOverReason: 'balance' | 'maxScore';
  attempts: number;
}

export default function GameOverScreen({
  score = 0,
  elapsedTime = 0,
  onPlayAgain,
  onBack,
  difficulty,
  biome,
  elementsCollected = 0,
  threatsStopped = 0,
  balance = 0,
  maxScore = 0,
  gameOverReason = 'balance',
  attempts = 1,
}: GameOverScreenProps) {
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const biomeConfig = BIOME_CONFIGS[biome];
  const scoreMultiplier = DIFFICULTY_CONFIGS[difficulty].scoreMultiplier;
  const biomeEmoji = BIOME_MASCOTS[biome];
  const scorePercentage = (score / maxScore) * 100;
  const accuracy = elementsCollected + threatsStopped > 0 
    ? Math.round((elementsCollected / (elementsCollected + threatsStopped)) * 100)
    : 0;

  return (
    <div className="min-h-screen p-6">
      <button
        onClick={onBack}
        className="mb-6 flex items-center gap-2 opacity-75 hover:opacity-100 transition-opacity"
      >
        <ArrowLeft className="w-4 h-4" />
        Voltar ao Menu
      </button>

      <div className="glass-effect rounded-lg p-8 max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="relative inline-block">
            <Trophy className="w-20 h-20 text-yellow-400 mx-auto mb-4" />
            <span className="absolute bottom-4 right-0 text-4xl animate-bounce">
              {biomeEmoji}
            </span>
          </div>

          <h2 className="text-3xl font-bold mb-4">
            {gameOverReason === 'maxScore' 
              ? '🎉 Pontuação Máxima Atingida!' 
              : '❌ Equilíbrio do Ecossistema Perdido!'}
          </h2>

          <div className="flex justify-center gap-2 mb-4">
            {[...Array(scoreMultiplier)].map((_, i) => (
              <Star key={i} className="w-6 h-6 text-yellow-400" fill="currentColor" />
            ))}
          </div>

          <h3 className="text-xl font-semibold text-purple-500 dark:text-purple-400">
            {biomeConfig.name}
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="glass-card p-6 rounded-lg space-y-4">
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                {score} / {maxScore}
              </div>
              <div className="text-sm opacity-75">pontos</div>
            </div>

            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div 
                className="bg-purple-600 h-2 rounded-full transition-all duration-1000"
                style={{ width: `${scorePercentage}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{formatTime(elapsedTime)}</span>
              </div>
              <div className="flex items-center gap-2">
                <BarChart2 className="w-4 h-4" />
                <span>Tentativa {attempts}</span>
              </div>
            </div>
          </div>

          <div className="glass-card p-6 rounded-lg">
            <div className="text-center mb-4">
              <div className="text-4xl font-bold mb-2">{balance}%</div>
              <div className="text-sm opacity-75">equilíbrio final</div>
            </div>

            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-4">
              <div 
                className={`h-2 rounded-full transition-all duration-1000 ${
                  balance > 70 ? 'bg-green-500' :
                  balance > 30 ? 'bg-yellow-500' :
                  'bg-red-500'
                }`}
                style={{ width: `${balance}%` }}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="glass-card p-4 rounded-lg text-center">
            <div className="flex items-center justify-center gap-2 text-green-500 mb-2">
              <Leaf className="w-6 h-6" />
              <span className="text-2xl font-bold">{elementsCollected}</span>
            </div>
            <div className="text-sm opacity-75">Elementos Coletados</div>
          </div>

          <div className="glass-card p-4 rounded-lg text-center">
            <div className="flex items-center justify-center gap-2 text-red-500 mb-2">
              <Shield className="w-6 h-6" />
              <span className="text-2xl font-bold">{threatsStopped}</span>
            </div>
            <div className="text-sm opacity-75">Ameaças Evitadas</div>
          </div>

          <div className="glass-card p-4 rounded-lg text-center">
            <div className="flex items-center justify-center gap-2 text-blue-500 mb-2">
              <Target className="w-6 h-6" />
              <span className="text-2xl font-bold">{accuracy}%</span>
            </div>
            <div className="text-sm opacity-75">Taxa de Acerto</div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-4">
          <button
            onClick={onPlayAgain}
            className="w-full max-w-md bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-all duration-300 transform hover:scale-105 font-semibold"
          >
            Jogar Novamente
          </button>

          <p className="text-sm opacity-75 text-center max-w-md">
            {gameOverReason === 'maxScore'
              ? 'Parabéns! Você atingiu a pontuação máxima neste nível!'
              : 'Continue tentando! Cada tentativa é uma nova chance de equilibrar o ecossistema.'}
          </p>
        </div>
      </div>
    </div>
  );
}