import { Entity, ManyToOne, Column, ManyToMany, OneToMany } from 'typeorm';
import { BaseEntity } from 'src/base-entities/base-entity';
import { User } from 'src/users/entities/user.entity';
import { Wish } from 'src/wishes/entities/wish.entity';
import { IsArray, IsString, IsUrl, Length } from 'class-validator';

@Entity()
export class Wishlist extends BaseEntity {

    @ManyToOne(() => User, (user) => user.wishlists)
    owner: User

    @IsString()
    @Length(1, 250)
    @Column({
        type: "varchar",
        length: 250,
    })
    name: string

    @IsString()
    @Length(1500)
    @Column({
        type: "varchar",
        length: 1500,
        nullable: true
    })
    description: string

    @IsUrl()
    @IsString()
    @Column()
    image: string

    @IsArray()
    @Column({
        type: 'simple-array',
        default: []
    })
    items: number[]
}
