import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { OffersService } from './offers.service';
import { CreateOfferDto } from './dto/create-offer.dto';
import { UpdateOfferDto } from './dto/update-offer.dto';
import { JwtAuthGuard } from 'src/auth/strategies/jwt/jwt-auth.guard';
import { WishesService } from 'src/wishes/wishes.service';
import { UsersService } from 'src/users/users.service';


@Controller('offers')
export class OffersController {
  constructor(
    private readonly offersService: OffersService,
    private readonly wishesService: WishesService,
  ) { }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Request() req, @Body() createOfferDto: CreateOfferDto) {
    const wish = await this.wishesService.findOne({
      where: {
        id: createOfferDto.itemId,
      },
      relations: {
        owner: true
      }
    })

    const finalAmount = wish.raised + createOfferDto.amount;

    if (finalAmount > wish.price) {
      return null
    }

    if (req.user.id !== wish.owner.id) {
      const offer = await this.offersService.create(createOfferDto);
      this.wishesService.getRaise(offer.amount, offer.item.id)
      return offer;
    }

    return null;
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.offersService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.offersService.findOne(+id);
  }
}
