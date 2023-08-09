import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { WishesService } from './wishes.service';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';
import { JwtAuthGuard } from 'src/auth/strategies/jwt/jwt-auth.guard';

@Controller('wishes')
export class WishesController {
  constructor(private readonly wishesService: WishesService) { }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Request() req, @Body() createWishDto: CreateWishDto) {
    return this.wishesService.create(createWishDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('last')
  findLast() {
    return this.wishesService.findAll({
      order: {
        id: 'DESC'
      },
      skip: 0,
      take: 20
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get('top')
  findTop() {
    return this.wishesService.findAll({
      order: {
        id: 'ASC'
      },
      skip: 0,
      take: 20
    });
  }


  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getWish(@Param('id') id: string) {
    return this.wishesService.findOne({
      where: { id: +id },
    });
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  updateWish(@Request() req, @Param('id') id: string, @Body() updateWishDto: UpdateWishDto) {
    return this.wishesService.updateOne({ id: +id, owner: req.user }, updateWishDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Request() req, @Param('id') id: string) {
    return this.wishesService.removeOne({ id: +id, owner: req.user });
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/copy')
  async copyWish(@Request() req, @Param('id') id: string) {
    const wish = await this.wishesService.findOne({
      where: { id: +id },
      select: {
        name: true,
        link: true,
        image: true,
        price: true,
        description: true
      }
    });
    return this.wishesService.create(wish);
  }
}
