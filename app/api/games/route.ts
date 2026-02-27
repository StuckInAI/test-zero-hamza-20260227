import { NextRequest, NextResponse } from 'next/server';
import { AppDataSource } from '@/database/connection';
import { Game } from '@/database/entity/Game';

export async function POST(request: NextRequest) {
  try {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }

    const { playerX, playerO } = await request.json();
    const gameRepository = AppDataSource.getRepository(Game);
    const game = gameRepository.create({
      playerX: playerX || 'Player X',
      playerO: playerO || 'Player O',
      moves: [],
      winner: null,
    });
    await gameRepository.save(game);

    return NextResponse.json({ id: game.id, message: 'Game created' }, { status: 201 });
  } catch (error) {
    console.error('Error creating game:', error);
    return NextResponse.json({ error: 'Failed to create game' }, { status: 500 });
  }
}

export async function GET() {
  try {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }

    const gameRepository = AppDataSource.getRepository(Game);
    const games = await gameRepository.find({ order: { createdAt: 'DESC' } });
    return NextResponse.json(games);
  } catch (error) {
    console.error('Error fetching games:', error);
    return NextResponse.json({ error: 'Failed to fetch games' }, { status: 500 });
  }
}