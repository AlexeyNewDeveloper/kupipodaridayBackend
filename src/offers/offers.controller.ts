import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, BadRequestException } from '@nestjs/common';
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
        owner: true,
        offers: {
          user: true
        }
      }
    })

    const finalAmount = Number(wish.raised) + Number(createOfferDto.amount);

    if (finalAmount > Number(wish.price)) {
      throw new BadRequestException('Сумма оффера превышает цену товара.');
    }

    if (req.user.id !== wish.owner.id) {
      const offer = await this.offersService.create(createOfferDto, req.user.id);
      const updatedWish = await this.wishesService.getRaise(+createOfferDto.amount, createOfferDto.itemId)

      return offer;
    } else {
      throw new BadRequestException('Вы не можете скидываться на свои же подарки');
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Request() req) {
    return this.offersService.findAll({
      where: {
        user: req.user.id
      }
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.offersService.findOne(+id);
  }
}
