export type Difficulty = 'facil' | 'medio' | 'dificil' | 'extremo';

export interface GameState {
  snake: Array<{ x: number; y: number }>;
  food: { x: number; y: number; letter: string };
  direction: 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';
  speed: number;
  score: number;
  gameOver: boolean;
  currentWord: string;
  targetWord: string;
  bookUrl?: string;
  wordType: 'book' | 'author' | 'character';
  collectedLetters: string[];
  startTime: number;
  difficulty: Difficulty;
  wordsCompleted: number;
  author?: string;
  genre?: string;
  coverUrl?: string;
}

export interface DifficultyConfig {
  speed: number;
  scoreMultiplier: number;
  description: string;
  maxWords?: number;
}

export interface LiteraryWord {
  word: string;
  bookUrl?: string;
  type: 'book' | 'author' | 'character';
  author?: string;
  genre?: string;
  coverUrl?: string;
}