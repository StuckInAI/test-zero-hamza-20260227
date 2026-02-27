"use client";

import { useState, useEffect } from 'react';
import Board from '@/app/components/Board';
import GameStatus from '@/app/components/GameStatus';
import ResetButton from '@/app/components/ResetButton';
import { GameState, Player, Move } from '@/types/game';
import { checkWinner, isBoardFull } from '@/lib/gameLogic';

export default function Home() {
  const [gameState, setGameState] = useState<GameState>({
    board: Array(9).fill(null),
    currentPlayer: Player.X,
    winner: null,
    isDraw: false,
    moves: [],
  });
  const [gameId, setGameId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Initialize or load game
  useEffect(() => {
    const initGame = async () => {
      try {
        const response = await fetch('/api/games', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ playerX: 'Player X', playerO: 'Player O' }),
        });
        const data = await response.json();
        setGameId(data.id);
        setGameState(prev => ({ ...prev, moves: [] }));
      } catch (error) {
        console.error('Failed to initialize game:', error);
      }
    };
    initGame();
  }, []);

  const handleCellClick = async (index: number) => {
    if (gameState.board[index] || gameState.winner || gameState.isDraw || !gameId || loading) return;

    const newBoard = [...gameState.board];
    newBoard[index] = gameState.currentPlayer;
    const newMove: Move = { player: gameState.currentPlayer, position: index };
    const newMoves = [...gameState.moves, newMove];
    const winner = checkWinner(newBoard);
    const isDraw = !winner && isBoardFull(newBoard);
    const nextPlayer = gameState.currentPlayer === Player.X ? Player.O : Player.X;

    const updatedState: GameState = {
      board: newBoard,
      currentPlayer: nextPlayer,
      winner,
      isDraw,
      moves: newMoves,
    };

    setGameState(updatedState);
    setLoading(true);

    try {
      await fetch(`/api/games/${gameId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          moves: newMoves,
          winner,
        }),
      });
    } catch (error) {
      console.error('Failed to update game:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = async () => {
    if (!gameId) return;
    setLoading(true);
    try {
      const response = await fetch(`/api/games/${gameId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          moves: [],
          winner: null,
        }),
      });
      const data = await response.json();
      setGameState({
        board: Array(9).fill(null),
        currentPlayer: Player.X,
        winner: null,
        isDraw: false,
        moves: [],
      });
    } catch (error) {
      console.error('Failed to reset game:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-8">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 md:p-8 w-full max-w-lg">
        <GameStatus
          currentPlayer={gameState.currentPlayer}
          winner={gameState.winner}
          isDraw={gameState.isDraw}
          loading={loading}
        />
        <Board board={gameState.board} onCellClick={handleCellClick} disabled={!!gameState.winner || gameState.isDraw || loading} />
        <ResetButton onReset={handleReset} disabled={loading} />
      </div>
      <div className="text-sm text-gray-500 dark:text-gray-400 text-center">
        <p>Game ID: {gameId ? gameId.substring(0, 8) + '...' : 'Loading...'}</p>
        <p>Moves: {gameState.moves.length}</p>
      </div>
    </div>
  );
}