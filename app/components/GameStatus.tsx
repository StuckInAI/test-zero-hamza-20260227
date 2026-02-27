import { Player } from '@/types/game';

type GameStatusProps = {
  currentPlayer: Player;
  winner: Player | null;
  isDraw: boolean;
  loading: boolean;
};

export default function GameStatus({ currentPlayer, winner, isDraw, loading }: GameStatusProps) {
  if (loading) {
    return (
      <div className="text-center py-4">
        <p className="text-lg text-gray-600 dark:text-gray-400">Loading...</p>
      </div>
    );
  }

  if (winner) {
    return (
      <div className="text-center py-4">
        <p className="text-3xl font-bold text-green-600 dark:text-green-400">🎉 {winner} wins!</p>
        <p className="text-gray-600 dark:text-gray-400 mt-2">Game over</p>
      </div>
    );
  }

  if (isDraw) {
    return (
      <div className="text-center py-4">
        <p className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">🤝 It's a draw!</p>
        <p className="text-gray-600 dark:text-gray-400 mt-2">No winner this time</p>
      </div>
    );
  }

  return (
    <div className="text-center py-4">
      <p className="text-2xl font-semibold text-gray-800 dark:text-white">Current Player: <span className={`font-bold ${currentPlayer === Player.X ? 'text-blue-600 dark:text-blue-400' : 'text-red-600 dark:text-red-400'}`}>{currentPlayer}</span></p>
      <p className="text-gray-600 dark:text-gray-400 mt-2">Click on an empty cell to make your move</p>
    </div>
  );
}