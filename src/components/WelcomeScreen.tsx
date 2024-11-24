import React from 'react';
import { BookOpen, ArrowLeft } from 'lucide-react';
import DifficultySelector from './DifficultySelector';

interface WelcomeScreenProps {
  onStart: (difficulty: 'facil' | 'medio' | 'dificil') => void;
  onBack: () => void;
}

export default function WelcomeScreen({ onStart, onBack }: WelcomeScreenProps) {
  return (
    <div>
      <button onClick={onBack} className="back-button mb-6">
        <ArrowLeft className="w-4 h-4" />
        Voltar
      </button>

      <div className="flex flex-col items-center mb-8">
        <BookOpen className="quiz-icon" />
        <h1 className="text-3xl font-bold mb-4">Quiz Literário</h1>
        
        <div className="text-sm opacity-75 space-y-2 mb-8">
          <h2 className="font-semibold mb-2">Como jogar:</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>Responda questões sobre literatura brasileira</li>
            <li>Ganhe pontos por resposta correta baseado na dificuldade</li>
            <li>Seja rápido! O tempo conta para o ranking</li>
            <li>Leia as explicações para aprender mais</li>
          </ul>
        </div>
      </div>

      <DifficultySelector onSelect={onStart} />
    </div>
  );
}