import React from 'react';

interface BalanceMeterProps {
  balance: number;
}

export default function BalanceMeter({ balance }: BalanceMeterProps) {
  const getZoneColor = (value: number) => {
    if (value <= 30) return 'bg-red-500';
    if (value <= 70) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <div className="w-full">
      <div className="flex justify-between text-sm mb-1">
        <span>Equilíbrio do Ecossistema</span>
        <span className="font-medium">{Math.round(balance)}%</span>
      </div>
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <div
          className={`h-full transition-all duration-300 ${getZoneColor(balance)}`}
          style={{ width: `${balance}%` }}
        />
      </div>
      <div className="flex justify-between text-xs mt-1 opacity-75">
        <span>Crítico</span>
        <span>Instável</span>
        <span>Equilibrado</span>
      </div>
    </div>
  );
}