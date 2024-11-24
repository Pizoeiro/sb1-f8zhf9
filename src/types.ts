export interface Player {
  nome: string;
  emoji: string;
  pontuacao: number;
  tempo: number;
  dificuldade: string;
  jogo?: string;
  tentativas?: number;
}

export interface GameState {
  started: boolean;
  finished: boolean;
  currentQuestion: number;
  score: number;
  startTime: number;
  dificuldade: string;
}