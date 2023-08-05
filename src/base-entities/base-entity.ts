import { PrimaryGeneratedColumn, Column } from 'typeorm';
import {
    IsDate
} from 'class-validator';

export class BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @IsDate()
    @Column()
    createdAt: Date;

    @IsDate()
    @Column()
    updatedAt: Date;

}
