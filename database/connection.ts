import { DataSource } from 'typeorm';
import { Game } from './entity/Game';
import * as path from 'path';

const databasePath = path.join(process.cwd(), 'database', 'games.db');

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: databasePath,
  synchronize: true, // Auto-create tables based on entities (use migrations in production)
  logging: false,
  entities: [Game],
  migrations: [],
  subscribers: [],
});

// Initialize connection
AppDataSource.initialize().catch((error) => console.error('Database connection error:', error));