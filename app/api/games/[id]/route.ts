import { NextRequest, NextResponse } from 'next/server';
import { AppDataSource } from '@/database/connection';
import { Game } from '@/database/entity/Game';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }

    const gameRepository = AppDataSource.getRepository(Game);
    const game = await gameRepository.findOne({ where: { id: params.id } });
    if (!game) {
      return NextResponse.json({ error: 'Game not found' }, { status: 404 });
    }

    return NextResponse.json(game);
  } catch (error) {
    console.error('Error fetching game:', error);
    return NextResponse.json({ error: 'Failed to fetch game' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }

    const { moves, winner } = await request.json();
    const gameRepository = AppDataSource.getRepository(Game);
    const game = await gameRepository.findOne({ where: { id: params.id } });
    if (!game) {
      return NextResponse.json({ error: 'Game not found' }, { status: 404 });
    }

    game.moves = moves || game.moves;
    game.winner = winner !== undefined ? winner : game.winner;
    await gameRepository.save(game);

    return NextResponse.json({ message: 'Game updated', game });
  } catch (error) {
    console.error('Error updating game:', error);
    return NextResponse.json({ error: 'Failed to update game' }, { status: 500 });
  }
}