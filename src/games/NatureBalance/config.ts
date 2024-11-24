import { Difficulty, Biome } from './types';

// Game dimensions and sizes
export const GAME_WIDTH = 800;
export const GAME_HEIGHT = 600;
export const ELEMENT_SIZE = 40;
export const PENDULUM_WIDTH = 80;
export const PENDULUM_HEIGHT = 20;

// Scoring system
export const ELEMENT_SCORES = {
  good: {
    points: 100,
    balance: 3 // +3% ecosystem balance
  },
  bad: {
    points: -50,
    balance: -5 // -5% ecosystem balance
  }
};

// Difficulty settings
export const DIFFICULTY_CONFIGS: Record<Difficulty, {
  speed: number;
  scoreMultiplier: number;
  description: string;
  elementSpawnRate: number;
  maxScore: number;
  balanceDecayRate: number;
}> = {
  facil: {
    speed: 2,
    scoreMultiplier: 1,
    description: 'Velocidade menor, ideal para iniciantes',
    elementSpawnRate: 2000, // Spawn every 2 seconds
    maxScore: 1000,
    balanceDecayRate: 1 // 1% per second
  },
  medio: {
    speed: 3,
    scoreMultiplier: 2,
    description: 'Velocidade moderada, para jogadores intermediários',
    elementSpawnRate: 1500, // Spawn every 1.5 seconds
    maxScore: 2000,
    balanceDecayRate: 2 // 2% per second
  },
  dificil: {
    speed: 4,
    scoreMultiplier: 3,
    description: 'Velocidade alta, para jogadores experientes',
    elementSpawnRate: 1000, // Spawn every 1 second
    maxScore: 3000,
    balanceDecayRate: 3 // 3% per second
  },
  extremo: {
    speed: 5,
    scoreMultiplier: 4,
    description: 'Modo extremo com velocidade máxima',
    elementSpawnRate: 800, // Spawn every 0.8 seconds
    maxScore: 5000,
    balanceDecayRate: 5 // 5% per second
  }
};

// Biome configurations
export const BIOME_CONFIGS: Record<Biome, {
  name: string;
  description: string;
  backgroundColor: string;
  elements: {
    good: string[];
    bad: string[];
  };
}> = {
  floresta: {
    name: 'Floresta Amazônica',
    description: 'Proteja a biodiversidade da maior floresta do mundo',
    backgroundColor: 'rgba(45, 90, 39, 0.85)',
    elements: {
      good: ['🦜', '🐒', '🦋', '🌳', '🌿', '🌺', '🦥'],
      bad: ['🔥', '🪓', '🚛']
    }
  },
  oceano: {
    name: 'Oceano Profundo',
    description: 'Preserve a vida marinha e seus ecossistemas',
    backgroundColor: 'rgba(30, 61, 89, 0.85)',
    elements: {
      good: ['🐋', '🐢', '🐠', '🐙', '🦈', '🦀', '🐚'],
      bad: ['🗑️', '🛢️', '🚢']
    }
  },
  caatinga: {
    name: 'Caatinga',
    description: 'Preserve o único bioma exclusivamente brasileiro',
    backgroundColor: 'rgba(193, 154, 107, 0.85)',
    elements: {
      good: ['🦊', '🦎', '🌵', '🦅', '🌺', '🦗', '🦂'],
      bad: ['🔥', '🚜', '⛏️']
    }
  },
  cerrado: {
    name: 'Cerrado',
    description: 'Proteja o berço das águas brasileiras',
    backgroundColor: 'rgba(171, 145, 68, 0.85)',
    elements: {
      good: ['🐺', '🦗', '🌳', '🦅', '🌺', '🦎', '🐜'],
      bad: ['🔥', '🚜', '⛏️']
    }
  },
  pampa: {
    name: 'Pampa',
    description: 'Preserve os campos do sul do Brasil',
    backgroundColor: 'rgba(144, 169, 85, 0.85)',
    elements: {
      good: ['🦊', '🐎', '🌾', '🦅', '🌺', '🦗', '🐜'],
      bad: ['🔥', '🚜', '⛏️']
    }
  },
  mataatlantica: {
    name: 'Mata Atlântica',
    description: 'Proteja a floresta mais antiga do Brasil',
    backgroundColor: 'rgba(56, 102, 65, 0.85)',
    elements: {
      good: ['🦥', '🐒', '🦋', '🌳', '🌿', '🌺', '🦜'],
      bad: ['🔥', '🏗️', '🪓']
    }
  },
  pantanal: {
    name: 'Pantanal',
    description: 'Preserve a maior planície alagada do mundo',
    backgroundColor: 'rgba(76, 120, 168, 0.85)',
    elements: {
      good: ['🐊', '🐆', '🦜', '🐟', '🌿', '🦅', '🦢'],
      bad: ['🔥', '🚜', '🎣']
    }
  },
  mangue: {
    name: 'Manguezal',
    description: 'Proteja o berçário marinho',
    backgroundColor: 'rgba(82, 94, 77, 0.85)',
    elements: {
      good: ['🦀', '🐟', '🦐', '🌳', '🐊', '🐢', '🦅'],
      bad: ['🗑️', '🏗️', '🛢️']
    }
  },
  recife: {
    name: 'Recifes de Coral',
    description: 'Preserve os jardins submersos',
    backgroundColor: 'rgba(0, 105, 148, 0.85)',
    elements: {
      good: ['🐠', '🐡', '🐙', '🐚', '🦈', '🐋', '🐢'],
      bad: ['🗑️', '🛢️', '🎣']
    }
  },
  savana: {
    name: 'Savana Africana',
    description: 'Mantenha o equilíbrio deste ecossistema único',
    backgroundColor: 'rgba(139, 69, 19, 0.85)',
    elements: {
      good: ['🦁', '🦒', '🦓', '🐘', '🦏', '🌳', '🦬'],
      bad: ['🔫', '🚙', '🔥']
    }
  },
  tundra: {
    name: 'Tundra Ártica',
    description: 'Proteja este frágil ecossistema polar',
    backgroundColor: 'rgba(135, 206, 235, 0.85)',
    elements: {
      good: ['🐻‍❄️', '🦊', '🦭', '🐧', '❄️', '🌨️', '🐋'],
      bad: ['🏭', '⛏️', '🛢️']
    }
  },
  deserto: {
    name: 'Deserto',
    description: 'Preserve a vida adaptada ao extremo',
    backgroundColor: 'rgba(194, 178, 128, 0.85)',
    elements: {
      good: ['🐪', '🦂', '🦎', '🦅', '🌵', '🦊', '🐍'],
      bad: ['🏭', '⛏️', '🚙']
    }
  }
};

export const BIOME_MASCOTS: Record<Biome, string> = {
  floresta: '🦜',
  oceano: '🐋',
  savana: '🦁',
  tundra: '🐻‍❄️',
  deserto: '🐪',
  recife: '🐢',
  mangue: '🦀',
  pantanal: '🐊',
  caatinga: '🦊',
  cerrado: '🐺',
  pampa: '🦅',
  mataatlantica: '🦥'
};