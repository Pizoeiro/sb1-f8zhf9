import React from 'react';
import { Trophy, Award, Clock, Star, ArrowLeft } from 'lucide-react';
import type { Player } from '../types';

interface RankingScreenProps {
  ranking: Player[];
  currentPlayer: string;
  onPlayAgain: () => void;
  onBack: () => void;
}

export default function RankingScreen({ 
  ranking = [], 
  currentPlayer, 
  onPlayAgain,
  onBack 
}: RankingScreenProps) {
  const playerRank = ranking?.findIndex((player) => player.nome === currentPlayer) + 1;

  const getDifficultyStars = (difficulty: string) => {
    const stars = { facil: 1, medio: 2, dificil: 3 }[difficulty] || 1;
    return [...Array(stars)].map((_, i) => (
      <Star key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" />
    ));
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="glass-effect rounded-lg shadow-xl p-8 max-w-md w-full relative">
        <button
          onClick={onBack}
          className="absolute top-4 left-4 text-gray-600 hover:text-gray-800 transition-colors flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar
        </button>

        <div className="flex items-center justify-center mb-6">
          <Trophy className="w-12 h-12 text-yellow-500" />
        </div>
        
        {playerRank === 1 && (
          <div className="text-center mb-6 bg-yellow-50 p-4 rounded-lg">
            <Award className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
            <p className="text-yellow-700 font-bold">Parabéns! Você está em primeiro lugar!</p>
          </div>
        )}

        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
          Ranking
        </h2>
        
        <div className="space-y-2 mb-6">
          {ranking.map((player, index) => (
            <div
              key={index}
              className={`p-3 rounded-lg ${
                player.nome === currentPlayer
                  ? 'bg-purple-100 border-2 border-purple-500'
                  : 'glass-card'
              }`}
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <span className="font-semibold">
                    {index + 1}. {player.nome}
                  </span>
                  {index === 0 && <Trophy className="w-4 h-4 text-yellow-500" />}
                </div>
                <span className="text-purple-600 font-bold">
                  {player.pontuacao} pts
                </span>
              </div>
              <div className="text-sm text-gray-500 flex items-center justify-between mt-1">
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>{Math.floor(player.tempo / 60)}m {player.tempo % 60}s</span>
                </div>
                <div className="flex items-center space-x-1">
                  {getDifficultyStars(player.dificuldade)}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-3">
          <button
            onClick={onPlayAgain}
            className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition duration-200"
          >
            Jogar Novamente
          </button>
        </div>
      </div>
    </div>
  );
}