import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { useRankingStore } from '../../store/rankingStore';
import { GameState, Difficulty, Biome } from './types';
import { DIFFICULTY_CONFIGS, BIOME_CONFIGS } from './config';
import GameBoard from './components/GameBoard';
import GameOverScreen from './components/GameOverScreen';
import DifficultySelector from './components/DifficultySelector';
import BiomeSelector from './components/BiomeSelector';
import EmojiGuide from './components/EmojiGuide';
import BiomeInfo from './components/BiomeInfo';
import BiomeBackground from './components/BiomeBackground';

const createInitialState = (difficulty: Difficulty, biome: Biome, currentAttempts: number): GameState => ({
  started: true,
  finished: false,
  score: 0,
  startTime: Date.now(),
  difficulty,
  biome,
  elements: [],
  pendulumX: 400,
  gameOver: false,
  paused: false,
  level: 1,
  balance: 100,
  gameOverReason: undefined,
  attempts: currentAttempts + 1,
  elementsCollected: 0,
  threatsAvoided: 0
});

export default function NatureBalance() {
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [difficulty, setDifficulty] = useState<Difficulty | null>(null);
  const [biome, setBiome] = useState<Biome | null>(null);
  const navigate = useNavigate();
  const user = useAuthStore(state => state.user);
  const emoji = useAuthStore(state => state.emoji);
  const { updateScore, weeklyRankings, fetchRankings } = useRankingStore();

  useEffect(() => {
    fetchRankings();
  }, [fetchRankings]);

  const getCurrentAttempts = () => {
    if (!user) return 0;
    const currentRanking = weeklyRankings['naturebalance']?.find(r => r.username === user);
    return currentRanking?.attempts || 0;
  };

  const handleGameOver = async (reason: 'balance' | 'maxScore') => {
    if (!gameState || !user || !emoji) return;
    
    const finalTime = Math.floor((Date.now() - gameState.startTime) / 1000);
    const finalScore = Math.min(
      gameState.score, 
      DIFFICULTY_CONFIGS[gameState.difficulty].maxScore
    );
    
    await updateScore(user, emoji, 'naturebalance', finalScore, finalTime, gameState.attempts);
    await fetchRankings();
    
    setGameState(prev => prev ? ({
      ...prev,
      score: finalScore,
      gameOver: true,
      gameOverReason: reason
    }) : null);
  };

  const selectDifficulty = (selectedDifficulty: Difficulty) => {
    setDifficulty(selectedDifficulty);
  };

  const selectBiome = (selectedBiome: Biome) => {
    setBiome(selectedBiome);
    const currentAttempts = getCurrentAttempts();
    setGameState(createInitialState(difficulty!, selectedBiome, currentAttempts));
  };

  const resetGame = () => {
    if (!difficulty || !biome) return;
    const currentAttempts = getCurrentAttempts();
    setGameState(createInitialState(difficulty, biome, currentAttempts));
  };

  const handleBack = () => {
    navigate('/');
  };

  if (!user) {
    navigate('/');
    return null;
  }

  const content = (
    <>
      <button
        onClick={handleBack}
        className="mb-4 md:mb-6 flex items-center gap-2 opacity-75 hover:opacity-100 transition-opacity"
      >
        <ArrowLeft className="w-4 h-4" />
        Voltar ao Menu
      </button>

      {!difficulty ? (
        <div className="glass-effect rounded-lg p-6">
          <DifficultySelector onSelect={selectDifficulty} />
        </div>
      ) : !biome ? (
        <div className="glass-effect rounded-lg p-6">
          <BiomeSelector onSelect={selectBiome} />
        </div>
      ) : !gameState || gameState.gameOver ? (
        <GameOverScreen
          score={gameState?.score || 0}
          elapsedTime={gameState ? Math.floor((Date.now() - gameState.startTime) / 1000) : 0}
          difficulty={difficulty}
          biome={biome}
          elementsCollected={gameState?.elementsCollected || 0}
          threatsStopped={gameState?.threatsAvoided || 0}
          balance={gameState?.balance || 0}
          maxScore={DIFFICULTY_CONFIGS[difficulty].maxScore}
          gameOverReason={gameState?.gameOverReason || 'balance'}
          onPlayAgain={resetGame}
          onBack={handleBack}
          attempts={gameState?.attempts || 1}
        />
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 md:gap-6">
          <div className="xl:col-span-7">
            <div className="glass-effect rounded-lg p-4 md:p-6">
              <GameBoard
                gameState={gameState}
                setGameState={setGameState}
                onGameOver={handleGameOver}
              />
            </div>
          </div>

          <div className="xl:col-span-5 space-y-4">
            <EmojiGuide biome={biome} />
            <BiomeInfo biome={biome} />
          </div>
        </div>
      )}
    </>
  );

  return (
    <div className="min-h-screen p-4 md:p-6">
      {biome ? (
        <BiomeBackground biome={biome}>
          {content}
        </BiomeBackground>
      ) : (
        content
      )}
    </div>
  );
}