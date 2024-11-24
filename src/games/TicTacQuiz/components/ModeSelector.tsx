import React from 'react';
import { Users, Bot } from 'lucide-react';
import { GameMode } from '../types';

interface ModeSelectorProps {
  onSelect: (mode: GameMode) => void;
}

export default function ModeSelector({ onSelect }: ModeSelectorProps) {
  return (
    <div className="max-w-md mx-auto space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Escolha o Modo de Jogo</h2>
        <p className="text-sm opacity-75 mb-6">
          Jogue contra um amigo ou desafie o computador!
        </p>
      </div>

      <div className="space-y-4">
        <button
          onClick={() => onSelect('pvp')}
          className="w-full p-6 glass-card rounded-lg hover:bg-purple-50 dark:hover:bg-purple-900 transition-all text-left group"
        >
          <div className="flex items-center gap-4">
            <Users className="w-8 h-8 text-purple-500" />
            <div>
              <div className="font-semibold text-lg mb-1">Dois Jogadores</div>
              <div className="text-sm opacity-75">
                Jogue contra um amigo no mesmo dispositivo
              </div>
            </div>
          </div>
        </button>

        <button
          onClick={() => onSelect('computer')}
          className="w-full p-6 glass-card rounded-lg hover:bg-purple-50 dark:hover:bg-purple-900 transition-all text-left group"
        >
          <div className="flex items-center gap-4">
            <Bot className="w-8 h-8 text-purple-500" />
            <div>
              <div className="font-semibold text-lg mb-1">Contra o Computador</div>
              <div className="text-sm opacity-75">
                Desafie a inteligência artificial
              </div>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
}