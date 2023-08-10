import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from 'src/base-entities/base-entity';
import { User } from 'src/users/entities/user.entity';
import { Wish } from 'src/wishes/entities/wish.entity';
import { IsNumber, IsBoolean } from 'class-validator';

@Entity()
export class Offer extends BaseEntity {
    @Column()
    @ManyToOne(() => User, (user) => user.wishlists)
    user: User

    @OneToMany(() => Wish, wish => wish.offers)
    @Column()
    item: Wish;

    @IsNumber()
    @Column({
        type: "numeric",
    })
    amount: number;

    @IsBoolean()
    @Column({
        default: false,
    })
    hidden: boolean;
}
