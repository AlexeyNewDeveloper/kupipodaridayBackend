import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersModule } from "./users/users.module";
import { WishesModule } from "./wishes/wishes.module";
import { WishlistsModule } from "./wishlists/wishlists.module";
import { OffersModule } from "./offers/offers.module";
import { User } from "./users/entities/user.entity";
import { Wish } from "./wishes/entities/wish.entity";
import { Wishlist } from "./wishlists/entities/wishlist.entity";
import { Offer } from "./offers/entities/offer.entity";
import { AuthModule } from "./auth/auth.module";
import { HashModule } from "./hash/hash.module";
import { AuthService } from "./auth/auth.service";
import { JwtService } from "@nestjs/jwt";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "student",
      password: "student",
      database: "kupipodariday_project",
      entities: [User, Wish, Wishlist, Offer],
      synchronize: true,
      retryAttempts: 3,
    }),
    UsersModule,
    WishesModule,
    WishlistsModule,
    OffersModule,
    HashModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, JwtService],
})
// eslint-disable-next-line prettier/prettier
export class AppModule { }
