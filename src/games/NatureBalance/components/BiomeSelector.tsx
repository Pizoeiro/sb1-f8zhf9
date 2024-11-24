import React from 'react';
import { Biome } from '../types';
import { BIOME_CONFIGS } from '../config';

interface BiomeSelectorProps {
  onSelect: (biome: Biome) => void;
}

const BIOME_GRADIENTS: Record<Biome, { from: string; to: string }> = {
  floresta: { from: '#2D5A27', to: '#1A4314' },
  oceano: { from: '#1E3D59', to: '#0F2A47' },
  caatinga: { from: '#C19A6B', to: '#8B6D4C' },
  cerrado: { from: '#AB9144', to: '#8B7632' },
  pampa: { from: '#90A955', to: '#6B8B3D' },
  mataatlantica: { from: '#386641', to: '#1B472C' },
  pantanal: { from: '#4C78A8', to: '#2B5C8F' },
  mangue: { from: '#525E4D', to: '#3A443A' },
  recife: { from: '#006994', to: '#004C6D' },
  savana: { from: '#8B4513', to: '#6B3403' },
  tundra: { from: '#87CEEB', to: '#5F9EA0' },
  deserto: { from: '#C2B280', to: '#A69666' }
};

export default function BiomeSelector({ onSelect }: BiomeSelectorProps) {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Escolha o Bioma</h2>
        <p className="text-sm opacity-75 mb-6">
          Cada bioma tem seus próprios desafios e elementos únicos.
          Mantenha o equilíbrio ecológico para pontuar!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {(Object.entries(BIOME_CONFIGS) as [Biome, typeof BIOME_CONFIGS[keyof typeof BIOME_CONFIGS]][]).map(([biome, config]) => {
          const goodEmojis = config.elements.good.slice(0, 3);
          const badEmojis = config.elements.bad.slice(0, 2);
          const previewEmojis = [...goodEmojis, ...badEmojis];
          const gradient = BIOME_GRADIENTS[biome];

          return (
            <button
              key={biome}
              onClick={() => onSelect(biome)}
              className="group relative overflow-hidden rounded-lg"
            >
              <div 
                className="relative p-6 glass-card h-full transition-all duration-300"
                style={{
                  background: `linear-gradient(135deg, ${gradient.from}ee, ${gradient.to}ee)`,
                }}
              >
                <div className="absolute top-0 left-0 w-full h-full opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                     style={{
                       background: 'radial-gradient(circle at center, rgba(255,255,255,0.8) 0%, transparent 70%)'
                     }} />
                <div className="flex flex-col h-full relative z-10">
                  <div className="text-4xl mb-3 transform transition-transform duration-300 group-hover:scale-125 group-hover:rotate-12">
                    {config.elements.good[0]}
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-white">{config.name}</h3>
                  <p className="text-sm text-white/90 mb-4 flex-grow">{config.description}</p>
                  <div className="flex flex-wrap gap-2 justify-start">
                    {previewEmojis.map((emoji, i) => (
                      <span
                        key={i}
                        className="text-2xl transition-all duration-300 transform group-hover:scale-110 hover:scale-125"
                        style={{ 
                          transitionDelay: `${i * 50}ms`,
                          animation: `float ${2 + i * 0.5}s ease-in-out infinite`
                        }}
                      >
                        {emoji}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <p className="text-center text-sm opacity-75 mt-8">
        Dica: Cada bioma tem seus próprios elementos e desafios únicos.
        Escolha com sabedoria!
      </p>
    </div>
  );
}