import { Player } from '@/types/game';

function XIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
      <line x1="4" y1="4" x2="20" y2="20" />
      <line x1="20" y1="4" x2="4" y2="20" />
    </svg>
  );
}

function CircleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
      <circle cx="12" cy="12" r="8" />
    </svg>
  );
}

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
      {value === Player.X && <XIcon className="w-16 h-16 md:w-20 md:h-20 text-blue-600 dark:text-blue-400" />}
      {value === Player.O && <CircleIcon className="w-16 h-16 md:w-20 md:h-20 text-red-600 dark:text-red-400" />}
    </button>
  );
}