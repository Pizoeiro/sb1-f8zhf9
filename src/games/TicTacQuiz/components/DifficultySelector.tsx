import React from 'react';
import { Star, Grid } from 'lucide-react';
import { Difficulty } from '../types';
import { DIFFICULTY_CONFIGS } from '../config';

interface DifficultySelectorProps {
  onSelect: (difficulty: Difficulty) => void;
}

export default function DifficultySelector({ onSelect }: DifficultySelectorProps) {
  return (
    <div className="max-w-md mx-auto space-y-6">
      <div className="text-center">
        <Grid className="w-12 h-12 text-purple-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-2">Jogo da Velha Quiz</h2>
        <p className="text-sm opacity-75 mb-6">
          Responda corretamente às perguntas para marcar sua jogada.
          Quanto maior a dificuldade, mais pontos você ganha!
        </p>
      </div>

      <div className="space-y-4">
        {(Object.entries(DIFFICULTY_CONFIGS) as [Difficulty, typeof DIFFICULTY_CONFIGS[keyof typeof DIFFICULTY_CONFIGS]][]).map(([level, config]) => (
          <button
            key={level}
            onClick={() => onSelect(level)}
            className="w-full p-4 glass-card rounded-lg hover:bg-purple-50 dark:hover:bg-purple-900 transition-all text-left group"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="font-semibold text-lg capitalize">
                {level.charAt(0).toUpperCase() + level.slice(1)}
              </div>
              <div className="flex gap-1">
                {[...Array(config.scoreMultiplier)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 text-yellow-400 transition-transform group-hover:scale-110"
                    fill="currentColor"
                  />
                ))}
              </div>
            </div>
            <div className="text-sm opacity-75">{config.description}</div>
            <div className="text-xs mt-2 text-purple-500">
              Multiplicador de pontos: {config.scoreMultiplier}x
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}