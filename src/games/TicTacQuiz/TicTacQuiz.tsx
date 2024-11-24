import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { useRankingStore } from '../../store/rankingStore';
import { GameState, GameMode, Difficulty, Player, Question } from './types';
import { BOARD_SIZE, DIFFICULTY_CONFIGS, WINNING_COMBINATIONS } from './config';
import GameBoard from './components/GameBoard';
import GameOverScreen from './components/GameOverScreen';
import DifficultySelector from './components/DifficultySelector';
import ModeSelector from './components/ModeSelector';
import QuestionModal from './components/QuestionModal';
import { getRandomQuestion } from './utils/questionUtils';
import { findBestMove } from './utils/computerMove';

const INITIAL_STATE: GameState = {
  board: Array(BOARD_SIZE).fill(null),
  currentPlayer: 'X',
  winner: null,
  score: 0,
  startTime: Date.now(),
  difficulty: 'facil',
  questionsAnswered: 0,
  correctAnswers: 0,
  gameMode: 'pvp',
  usedQuestions: new Set(),
};

export default function TicTacQuiz() {
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [gameMode, setGameMode] = useState<GameMode | null>(null);
  const [selectedCell, setSelectedCell] = useState<number | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const navigate = useNavigate();
  const user = useAuthStore(state => state.user);
  const emoji = useAuthStore(state => state.emoji);
  const { updateScore } = useRankingStore();

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);

  useEffect(() => {
    if (gameState?.gameMode === 'computer' && gameState.currentPlayer === 'O' && !gameState.winner) {
      const delay = DIFFICULTY_CONFIGS[gameState.difficulty].computerDelay;
      const timeoutId = setTimeout(() => {
        const computerMove = findBestMove(gameState.board);
        if (computerMove !== -1) {
          makeMove(computerMove);
        }
      }, delay);

      return () => clearTimeout(timeoutId);
    }
  }, [gameState?.currentPlayer, gameState?.board]);

  const checkWinner = (board: Array<Player | null>): Player | 'draw' | null => {
    for (const [a, b, c] of WINNING_COMBINATIONS) {
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }

    if (board.every(cell => cell !== null)) {
      return 'draw';
    }

    return null;
  };

  const makeMove = (index: number) => {
    if (!gameState || gameState.board[index] || gameState.winner) return;

    const newBoard = [...gameState.board];
    newBoard[index] = gameState.currentPlayer;
    const winner = checkWinner(newBoard);

    setGameState(prev => prev ? ({
      ...prev,
      board: newBoard,
      currentPlayer: prev.currentPlayer === 'X' ? 'O' : 'X',
      winner,
    }) : null);

    if (winner) {
      handleGameOver();
    }
  };

  const handleCellClick = (index: number) => {
    if (!gameState || gameState.board[index] || gameState.winner || 
        (gameState.gameMode === 'computer' && gameState.currentPlayer === 'O')) return;

    const question = getRandomQuestion(gameState.difficulty, gameState.usedQuestions);
    if (question) {
      setSelectedCell(index);
      setCurrentQuestion(question);
    }
  };

  const handleAnswerSubmit = (isCorrect: boolean) => {
    if (!gameState || selectedCell === null || !currentQuestion) return;

    const scoreMultiplier = DIFFICULTY_CONFIGS[gameState.difficulty].scoreMultiplier;
    
    if (isCorrect) {
      makeMove(selectedCell);
      setGameState(prev => prev ? ({
        ...prev,
        score: prev.score + (100 * scoreMultiplier),
        questionsAnswered: prev.questionsAnswered + 1,
        correctAnswers: prev.correctAnswers + 1,
        usedQuestions: new Set([...prev.usedQuestions, currentQuestion.id]),
      }) : null);
    } else {
      setGameState(prev => prev ? ({
        ...prev,
        currentPlayer: prev.currentPlayer === 'X' ? 'O' : 'X',
        questionsAnswered: prev.questionsAnswered + 1,
        usedQuestions: new Set([...prev.usedQuestions, currentQuestion.id]),
      }) : null);
    }

    setSelectedCell(null);
    setCurrentQuestion(null);
  };

  const selectGameMode = (mode: GameMode) => {
    setGameMode(mode);
  };

  const startGame = (difficulty: Difficulty) => {
    if (!gameMode) return;
    
    setGameState({
      ...INITIAL_STATE,
      difficulty,
      gameMode,
      startTime: Date.now(),
    });
  };

  const resetGame = () => {
    if (!gameState) return;
    startGame(gameState.difficulty);
  };

  const handleGameOver = () => {
    if (!gameState || !user || !emoji) return;
    
    const finalTime = Math.floor((Date.now() - gameState.startTime) / 1000);
    updateScore(user, emoji, 'tictacquiz', gameState.score, finalTime);
  };

  const handleBack = () => {
    navigate('/');
  };

  if (!gameMode) {
    return (
      <div className="min-h-screen p-6">
        <button
          onClick={handleBack}
          className="mb-6 flex items-center gap-2 opacity-75 hover:opacity-100 transition-opacity"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar ao Menu
        </button>
        <div className="glass-effect rounded-lg p-6">
          <ModeSelector onSelect={selectGameMode} />
        </div>
      </div>
    );
  }

  if (!gameState) {
    return (
      <div className="min-h-screen p-6">
        <button
          onClick={handleBack}
          className="mb-6 flex items-center gap-2 opacity-75 hover:opacity-100 transition-opacity"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar ao Menu
        </button>
        <div className="glass-effect rounded-lg p-6">
          <DifficultySelector onSelect={startGame} />
        </div>
      </div>
    );
  }

  if (gameState.winner) {
    return (
      <GameOverScreen
        winner={gameState.winner}
        score={gameState.score}
        onPlayAgain={resetGame}
        onBack={handleBack}
        elapsedTime={Math.floor((Date.now() - gameState.startTime) / 1000)}
        difficulty={gameState.difficulty}
        questionsAnswered={gameState.questionsAnswered}
        correctAnswers={gameState.correctAnswers}
        gameMode={gameState.gameMode}
      />
    );
  }

  return (
    <div className="min-h-screen p-6">
      <button
        onClick={handleBack}
        className="mb-6 flex items-center gap-2 opacity-75 hover:opacity-100 transition-opacity"
      >
        <ArrowLeft className="w-4 h-4" />
        Voltar ao Menu
      </button>

      <div className="glass-effect rounded-lg p-6">
        <GameBoard
          board={gameState.board}
          currentPlayer={gameState.currentPlayer}
          onCellClick={handleCellClick}
          score={gameState.score}
          startTime={gameState.startTime}
          difficulty={gameState.difficulty}
          questionsAnswered={gameState.questionsAnswered}
          correctAnswers={gameState.correctAnswers}
          gameMode={gameState.gameMode}
        />
      </div>

      {currentQuestion && (
        <QuestionModal
          question={currentQuestion}
          onAnswer={handleAnswerSubmit}
        />
      )}
    </div>
  );
}