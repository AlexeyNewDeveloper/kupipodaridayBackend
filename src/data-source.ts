import { DataSource } from "typeorm";
import 'reflect-metadata';
import { User } from "./users/entities/user.entity";
import { Wish } from "./wishes/entities/wish.entity";
import { Wishlist } from "./wishlists/entities/wishlist.entity";
import { Offer } from "./offers/entities/offer.entity";


const PostgresDataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'student',
    password: 'student',
    database: 'nest_project',
    entities: [User, Wish, Wishlist, Offer],
    synchronize: false,
})

PostgresDataSource.initialize()
    .then(() => true)
    .catch((err) => err)


export default {
    PostgresDataSource
}