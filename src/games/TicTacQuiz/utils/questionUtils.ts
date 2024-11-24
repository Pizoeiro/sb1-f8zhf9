import { Question, Difficulty } from '../types';
import { questions } from '../data/questions';

// Fisher-Yates shuffle algorithm
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Shuffle options and update correct answer index
function shuffleQuestion(question: Question): Question {
  const options = [...question.options];
  const correctOption = options[question.correctAnswer];
  const shuffledOptions = shuffleArray(options);
  const newCorrectAnswer = shuffledOptions.indexOf(correctOption);

  return {
    ...question,
    options: shuffledOptions,
    correctAnswer: newCorrectAnswer,
  };
}

export function getRandomQuestion(difficulty: Difficulty, usedQuestions: Set<number>): Question | null {
  // Filter questions by difficulty and exclude used ones
  const availableQuestions = questions
    .filter(q => q.difficulty === difficulty && !usedQuestions.has(q.id));

  if (availableQuestions.length === 0) {
    return null;
  }

  // Get a random question and shuffle its options
  const randomIndex = Math.floor(Math.random() * availableQuestions.length);
  const selectedQuestion = availableQuestions[randomIndex];
  return shuffleQuestion(selectedQuestion);
}