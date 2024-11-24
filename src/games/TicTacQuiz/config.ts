import { DifficultyConfig } from './types';

export const BOARD_SIZE = 9;

export const DIFFICULTY_CONFIGS: Record<string, DifficultyConfig> = {
  facil: {
    scoreMultiplier: 1,
    description: 'Perguntas básicas para começar',
    computerDelay: 1500,
  },
  medio: {
    scoreMultiplier: 2,
    description: 'Desafios mais elaborados',
    computerDelay: 1000,
  },
  dificil: {
    scoreMultiplier: 3,
    description: 'Para os verdadeiros mestres',
    computerDelay: 500,
  },
};

export const WINNING_COMBINATIONS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
  [0, 4, 8], [2, 4, 6], // Diagonals
];