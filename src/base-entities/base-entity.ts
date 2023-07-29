import { PrimaryGeneratedColumn, Column } from 'typeorm';

export class BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    createdAt: Date;

    @Column()
    updatedAt: Date;

}
