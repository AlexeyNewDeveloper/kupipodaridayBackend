import { Injectable } from '@nestjs/common';
import { CreateOfferDto } from './dto/create-offer.dto';
import { UpdateOfferDto } from './dto/update-offer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Offer } from './entities/offer.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OffersService {
  constructor(
    @InjectRepository(Offer)
    private offerRepository: Repository<Offer>,
  ) { }

  async create(createOfferDto: CreateOfferDto): Promise<Offer> {
    return this.offerRepository.save(createOfferDto);
  }

  async findAll(): Promise<Offer[]> {
    return this.offerRepository.find();
  }

  async findOne(id: number) {
    return this.offerRepository.findOneBy({ id });
  }

  async updateOne(id: number, updateOfferDto: UpdateOfferDto) {
    return this.offerRepository.update(id, updateOfferDto);
  }

  async removeOne(id: number) {
    return this.offerRepository.delete(id);
  }
}
