import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Wand2, Grid, Leaf } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import RankingTable from './RankingTable';
import GameCard from './GameCard';
import { useWeeklyReset } from '../hooks/useWeeklyReset';
import { useAuthStore } from '../store/authStore';
import { useRankingStore } from '../store/rankingStore';

export default function HomePage() {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const emoji = useAuthStore((state) => state.emoji);
  const logout = useAuthStore((state) => state.logout);
  const nextReset = useWeeklyReset();
  const { weeklyRankings, fetchRankings } = useRankingStore();

  useEffect(() => {
    fetchRankings();
  }, [fetchRankings]);

  const games = [
    {
      id: 'serpentario',
      title: 'Serpentário Literário',
      description: 'Colete letras para formar palavras da literatura!',
      icon: <Wand2 className="w-12 h-12 text-green-500" />,
      path: '/serpentario'
    },
    {
      id: 'tictacquiz',
      title: 'Jogo da Velha Quiz',
      description: 'Responda perguntas para marcar sua jogada!',
      icon: <Grid className="w-12 h-12 text-pink-500" />,
      path: '/tictacquiz'
    },
    {
      id: 'naturebalance',
      title: 'Equilíbrio da Natureza',
      description: 'Mantenha o equilíbrio dos ecossistemas!',
      icon: <Leaf className="w-12 h-12 text-emerald-500" />,
      path: '/naturebalance'
    }
  ];

  return (
    <div className="min-h-screen p-4 relative">
      <ThemeToggle />
      <button
        onClick={logout}
        className="fixed top-4 left-4 z-50 px-4 py-2 rounded-lg glass-effect hover:bg-opacity-80 transition-all"
      >
        Sair
      </button>
      
      <div className="max-w-6xl mx-auto">
        <div className="glass-effect rounded-lg shadow-xl p-8 mb-8">
          <div className="flex flex-col items-center justify-center mb-8">
            <img
              src="https://i.imgur.com/BXziuHD.png"
              alt="Mascote da Casa Amarela"
              className="w-32 h-32 mb-4 animate-float" />
            <div className="text-center">
              <h1 className="text-3xl font-bold mb-2">A Casa Amarela</h1>
              <p className="text-lg mb-2">Biblioteca de Jogos Educativos</p>
              <p className="text-sm flex items-center justify-center gap-2">
                <span>{emoji}</span>
                <span>Bem-vindo(a), {user}!</span>
              </p>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">Jogos Disponíveis</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {games.map(game => (
                <GameCard
                  key={game.id}
                  title={game.title}
                  description={game.description}
                  icon={game.icon}
                  onClick={() => navigate(game.path)}
                />
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-xl font-bold">Rankings Semanais</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {games.map(game => (
                <RankingTable 
                  key={game.id}
                  title={`Ranking Semanal - ${game.title}`}
                  players={(weeklyRankings[game.id] || []).map(r => ({
                    nome: r.username,
                    emoji: r.emoji,
                    pontuacao: r.score,
                    tempo: r.time,
                    dificuldade: 'semanal',
                    tentativas: r.attempts
                  }))}
                />
              ))}
            </div>
          </div>
          
          <p className="text-sm mt-4 text-center opacity-75">
            Próximo reset semanal: {nextReset.toLocaleDateString('pt-BR')} às 00:00
          </p>
        </div>
      </div>
    </div>
  );
}