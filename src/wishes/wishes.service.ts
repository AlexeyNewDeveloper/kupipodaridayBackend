import { Injectable } from '@nestjs/common';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';
import { Wish } from './entities/wish.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class WishesService {
  constructor(
    @InjectRepository(Wish)
    private wishesRepository: Repository<Wish>,
  ) { }

  async create(createWishDto: CreateWishDto): Promise<Wish> {
    return this.wishesRepository.save(createWishDto);
  }

  async findAll(params): Promise<Wish[]> {
    return this.wishesRepository.find(params);
  }

  async findOne(params) {
    return this.wishesRepository.findOne(params);
  }

  async updateOne(params, updateWishDto: UpdateWishDto) {
    return this.wishesRepository.update(params, updateWishDto);
  }

  async removeOne(params) {
    return this.wishesRepository.delete(params);
  }
}
