import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UserProfileResponseDto } from './dto/user-profile-response.dto';
import { ParamsObject } from 'src/services/types';


@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) { }

  async create(createUserDto: CreateUserDto): Promise<User> {
    return this.userRepository.save(createUserDto);
  }

  async findAll(paramsObject: ParamsObject): Promise<UserProfileResponseDto[]> {
    return this.userRepository.find(paramsObject);
  }

  async findOne(paramsObject: ParamsObject): Promise<User> {
    return this.userRepository.findOne(paramsObject);
  }

  async updateOne(id: number, updateUserDto: UpdateUserDto) {
    return this.userRepository.update(id, updateUserDto);
  }

  async removeOne(id: number) {
    return this.userRepository.delete(id);
  }

}
