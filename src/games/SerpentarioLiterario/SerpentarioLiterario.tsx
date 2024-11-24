import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { useRankingStore } from '../../store/rankingStore';
import GameBoard from './components/GameBoard';
import GameOverScreen from './components/GameOverScreen';
import DifficultySelector from './components/DifficultySelector';
import { GameState, Difficulty } from './types';
import { DIFFICULTY_CONFIGS, LITERARY_WORDS } from './config';

const createInitialState = (difficulty: Difficulty): GameState => {
  const randomWord = LITERARY_WORDS[Math.floor(Math.random() * LITERARY_WORDS.length)];
  return {
    snake: [{ x: 10, y: 10 }],
    food: { x: 5, y: 5, letter: randomWord.word[0] },
    direction: 'RIGHT',
    speed: DIFFICULTY_CONFIGS[difficulty].speed,
    score: 0,
    gameOver: false,
    currentWord: '',
    targetWord: randomWord.word,
    bookUrl: randomWord.bookUrl,
    wordType: randomWord.type,
    author: randomWord.author,
    genre: randomWord.genre,
    collectedLetters: [],
    startTime: Date.now(),
    difficulty,
    wordsCompleted: 0,
  };
};

export default function SerpentarioLiterario() {
  const [gameState, setGameState] = useState<GameState | null>(null);
  const navigate = useNavigate();
  const user = useAuthStore(state => state.user);
  const emoji = useAuthStore(state => state.emoji);
  const { updateScore } = useRankingStore();

  const generateFood = useCallback(() => {
    if (!gameState) return null;
    
    const remainingLetters = gameState.targetWord
      .split('')
      .filter(letter => !gameState.collectedLetters.includes(letter));

    if (remainingLetters.length === 0) {
      const maxWords = DIFFICULTY_CONFIGS[gameState.difficulty].maxWords;
      const newWordsCompleted = gameState.wordsCompleted + 1;
      
      if (maxWords && newWordsCompleted >= maxWords) {
        handleGameOver();
        return null;
      }

      const newWord = LITERARY_WORDS[Math.floor(Math.random() * LITERARY_WORDS.length)];
      const multiplier = DIFFICULTY_CONFIGS[gameState.difficulty].scoreMultiplier;
      setGameState(prev => prev ? ({
        ...prev,
        targetWord: newWord.word,
        bookUrl: newWord.bookUrl,
        wordType: newWord.type,
        author: newWord.author,
        genre: newWord.genre,
        collectedLetters: [],
        score: prev.score + (100 * multiplier),
        speed: Math.max(prev.speed - 10, 60),
        wordsCompleted: newWordsCompleted,
      }) : null);
      return null;
    }

    const letter = remainingLetters[Math.floor(Math.random() * remainingLetters.length)];
    const x = Math.floor(Math.random() * 20);
    const y = Math.floor(Math.random() * 20);
    return { x, y, letter };
  }, [gameState]);

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleGameOver = () => {
    if (!gameState) return;
    
    const finalTime = Math.floor((Date.now() - gameState.startTime) / 1000);
    if (user && emoji) {
      updateScore(user, emoji, 'serpentario', gameState.score, finalTime);
    }
    setGameState(prev => prev ? ({ ...prev, gameOver: true }) : null);
  };

  const startGame = (difficulty: Difficulty) => {
    setGameState(createInitialState(difficulty));
  };

  const resetGame = () => {
    if (!gameState) return;
    startGame(gameState.difficulty);
  };

  const handleBack = () => {
    navigate('/');
  };

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

  if (gameState.gameOver) {
    return (
      <GameOverScreen
        score={gameState.score}
        onPlayAgain={resetGame}
        onBack={handleBack}
        elapsedTime={Math.floor((Date.now() - gameState.startTime) / 1000)}
        difficulty={gameState.difficulty}
        wordsCompleted={gameState.wordsCompleted}
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
          gameState={gameState}
          setGameState={setGameState}
          generateFood={generateFood}
          onGameOver={handleGameOver}
        />
      </div>
    </div>
  );
}