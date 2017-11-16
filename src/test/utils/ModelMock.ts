/**
 * @author Humberto Machado
 *
 */
import { Column, Entity, PrimaryGeneratedColumn, PrimaryColumn } from 'typeorm';

@Entity()
export class ModelMock {
    @PrimaryColumn()
    id: number;
    @Column({nullable: true})
    created_at: Date;
    @Column({nullable: true})
    updated_at: Date;
    @Column()
    mockCol1: string;
    @Column()
    mockCol2: number;
}