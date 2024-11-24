import { Question } from '../games/LiteraQuiz/types';

export function shuffleOptions(question: Question): Question {
  // Create array of indices and options
  const indices = question.options.map((_, index) => index);
  const options = [...question.options];
  
  // Track the correct answer
  const correctOption = options[question.correctAnswer];
  
  // Shuffle both arrays together
  for (let i = options.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    
    // Swap options
    [options[i], options[j]] = [options[j], options[i]];
    // Swap indices
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }
  
  // Find new index of correct answer
  const newCorrectAnswerIndex = indices.indexOf(question.correctAnswer);
  
  return {
    ...question,
    options,
    correctAnswer: newCorrectAnswerIndex,
  };
}