import { Module } from '@nestjs/common';
import { WishlistsService } from './wishlists.service';
import { WishlistsController } from './wishlists.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wishlist } from './entities/wishlist.entity';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Wishlist, User])],
  controllers: [WishlistsController],
  providers: [WishlistsService, UsersService],
  exports: [WishlistsService]
})
export class WishlistsModule { }
