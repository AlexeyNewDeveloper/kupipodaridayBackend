import { Injectable } from '@nestjs/common';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';
import { Wish } from './entities/wish.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { FindManyOptions, FindOneOptions, Repository, FindOptionsWhere } from 'typeorm';
import { ParamsObject } from 'src/services/types';

@Injectable()
export class WishesService {
  constructor(
    @InjectRepository(Wish)
    private wishesRepository: Repository<Wish>,
  ) { }

  async create(createWishDto: CreateWishDto): Promise<Wish> {
    return this.wishesRepository.save(createWishDto);
  }

  async findAll(params: FindManyOptions<Wish>): Promise<Wish[]> {
    return this.wishesRepository.find(params);
  }

  async findOne(params: FindOneOptions<Wish>) {
    return this.wishesRepository.findOne(params);
  }

  async updateOne(params: FindOptionsWhere<Wish>, updateWishDto: UpdateWishDto) {
    return this.wishesRepository.update(params, updateWishDto);
  }

  async removeOne(params: FindOptionsWhere<Wish>) {
    return this.wishesRepository.delete(params);
  }

  async getRaise(amount: number, id: number) {
    console.log(amount, id)

    const updatedWish = await this.wishesRepository.createQueryBuilder()
      .update(Wish)
      .set({
        raised: () => `raised + ${amount}`
      })
      .where("id = :id", { id })
      .execute()

    return updatedWish;
  }

  async incrementCopiedField(id: number, amount: number) {
    return this.wishesRepository.increment({ id }, 'copied', amount)
  }
}
