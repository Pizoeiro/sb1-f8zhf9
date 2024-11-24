import React, { ReactNode } from 'react';

interface GameCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  onClick: () => void;
}

export default function GameCard({ title, description, icon, onClick }: GameCardProps) {
  return (
    <button
      onClick={onClick}
      className="glass-card p-6 rounded-lg transition-all duration-300 hover:transform hover:scale-105 group text-left w-full"
    >
      <div className="flex items-start space-x-4">
        {icon}
        <div>
          <h3 className="text-xl font-bold mb-2">{title}</h3>
          <p className="text-sm opacity-75">{description}</p>
        </div>
      </div>
    </button>
  );
}