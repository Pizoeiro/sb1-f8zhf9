import { Player } from '../types';
import { WINNING_COMBINATIONS } from '../config';

export function findBestMove(board: Array<Player | null>): number {
  // First, try to win
  const winningMove = findWinningMove(board, 'O');
  if (winningMove !== -1) return winningMove;

  // Then, block opponent from winning
  const blockingMove = findWinningMove(board, 'X');
  if (blockingMove !== -1) return blockingMove;

  // Try to take center
  if (board[4] === null) return 4;

  // Try to take corners
  const corners = [0, 2, 6, 8];
  const availableCorners = corners.filter(i => board[i] === null);
  if (availableCorners.length > 0) {
    return availableCorners[Math.floor(Math.random() * availableCorners.length)];
  }

  // Take any available side
  const sides = [1, 3, 5, 7];
  const availableSides = sides.filter(i => board[i] === null);
  if (availableSides.length > 0) {
    return availableSides[Math.floor(Math.random() * availableSides.length)];
  }

  // No moves available
  return -1;
}

function findWinningMove(board: Array<Player | null>, player: Player): number {
  for (const [a, b, c] of WINNING_COMBINATIONS) {
    const cells = [board[a], board[b], board[c]];
    const playerCells = cells.filter(cell => cell === player).length;
    const emptyCells = cells.filter(cell => cell === null).length;

    if (playerCells === 2 && emptyCells === 1) {
      if (board[a] === null) return a;
      if (board[b] === null) return b;
      if (board[c] === null) return c;
    }
  }

  return -1;
}