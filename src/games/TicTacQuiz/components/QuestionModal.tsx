import React, { useState, useEffect } from 'react';
import { Question } from '../types';

interface QuestionModalProps {
  question: Question;
  onAnswer: (isCorrect: boolean) => void;
}

export default function QuestionModal({ question, onAnswer }: QuestionModalProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  useEffect(() => {
    setSelectedAnswer(null);
    setShowExplanation(false);
  }, [question]);

  const handleAnswer = (index: number) => {
    if (selectedAnswer !== null) return;
    
    setSelectedAnswer(index);
    setShowExplanation(true);
    
    const isCorrect = index === question.correctAnswer;
    setTimeout(() => {
      onAnswer(isCorrect);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="glass-effect rounded-lg p-6 max-w-lg w-full animate-fadeIn">
        <h3 className="text-xl font-bold mb-4">{question.text}</h3>

        <div className="space-y-3">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(index)}
              disabled={selectedAnswer !== null}
              className={`w-full p-4 rounded-lg text-left transition-all ${
                selectedAnswer !== null
                  ? index === question.correctAnswer
                    ? 'bg-green-100 border-green-500 text-green-900'
                    : selectedAnswer === index
                    ? 'bg-red-100 border-red-500 text-red-900'
                    : 'bg-gray-50 border-gray-200 dark:bg-gray-800 dark:text-gray-200'
                  : 'hover:bg-purple-50 dark:hover:bg-purple-900 border-gray-200 dark:border-gray-700 dark:text-gray-200'
              } border-2`}
            >
              <span className="mr-3">{String.fromCharCode(65 + index)}.</span>
              {option}
            </button>
          ))}
        </div>

        {showExplanation && (
          <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900 rounded-lg animate-fadeIn">
            <p className="text-blue-800 dark:text-blue-100">{question.explanation}</p>
          </div>
        )}
      </div>
    </div>
  );
}