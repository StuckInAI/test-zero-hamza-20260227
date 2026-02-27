import Cell from './Cell';
import { Player } from '@/types/game';

type BoardProps = {
  board: (Player | null)[];
  onCellClick: (index: number) => void;
  disabled: boolean;
};

export default function Board({ board, onCellClick, disabled }: BoardProps) {
  return (
    <div className="grid grid-cols-3 gap-4 my-8">
      {board.map((cell, index) => (
        <Cell
          key={index}
          value={cell}
          onClick={() => onCellClick(index)}
          disabled={disabled || cell !== null}
          index={index}
        />
      ))}
    </div>
  );
}