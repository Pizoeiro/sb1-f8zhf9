import React from 'react';
import { Star, BookOpen, Infinity } from 'lucide-react';
import { Difficulty } from '../types';
import { DIFFICULTY_CONFIGS } from '../config';

interface DifficultySelectorProps {
  onSelect: (difficulty: Difficulty) => void;
}

export default function DifficultySelector({ onSelect }: DifficultySelectorProps) {
  return (
    <div className="max-w-md mx-auto space-y-6">
      <div className="text-center">
        <BookOpen className="w-12 h-12 text-purple-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-2">Serpentário Literário</h2>
        <p className="text-sm opacity-75 mb-6">
          Colete letras para formar palavras da literatura brasileira.
          Quanto maior a dificuldade, mais pontos você ganha!
        </p>
      </div>

      <div className="space-y-4">
        {(Object.keys(DIFFICULTY_CONFIGS) as Difficulty[]).map((difficulty) => {
          const config = DIFFICULTY_CONFIGS[difficulty];
          const stars = difficulty === 'facil' ? 1 : 
                       difficulty === 'medio' ? 2 : 
                       difficulty === 'dificil' ? 3 : 4;

          return (
            <button
              key={difficulty}
              onClick={() => onSelect(difficulty)}
              className="w-full p-4 glass-card rounded-lg hover:bg-purple-50 dark:hover:bg-purple-900 transition-all text-left group"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="font-semibold text-lg capitalize flex items-center gap-2">
                  {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                  {difficulty === 'extremo' && (
                    <Infinity className="w-4 h-4 text-purple-500" />
                  )}
                </div>
                <div className="flex gap-1">
                  {[...Array(stars)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 text-yellow-400 transition-transform group-hover:scale-110"
                      fill="currentColor"
                    />
                  ))}
                </div>
              </div>
              <div className="text-sm opacity-75">
                {config.description}
              </div>
              <div className="text-xs mt-2 text-purple-500 dark:text-purple-400">
                Multiplicador de pontos: {config.scoreMultiplier}x
                {config.maxWords && ` • ${config.maxWords} palavras`}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}