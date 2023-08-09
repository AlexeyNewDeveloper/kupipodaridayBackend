import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UserProfileResponseDto } from './dto/user-profile-response.dto';
import { UserWishesResponseDto } from './dto/user-wishes-response.dto';
import { UserPublicProfileResponseDto } from './dto/user-public-profile-response.dto';
import { UserWishesDto } from './dto/user-wishes.dto';
import { Wish } from 'src/wishes/entities/wish.entity';

type FindOneParamsObject =
  { id: number }
  | { username: string }


@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Wish)
    private wishRepository: Repository<Wish>,
  ) { }

  async create(createUserDto: CreateUserDto): Promise<User> {
    return this.userRepository.save(createUserDto);
  }

  async findAll(query: string): Promise<UserProfileResponseDto[]> {
    return this.userRepository.find({
      where: [
        { username: query },
        { email: query }
      ],
      select: {
        id: true,
        username: true,
        about: true,
        avatar: true,
        email: true,
        createdAt: true,
        updatedAt: true
      }
    });
  }

  async findOne(paramsObject: FindOneParamsObject): Promise<User> {
    return this.userRepository.findOne({
      where: paramsObject,
    });
  }

  async getUserProfile(paramsObject: FindOneParamsObject): Promise<UserProfileResponseDto> {
    return this.userRepository.findOne({
      where: paramsObject,
      select: {
        id: true,
        username: true,
        about: true,
        avatar: true,
        email: true,
        createdAt: true,
        updatedAt: true
      }
    });
  }

  async getOwnWishes(paramsObject: FindOneParamsObject): Promise<UserWishesResponseDto> {
    return this.userRepository.findOne({
      where: paramsObject,
      select: {
        wishes: true
      }
    });
  }

  async updateOne(id: number, updateUserDto: UpdateUserDto) {
    return this.userRepository.update(id, updateUserDto);
  }

  async removeOne(id: number) {
    return this.userRepository.delete(id);
  }

  async getPublicUserProfileByUsername(username: string): Promise<UserPublicProfileResponseDto> {
    return this.userRepository.findOne({
      where: { username },
      select: {
        id: true,
        username: true,
        about: true,
        avatar: true,
        createdAt: true,
        updatedAt: true
      }
    });
  }

  // async getPublicUserWishesByUsername(paramsObject: FindOneParamsObject): Promise<UserWishesDto[]> {
  //   return this.userRepository.findOne({
  //     where: paramsObject,
  //     select: {
  //       wishes: true
  //     }
  //   });
  // }

  async getPublicUserWishesByUsername(paramsObject: FindOneParamsObject): Promise<UserWishesDto[]> {
    const user = await this.userRepository.findOne({
      where: paramsObject,
      // select: {
      //   id: true
      // }
    });
    return this.wishRepository.find({
      where: { owner: user }
    })
  }


}
