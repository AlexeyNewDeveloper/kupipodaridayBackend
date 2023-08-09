import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/strategies/jwt/jwt-auth.guard';
import { FindUserDto } from './dto/find-users.dto';
import { HashService } from 'src/hash/hash.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly hashService: HashService
  ) { }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getSelfProfile(@Request() req) {
    return this.usersService.getUserProfile({ id: req.user.id })
  }

  @UseGuards(JwtAuthGuard)
  @Patch('me')
  async updateSelfProfile(@Request() req, @Body() updateUserDto: UpdateUserDto) {
    let hashedPassword: string;
    if (updateUserDto.password) {
      hashedPassword = await this.hashService.hash(updateUserDto.password);
      updateUserDto.password = hashedPassword;
    }
    return this.usersService.updateOne(req.user.id, updateUserDto)
  }

  @UseGuards(JwtAuthGuard)
  @Get('me/wishes')
  async getOwnWishes(@Request() req) {
    return this.usersService.getOwnWishes({ id: req.user.id })
  }

  @UseGuards(JwtAuthGuard)
  @Get(':username')
  async getPublicUserProfileByUsername(@Param() username: string) {
    return this.usersService.getPublicUserProfileByUsername(username)
  }

  @UseGuards(JwtAuthGuard)
  @Get(':username/wishes')
  async getPublicUserWishesByUsername(@Param() username: string) {
    return this.usersService.getPublicUserWishesByUsername({ username })
  }

  @UseGuards(JwtAuthGuard)
  @Post('find')
  async findUser(@Body() reqBody: FindUserDto) {
    return this.usersService.findAll(reqBody.query)
  }
}
