export type Difficulty = 'facil' | 'medio' | 'dificil' | 'extremo';
export type Biome = 'floresta' | 'oceano' | 'savana' | 'tundra' | 'deserto' | 'recife' | 'mangue' | 'pantanal' | 'caatinga' | 'cerrado' | 'pampa' | 'mataatlantica';
export type ElementType = 'good' | 'bad';

export interface Element {
  id: number;
  type: ElementType;
  x: number;
  y: number;
  speed: number;
  emoji: string;
}

export interface GameState {
  started: boolean;
  finished: boolean;
  score: number;
  startTime: number;
  difficulty: Difficulty;
  biome: Biome;
  elements: Element[];
  pendulumX: number;
  gameOver: boolean;
  paused: boolean;
  level: number;
  balance: number;
  gameOverReason?: 'balance' | 'maxScore';
  attempts: number;
  elementsCollected: number;
  threatsAvoided: number;
}
