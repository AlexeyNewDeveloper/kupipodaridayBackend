import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { WishesService } from './wishes.service';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';
import { JwtAuthGuard } from 'src/auth/strategies/jwt/jwt-auth.guard';

@Controller('wishes')
export class WishesController {
  constructor(private readonly wishesService: WishesService) { }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createWishDto: CreateWishDto) {
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
  @Get('last')
  findTop() {
    return this.wishesService.findAll({
      order: {
        id: 'ASC'
      },
      skip: 0,
      take: 20
    });
  }


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.wishesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWishDto: UpdateWishDto) {
    return this.wishesService.updateOne(+id, updateWishDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.wishesService.removeOne(+id);
  }
}
