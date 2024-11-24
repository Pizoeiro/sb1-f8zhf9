import React from 'react';
import { Trophy, Clock } from 'lucide-react';
import type { Player } from '../types';

interface RankingTableProps {
  title: string;
  players: Player[];
  limit?: number;
}

export default function RankingTable({ title, players, limit = 5 }: RankingTableProps) {
  const displayPlayers = players.slice(0, limit);

  const formatTime = (seconds: number) => {
    if (!seconds) return '0:00';
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="glass-card rounded-lg p-6">
      <h3 className="text-xl font-bold mb-4">{title}</h3>
      {displayPlayers.length > 0 ? (
        <div className="space-y-3">
          {displayPlayers.map((player, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 rounded-lg glass-effect"
            >
              <div className="flex items-center space-x-3">
                <span className="font-bold text-lg">{index + 1}</span>
                <div>
                  <p className="font-semibold flex items-center gap-2">
                    <span>{player.emoji}</span>
                    <span>{player.nome}</span>
                  </p>
                  <div className="flex items-center text-sm opacity-75 gap-2">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {formatTime(player.tempo)}
                    </div>
                    {player.tentativas && (
                      <span className="text-xs">
                        ({player.tentativas} {player.tentativas === 1 ? 'tentativa' : 'tentativas'})
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="font-bold">
                {player.pontuacao} pts
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center opacity-75">Nenhuma pontuação registrada ainda</p>
      )}
    </div>
  );
}