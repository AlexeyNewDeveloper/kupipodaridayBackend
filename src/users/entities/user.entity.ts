import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import {
    Length,
} from 'class-validator';
import { BaseEntity } from 'src/base-entities/base-entity';

@Entity()
export class User extends BaseEntity {

    @Length(2, 30)
    @Column({
        type: "varchar",
        length: 30,
        unique: true,
    })
    username: string;
}
