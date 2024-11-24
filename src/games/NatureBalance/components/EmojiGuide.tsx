import React from 'react';
import { BIOME_CONFIGS, ELEMENT_SCORES } from '../config';
import { Biome } from '../types';

interface EmojiGuideProps {
  biome: Biome;
}

export default function EmojiGuide({ biome }: EmojiGuideProps) {
  const biomeConfig = BIOME_CONFIGS[biome];

  return (
    <div className="glass-card p-4 rounded-lg">
      <h3 className="text-lg font-semibold mb-4">Elementos do {biomeConfig.name}</h3>
      
      <div className="space-y-4">
        <div>
          <h4 className="text-sm font-medium text-green-600 dark:text-green-400 mb-2">
            Elementos Benéficos (+{ELEMENT_SCORES.good.points} pontos, +{ELEMENT_SCORES.good.balance}% equilíbrio)
          </h4>
          <div className="flex flex-wrap gap-2">
            {biomeConfig.elements.good.map((emoji, i) => (
              <div key={i} className="relative group">
                <span className="text-2xl">{emoji}</span>
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-green-500 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                  +{ELEMENT_SCORES.good.points} pts
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium text-red-600 dark:text-red-400 mb-2">
            Ameaças ({ELEMENT_SCORES.bad.points} pontos, {ELEMENT_SCORES.bad.balance}% equilíbrio)
          </h4>
          <div className="flex flex-wrap gap-2">
            {biomeConfig.elements.bad.map((emoji, i) => (
              <div key={i} className="relative group">
                <span className="text-2xl">{emoji}</span>
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-red-500 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                  {ELEMENT_SCORES.bad.points} pts
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}