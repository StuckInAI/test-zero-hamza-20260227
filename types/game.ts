export enum Player {
  X = 'X',
  O = 'O',
}

export type Move = {
  player: Player;
  position: number;
};

export type GameState = {
  board: (Player | null)[];
  currentPlayer: Player;
  winner: Player | null;
  isDraw: boolean;
  moves: Move[];
};

export type GameEntity = {
  id: string;
  playerX: string;
  playerO: string;
  moves: Move[];
  winner: Player | null;
  createdAt: Date;
};