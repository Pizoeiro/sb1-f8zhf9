import React, { useEffect, useRef, useCallback } from 'react';
import { Clock, Star } from 'lucide-react';
import { GameState } from '../types';
import { 
  GAME_WIDTH, 
  GAME_HEIGHT, 
  ELEMENT_SIZE, 
  PENDULUM_WIDTH,
  PENDULUM_HEIGHT,
  DIFFICULTY_CONFIGS,
  BIOME_MASCOTS,
  ELEMENT_SCORES 
} from '../config';
import { createElement, getRandomElementType } from '../utils/elementSpawner';
import BalanceMeter from './BalanceMeter';

interface GameBoardProps {
  gameState: GameState;
  setGameState: React.Dispatch<React.SetStateAction<GameState | null>>;
  onGameOver: (reason: 'balance' | 'maxScore') => void;
}

export default function GameBoard({ gameState, setGameState, onGameOver }: GameBoardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameLoopRef = useRef<number>();
  const drawLoopRef = useRef<number>();
  const lastUpdateTimeRef = useRef<number>(0);
  const lastSpawnTimeRef = useRef<number>(0);
  const lastBalanceUpdateRef = useRef<number>(0);
  const elementsCollectedRef = useRef(0);
  const threatsAvoidedRef = useRef(0);

  const formatTime = (startTime: number) => {
    const seconds = Math.floor((Date.now() - startTime) / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) * (canvas.width / rect.width);
    const clampedX = Math.max(PENDULUM_WIDTH / 2, Math.min(GAME_WIDTH - PENDULUM_WIDTH / 2, x));
    
    setGameState(prev => prev ? { ...prev, pendulumX: clampedX } : null);
  }, [setGameState]);

  const spawnElement = useCallback((currentTime: number) => {
    const config = DIFFICULTY_CONFIGS[gameState.difficulty];
    
    if (currentTime - lastSpawnTimeRef.current >= config.elementSpawnRate) {
      lastSpawnTimeRef.current = currentTime;
      
      const type = getRandomElementType();
      const element = createElement(type, config.speed, gameState.biome);
      
      setGameState(prev => {
        if (!prev) return null;
        return {
          ...prev,
          elements: [...prev.elements, element]
        };
      });
    }
  }, [gameState.difficulty, gameState.biome, setGameState]);

  const updateBalance = useCallback((currentTime: number) => {
    if (currentTime - lastBalanceUpdateRef.current >= 1000) {
      lastBalanceUpdateRef.current = currentTime;
      
      setGameState(prev => {
        if (!prev) return null;
        
        const config = DIFFICULTY_CONFIGS[prev.difficulty];
        const newBalance = Math.max(0, prev.balance - config.balanceDecayRate);
        
        if (newBalance <= 0) {
          onGameOver('balance');
          return { ...prev, balance: newBalance };
        }
        
        return {
          ...prev,
          balance: newBalance
        };
      });
    }
  }, [onGameOver, setGameState]);

  const updateElements = useCallback((deltaTime: number) => {
    setGameState(prev => {
      if (!prev) return null;

      const config = DIFFICULTY_CONFIGS[prev.difficulty];
      let newScore = prev.score;
      let newBalance = prev.balance;

      const remainingElements = prev.elements.filter(element => {
        element.y += (element.speed * deltaTime) / 16;

        const pendulumBounds = {
          x: prev.pendulumX - PENDULUM_WIDTH / 2,
          y: GAME_HEIGHT - PENDULUM_HEIGHT,
          width: PENDULUM_WIDTH,
          height: PENDULUM_HEIGHT
        };

        const elementBounds = {
          x: element.x,
          y: element.y,
          width: ELEMENT_SIZE,
          height: ELEMENT_SIZE
        };

        const collision = 
          elementBounds.x < pendulumBounds.x + pendulumBounds.width &&
          elementBounds.x + elementBounds.width > pendulumBounds.x &&
          elementBounds.y < pendulumBounds.y + pendulumBounds.height &&
          elementBounds.y + elementBounds.height > pendulumBounds.y;

        if (collision) {
          if (element.type === 'good') {
            const scoreIncrease = ELEMENT_SCORES.good.points;
            newScore += scoreIncrease;
            elementsCollectedRef.current += 1;
            newBalance = Math.min(100, newBalance + ELEMENT_SCORES.good.balance);
            
            if (newScore >= config.maxScore) {
              onGameOver('maxScore');
            }
          } else {
            newScore = Math.max(0, newScore + ELEMENT_SCORES.bad.points);
            newBalance = Math.max(0, newBalance + ELEMENT_SCORES.bad.balance);
            
            if (newBalance <= 0) {
              onGameOver('balance');
            }
          }
          return false;
        }

        if (element.y >= GAME_HEIGHT) {
          if (element.type === 'bad') {
            threatsAvoidedRef.current += 1;
          }
          return false;
        }

        return true;
      });

      return {
        ...prev,
        elements: remainingElements,
        score: newScore,
        balance: newBalance,
        elementsCollected: elementsCollectedRef.current,
        threatsAvoided: threatsAvoidedRef.current
      };
    });
  }, [onGameOver, setGameState]);

  const gameLoop = useCallback((currentTime: number) => {
    if (lastUpdateTimeRef.current === 0) {
      lastUpdateTimeRef.current = currentTime;
      lastSpawnTimeRef.current = currentTime;
      lastBalanceUpdateRef.current = currentTime;
    }

    const deltaTime = currentTime - lastUpdateTimeRef.current;
    lastUpdateTimeRef.current = currentTime;

    spawnElement(currentTime);
    updateBalance(currentTime);
    updateElements(deltaTime);

    gameLoopRef.current = requestAnimationFrame(gameLoop);
  }, [spawnElement, updateBalance, updateElements]);

  const drawGame = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

    // Desenhar grid
    ctx.strokeStyle = 'rgba(128, 90, 213, 0.1)';
    for (let i = 0; i <= GAME_WIDTH; i += 40) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, GAME_HEIGHT);
      ctx.stroke();
    }
    for (let i = 0; i <= GAME_HEIGHT; i += 40) {
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(GAME_WIDTH, i);
      ctx.stroke();
    }

    // Desenhar elementos
    gameState.elements.forEach(element => {
      ctx.font = '32px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(
        element.emoji,
        element.x + ELEMENT_SIZE / 2,
        element.y + ELEMENT_SIZE / 2
      );
    });

    // Desenhar pêndulo/mascote
    ctx.font = '48px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(
      BIOME_MASCOTS[gameState.biome],
      gameState.pendulumX,
      GAME_HEIGHT - PENDULUM_HEIGHT / 2
    );

    drawLoopRef.current = requestAnimationFrame(drawGame);
  }, [gameState.elements, gameState.pendulumX, gameState.biome]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.addEventListener('mousemove', handleMouseMove);
    gameLoopRef.current = requestAnimationFrame(gameLoop);
    drawLoopRef.current = requestAnimationFrame(drawGame);

    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove);
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current);
      }
      if (drawLoopRef.current) {
        cancelAnimationFrame(drawLoopRef.current);
      }
    };
  }, [drawGame, gameLoop, handleMouseMove]);

  const accuracy = elementsCollectedRef.current + threatsAvoidedRef.current > 0 
    ? Math.round((elementsCollectedRef.current / (elementsCollectedRef.current + threatsAvoidedRef.current)) * 100)
    : 0;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <div className="glass-card px-4 py-2 rounded-lg flex items-center gap-2">
            <div className="text-lg font-bold text-purple-600 dark:text-purple-400">
              {gameState.score} / {DIFFICULTY_CONFIGS[gameState.difficulty].maxScore} pontos
            </div>
          </div>
          <div className="glass-card px-4 py-2 rounded-lg flex items-center gap-2">
            <Clock className="w-4 h-4 text-purple-500" />
            <span>{formatTime(gameState.startTime)}</span>
          </div>
        </div>
        <div className="flex gap-1">
          {[...Array(DIFFICULTY_CONFIGS[gameState.difficulty].scoreMultiplier)].map((_, i) => (
            <Star key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" />
          ))}
        </div>
      </div>

      <div className="mb-4">
        <BalanceMeter balance={gameState.balance} />
      </div>

      <canvas
        ref={canvasRef}
        width={GAME_WIDTH}
        height={GAME_HEIGHT}
        className="bg-white dark:bg-gray-900 rounded-lg shadow-lg mx-auto"
      />

      <div className="grid grid-cols-3 gap-4 mt-4 text-center">
        <div className="glass-card p-4 rounded-lg">
          <div className="text-2xl mb-1 text-green-500">🌿</div>
          <div className="text-xl font-bold">{elementsCollectedRef.current}</div>
          <div className="text-sm opacity-75">Elementos Coletados</div>
        </div>
        <div className="glass-card p-4 rounded-lg">
          <div className="text-2xl mb-1 text-red-500">🛡️</div>
          <div className="text-xl font-bold">{threatsAvoidedRef.current}</div>
          <div className="text-sm opacity-75">Ameaças Evitadas</div>
        </div>
        <div className="glass-card p-4 rounded-lg">
          <div className="text-2xl mb-1 text-blue-500">🎯</div>
          <div className="text-xl font-bold">{accuracy}%</div>
          <div className="text-sm opacity-75">Taxa de Acerto</div>
        </div>
      </div>

      <p className="text-center text-sm opacity-75 mt-4">
        Use o mouse para mover o mascote e coletar os elementos corretos
      </p>
    </div>
  );
}
