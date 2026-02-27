import { Player } from '@/types/game';
import { Circle, X } from '@radix-ui/react-icons';

type CellProps = {
  value: Player | null;
  onClick: () => void;
  disabled: boolean;
  index: number;
};

export default function Cell({ value, onClick, disabled, index }: CellProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="w-24 h-24 md:w-32 md:h-32 bg-gray-100 dark:bg-gray-700 rounded-xl flex items-center justify-center text-5xl md:text-6xl font-bold transition-all duration-200 hover:bg-gray-200 dark:hover:bg-gray-600 disabled:hover:bg-gray-100 dark:disabled:hover:bg-gray-700 disabled:cursor-not-allowed shadow-md active:scale-95"
      aria-label={`Cell ${index}, ${value ? `occupied by ${value}` : 'empty'}`}
    >
      {value === Player.X && <X className="w-16 h-16 md:w-20 md:h-20 text-blue-600 dark:text-blue-400" />}
      {value === Player.O && <Circle className="w-16 h-16 md:w-20 md:h-20 text-red-600 dark:text-red-400" />}
    </button>
  );
}