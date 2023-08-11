import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { WishlistsService } from './wishlists.service';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { JwtAuthGuard } from '../auth/strategies/jwt/jwt-auth.guard';
import { UsersService } from 'src/users/users.service';
import { WishesService } from 'src/wishes/wishes.service';
import { In } from 'typeorm';

@Controller('wishlistlists')
export class WishlistsController {
  constructor(
    private readonly wishlistsService: WishlistsService,
    private readonly wishesService: WishesService,
  ) { }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Request() req, @Body() createWishlistDto: CreateWishlistDto) {
    const wishlist = await this.wishlistsService.create(createWishlistDto, req.user.id);
    return wishlist;
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Request() req) {
    return this.wishlistsService.findAll({
      // where: {
      //   owner: req.user.id
      // }
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {

    const wishlist = await this.wishlistsService.findOne({
      where: {
        id: +id
      },
      relations: {
        owner: true
      }
    });
    const wishesList = await this.wishesService.findAll({
      where: {
        id: In(wishlist.items)
      }
    })
    const responseObject = { ...wishlist, items: wishesList };
    return responseObject;
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(@Request() req, @Param('id') id: string, @Body() updateWishlistDto: UpdateWishlistDto) {
    return this.wishlistsService.updateOne({ id: +id, owner: req.user.id }, updateWishlistDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Request() req, @Param('id') id: string) {
    return this.wishlistsService.removeOne({ id: +id, owner: req.user.id });
  }
}
