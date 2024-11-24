import React from 'react';
import { Biome } from '../types';
import { BIOME_CONFIGS } from '../config';

interface BiomeBackgroundProps {
  biome: Biome;
  children: React.ReactNode;
}

export default function BiomeBackground({ biome, children }: BiomeBackgroundProps) {
  const config = BIOME_CONFIGS[biome];

  return (
    <div className="min-h-screen p-5">
      <div 
        className="min-h-[calc(100vh-40px)] rounded-lg overflow-hidden transition-all duration-700"
        style={{
          background: `linear-gradient(${config.backgroundColor}, ${config.backgroundColor}), url(${config.backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        <div className="p-4 md:p-6">
          {children}
        </div>
      </div>
    </div>
  );
}