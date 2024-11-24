export type Difficulty = 'facil' | 'medio' | 'dificil';
export type GameMode = 'pvp' | 'computer';
export type Player = 'X' | 'O';

export interface GameState {
  board: Array<Player | null>;
  currentPlayer: Player;
  winner: Player | 'draw' | null;
  score: number;
  startTime: number;
  difficulty: Difficulty;
  questionsAnswered: number;
  correctAnswers: number;
  gameMode: GameMode;
  usedQuestions: Set<number>;
}

export interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  category: 'literatura' | 'historia' | 'geografia' | 'ciencias' | 'matematica';
}

export interface DifficultyConfig {
  scoreMultiplier: number;
  description: string;
  computerDelay: number;
}