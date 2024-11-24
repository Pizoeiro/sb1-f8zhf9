import React, { useEffect, useRef, useCallback } from 'react';
import { Clock, BookOpen } from 'lucide-react';
import { GameState } from '../types';
import { LITERARY_QUOTES } from '../config';
import BookPreview from './BookPreview';

interface GameBoardProps {
  gameState: GameState;
  setGameState: React.Dispatch<React.SetStateAction<GameState | null>>;
  generateFood: () => { x: number; y: number; letter: string } | null;
  onGameOver: () => void;
}

const BOARD_SIZE = 20;
const CELL_SIZE = 20;

export default function GameBoard({
  gameState,
  setGameState,
  generateFood,
  onGameOver,
}: GameBoardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const lastUpdateTimeRef = useRef<number>(0);
  const requestRef = useRef<number>();

  const formatTime = (startTime: number) => {
    const seconds = Math.floor((Date.now() - startTime) / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const moveSnake = useCallback(() => {
    const newSnake = [...gameState.snake];
    const head = { ...newSnake[0] };

    switch (gameState.direction) {
      case 'UP':
        head.y -= 1;
        break;
      case 'DOWN':
        head.y += 1;
        break;
      case 'LEFT':
        head.x -= 1;
        break;
      case 'RIGHT':
        head.x += 1;
        break;
    }

    // Check for collisions with walls
    if (
      head.x < 0 ||
      head.x >= BOARD_SIZE ||
      head.y < 0 ||
      head.y >= BOARD_SIZE
    ) {
      onGameOver();
      return;
    }

    // Check for collisions with self
    if (newSnake.some(segment => segment.x === head.x && segment.y === head.y)) {
      onGameOver();
      return;
    }

    newSnake.unshift(head);

    // Check for food collision
    if (head.x === gameState.food.x && head.y === gameState.food.y) {
      const letter = gameState.food.letter;
      const newFood = generateFood();
      
      setGameState(prev => prev ? ({
        ...prev,
        snake: newSnake,
        food: newFood || prev.food,
        collectedLetters: [...prev.collectedLetters, letter],
      }) : null);
    } else {
      newSnake.pop();
      setGameState(prev => prev ? ({ ...prev, snake: newSnake }) : null);
    }
  }, [gameState.direction, gameState.food, gameState.snake, generateFood, onGameOver, setGameState]);

  const gameLoop = useCallback((timestamp: number) => {
    if (!lastUpdateTimeRef.current) {
      lastUpdateTimeRef.current = timestamp;
    }

    const elapsed = timestamp - lastUpdateTimeRef.current;

    if (elapsed >= gameState.speed) {
      moveSnake();
      lastUpdateTimeRef.current = timestamp;
    }

    requestRef.current = requestAnimationFrame(gameLoop);
  }, [gameState.speed, moveSnake]);

  const drawGame = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw grid
    ctx.strokeStyle = 'rgba(128, 90, 213, 0.1)';
    for (let i = 0; i <= BOARD_SIZE; i++) {
      ctx.beginPath();
      ctx.moveTo(i * CELL_SIZE, 0);
      ctx.lineTo(i * CELL_SIZE, BOARD_SIZE * CELL_SIZE);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, i * CELL_SIZE);
      ctx.lineTo(BOARD_SIZE * CELL_SIZE, i * CELL_SIZE);
      ctx.stroke();
    }

    // Draw snake
    gameState.snake.forEach((segment, index) => {
      if (index === 0) {
        // Draw head
        ctx.fillStyle = '#6B46C1';
      } else {
        // Draw body
        ctx.fillStyle = '#805AD5';
      }
      ctx.fillRect(
        segment.x * CELL_SIZE,
        segment.y * CELL_SIZE,
        CELL_SIZE - 1,
        CELL_SIZE - 1
      );
    });

    // Draw food with letter
    ctx.fillStyle = '#F6E05E';
    ctx.fillRect(
      gameState.food.x * CELL_SIZE,
      gameState.food.y * CELL_SIZE,
      CELL_SIZE - 1,
      CELL_SIZE - 1
    );
    ctx.fillStyle = '#744210';
    ctx.font = '12px monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(
      gameState.food.letter,
      gameState.food.x * CELL_SIZE + CELL_SIZE / 2,
      gameState.food.y * CELL_SIZE + CELL_SIZE / 2
    );
  }, [gameState.food.letter, gameState.food.x, gameState.food.y, gameState.snake]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
          if (gameState.direction !== 'DOWN') {
            setGameState(prev => prev ? ({ ...prev, direction: 'UP' }) : null);
          }
          break;
        case 'ArrowDown':
          if (gameState.direction !== 'UP') {
            setGameState(prev => prev ? ({ ...prev, direction: 'DOWN' }) : null);
          }
          break;
        case 'ArrowLeft':
          if (gameState.direction !== 'RIGHT') {
            setGameState(prev => prev ? ({ ...prev, direction: 'LEFT' }) : null);
          }
          break;
        case 'ArrowRight':
          if (gameState.direction !== 'LEFT') {
            setGameState(prev => prev ? ({ ...prev, direction: 'RIGHT' }) : null);
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    requestRef.current = requestAnimationFrame(gameLoop);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [gameLoop, gameState.direction, setGameState]);

  useEffect(() => {
    drawGame();
  }, [drawGame]);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        <div className="flex items-center gap-4">
          <div className="glass-card px-4 py-2 rounded-lg flex items-center gap-2">
            <div className="text-lg font-bold text-purple-600 dark:text-purple-400">
              {gameState.score} pontos
            </div>
          </div>
          <div className="glass-card px-4 py-2 rounded-lg flex items-center gap-2">
            <Clock className="w-4 h-4 text-purple-500" />
            <span>{formatTime(gameState.startTime)}</span>
          </div>
        </div>
        <div className="glass-card px-6 py-3 rounded-lg flex items-center gap-3 bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900 dark:to-purple-800">
          <BookOpen className="w-5 h-5 text-purple-500" />
          <div className="text-xl tracking-wider">
            {gameState.targetWord.split('').map((letter, i) => (
              <span
                key={i}
                className={`transition-all duration-300 ${
                  gameState.collectedLetters.includes(letter)
                    ? 'text-purple-600 dark:text-purple-300 font-bold'
                    : 'opacity-40'
                }`}
              >
                {letter}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-7 flex justify-center">
          <div>
            <canvas
              ref={canvasRef}
              width={BOARD_SIZE * CELL_SIZE}
              height={BOARD_SIZE * CELL_SIZE}
              className="bg-white dark:bg-gray-900 rounded-lg shadow-lg"
            />
            <div className="text-center text-sm opacity-75 mt-4">
              Use as setas do teclado para controlar a serpente
            </div>
          </div>
        </div>

        <div className="md:col-span-5 space-y-4">
          {gameState.bookUrl && gameState.author && gameState.genre && (
            <BookPreview
              title={gameState.targetWord}
              author={gameState.author}
              genre={gameState.genre}
              bookUrl={gameState.bookUrl}
              coverUrl={gameState.coverUrl}
            />
          )}

          {LITERARY_QUOTES[gameState.targetWord] && (
            <div className="glass-card p-4 rounded-lg text-center text-sm italic opacity-75 animate-fadeIn">
              {LITERARY_QUOTES[gameState.targetWord]}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}