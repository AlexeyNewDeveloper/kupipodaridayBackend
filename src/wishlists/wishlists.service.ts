import { Injectable } from '@nestjs/common';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { Wishlist } from './entities/wishlist.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere } from 'typeorm';

@Injectable()
export class WishlistsService {
  constructor(
    @InjectRepository(Wishlist)
    private wishlistRepository: Repository<Wishlist>,
  ) { }

  async create(createWishlistDto: CreateWishlistDto): Promise<Wishlist> {
    return this.wishlistRepository.save(createWishlistDto);
  }

  async findAll(): Promise<Wishlist[]> {
    return this.wishlistRepository.find();
  }

  async findOne(id: number) {
    return this.wishlistRepository.findOneBy({ id });
  }

  async updateOne(paramsObject: FindOptionsWhere<Wishlist>, updateUserDto: UpdateWishlistDto) {
    return this.wishlistRepository.update(paramsObject, updateUserDto);
  }

  async removeOne(paramsObject: FindOptionsWhere<Wishlist>) {
    return this.wishlistRepository.delete(paramsObject);
  }

}
