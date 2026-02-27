import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';
import { Player, Move } from '@/types/game';

@Entity('games')
export class Game {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  playerX: string;

  @Column()
  playerO: string;

  @Column('json')
  moves: Move[];

  @Column({ type: 'varchar', nullable: true })
  winner: Player | null;

  @CreateDateColumn()
  createdAt: Date;
}